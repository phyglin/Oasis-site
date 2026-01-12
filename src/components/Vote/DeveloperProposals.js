import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProposalCard from "./ProposalCard";

function DeveloperProposals({
  proposals,
  onVote,
  isVerified,
  onPin,
  onSelectProposal,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const devProposals = proposals.filter((p) => p.isDeveloper);

  if (devProposals.length === 0) return null;

  return (
    <div className="mb-8">
      <div
        className="px-4 mb-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 py-2 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 dark:text-purple-400">🏢</span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Developer Proposals
              </h3>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-xs font-semibold rounded">
                {devProposals.length}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ideas from the Oasis development team
            </p>
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
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {devProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={onVote}
              variant="developer"
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

export default DeveloperProposals;
