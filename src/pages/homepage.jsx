import { Heart, Activity, Bell, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.js";
import { useRef } from "react";
import Footer from "../components/ui/footer.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const getStartedRef = useRef(null);


  const goToLogin = () => navigate("/login");

  const handleClick = () => {
    if (getStartedRef.current) {
      getStartedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#C9E6E2] text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                HealthTrack
              </p>
              <p className="text-[11px] text-slate-500">
                Remote senior health monitoring
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              to="/about"
              className="text-slate-600 transition hover:text-emerald-600"
            >
              About
            </Link>
            <Link
              to="/faq"
              className="text-slate-600 transition hover:text-emerald-600"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="text-slate-600 transition hover:text-emerald-600"
            >
              Contact
            </Link>
            <Button
              onClick={goToLogin}
              className="rounded-full bg-emerald-600 px-5 text-xs font-medium text-white shadow-sm hover:bg-emerald-700"
            >
              Login
            </Button>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-linear-to-br from-[#C9E6E2] via-white to-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:py-16">
          {/* Left */}
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI‑assisted remote monitoring for seniors
            </span>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Smart health monitoring for{" "}
              <span className="text-emerald-700">senior citizens</span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
              Continuous vitals tracking, early risk prediction, and instant
              alerts for doctors, families, and patients—all in a single
              connected platform.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={handleClick}
                size="lg"
                className="rounded-full bg-emerald-600 px-7 text-sm font-medium text-white shadow-md shadow-emerald-200 hover:bg-emerald-700"
              >
                Get started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={goToLogin}
                className="rounded-full border-emerald-200 bg-white px-7 text-sm text-emerald-700 hover:bg-emerald-50"
              >
                Demo doctor dashboard
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Real‑time vitals & alerts
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Role‑based portals for family & doctors
              </div>
            </div>
          </div>

          {/* Right: product highlight card */}
          <div className="flex-1">
            <div className="rounded-3xl bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-700">
                    Live patient snapshot
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Updated a few seconds ago
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                  Stable
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-3">
                {[
                  { label: "Heart rate", value: "76", unit: "bpm" },
                  { label: "Blood pressure", value: "120/78", unit: "" },
                  { label: "Blood sugar", value: "98", unit: "mg/dL" },
                  { label: "SpO₂", value: "98", unit: "%" },
                  { label: "Temperature", value: "98.4", unit: "°F" },
                  { label: "Alerts", value: "0", unit: "active" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-emerald-50/70 p-3"
                  >
                    <p className="text-[11px] text-slate-500">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.value}{" "}
                      <span className="text-[11px] font-normal text-slate-500">
                        {item.unit}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <div>
                  <p className="text-[11px] text-slate-500">
                    AI prediction
                  </p>
                  <p className="text-xs font-medium text-slate-800">
                    Low short‑term risk, monitor BP trend
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                  <Activity className="h-3 w-3" />
                  View doctor portal
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM / VALUE ================= */}
      <section className="border-y border-emerald-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Why remote monitoring matters
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Senior citizens need continuous care, but families and doctors
                cannot be physically present all the time. HealthTrack connects
                patients, families, and doctors with live vitals, anomalies, and
                follow‑up actions in one place.
              </p>
            </div>
            <div className="grid gap-3 text-xs text-slate-700">
              <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-3 py-2">
                <span>Missed early warning signs</span>
                <span className="font-semibold text-emerald-800">
                  ↓ with AI predictions
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-3 py-2">
                <span>Unclear communication</span>
                <span className="font-semibold text-emerald-800">
                  ↓ with shared dashboards
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-3 py-2">
                <span>Response time in emergencies</span>
                <span className="font-semibold text-emerald-800">
                  ↓ with instant alerts
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center text-2xl font-semibold text-slate-900 md:text-3xl">
          Everything in one connected system
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-slate-600 md:text-base">
          HealthTrack combines IoT devices, AI risk models, and separate
          portals for patients, families, and doctors to keep everyone aligned
          around the patient’s health.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Activity className="h-10 w-10 text-emerald-600" />,
              title: "Real‑time vitals",
              desc: "Continuous heart rate, BP, sugar, SpO₂, and temperature streaming.",
            },
            {
              icon: <Shield className="h-10 w-10 text-emerald-600" />,
              title: "AI predictions",
              desc: "Detect risk patterns early with trend analysis and anomaly detection.",
            },
            {
              icon: <Bell className="h-10 w-10 text-emerald-600" />,
              title: "Emergency alerts",
              desc: "SOS triggers with context and patient data to doctors and family.",
            },
            {
              icon: (
                <Heart
                  className="h-10 w-10 text-emerald-600"
                  fill="currentColor"
                />
              ),
              title: "Family connect",
              desc: "Family members see a simplified, friendly health overview.",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-emerald-100 bg-white/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100"
            >
              <CardHeader>
                {item.icon}
                <CardTitle className="mt-3 text-base font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[13px] text-slate-600">
                  {item.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= ROLE SELECTION ================= */}
      <section
        ref={getStartedRef}
        className="border-t border-emerald-100 bg-linear-to-br from-white to-emerald-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-3 text-center text-2xl font-semibold text-slate-900 md:text-3xl">
            Choose your portal
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm text-slate-600 md:text-base">
            HealthTrack adapts to each role with a tailored experience while all
            data stays securely in sync.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                role: "patient",
                title: "Patient",
                badge: "Track my health",
                desc: "See your vitals, daily trends, and medication reminders.",
              },
              {
                role: "family",
                title: "Family",
                badge: "Monitor loved ones",
                desc: "Non‑technical view of vitals, alerts, and doctor notes.",
              },
              {
                role: "doctor",
                title: "Doctor",
                badge: "Clinical dashboard",
                desc: "Patient lists, alerts, reports, and prescriptions.",
              },
              {
                role: "admin",
                title: "Admin",
                badge: "System analytics",
                desc: "User management, usage patterns, and system health.",
              },
            ].map((item) => (
              <Link key={item.role} to={`/signup?role=${item.role}`}>
                <Card className="h-full cursor-pointer rounded-2xl border border-emerald-100 bg-white/95 p-5 transition-all hover:scale-[1.02] hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-200">
                  <CardHeader className="p-0 pb-3">
                    <div className="mb-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                      {item.badge}
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-[13px] text-slate-600">
                      {item.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
