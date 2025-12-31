// /frontend/pages/public/AboutPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Senior users supported", value: "500+" },
  { label: "Avg. alerts resolved faster", value: "3x" },
  { label: "Doctors & caregivers onboarded", value: "120+" },
];

const features = [
  {
    title: "Real‑time remote monitoring",
    description:
      "Continuously tracks vitals like heart rate, BP, sugar, SpO2 and temperature so seniors can live independently while staying medically connected.",
  },
  {
    title: "AI‑powered risk predictions",
    description:
      "Machine learning models analyze trends over the past days to predict possible spikes in BP, sugar and other anomalies before they become emergencies.",
  },
  {
    title: "Smart alerts & SOS",
    description:
      "Instant notifications to family and doctors when readings cross safe limits, along with a one‑tap SOS button for emergencies and optional fall detection.",
  },
  {
    title: "Connected care team",
    description:
      "Role‑based dashboards for patients, family, doctors and admins enable secure sharing of health data, chat, prescriptions and long‑term medical history.",
  },
];

const roles = [
  {
    role: "Patients",
    color: "bg-emerald-50 border-emerald-200",
    points: [
      "View live vitals, trends and daily health score in a simple, large‑font dashboard.",
      "Get medicine reminders, AI health zone (Green / Yellow / Red) and SOS access.",
    ],
  },
  {
    role: "Family",
    color: "bg-sky-50 border-sky-200",
    points: [
      "Monitor loved ones remotely, see alerts, medication compliance and fall/location info.",
      "Stay informed without overwhelming the senior with constant calls or check‑ins.",
    ],
  },
  {
    role: "Doctors",
    color: "bg-indigo-50 border-indigo-200",
    points: [
      "View risk‑sorted patient lists, vitals timelines and AI‑flagged anomalies.",
      "Share prescriptions, adjust treatment and communicate via in‑app consult tools.",
    ],
  },
  {
    role: "Admins",
    color: "bg-slate-50 border-slate-200",
    points: [
      "Manage users, roles, records and platform analytics in a secure centralized panel.",
      "Ensure data privacy with strict role‑based access and audit‑ready logs.",
    ],
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Hero / Intro */}
      <section className="bg-linear-to-br from-emerald-50 via-white to-sky-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase mb-3">
            About Smart Health Monitoring & AI Prediction System
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Enabling seniors to live independently with always‑on, intelligent care
          </h1>
          <p className="max-w-3xl text-slate-600 mb-6">
            Our platform is built for senior citizens who live alone or away from their families, and
            face silent risks from chronic illnesses such as hypertension and diabetes. It combines
            continuous health monitoring, AI‑based predictions and instant communication so that help
            is available before an emergency occurs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium shadow-sm hover:bg-emerald-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 transition"
            >
              Login as Patient / Family / Doctor
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              The problem we are solving
            </h2>
            <p className="text-slate-600 mb-3">
              A growing number of seniors now live independently while their families reside in other
              cities or countries. Non‑communicable diseases such as diabetes, hypertension and heart
              disease often progress silently, and traditional hospital‑centric care does not provide
              continuous monitoring or timely intervention at home.
            </p>
            <p className="text-slate-600">
              Without real‑time data, doctors see only snapshots of a patient&apos;s health during
              visits, families get late updates and emergencies are often detected when it&apos;s
              already too late. This gap increases anxiety for both seniors and caregivers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Our vision & solution
            </h2>
            <p className="text-slate-600 mb-3">
              The Smart Health Monitoring & AI Prediction System creates an always‑connected care
              loop between seniors, their families, doctors and administrators. It collects vital
              signs in real time, analyzes patterns using machine learning and converts raw numbers
              into clear health scores, color‑coded zones and predictive alerts.
            </p>
            <p className="text-slate-600">
              Through role‑based dashboards, everyone sees exactly what they need: seniors get simple
              cards and reminders, families get alerts and timelines, doctors get structured clinical
              data and admins keep the platform secure and compliant.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          What this platform offers
        </h2>
        <p className="text-slate-600 mb-6">
          The system is designed as a full‑stack HealthTech solution with integrated monitoring,
          prediction, alerts and communication features tailored for elderly care.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role-based experience */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Built for every role in the care circle
        </h2>
        <p className="text-slate-600 mb-6">
          Each user gets a dedicated dashboard with permissions and workflows tailored to their
          responsibilities, powered by secure role‑based access control.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div
              key={role.role}
              className={`rounded-xl border p-5 ${role.color}`}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {role.role}
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Impact / Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-2xl bg-slate-900 text-slate-50 px-6 py-8 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold mb-2">
                From reactive treatment to proactive care
              </h2>
              <p className="text-sm text-slate-200">
                By turning continuous health data into early warnings, the platform aims to reduce
                avoidable emergencies, support aging in place and give peace of mind to both seniors
                and the people who care for them.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:text-right">
              {stats.map((item) => (
                <div key={item.label}>
                  <p className="text-xl font-semibold">{item.value}</p>
                  <p className="text-xs text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
