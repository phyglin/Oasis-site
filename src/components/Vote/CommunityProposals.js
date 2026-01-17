import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProposalCard from "./ProposalCard";

function CommunityProposals({
  proposals,
  onVote,
  isVerified,
  onPin,
  onSelectProposal,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const communityProposals = proposals.filter(
    (p) => !p.isDeveloper && !p.isCritical && p.status !== "petition" && p.status !== "passed" && p.status !== "rejected",
  );

  return (
    <div>
      <div className="px-4 mb-4">
        <div
          className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:glass-panel py-2 rounded-lg transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-indigo-400 shadow-sm">
                👥
              </span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-indigo-100">
                Active Community Votes
              </h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-indigo-500/20 dark:text-indigo-200 text-xs font-semibold rounded shadow-sm">
                {communityProposals.length}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-indigo-300/70">
              Proposals that have reached the signature threshold
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUp
                size={20}
                className="text-gray-500 dark:text-indigo-400"
              />
            ) : (
              <ChevronDown
                size={20}
                className="text-gray-500 dark:text-indigo-400"
              />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <>
          {communityProposals.length > 0 ? (
            <div className="space-y-4">
              {communityProposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onVote={onVote}
                  variant="default"
                  isVerified={isVerified}
                  onPin={onPin}
                  onSelect={onSelectProposal}
                />
              ))}
            </div>
          ) : (
            <div className="mx-4 p-8 bg-gray-50 dark:glass-panel border border-gray-200 dark:border-indigo-500/20 rounded-lg text-center transition-all duration-300">
              <p className="text-gray-500 dark:text-indigo-300/60">
                No active community votes at the moment.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CommunityProposals;
