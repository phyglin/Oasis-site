import React from "react";
import { Bell, Info, CheckCircle, AlertTriangle } from "lucide-react";

function NotificationsSection() {
  // Placeholder data
  const notifications = [
    {
      id: 1,
      type: "info",
      icon: Info,
      title: "Welcome to Oasis",
      message: "Get started by verifying your account to participate in voting.",
      time: "2h ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      icon: CheckCircle,
      title: "Proposal #105 Passed",
      message: "The community has voted to update the guidelines.",
      time: "1d ago",
      read: true,
    },
    {
      id: 3,
      type: "warning",
      icon: AlertTriangle,
      title: "Action Required",
      message: "Please review the updated Terms of Service.",
      time: "2d ago",
      read: true,
    },
  ];

  return (
    <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl">
      <div className="py-8 text-center border-b border-gray-200 dark:border-white/10 mb-6">
        <h2 className="text-4xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
          Notifications
        </h2>
        <p className="text-gray-600 dark:text-indigo-300 text-sm">
          Stay updated with community activity
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="space-y-4">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  n.read
                    ? "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5"
                    : "bg-white dark:glass-panel border-gray-200 dark:border-white/20 shadow-sm"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`mt-1 p-2 rounded-lg ${
                      n.type === "info"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300"
                        : n.type === "success"
                          ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300"
                          : "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3
                        className={`font-semibold ${
                          n.read
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {n.title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-indigo-200/70">
                      {n.message}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="mt-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-indigo-500"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-sm">
              <Bell size={16} />
              <span>No more notifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsSection;
