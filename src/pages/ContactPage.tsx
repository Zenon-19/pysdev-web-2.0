import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight, Check, AlertCircle, Loader2, Mail, Shield, CheckCircle2 } from 'lucide-react';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  completeEnquirySchema,
  EnquiryFormData,
} from '../lib/validation';
import { RoutePath } from '../lib/router';
import { trackEvent } from '../lib/analytics';

interface ContactPageProps {
  queryParams?: Record<string, string>;
  onNavigate: (path: RoutePath, queryParams?: Record<string, string>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ queryParams = {}, onNavigate }) => {
  useEffect(() => {
    document.title = 'Start a Project — PysDev Studio';
    window.scrollTo(0, 0);
    trackEvent('contact_form_started');
  }, []);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<EnquiryFormData>>({
    fullName: '',
    workEmail: '',
    companyName: '',
    websiteUrl: '',
    serviceCategory: 'AI & Workflow Automation',
    problemToSolve: '',
    currentTools: '',
    desiredOutcome: '',
    budget: 'Not sure yet',
    timeline: 'Within a month',
    engagement: 'Open to either',
    additionalRequirements: '',
    consent: true,
    hp_website: '',
  });

  // Handle URL query preselection for service
  useEffect(() => {
    if (queryParams.service) {
      const match = [
        'AI & Workflow Automation',
        'AI Agents & Assistants',
        'Custom Software & Integrations',
        'Not sure yet',
      ].find((opt) =>
        opt.toLowerCase().includes(queryParams.service.toLowerCase()) ||
        queryParams.service.toLowerCase().includes(opt.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          serviceCategory: match as EnquiryFormData['serviceCategory'],
        }));
      }
    }
  }, [queryParams.service]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof EnquiryFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step 1 Validation & Next
  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const result = step1Schema.safeParse({
      fullName: formData.fullName,
      workEmail: formData.workEmail,
      companyName: formData.companyName,
      websiteUrl: formData.websiteUrl,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      trackEvent('contact_form_validation_error', { stepNumber: 1 });
      return;
    }

    setErrors({});
    trackEvent('contact_form_step_completed', { stepNumber: 1 });
    setCurrentStep(2);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Step 2 Validation & Next
  const handleNextFromStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const result = step2Schema.safeParse({
      serviceCategory: formData.serviceCategory,
      problemToSolve: formData.problemToSolve,
      currentTools: formData.currentTools,
      desiredOutcome: formData.desiredOutcome,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      trackEvent('contact_form_validation_error', { stepNumber: 2 });
      return;
    }

    setErrors({});
    trackEvent('contact_form_step_completed', { stepNumber: 2 });
    setCurrentStep(3);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Step 3 Validation & Final Submit
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    const step3Result = step3Schema.safeParse({
      budget: formData.budget,
      timeline: formData.timeline,
      engagement: formData.engagement,
      additionalRequirements: formData.additionalRequirements,
      consent: formData.consent,
    });

    if (!step3Result.success) {
      const fieldErrors: Record<string, string> = {};
      step3Result.error.issues.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      trackEvent('contact_form_validation_error', { stepNumber: 3 });
      return;
    }

    // Entire payload check
    const fullResult = completeEnquirySchema.safeParse(formData);
    if (!fullResult.success) {
      setSubmissionError('Please review previous steps; some required fields are invalid.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      trackEvent('contact_form_submitted', {
        serviceCategory: formData.serviceCategory,
      });

      // Redirect to thank-you only when server confirms persistence!
      onNavigate('/thank-you', {
        id: data.id,
        service: formData.serviceCategory || '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Server unavailable. Please try again or email us directly.';
      setSubmissionError(msg);
      trackEvent('contact_form_submission_failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-16 lg:py-24">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-[#181818]/60 mb-3">
          Direct Intake
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818] mb-4">
          Start a project enquiry.
        </h1>
        <p className="text-base sm:text-lg text-[#181818]/75 leading-relaxed font-normal">
          This initial enquiry is free and does not commit you to a project. We review every submission personally to evaluate feasibility and architecture.
        </p>

        {/* Step Progress Bar */}
        <div className="mt-10 bg-white rounded-2xl border border-[#D8D8D0] p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs font-mono mb-2.5">
            <span className="font-semibold text-[#181818]">
              Step 0{currentStep} of 03
            </span>
            <span className="text-[#A5A59B]">
              {currentStep === 1 && 'Contact & Organization'}
              {currentStep === 2 && 'Technical Requirements'}
              {currentStep === 3 && 'Scope & Agreement'}
            </span>
          </div>
          <div className="w-full h-2 bg-[#F3F2EE] rounded-full overflow-hidden flex gap-1">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                currentStep >= 1 ? 'bg-[#181818] flex-1' : 'bg-transparent flex-1'
              }`}
            />
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                currentStep >= 2 ? 'bg-[#181818] flex-1' : 'bg-[#D8D8D0]/60 flex-1'
              }`}
            />
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                currentStep >= 3 ? 'bg-[#C6F36B] flex-1' : 'bg-[#D8D8D0]/60 flex-1'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#D8D8D0] p-6 sm:p-10 shadow-xs">
          {submissionError && (
            <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Submission Encountered an Issue</p>
                <p className="mt-0.5 text-xs sm:text-sm text-red-700">{submissionError}</p>
                <p className="mt-2 text-xs text-red-600">
                  Your entered data is preserved. You can retry immediately or contact{' '}
                  <a href="mailto:hello@pysdev.studio" className="underline font-medium">
                    hello@pysdev.studio
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {/* Hidden Spam Honeypot Field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_website">Leave this field blank</label>
            <input
              type="text"
              id="hp_website"
              name="hp_website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.hp_website || ''}
              onChange={(e) => handleInputChange('hp_website', e.target.value)}
            />
          </div>

          {/* STEP 1: CONTACT INFORMATION */}
          {currentStep === 1 && (
            <form onSubmit={handleNextFromStep1} className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-[#F3F2EE] pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#181818]">
                  Step 1: Contact Information
                </h2>
                <p className="text-xs text-[#A5A59B] mt-1">
                  How should we get back to you regarding your technical scope?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#181818] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    placeholder="e.g. Lakshya Lohani"
                    value={formData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818] transition-colors ${
                      errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#D8D8D0] bg-[#F3F2EE]/30'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <label htmlFor="workEmail" className="block text-xs font-semibold text-[#181818] mb-1.5">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    required
                    placeholder="name@company.com"
                    value={formData.workEmail || ''}
                    onChange={(e) => handleInputChange('workEmail', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818] transition-colors ${
                      errors.workEmail ? 'border-red-500 bg-red-50/20' : 'border-[#D8D8D0] bg-[#F3F2EE]/30'
                    }`}
                  />
                  {errors.workEmail && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.workEmail}</p>
                  )}
                </div>

                {/* Company Name (Optional) */}
                <div>
                  <label htmlFor="companyName" className="block text-xs font-semibold text-[#181818] mb-1.5">
                    Company Name <span className="text-[#A5A59B] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="Acme Operations Ltd."
                    value={formData.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D8D0] bg-[#F3F2EE]/30 text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818]"
                  />
                </div>

                {/* Website URL (Optional) */}
                <div>
                  <label htmlFor="websiteUrl" className="block text-xs font-semibold text-[#181818] mb-1.5">
                    Website URL <span className="text-[#A5A59B] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="websiteUrl"
                    placeholder="https://example.com"
                    value={formData.websiteUrl || ''}
                    onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818] ${
                      errors.websiteUrl ? 'border-red-500 bg-red-50/20' : 'border-[#D8D8D0] bg-[#F3F2EE]/30'
                    }`}
                  />
                  {errors.websiteUrl && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.websiteUrl}</p>
                  )}
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-8 border-t border-[#F3F2EE] flex items-center justify-between">
                <span className="text-xs text-[#A5A59B]">Takes ~2 minutes to finish</span>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#b8ee52] rounded-xl border border-[#181818]/15 transition-all flex items-center gap-2 cursor-pointer shadow-xs active:translate-y-[1px]"
                >
                  <span>Continue to Project Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PROJECT REQUIREMENTS */}
          {currentStep === 2 && (
            <form onSubmit={handleNextFromStep2} className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-[#F3F2EE] pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#181818]">
                  Step 2: Project Requirements
                </h2>
                <p className="text-xs text-[#A5A59B] mt-1">
                  Tell us about the process, tools, or software you want to build.
                </p>
              </div>

              {/* Service Category */}
              <div>
                <label className="block text-xs font-semibold text-[#181818] mb-2.5">
                  Service Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'AI & Workflow Automation',
                    'AI Agents & Assistants',
                    'Custom Software & Integrations',
                    'Not sure yet',
                  ].map((serviceOption) => {
                    const isSelected = formData.serviceCategory === serviceOption;
                    return (
                      <button
                        key={serviceOption}
                        type="button"
                        onClick={() => handleInputChange('serviceCategory', serviceOption)}
                        className={`p-3.5 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#181818] text-[#C6F36B] border-[#181818] shadow-xs'
                            : 'bg-[#F3F2EE]/40 text-[#181818] border-[#D8D8D0] hover:border-[#181818]/40'
                        }`}
                      >
                        <span>{serviceOption}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#C6F36B]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Problem to solve */}
              <div>
                <label htmlFor="problemToSolve" className="block text-xs font-semibold text-[#181818] mb-1.5">
                  Problem to Solve <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="problemToSolve"
                  required
                  rows={4}
                  placeholder="Describe what manual process currently slows you down, or what product feature you need engineered..."
                  value={formData.problemToSolve || ''}
                  onChange={(e) => handleInputChange('problemToSolve', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818] ${
                    errors.problemToSolve ? 'border-red-500 bg-red-50/20' : 'border-[#D8D8D0] bg-[#F3F2EE]/30'
                  }`}
                />
                {errors.problemToSolve ? (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.problemToSolve}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-[#A5A59B]">Minimum 10 characters.</p>
                )}
              </div>

              {/* Current Tools (Optional) */}
              <div>
                <label htmlFor="currentTools" className="block text-xs font-semibold text-[#181818] mb-1.5">
                  Current Tools &amp; Platforms <span className="text-[#A5A59B] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="currentTools"
                  placeholder="e.g. HubSpot, Slack, PostgreSQL, Stripe, Airtable, Notion"
                  value={formData.currentTools || ''}
                  onChange={(e) => handleInputChange('currentTools', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D8D0] bg-[#F3F2EE]/30 text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818]"
                />
              </div>

              {/* Desired Outcome (Optional) */}
              <div>
                <label htmlFor="desiredOutcome" className="block text-xs font-semibold text-[#181818] mb-1.5">
                  Desired Outcome &amp; Success Metric <span className="text-[#A5A59B] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="desiredOutcome"
                  placeholder="e.g. Inbound leads contacted in <2 mins; zero manual copy-pasting to CRM"
                  value={formData.desiredOutcome || ''}
                  onChange={(e) => handleInputChange('desiredOutcome', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D8D0] bg-[#F3F2EE]/30 text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818]"
                />
              </div>

              {/* Step 2 Actions */}
              <div className="pt-8 border-t border-[#F3F2EE] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#181818]/70 hover:text-[#181818] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Contact Info</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#b8ee52] rounded-xl border border-[#181818]/15 transition-all flex items-center gap-2 cursor-pointer shadow-xs active:translate-y-[1px]"
                >
                  <span>Continue to Scope &amp; Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SCOPE, TIMING & CONSENT */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-[#F3F2EE] pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#181818]">
                  Step 3: Scope, Timing &amp; Agreement
                </h2>
                <p className="text-xs text-[#A5A59B] mt-1">
                  Help us estimate delivery milestones and resource allocation.
                </p>
              </div>

              {/* Budget Range (Optional per PRD) */}
              <div>
                <label className="block text-xs font-semibold text-[#181818] mb-2">
                  Budget Expectation <span className="text-[#A5A59B] font-normal">(Optional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Under ₹25,000',
                    '₹25,000–₹75,000',
                    '₹75,000–₹1.5 lakh',
                    '₹1.5 lakh+',
                    'Not sure yet',
                  ].map((budgetOption) => {
                    const isSelected = formData.budget === budgetOption;
                    return (
                      <button
                        key={budgetOption}
                        type="button"
                        onClick={() => handleInputChange('budget', budgetOption)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#181818] text-[#C6F36B] border-[#181818]'
                            : 'bg-[#F3F2EE]/40 text-[#181818] border-[#D8D8D0] hover:border-[#181818]/40'
                        }`}
                      >
                        {budgetOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#181818] mb-2">
                  Desired Delivery Timeline <span className="text-[#A5A59B] font-normal">(Optional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    'As soon as possible',
                    'Within a month',
                    'In 1–3 months',
                    'Just exploring',
                  ].map((timelineOption) => {
                    const isSelected = formData.timeline === timelineOption;
                    return (
                      <button
                        key={timelineOption}
                        type="button"
                        onClick={() => handleInputChange('timeline', timelineOption)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#181818] text-[#C6F36B] border-[#181818]'
                            : 'bg-[#F3F2EE]/40 text-[#181818] border-[#D8D8D0] hover:border-[#181818]/40'
                        }`}
                      >
                        {timelineOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Engagement Model (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#181818] mb-2">
                  Engagement Model <span className="text-[#A5A59B] font-normal">(Optional)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'One-time project',
                    'Monthly managed service',
                    'Open to either',
                  ].map((engOption) => {
                    const isSelected = formData.engagement === engOption;
                    return (
                      <button
                        key={engOption}
                        type="button"
                        onClick={() => handleInputChange('engagement', engOption)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#181818] text-[#C6F36B] border-[#181818]'
                            : 'bg-[#F3F2EE]/40 text-[#181818] border-[#D8D8D0] hover:border-[#181818]/40'
                        }`}
                      >
                        {engOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Requirements (Optional) */}
              <div>
                <label htmlFor="additionalRequirements" className="block text-xs font-semibold text-[#181818] mb-1.5">
                  Additional Details or Existing Repository Links <span className="text-[#A5A59B] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="additionalRequirements"
                  rows={3}
                  placeholder="Any technical constraints, hosting preferences, or existing documentation URLs..."
                  value={formData.additionalRequirements || ''}
                  onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D8D0] bg-[#F3F2EE]/30 text-sm text-[#181818] placeholder:text-[#A5A59B] focus:outline-2 focus:outline-[#181818]"
                />
              </div>

              {/* Privacy Consent Checkbox (Required) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.consent)}
                    onChange={(e) => handleInputChange('consent', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#D8D8D0] text-[#181818] focus:ring-[#181818]"
                  />
                  <span className="text-xs text-[#181818]/80 leading-normal">
                    I agree to PysDev Studio processing my enquiry details to prepare a technical proposal in accordance with the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('/privacy')}
                      className="underline font-semibold text-[#181818] hover:text-black cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    . (We do not share your contact details or send spam marketing).
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.consent}</p>
                )}
              </div>

              {/* Summary Review Strip */}
              <div className="p-4 rounded-xl bg-[#F3F2EE]/60 border border-[#D8D8D0] text-xs text-[#181818]/70 space-y-1">
                <div>
                  <span className="font-semibold text-[#181818]">Enquiry Summary: </span>
                  {formData.fullName} ({formData.workEmail}) · {formData.serviceCategory}
                </div>
                <div>
                  <span className="font-semibold text-[#181818]">Timeline: </span>
                  {formData.timeline} · <span className="font-semibold text-[#181818]">Budget: </span>{formData.budget}
                </div>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-8 border-t border-[#F3F2EE] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 text-xs font-semibold text-[#181818]/70 hover:text-[#181818] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Requirements</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3.5 text-sm font-semibold text-[#181818] bg-[#C6F36B] hover:bg-[#b8ee52] rounded-xl border border-[#181818]/15 transition-all flex items-center gap-2 cursor-pointer shadow-sm active:translate-y-[1px] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#181818]" />
                      <span>Transmitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Enquiry</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Alternative Email Contact Card */}
        <div className="mt-12 p-6 rounded-2xl bg-white/60 border border-[#D8D8D0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#181818]/70">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#181818] shrink-0" />
            <div>
              <span className="font-semibold text-[#181818] block">Prefer direct email?</span>
              <span>Send your RFP or technical brief directly to our engineering mailbox.</span>
            </div>
          </div>
          <a
            href="mailto:hello@pysdev.studio"
            className="px-4 py-2 rounded-lg bg-white border border-[#D8D8D0] text-[#181818] font-medium hover:bg-[#F3F2EE] transition-colors whitespace-nowrap"
          >
            hello@pysdev.studio
          </a>
        </div>
      </div>
    </div>
  );
};
