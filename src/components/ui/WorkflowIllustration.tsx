import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Cpu, Database, Send, Inbox, ShieldCheck } from 'lucide-react';

interface StageDetail {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  payload: {
    title: string;
    description: string;
    sampleData: Record<string, string>;
  };
}

const STAGES: StageDetail[] = [
  {
    id: 'capture',
    label: 'Capture',
    sublabel: 'Inbound Webhook & Form',
    icon: Inbox,
    payload: {
      title: 'Raw Lead Intake Triggered',
      description: 'Incoming form submission or API webhook payload arrives via authenticated endpoint.',
      sampleData: {
        source: 'Landing Page Form',
        payload_type: 'Project Inquiry',
        received_at: '14:22:01 UTC',
      },
    },
  },
  {
    id: 'process',
    label: 'Process',
    sublabel: 'Data Extraction & Schema',
    icon: Cpu,
    payload: {
      title: 'Enrichment & Context Extraction',
      description: 'Schema normalization, domain lookup, and intent classification executed within 120ms.',
      sampleData: {
        entity_domain: 'agencyflow.io',
        target_service: 'Workflow Automation',
        urgency_score: 'High Intent',
      },
    },
  },
  {
    id: 'validate',
    label: 'Validate',
    sublabel: 'Guardrails & Business Rules',
    icon: ShieldCheck,
    payload: {
      title: 'Verification & Quality Check',
      description: 'Verifies email deliverability, spam score filter, and duplicate CRM record check.',
      sampleData: {
        email_status: 'Deliverable (MX Valid)',
        anti_spam_check: 'Passed (0.00 score)',
        duplicate_status: 'New Contact Verified',
      },
    },
  },
  {
    id: 'act',
    label: 'Act',
    sublabel: 'CRM, Calendar & Alerts',
    icon: Send,
    payload: {
      title: 'Autonomous System Execution',
      description: 'Syncs lead into CRM, dispatches notification to team Slack channel, and triggers confirmation.',
      sampleData: {
        hubspot_contact: 'Created (ID: #89211)',
        slack_notification: 'Dispatched to #pipeline',
        calendar_invite: 'Drafted for Review',
      },
    },
  },
];

export const WorkflowIllustration: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = STAGES[activeStageIndex];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#D8D8D0] shadow-xs overflow-hidden">
      {/* Visual Header Bar */}
      <div className="px-5 py-3.5 bg-[#181818] text-white flex items-center justify-between border-b border-[#181818]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
          <span className="text-xs font-mono uppercase tracking-wider text-white/90">
            Automated Architecture Pipeline
          </span>
        </div>
        <div className="text-[11px] font-mono text-white/50">
          Capture → Process → Validate → Act
        </div>
      </div>

      {/* Nodes Strip */}
      <div className="p-4 sm:p-6 bg-[#F3F2EE]/50 border-b border-[#D8D8D0]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`relative text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#181818] shadow-xs ring-1 ring-[#181818]'
                    : isCompleted
                    ? 'bg-white/80 border-[#D8D8D0] hover:border-[#181818]/40'
                    : 'bg-white/40 border-[#D8D8D0]/60 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#181818] text-[#C6F36B]'
                        : isCompleted
                        ? 'bg-[#181818]/10 text-[#181818]'
                        : 'bg-[#D8D8D0]/50 text-[#A5A59B]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-[#A5A59B]">
                    0{idx + 1}
                  </span>
                </div>
                <div className="font-semibold text-sm text-[#181818] flex items-center gap-1.5">
                  <span>{stage.label}</span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                </div>
                <div className="text-[11px] text-[#A5A59B] truncate mt-0.5">
                  {stage.sublabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Node Telemetry Inspector */}
      <div className="p-5 sm:p-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#F3F2EE] gap-2">
          <div>
            <span className="text-xs font-mono text-[#A5A59B] uppercase tracking-wide">
              Active Stage Inspector · 0{activeStageIndex + 1}
            </span>
            <h4 className="text-base font-bold text-[#181818] mt-0.5">
              {activeStage.payload.title}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded bg-[#F3F2EE] border border-[#D8D8D0] text-[#181818] font-mono text-[11px]">
              Latency: &lt;80ms
            </span>
            <span className="text-xs px-2.5 py-1 rounded bg-[#C6F36B]/40 text-[#181818] font-medium text-[11px]">
              Verified
            </span>
          </div>
        </div>

        <p className="text-sm text-[#181818]/70 mb-4 leading-relaxed">
          {activeStage.payload.description}
        </p>

        {/* Structured Schema View */}
        <div className="bg-[#181818] rounded-xl p-3.5 text-white font-mono text-xs overflow-x-auto border border-[#181818]">
          <div className="text-[10px] uppercase text-[#A5A59B] mb-2 tracking-wider">
            Verified Payload Data:
          </div>
          <div className="space-y-1.5">
            {Object.entries(activeStage.payload.sampleData).map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2">
                <span className="text-[#A5A59B]">{k}:</span>
                <span className="text-[#C6F36B]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stepper Controls */}
        <div className="flex items-center justify-between pt-4 mt-2">
          <button
            onClick={() => setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1))}
            className="text-xs text-[#181818]/70 hover:text-[#181818] font-medium px-2 py-1 rounded hover:bg-[#F3F2EE] cursor-pointer"
          >
            ← Previous Node
          </button>
          <div className="flex items-center gap-1.5">
            {STAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStageIndex(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === activeStageIndex ? 'bg-[#181818] w-4' : 'bg-[#D8D8D0]'
                }`}
                aria-label={`Jump to stage ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActiveStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : 0))}
            className="text-xs text-[#181818] font-semibold px-2.5 py-1 rounded bg-[#F3F2EE] hover:bg-[#D8D8D0] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Next Node</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
