import { Heart, Activity, Bell, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useRef } from "react";
import Footer from "../components/ui/footer.jsx";

export default function HomePage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/signup");
  };

  const getStartedRef = useRef(null);

  const handleClick = () => {
    getStartedRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-white" fill="currentColor" />
            <span className="text-2xl font-bold tracking-wide text-white">
              HealthGuard
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-white/80 hover:text-white transition"
            >
              About
            </Link>
            <Link
              to="/faq"
              className="text-white/80 hover:text-white transition"
            >
              FAQ
            </Link>
            <Button
              onClick={goToLogin}
              className="bg-white text-emerald-700 hover:bg-emerald-50"
            >
              Login
            </Button>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-emerald-50 via-white to-white py-24 text-center px-4">
        <h1 className="mb-6 text-5xl md:text-6xl font-extrabold tracking-tight">
          Smart Health Monitoring for{" "}
          <span className="text-emerald-600">Senior Citizens</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600 leading-relaxed">
          AI-powered real-time monitoring, early risk prediction, and instant
          emergency alerts for peace of mind.
        </p>

        <Button
          onClick={handleClick}
          size="lg"
          className="rounded-xl bg-emerald-600 px-10 h-14 text-lg text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
        >
          Get Started
        </Button>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="bg-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">
            The Challenge We Solve
          </h2>
          <p className="mx-auto max-w-3xl text-center text-lg text-slate-600">
            Senior citizens require constant monitoring. Families worry, doctors
            need timely insights, and emergencies often arrive unannounced.
            HealthGuard bridges this gap intelligently.
          </p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="mb-14 text-center text-4xl font-bold">
          Comprehensive Health Monitoring
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Activity className="h-12 w-12 text-emerald-600" />,
              title: "Real-Time Vitals",
              desc: "Live tracking of heart rate, BP, sugar, SpO2, and temperature.",
            },
            {
              icon: <Shield className="h-12 w-12 text-emerald-600" />,
              title: "AI Predictions",
              desc: "Early warning system for potential health risks.",
            },
            {
              icon: <Bell className="h-12 w-12 text-emerald-600" />,
              title: "Emergency Alerts",
              desc: "Instant SOS alerts with location sharing.",
            },
            {
              icon: (
                <Heart
                  className="h-12 w-12 text-emerald-600"
                  fill="currentColor"
                />
              ),
              title: "Family Connect",
              desc: "Family stays informed and connected at all times.",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100"
            >
              <CardHeader>
                {item.icon}
                <CardTitle className="mt-4 text-xl">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
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
        className="bg-gradient-to-b from-white to-emerald-50 py-24"
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-14 text-center text-4xl font-bold">
            Choose Your Portal
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { role: "patient", title: "Patient", desc: "Track health & predictions" },
              { role: "family", title: "Family", desc: "Monitor loved ones" },
              { role: "doctor", title: "Doctor", desc: "Manage patients" },
              { role: "admin", title: "Admin", desc: "System analytics" },
            ].map((item) => (
              <Link
                key={item.role}
                to={`/signup?role=${item.role}`}
              >
                <Card className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:scale-[1.03] hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>
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
