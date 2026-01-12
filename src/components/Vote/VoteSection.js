import React, { useState } from "react";
import CriticalVotes from "./CriticalVotes";
import DeveloperProposals from "./DeveloperProposals";
import CommunityProposals from "./CommunityProposals";
import ProposalDetails from "./ProposalDetails";

function VoteSection({
  proposals,
  onVote,
  showNewProposal,
  setShowNewProposal,
  newProposal,
  setNewProposal,
  onSubmitProposal,
  isVerified,
  onPin,
}) {
  const [selectedProposal, setSelectedProposal] = useState(null);

  if (selectedProposal) {
    return (
      <div className="min-h-full bg-white dark:bg-[#0f172a]/30 dark:backdrop-blur-md">
        <ProposalDetails
          proposal={selectedProposal}
          onVote={onVote}
          onBack={() => setSelectedProposal(null)}
          isVerified={isVerified}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white dark:bg-[#0f172a]/30 dark:backdrop-blur-md">
      <div className="py-8 text-center border-b border-gray-200 dark:border-indigo-500/20 mb-6">
        <h2 className="text-4xl font-display font-bold text-gray-800 dark:text-indigo-100 mb-2">
          Community Voting
        </h2>
        <p className="text-gray-600 dark:text-indigo-300 text-sm">
          Vote on proposals to shape the future of Oasis
        </p>
      </div>

      {!isVerified && (
        <div className="mx-4 mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-lg flex items-center justify-center gap-2 text-amber-800 dark:text-amber-200">
          <span>⚠️</span>
          <span className="font-medium">
            Verification required to vote and submit proposals
          </span>
        </div>
      )}

      {/* 1. Critical Votes First */}
      <CriticalVotes
        proposals={proposals}
        onVote={isVerified ? onVote : () => {}}
        isVerified={isVerified}
        onPin={onPin}
        onSelectProposal={setSelectedProposal}
      />

      {/* 2. Developer Proposals Second */}
      <DeveloperProposals
        proposals={proposals}
        onVote={isVerified ? onVote : () => {}}
        isVerified={isVerified}
        onPin={onPin}
        onSelectProposal={setSelectedProposal}
      />

      {/* 3. Community Proposals Third */}
      <CommunityProposals
        proposals={proposals}
        onVote={isVerified ? onVote : () => {}}
        showNewProposal={showNewProposal}
        setShowNewProposal={setShowNewProposal}
        newProposal={newProposal}
        setNewProposal={setNewProposal}
        onSubmit={onSubmitProposal}
        isVerified={isVerified}
        onPin={onPin}
        onSelectProposal={setSelectedProposal}
      />
    </div>
  );
}

export default VoteSection;
