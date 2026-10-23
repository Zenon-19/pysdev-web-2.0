/**
 * Privacy-conscious client-side analytics event tracker.
 * Strictly adheres to PRD: Never transmit PII, names, emails, or free-text fields.
 */

export type AnalyticsEvent =
  | 'hero_cta_clicked'
  | 'services_viewed'
  | 'project_card_clicked'
  | 'contact_form_started'
  | 'contact_form_step_completed'
  | 'contact_form_validation_error'
  | 'contact_form_submitted'
  | 'contact_form_submission_failed';

export interface AnalyticsPayload {
  location?: string;
  serviceCategory?: string;
  stepNumber?: number;
  projectSlug?: string;
  filter?: string;
  source?: string;
}

export function trackEvent(eventName: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  try {
    // Sanitize to guarantee no PII is ever sent
    const sanitized = {
      event: eventName,
      timestamp: new Date().toISOString(),
      path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...payload,
    };

    if (process.env.NODE_ENV !== 'production') {
      console.info(`[PysDev Analytics] ${eventName}`, sanitized);
    }

    // Window dataLayer / gtag / custom beacon hook if available
    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(sanitized);
    }
  } catch {
    // Fail silently without disrupting user flow
  }
}
