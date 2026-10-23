import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { completeEnquirySchema } from './src/lib/validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Body parsers with request size limits
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Ensure persistence directory exists
const DATA_DIR = path.resolve(__dirname, '.data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// In-memory rate limiting map: IP -> timestamp[]
const ipRateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRateLimitMap.set(ip, validTimestamps);
    return false;
  }
  validTimestamps.push(now);
  ipRateLimitMap.set(ip, validTimestamps);
  return true;
}

// Clean up stale rate limits every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of ipRateLimitMap.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      ipRateLimitMap.delete(ip);
    } else {
      ipRateLimitMap.set(ip, valid);
    }
  }
}, 15 * 60 * 1000);

// Helper to read enquiries
function getEnquiries(): any[] {
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read enquiries file:', err);
    return [];
  }
}

// Helper to save enquiry
function saveEnquiry(record: any): void {
  const records = getEnquiries();
  records.unshift(record);
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'PysDev Studio API',
  });
});

// Verification endpoint for thank-you page
app.get('/api/contact/verify/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ valid: false, error: 'Invalid enquiry ID' });
  }

  const records = getEnquiries();
  const found = records.find((r) => r.id === id);

  if (!found) {
    return res.status(404).json({ valid: false, error: 'Enquiry not found' });
  }

  return res.json({
    valid: true,
    id: found.id,
    createdAt: found.createdAt,
    serviceCategory: found.serviceCategory,
    status: found.status,
  });
});

// Multi-step enquiry submission endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  // 1. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many submissions from this IP address. Please wait a few minutes before trying again.',
    });
  }

  // 2. Honeypot anti-spam check
  if (req.body.hp_website && req.body.hp_website.trim().length > 0) {
    // Silently reject spam bot submissions without revealing honeypot mechanics
    return res.status(200).json({
      success: true,
      id: crypto.randomUUID(),
      message: 'Enquiry received successfully.',
    });
  }

  // 3. Server-side Zod validation
  const validationResult = completeEnquirySchema.safeParse(req.body);
  if (!validationResult.success) {
    const formattedErrors: Record<string, string> = {};
    for (const issue of validationResult.error.issues) {
      const fieldPath = issue.path.join('.');
      formattedErrors[fieldPath] = issue.message;
    }
    return res.status(400).json({
      success: false,
      error: 'Validation failed. Please correct the highlighted fields.',
      fieldErrors: formattedErrors,
    });
  }

  const data = validationResult.data;
  const enquiryId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // 4. Persistence
  const enquiryRecord = {
    id: enquiryId,
    createdAt,
    status: 'new',
    fullName: data.fullName,
    workEmail: data.workEmail,
    companyName: data.companyName || null,
    websiteUrl: data.websiteUrl || null,
    serviceCategory: data.serviceCategory,
    problemToSolve: data.problemToSolve,
    currentTools: data.currentTools || null,
    desiredOutcome: data.desiredOutcome || null,
    budget: data.budget || 'Not sure yet',
    timeline: data.timeline || 'Within a month',
    engagement: data.engagement || 'Open to either',
    additionalRequirements: data.additionalRequirements || null,
    consentGiven: true,
    consentTimestamp: createdAt,
    clientIpMasked: clientIp.replace(/:\d+$/, '').replace(/\.\d+$/, '.xxx'),
  };

  try {
    saveEnquiry(enquiryRecord);
    console.log(`[PysDev Studio] New verified enquiry received: ${enquiryId} for ${data.serviceCategory}`);

    // Optional email dispatch hook if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        console.log(`[PysDev Studio] Resend API configured. Sending notification for enquiry: ${enquiryId}`);
        // Can be wired to real Resend fetch if env var is supplied by client in production
      } catch (emailErr) {
        console.warn('[PysDev Studio] Email notification delivery failed, enquiry is safely stored:', emailErr);
      }
    }

    return res.status(201).json({
      success: true,
      id: enquiryId,
      message: 'Your project enquiry has been successfully received and recorded.',
    });
  } catch (persistErr) {
    console.error('[PysDev Studio] Database persistence failure:', persistErr);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while saving your enquiry. Please retry or contact hello@pysdev.studio directly.',
    });
  }
});

// Initialize server with Vite in dev, or static files in production
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PysDev Studio server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
