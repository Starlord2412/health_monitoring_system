import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AlertTriangle, Bell, Heart, Activity, X, CheckCheck, Eye, Filter, Search } from "lucide-react";
import { useState } from "react";

const mockAlerts = [
  {
    id: 1,
    patient: "Sarah Johnson",
    type: "BP Abnormal",
    message: "Blood pressure reading of 158/98 mmHg detected at 4:20 PM",
    severity: "critical",
    time: "10 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    patient: "Robert Wilson",
    type: "Irregular Heartbeat",
    message: "Heart rate fluctuation detected - ranging from 55 to 110 bpm",
    severity: "high",
    time: "25 minutes ago",
    icon: Heart,
  },
  {
    id: 3,
    patient: "Emily Davis",
    type: "High Blood Sugar",
    message: "Blood glucose level at 195 mg/dL, above target range",
    severity: "high",
    time: "1 hour ago",
    icon: Activity,
  },
  {
    id: 4,
    patient: "Michael Chen",
    type: "Medication Missed",
    message: "Patient missed scheduled insulin dose at 2:00 PM",
    severity: "warning",
    time: "2 hours ago",
    icon: Bell,
  },
  {
    id: 5,
    patient: "David Martinez",
    type: "Low Heart Rate",
    message: "Heart rate dropped to 52 bpm during rest period",
    severity: "warning",
    time: "3 hours ago",
    icon: Heart,
  },
];

const getSeverityColor = (severity) => {
  const colors = {
    critical: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
  };
  return colors[severity] || "";
};

const getIconColor = (severity) => {
  const colors = {
    critical: "text-red-600 bg-red-50",
    high: "text-orange-600 bg-orange-50",
    warning: "text-yellow-600 bg-yellow-50",
    info: "text-blue-600 bg-blue-50",
  };
  return colors[severity] || "";
};

const getCardBorderColor = (severity) => {
  const colors = {
    critical: "border-l-red-500",
    high: "border-l-orange-500",
    warning: "border-l-yellow-500",
    info: "border-l-blue-500",
  };
  return colors[severity] || "";
};

export function DoctorAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const handleDismiss = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    setDismissedAlerts([...dismissedAlerts, id]);
  };

  const handleMarkAsRead = (id) => {
    // You can add read status tracking here
    console.log("Marked as read:", id);
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === "all" || alert.severity === filter;
    const matchesSearch = alert.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const alertCounts = {
    all: alerts.length,
    critical: alerts.filter(a => a.severity === "critical").length,
    high: alerts.filter(a => a.severity === "high").length,
    warning: alerts.filter(a => a.severity === "warning").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                AI-Flagged Alerts
              </h1>
              <p className="text-slate-600 text-lg">Real-time health anomaly detection and monitoring</p>
            </div>
          </div>
        </div>

        {/* Filter Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${filter === "all" ? "ring-2 ring-emerald-500 shadow-lg" : ""}`}
            onClick={() => setFilter("all")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Total Alerts</p>
                  <p className="text-3xl font-bold text-slate-900">{alertCounts.all}</p>
                </div>
                <Bell className="w-8 h-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${filter === "critical" ? "ring-2 ring-red-500 shadow-lg" : ""}`}
            onClick={() => setFilter("critical")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Critical</p>
                  <p className="text-3xl font-bold text-red-600">{alertCounts.critical}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${filter === "high" ? "ring-2 ring-orange-500 shadow-lg" : ""}`}
            onClick={() => setFilter("high")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">High Priority</p>
                  <p className="text-3xl font-bold text-orange-600">{alertCounts.high}</p>
                </div>
                <Heart className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${filter === "warning" ? "ring-2 ring-yellow-500 shadow-lg" : ""}`}
            onClick={() => setFilter("warning")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Warnings</p>
                  <p className="text-3xl font-bold text-yellow-600">{alertCounts.warning}</p>
                </div>
                <Activity className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by patient name or alert type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")}>
                  <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`border-l-4 ${getCardBorderColor(alert.severity)} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-4 rounded-2xl ${getIconColor(alert.severity)} shadow-md`}>
                    <alert.icon className={`w-7 h-7`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{alert.type}</h3>
                          <Badge className={`${getSeverityColor(alert.severity)} font-semibold px-3 py-1`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-slate-600">
                          Patient: <span className="text-emerald-600">{alert.patient}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4 leading-relaxed">{alert.message}</p>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-slate-500">{alert.time}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all"
                        >
                          <CheckCheck className="w-4 h-4 mr-1" />
                          Mark as Read
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDismiss(alert.id)}
                          className="hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Dismiss
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {searchTerm || filter !== "all" ? "No matching alerts" : "All Clear!"}
              </h3>
              <p className="text-slate-600 mb-2">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No alerts at this time"}
              </p>
              <p className="text-sm text-slate-500">
                You'll be notified when anomalies are detected
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}