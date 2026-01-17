import React from "react";
import {
  Home,
  CheckCircle,
  Vote,
  User,
  Settings,
  Scale,
  Book,
  Bell,
} from "lucide-react";

const menuItems = [
  {
    id: "get-verified",
    icon: CheckCircle,
    label: "Get verified",
    special: true,
  },
  { id: "public-square", icon: Home, label: "Public square" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  {
    id: "rules",
    icon: Book,
    label: "Rules",
    subItems: [
      { id: "constitution", label: "Constitution" },
      { id: "terms", label: "Terms of Service" },
    ],
  },
  { id: "vote", icon: Vote, label: "Vote" },
  { id: "judge", icon: Scale, label: "Judge" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "settings", icon: Settings, label: "Settings" },
];

function Sidebar({ activeMenu, onMenuChange, isVerified }) {
  return (
    <div className="w-64 bg-gray-100 dark:bg-black/20 dark:backdrop-blur-xl border-x border-gray-200 dark:border-white/10 p-6 flex flex-col transition-colors duration-300">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="url(#water-gradient)"
              opacity="0.3"
            />

            <circle
              cx="24"
              cy="24"
              r="18"
              fill="none"
              stroke="url(#water-gradient)"
              strokeWidth="3"
            />

            <line
              x1="32"
              y1="28"
              x2="32"
              y2="18"
              className="stroke-[#8B4513] dark:stroke-amber-600"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M32 18 Q36 14 38 16"
              className="stroke-[#2D5016] dark:stroke-emerald-400"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            <path
              d="M32 18 Q34 12 36 12"
              className="stroke-[#2D5016] dark:stroke-emerald-400"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            <path
              d="M32 18 Q28 14 26 16"
              className="stroke-[#2D5016] dark:stroke-emerald-400"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            <path
              d="M32 18 Q30 12 28 12"
              className="stroke-[#2D5016] dark:stroke-emerald-400"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            <path
              d="M32 18 Q32 10 32 9"
              className="stroke-[#2D5016] dark:stroke-emerald-400"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            <circle cx="28" cy="26" r="2" fill="#6366F1" />

            <path
              d="M28 28 L28 32 L26 35"
              stroke="#6366F1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M28 32 L30 35"
              stroke="#6366F1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M28 29 L25 30"
              stroke="#6366F1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M28 29 L31 28"
              stroke="#6366F1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <ellipse
              cx="20"
              cy="30"
              rx="8"
              ry="2"
              fill="url(#water-gradient)"
              opacity="0.4"
            />

            <ellipse
              cx="18"
              cy="32"
              rx="6"
              ry="1.5"
              fill="url(#water-gradient)"
              opacity="0.3"
            />

            <defs>
              <linearGradient
                id="water-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3B82F6" />

                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

          <h1 className="text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            asis
          </h1>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems
          .filter((item) => !(isVerified && item.id === "get-verified"))
          .map((item) => {
            const Icon = item.icon;
            const isActive =
              activeMenu === item.id ||
              (item.subItems && item.subItems.some((s) => s.id === activeMenu));

            if (item.subItems) {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => onMenuChange(item.subItems[0].id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                      isActive
                        ? "border-l-2 border-indigo-600 dark:border-white bg-gray-50 dark:bg-white/10 text-indigo-900 dark:text-white"
                        : "border-l-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                  {isActive && (
                    <div className="ml-4 pl-4 border-l border-gray-200 dark:border-white/10 space-y-1 my-1">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => onMenuChange(sub.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            activeMenu === sub.id
                              ? "text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-white/5 font-medium"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onMenuChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                  item.special
                    ? activeMenu === item.id
                      ? "bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/30"
                      : "text-amber-800 dark:text-amber-300/80 hover:bg-amber-500/10 hover:text-amber-900 dark:hover:text-amber-200"
                    : activeMenu === item.id
                      ? "border-l-2 border-indigo-600 dark:border-white bg-gray-50 dark:bg-white/10 text-indigo-900 dark:text-white"
                      : "border-l-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
      </nav>
    </div>
  );
}

export default Sidebar;
