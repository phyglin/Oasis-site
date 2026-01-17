import React, { useState } from "react";
import { Vote, FileText, CheckCircle, Clock } from "lucide-react";
import CriticalVotes from "./CriticalVotes";
import DeveloperProposals from "./DeveloperProposals";
import CommunityProposals from "./CommunityProposals";
import PetitionSection from "./PetitionSection";
import ProposalHistory from "./ProposalHistory";
import ProposalDetails from "./ProposalDetails";

function VoteSection({
  proposals,
  onVote,
  onSign,
  showNewProposal,
  setShowNewProposal,
  newProposal,
  setNewProposal,
  onSubmitProposal,
  isVerified,
  onPin,
}) {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [activeTab, setActiveTab] = useState("under-vote"); // 'under-vote', 'proposals'
  const [proposalsSubTab, setProposalsSubTab] = useState("active"); // 'active', 'historic'

  if (selectedProposal) {
    return (
      <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl">
        <ProposalDetails
          proposal={selectedProposal}
          onVote={onVote}
          onSign={onSign}
          onBack={() => setSelectedProposal(null)}
          isVerified={isVerified}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl pb-8">
      <div className="py-8 text-center border-b border-gray-200 dark:border-white/10 mb-6">
        <h2 className="text-4xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
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

      {/* Controls Container */}
      <div className="px-6 mb-6">
        <div className="flex flex-col items-center gap-4">
          {/* Main Tab Slider */}
          <div className="flex bg-gray-100 dark:bg-indigo-900/20 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("under-vote")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "under-vote"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
              }`}
            >
              <Vote size={16} />
              Under Vote
            </button>
            <button
              onClick={() => setActiveTab("proposals")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "proposals"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
              }`}
            >
              <FileText size={16} />
              Proposals
            </button>
          </div>

          {/* Sub-Tab Slider (Only visible when 'proposals' is active) */}
          {activeTab === "proposals" && (
            <div className="flex bg-gray-100 dark:bg-indigo-900/20 p-1 rounded-lg animate-fade-in-down">
              <button
                onClick={() => setProposalsSubTab("active")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  proposalsSubTab === "active"
                    ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
                }`}
              >
                <CheckCircle size={16} />
                Active
              </button>
              <button
                onClick={() => setProposalsSubTab("historic")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  proposalsSubTab === "historic"
                    ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
                }`}
              >
                <Clock size={16} />
                Historic
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-8">
        {activeTab === "under-vote" && (
          <div className="animate-fade-in">
            {/* 1. Critical Votes */}
            <CriticalVotes
              proposals={proposals}
              onVote={isVerified ? onVote : () => {}}
              isVerified={isVerified}
              onPin={onPin}
              onSelectProposal={setSelectedProposal}
            />

            {/* 2. Developer Proposals */}
            <DeveloperProposals
              proposals={proposals}
              onVote={isVerified ? onVote : () => {}}
              isVerified={isVerified}
              onPin={onPin}
              onSelectProposal={setSelectedProposal}
            />

            {/* 3. Community Proposals (Active Votes) */}
            <CommunityProposals
              proposals={proposals}
              onVote={isVerified ? onVote : () => {}}
              isVerified={isVerified}
              onPin={onPin}
              onSelectProposal={setSelectedProposal}
            />
          </div>
        )}

        {activeTab === "proposals" && proposalsSubTab === "active" && (
          <div className="animate-fade-in">
            <PetitionSection
              proposals={proposals}
              onSign={isVerified ? onSign : () => {}}
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
        )}

        {activeTab === "proposals" && proposalsSubTab === "historic" && (
          <div className="animate-fade-in">
            <ProposalHistory
              proposals={proposals}
              onSelectProposal={setSelectedProposal}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VoteSection;

