import React from "react";
import { Check, X, Pin } from "lucide-react";
import { statuses, categoryColors, statusColors } from "../../data/statuses";

function ProposalCard({
  proposal,
  onVote,
  onPin,
  onSelect,
  variant = "default",
  isVerified = true,
}) {
  const isHighlighted = variant === "critical";
  const isDeveloper = variant === "developer";

  const containerClass = isHighlighted
    ? "bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-lg p-4 mx-4 transition-all duration-300 hover:bg-red-500/10 dark:hover:bg-red-500/20 hover:shadow-md hover:scale-[1.01]"
    : isDeveloper
      ? "bg-gradient-to-r from-purple-500/5 to-blue-500/5 dark:glass-panel dark:bg-gradient-to-r dark:from-purple-900/20 dark:to-blue-900/20 border-l-4 border-purple-500 dark:border-l-purple-500 dark:border-t-indigo-500/20 dark:border-r-indigo-500/20 dark:border-b-indigo-500/20 rounded-lg p-4 mx-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
      : "bg-white dark:glass-panel border border-gray-200 dark:border-indigo-500/20 rounded-lg p-4 mx-4 shadow-sm transition-all duration-300 hover:bg-gray-50 dark:hover:bg-indigo-500/10 hover:shadow-md hover:scale-[1.01]";

  const voteButtonClass = {
    up: "flex items-center gap-2 px-3 py-2 border border-transparent hover:border-green-500/30 hover:bg-green-500/5 text-gray-600 dark:text-indigo-300 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed",
    down: "flex items-center gap-2 px-3 py-2 border border-transparent hover:border-red-500/30 hover:bg-red-500/5 text-gray-600 dark:text-indigo-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <div
      className={`${containerClass} cursor-pointer`}
      onClick={() => onSelect && onSelect(proposal)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4
              className={
                isHighlighted
                  ? "font-bold text-gray-900 dark:text-red-100 dark:text-glow"
                  : "font-semibold text-gray-900 dark:text-indigo-100"
              }
            >
              {proposal.title}
            </h4>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[proposal.category]}`}
            >
              {proposal.category}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs ${isHighlighted ? "font-bold" : "font-medium"} ${statusColors[proposal.status]}`}
            >
              {isHighlighted && "🔴 "}
              {proposal.status.replace("-", " ").toUpperCase()}
            </span>
          </div>
          <div className="mb-2 text-xs font-semibold text-gray-600 dark:text-indigo-200 bg-gray-100 dark:bg-indigo-500/10 border border-gray-200 dark:border-indigo-500/20 inline-block px-2 py-1 rounded">
            ⏰ {proposal.votingDeadline || "3 days remaining"}
          </div>
          <p
            className={`text-sm text-gray-${isHighlighted ? "800" : "700"} dark:text-indigo-${isHighlighted ? "100" : "200/80"} mb-3 ${isHighlighted ? "font-medium" : ""}`}
          >
            {proposal.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-indigo-300/60">
            <span className="flex items-center gap-1">
              by {proposal.author}
              <span className={statuses[proposal.authorStatus].color}>
                {statuses[proposal.authorStatus].icon}
              </span>
            </span>
            <span>•</span>
            <span>{proposal.createdAt}</span>
          </div>
        </div>
        {isVerified && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin && onPin(proposal);
            }}
            className="text-gray-400 hover:text-indigo-500 dark:text-indigo-300/40 dark:hover:text-indigo-300 transition-colors ml-4 self-start opacity-50 hover:opacity-100"
            title="Pin this proposal"
          >
            <Pin size={16} />
          </button>
        )}
      </div>
      <div
        className={`flex items-center gap-4 pt-3 border-t ${isHighlighted ? "border-t-2 border-red-200 dark:border-red-500/30" : "border-gray-200 dark:border-indigo-500/20"}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVote(proposal.id, "up");
          }}
          className={voteButtonClass.up}
          disabled={!isVerified}
          title={!isVerified ? "Verification required to vote" : "Vote Yes"}
        >
          <Check size={18} />
          <span
            className={`text-sm ${isHighlighted ? "font-bold" : "font-medium"}`}
          >
            {proposal.upvotes}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVote(proposal.id, "down");
          }}
          className={voteButtonClass.down}
          disabled={!isVerified}
          title={!isVerified ? "Verification required to vote" : "Vote No"}
        >
          <X size={18} />
          <span
            className={`text-sm ${isHighlighted ? "font-bold" : "font-medium"}`}
          >
            {proposal.downvotes}
          </span>
        </button>
        <div className="flex-1"></div>
        <span
          className={`text-${isHighlighted ? "sm" : "xs"} ${isHighlighted ? "font-bold" : ""} text-gray-${isHighlighted ? "700" : "500"} dark:text-indigo-${isHighlighted ? "200" : "300/60"}`}
        >
          Net: {proposal.upvotes - proposal.downvotes}
        </span>
      </div>
    </div>
  );
}

export default ProposalCard;
