import React, { useState } from "react";
import { ChevronDown, ChevronUp, ScrollText } from "lucide-react";
import ProposalCard from "./ProposalCard";

function PetitionSection({
  proposals,
  onSign,
  showNewProposal,
  setShowNewProposal,
  newProposal,
  setNewProposal,
  onSubmit,
  isVerified,
  onPin,
  onSelectProposal,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const petitions = proposals.filter((p) => p.status === "petition");

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
                <ScrollText size={20} />
              </span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-indigo-100">
                Proposals seeking Referendum
              </h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-indigo-500/20 dark:text-indigo-200 text-xs font-semibold rounded shadow-sm">
                {petitions.length}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-indigo-300/70">
              Sign petitions to bring them to a vote (requires 60% active user
              support)
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isVerified && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNewProposal(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.4)] text-white rounded-lg text-sm font-medium transition-all"
              >
                + New Proposal
              </button>
            )}
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
          {/* New Proposal Form */}
          {showNewProposal && (
            <div className="mx-4 mb-4 p-4 bg-white dark:glass-panel border border-gray-200 dark:border-indigo-500/20 rounded-lg shadow-sm transition-all duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-indigo-100 mb-3">
                Submit New Petition
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProposal.category}
                    onChange={(e) =>
                      setNewProposal({
                        ...newProposal,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 focus:border-blue-500 dark:focus:border-indigo-500 dark:text-indigo-100"
                  >
                    <option value="feature">Feature Request</option>
                    <option value="terms">Terms & Conditions</option>
                    <option value="constitution">Constitution Amendment</option>
                    <option value="leadership">Leadership/CEO Election</option>
                    <option value="policy">Policy Change</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newProposal.title}
                    onChange={(e) =>
                      setNewProposal({ ...newProposal, title: e.target.value })
                    }
                    placeholder="Brief, descriptive title"
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 focus:border-blue-500 dark:focus:border-indigo-500 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={newProposal.description}
                    onChange={(e) =>
                      setNewProposal({
                        ...newProposal,
                        description: e.target.value,
                      })
                    }
                    placeholder="Explain your proposal in detail..."
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 focus:border-blue-500 dark:focus:border-indigo-500 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-400/50"
                    rows="4"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onSubmit}
                    disabled={
                      !newProposal.title.trim() ||
                      !newProposal.description.trim()
                    }
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:bg-gray-400 dark:disabled:bg-indigo-900/50 dark:disabled:text-indigo-400/30 dark:disabled:shadow-none text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Start Petition
                  </button>
                  <button
                    onClick={() => {
                      setShowNewProposal(false);
                      setNewProposal({
                        title: "",
                        description: "",
                        category: "feature",
                      });
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-indigo-500/10 hover:bg-gray-300 dark:hover:bg-indigo-500/20 text-gray-700 dark:text-indigo-200 border border-transparent dark:border-indigo-500/30 rounded-lg text-sm font-medium transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {petitions.length > 0 ? (
            <div className="space-y-4">
              {petitions.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onSign={onSign}
                  variant="default"
                  isVerified={isVerified}
                  onPin={onPin}
                  onSelect={onSelectProposal}
                />
              ))}
            </div>
          ) : (
            !showNewProposal && (
              <div className="mx-4 p-8 bg-gray-50 dark:glass-panel border border-gray-200 dark:border-indigo-500/20 rounded-lg text-center transition-all duration-300">
                <p className="text-gray-500 dark:text-indigo-300/60">
                  No active petitions. Start one to gather support!
                </p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default PetitionSection;
