import React from "react";
import {
  Gavel,
  Clock,
  Pin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
} from "lucide-react";

function CaseCard({ caseData, onClick, onPin, isVerified }) {
  const isResolved = caseData.status === "completed";

  // Status visual logic
  let statusConfig = {
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-500/10 border border-amber-500/20",
    icon: Clock,
    label: "Active Trial",
  };

  if (isResolved) {
    if (caseData.finalVerdict === "upheld") {
      statusConfig = {
        color: "text-red-700 dark:text-red-300",
        bg: "bg-red-500/10 border border-red-500/20",
        icon: Gavel,
        label: "Violation Upheld",
      };
    } else {
      statusConfig = {
        color: "text-emerald-700 dark:text-emerald-300",
        bg: "bg-emerald-500/10 border border-emerald-500/20",
        icon: CheckCircle2,
        label: "Exonerated",
      };
    }
  }

  const ContentIcon =
    caseData.contentType === "post" ? FileText : MessageSquare;

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col p-5 bg-white dark:glass-panel border border-gray-200 dark:border-indigo-500/20 rounded-xl hover:shadow-md hover:bg-gray-50 dark:hover:bg-indigo-500/5 transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-mono font-bold bg-gray-100 dark:bg-indigo-500/10 text-gray-600 dark:text-indigo-200 rounded-md border border-gray-200 dark:border-indigo-500/20">
            {caseData.id}
          </span>
          <span
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-md ${statusConfig.bg} ${statusConfig.color}`}
          >
            <statusConfig.icon size={14} />
            {statusConfig.label}
          </span>
        </div>
        {isVerified && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin && onPin(caseData);
            }}
            className="text-gray-400 hover:text-indigo-600 dark:text-indigo-300/40 dark:hover:text-indigo-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-indigo-500/20 opacity-0 group-hover:opacity-100"
            title="Pin this case"
          >
            <Pin size={16} />
          </button>
        )}
      </div>

      {/* Content Snippet */}
      <div className="mb-6 flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-indigo-300/60 mb-2">
          <ContentIcon size={14} />
          <span className="capitalize">{caseData.contentType}</span>
          <span>•</span>
          <span>Reported: {caseData.reportedUser}</span>
        </div>
        <div className="relative">
          <p className="text-sm font-medium text-gray-800 dark:text-indigo-100 line-clamp-3 leading-relaxed">
            "{caseData.reportedContent}"
          </p>
          <div className="absolute bottom-0 right-0 w-1/4 h-full bg-gradient-to-r from-transparent to-white dark:to-[#151c35] pointer-events-none opacity-50"></div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-indigo-500/10 text-xs text-gray-500 dark:text-indigo-300/60">
        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500/80">
          <AlertTriangle size={14} />
          <span className="font-medium">Sec. {caseData.violatedSection}</span>
        </div>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {caseData.createdAt} ago
        </span>
      </div>
    </div>
  );
}

export default CaseCard;
