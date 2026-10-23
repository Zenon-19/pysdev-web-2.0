import { z } from 'zod';

export const serviceCategoryEnum = z.enum([
  'AI & Workflow Automation',
  'AI Agents & Assistants',
  'Custom Software & Integrations',
  'Not sure yet',
]);

export const budgetEnum = z.enum([
  'Under ₹25,000',
  '₹25,000–₹75,000',
  '₹75,000–₹1.5 lakh',
  '₹1.5 lakh+',
  'Not sure yet',
]);

export const timelineEnum = z.enum([
  'As soon as possible',
  'Within a month',
  'In 1–3 months',
  'Just exploring',
]);

export const engagementEnum = z.enum([
  'One-time project',
  'Monthly managed service',
  'Open to either',
]);

// Step 1 Validation
export const step1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100, 'Name cannot exceed 100 characters'),
  workEmail: z
    .string()
    .trim()
    .email('Please enter a valid work email address')
    .max(120, 'Email is too long'),
  companyName: z
    .string()
    .trim()
    .max(100, 'Company name cannot exceed 100 characters')
    .optional()
    .default(''),
  websiteUrl: z
    .string()
    .trim()
    .max(200, 'Website URL cannot exceed 200 characters')
    .refine(
      (val) => {
        if (!val) return true;
        try {
          const url = val.startsWith('http') ? val : `https://${val}`;
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Please enter a valid website URL or leave blank' }
    )
    .optional()
    .default(''),
});

// Step 2 Validation
export const step2Schema = z.object({
  serviceCategory: serviceCategoryEnum,
  problemToSolve: z
    .string()
    .trim()
    .min(10, 'Please provide at least a brief description of the problem (min 10 characters)')
    .max(2000, 'Description cannot exceed 2000 characters'),
  currentTools: z
    .string()
    .trim()
    .max(300, 'Current tools text cannot exceed 300 characters')
    .optional()
    .default(''),
  desiredOutcome: z
    .string()
    .trim()
    .max(2000, 'Desired outcome text cannot exceed 2000 characters')
    .optional()
    .default(''),
});

// Step 3 Validation
export const step3Schema = z.object({
  budget: budgetEnum.optional().default('Not sure yet'),
  timeline: timelineEnum.optional().default('Within a month'),
  engagement: engagementEnum.optional().default('Open to either'),
  additionalRequirements: z
    .string()
    .trim()
    .max(2000, 'Additional requirements text cannot exceed 2000 characters')
    .optional()
    .default(''),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy to submit an enquiry',
  }),
});

// Combined Schema for server submission
export const completeEnquirySchema = z.object({
  fullName: step1Schema.shape.fullName,
  workEmail: step1Schema.shape.workEmail,
  companyName: step1Schema.shape.companyName,
  websiteUrl: step1Schema.shape.websiteUrl,

  serviceCategory: step2Schema.shape.serviceCategory,
  problemToSolve: step2Schema.shape.problemToSolve,
  currentTools: step2Schema.shape.currentTools,
  desiredOutcome: step2Schema.shape.desiredOutcome,

  budget: step3Schema.shape.budget,
  timeline: step3Schema.shape.timeline,
  engagement: step3Schema.shape.engagement,
  additionalRequirements: step3Schema.shape.additionalRequirements,
  consent: step3Schema.shape.consent,

  // Honeypot field (must be empty or omitted)
  hp_website: z.string().max(0, 'Spam detected').optional().default(''),
});

export type EnquiryFormData = z.infer<typeof completeEnquirySchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
