import React from "react";
import { ArrowLeft, Check, X, Clock } from "lucide-react";
import { statuses, categoryColors, statusColors } from "../../data/statuses";

function ProposalDetails({ proposal, onVote, onBack, isVerified }) {
  // Mock data for detailed sections since it's not in the initial data structure
  const details = {
    changes:
      "We are updating how the platform handles this feature to make it more user-friendly. The interface will be streamlined, and the underlying process will be faster.",
    reasoning:
      "Community feedback has indicated that the current process is confusing and slow. This update aims to solve those specific pain points.",
    impact:
      "Users will see a new interface for this feature. No downtime is expected, but you might need to refresh the page once the update is live.",
    ...proposal,
  };

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Proposals
      </button>

      <div className="bg-white dark:bg-black/20 rounded-xl p-8 border border-gray-200 dark:border-indigo-500/20">
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[proposal.category]}`}
          >
            {proposal.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[proposal.status]}`}
          >
            {proposal.status.replace("-", " ")}
          </span>
        </div>

        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-indigo-100 mb-4">
          {proposal.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-indigo-300/60 mb-8 border-b border-gray-200 dark:border-indigo-500/20 pb-6">
          <div className="flex items-center gap-2">
            <span className={statuses[proposal.authorStatus].color}>
              {statuses[proposal.authorStatus].icon}
            </span>
            <span>{proposal.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{proposal.createdAt} ago</span>
          </div>
          {proposal.votingDeadline && (
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <span>⏰ {proposal.votingDeadline}</span>
            </div>
          )}
        </div>

        <div className="space-y-8 mb-10">
          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-indigo-100 mb-3">
              Description
            </h3>
            <p className="text-gray-700 dark:text-indigo-100/80 leading-relaxed">
              {proposal.description}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-indigo-100 mb-3">
              What is changing?
            </h3>
            <div className="bg-gray-50 dark:bg-indigo-900/10 p-4 rounded-lg border border-gray-200 dark:border-indigo-500/10 text-gray-700 dark:text-indigo-200/90 text-sm">
              {details.changes}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-indigo-100 mb-3">
              Why is this needed?
            </h3>
            <p className="text-gray-700 dark:text-indigo-100/80 leading-relaxed">
              {details.reasoning}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-indigo-100 mb-3">
              Consequences
            </h3>
            <p className="text-gray-700 dark:text-indigo-100/80 leading-relaxed">
              {details.impact}
            </p>
          </section>
        </div>

        <div className="flex items-center justify-between bg-gray-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-gray-200 dark:border-indigo-500/20">
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-indigo-100 mb-1">
              Cast Your Vote
            </h4>
            <p className="text-sm text-gray-500 dark:text-indigo-300/60">
              {isVerified
                ? "Your vote is recorded on-chain."
                : "Verification required to participate."}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onVote(proposal.id, "up")}
              disabled={!isVerified}
              className="flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={20} />
              <span>Yes ({proposal.upvotes})</span>
            </button>
            <button
              onClick={() => onVote(proposal.id, "down")}
              disabled={!isVerified}
              className="flex items-center gap-2 px-6 py-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={20} />
              <span>No ({proposal.downvotes})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;
