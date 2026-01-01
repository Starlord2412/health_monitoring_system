// FAQPage.tsx

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is HealthTrack and how does it work?",
    answer:
      "HealthTrack is a remote health monitoring system that streams vitals from patient devices to a secure doctor and family dashboard. Doctors review alerts, reports, and trends, while families see a simplified overview.",
  },
  {
    id: 2,
    question: "Who gets access to the patient’s live data?",
    answer:
      "Live vitals and alerts are visible to the assigned doctor team and approved family caregivers only. Each role sees a different UI tailored to their responsibilities.",
  },
  {
    id: 3,
    question: "How often are vitals and alerts updated?",
    answer:
      "Device readings are pushed in near real-time. Critical events such as falls or abnormal vitals trigger alerts to the doctor portal and family dashboard within a few seconds.",
  },
  {
    id: 4,
    question: "Can doctors send prescriptions and advice through the portal?",
    answer:
      "Yes. Doctors can manage prescriptions, review reports, and send follow‑up advice using the consult and prescription sections. Families and patients receive these updates in their respective portals.",
  },
  {
    id: 5,
    question: "Is HealthTrack safe for sensitive medical information?",
    answer:
      "All data is transmitted over secure connections and stored in a protected environment. Access is role‑based so that only authorized users can view clinical information.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

  const toggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#C9E6E2] px-6 py-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
            Help center
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-teal-950">
            Frequently asked questions
          </h1>
          <p className="mt-1 text-sm text-teal-900/80 max-w-2xl">
            Answers to common questions about the HealthTrack doctor and family
            portals, remote monitoring, and alerts.
          </p>
        </div>

        {/* Glass card */}
        <div className="rounded-3xl bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
          {/* Top row: small card with icon */}
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-white">
                <HelpCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Need quick clarification?
                </p>
                <p className="text-[11px] text-gray-600">
                  Start with these FAQs before reaching out via Consult or
                  Contact Doctor.
                </p>
              </div>
            </div>
            <p className="text-[11px] text-gray-500">
              Can&apos;t find your answer? Use the Consult section to message the
              care team.
            </p>
          </div>

          {/* Accordion */}
          <div className="divide-y divide-teal-100">
            {faqs.map((item) => {
              const isOpen = item.id === openId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full text-left py-3 focus:outline-none"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {item.question}
                    </p>
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden text-xs text-gray-700 transition-all duration-200 ${
                      isOpen ? "mt-2 max-h-40" : "max-h-0"
                    }`}
                  >
                    {item.answer}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
