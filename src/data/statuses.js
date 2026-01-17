import React from "react";
import {
  VenetianMask,
  UserCheck,
  BadgeCheck,
  Landmark,
  Building2,
} from "lucide-react";

export const statuses = {
  anonymous: {
    icon: <VenetianMask size={18} />,
    label: "Anonymous",
    color: "text-gray-500 dark:text-gray-400",
  },
  real: {
    icon: <UserCheck size={18} />,
    label: "Real Person",
    color: "text-gray-700 dark:text-gray-300",
  },
  public: {
    icon: <BadgeCheck size={18} />,
    label: "Public Person",
    color: "text-gray-900 dark:text-gray-100",
  },
  institution: {
    icon: <Landmark size={18} />,
    label: "Institution",
    color: "text-gray-700 dark:text-gray-300",
  },
  company: {
    icon: <Building2 size={18} />,
    label: "Company",
    color: "text-gray-700 dark:text-gray-300",
  },
};

export const categoryColors = {
  feature:
    "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20",
  terms:
    "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20",
  constitution:
    "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20",
  leadership:
    "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20",
  policy:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
  other:
    "bg-gray-500/10 text-gray-700 dark:text-gray-300 border border-gray-500/20",
};

export const statusColors = {
  open: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
  voting:
    "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20",
  "under-review":
    "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border border-yellow-500/20",
  petition:
    "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20",
  passed:
    "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20",
  approved:
    "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20",
  rejected:
    "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20",
};

export const noteCategories = {
  misinformation: {
    label: "Misinformation",
    color: "bg-gray-50 dark:bg-white/5",
    accentColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-500",
    icon: "⚠️",
  },
  "ai-generated": {
    label: "AI Generated",
    color: "bg-gray-50 dark:bg-white/5",
    accentColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-500",
    icon: "🤖",
  },
  "manipulated-media": {
    label: "Manipulated Media",
    color: "bg-gray-50 dark:bg-white/5",
    accentColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-500",
    icon: "✂️",
  },
  "missing-context": {
    label: "Missing Context",
    color: "bg-gray-50 dark:bg-white/5",
    accentColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500",
    icon: "ℹ️",
  },
  context: {
    label: "Additional Context",
    color: "bg-gray-50 dark:bg-white/5",
    accentColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500",
    icon: "📝",
  },
};
