import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProposalCard from "./ProposalCard";

function CriticalVotes({
  proposals,
  onVote,
  isVerified,
  onPin,
  onSelectProposal,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const criticalProposals = proposals.filter((p) => p.isCritical);

  if (criticalProposals.length === 0) return null;

  return (
    <div className="mb-8">
      <div
        className="px-4 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 py-2 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Critical Community Votes
            </h3>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 text-xs font-semibold rounded">
              {criticalProposals.length}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown
              size={20}
              className="text-gray-500 dark:text-gray-400"
            />
          )}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          These proposals require immediate community attention and voting
        </p>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {criticalProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={onVote}
              variant="critical"
              isVerified={isVerified}
              onPin={onPin}
              onSelect={onSelectProposal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CriticalVotes;
