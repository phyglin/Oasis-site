import React, { useState } from "react";
import { Pin, Check, Gavel, ChevronDown, ChevronUp, SlidersHorizontal, CheckSquare, Square } from "lucide-react";
import { statuses } from "../data/statuses";

function FilterPanel({
  selectedStatuses,
  onToggleStatus,
  onSelectAll,
  onSaveFilter,
  postsCount,
  filteredCount,
  isVerified,
  activeMenu = "public-square",
  pinnedItems = [],
  onMenuChange,
}) {
  const showFilters = activeMenu === "public-square";
  const [expandedCase, setExpandedCase] = useState(null);

  const toggleCaseExpansion = (e, caseId) => {
    e.stopPropagation();
    setExpandedCase(expandedCase === caseId ? null : caseId);
  };

  return (
    <div className="w-80 bg-gray-100 dark:bg-black/20 dark:backdrop-blur-xl border-x border-gray-200 dark:border-white/10 flex flex-col h-screen sticky top-0 transition-colors duration-300">
      {showFilters && (
        <div className="p-6 pb-0 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 dark:text-indigo-100 text-lg flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gray-500 dark:text-gray-400" />
              Feed Filters
            </h3>
            <div className="flex gap-2">
              <button
                onClick={onSelectAll}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-white transition-colors px-2 py-1 rounded hover:bg-indigo-50 dark:hover:bg-white/10"
              >
                Select All
              </button>
              <button
                onClick={onSaveFilter}
                className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Save
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {Object.entries(statuses).map(([key, status]) => {
              const isSelected = selectedStatuses[key];
              return (
                <button
                  key={key}
                  onClick={() => onToggleStatus(key)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group border ${
                    isSelected
                      ? "bg-white dark:bg-white/10 border-gray-200 dark:border-white/10 shadow-sm"
                      : "bg-transparent border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/5"
                  }`}
                >
                  <span className={`${isSelected ? status.color : "text-gray-400 dark:text-gray-500"}`}>
                    {status.icon}
                  </span>
                  
                  <span
                    className={`text-sm font-medium flex-1 text-left ${
                      isSelected
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    }`}
                  >
                    {status.label}
                  </span>

                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Active Posts</span>
            <span className="font-mono bg-gray-200 dark:bg-white/10 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
              {filteredCount} / {postsCount}
            </span>
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto p-6 ${showFilters ? "pt-6" : ""}`}>
        {!isVerified ? (
          <>
            <h3 className="font-bold text-gray-800 dark:text-indigo-100 mb-2">
              Why Verify?
            </h3>
            <p className="text-sm text-gray-600 dark:text-indigo-300/80 mb-4">
              Verification grants you the right to vote on proposals and
              participate in the community justice system.
            </p>
            <button
              onClick={() => onMenuChange("get-verified")}
              className="w-full px-4 py-2 bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200 dark:border dark:border-amber-500/30 dark:shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:bg-amber-200 dark:hover:bg-amber-500/30 rounded-lg text-sm font-medium transition-all"
            >
              Get Verified
            </button>
          </>
        ) : (
          <>
            <h3 className="font-bold text-gray-800 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Pin size={18} className="text-indigo-600 dark:text-indigo-400" />
              Active Decisions
            </h3>
            <div className="space-y-3">
              {pinnedItems.map((item) => {
                const isCase = !!item.reportedUser;

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-white/30 transition-colors cursor-pointer group"
                  >
                    {isCase ? (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-red-600 dark:text-rose-400 flex items-center gap-1">
                            <Gavel size={12} /> TRIAL
                          </span>
                          <span className="text-xs text-gray-500 dark:text-indigo-300/60">
                            Case {item.id}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-indigo-100 group-hover:text-blue-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-2">
                          "{item.reportedContent}"
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-indigo-300/60">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          Jurors deliberation
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                            <Pin size={12} /> PINNED
                          </span>
                          <span className="text-xs text-gray-500 dark:text-indigo-300/60">
                            Proposal
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-indigo-100 group-hover:text-blue-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-2">
                          {item.title}
                        </p>
                        <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-green-500"
                            style={{
                              width: `${(item.upvotes / (item.upvotes + item.downvotes || 1)) * 100}%`,
                            }}
                          ></div>
                          <div className="h-full bg-red-500 flex-1"></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs font-medium">
                          <span className="text-green-600 dark:text-green-400">
                            {Math.round(
                              (item.upvotes /
                                (item.upvotes + item.downvotes || 1)) *
                                100,
                            )}
                            % Yes
                          </span>
                          <span className="text-red-600 dark:text-red-400">
                            {Math.round(
                              (item.downvotes /
                                (item.upvotes + item.downvotes || 1)) *
                                100,
                            )}
                            % No
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              <div className="p-3 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-white/30 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Check size={12} /> VOTING
                  </span>
                  <span className="text-xs text-gray-500 dark:text-indigo-300/60">
                    Proposal
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-indigo-100 group-hover:text-blue-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-2">
                  Proposal #105: Update Community Guidelines for AI Art
                </p>
                <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-500 w-[70%]"></div>
                  <div className="h-full bg-red-500 w-[15%]"></div>
                </div>
                <div className="mt-1 flex justify-between text-xs font-medium">
                  <span className="text-green-600 dark:text-green-400">
                    70% Yes
                  </span>
                  <span className="text-gray-500 dark:text-indigo-300/60">
                    4h left
                  </span>
                  <span className="text-red-600 dark:text-red-400">15% No</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-white/30 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                    <Gavel size={12} /> TRIAL
                  </span>
                  <span className="text-xs text-gray-500 dark:text-indigo-300/60">
                    Case
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-indigo-100 group-hover:text-blue-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-2">
                  Case #495: Impersonation of Public Official
                </p>
                
                {/* Groups Display */}
                <div className="mt-3">
                  {(() => {
                    const groupsData = [
                      { 
                        id: 1, 
                        name: "Group 1", 
                        votes: [
                          { v: 1, reason: "Clear violation." }, { v: 1, reason: "Agreed." }, { v: 1, reason: "Violation." }, 
                          { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, 
                          { v: 1, reason: "Violation." }, { v: 2, reason: "Disagree." }, { v: 2, reason: "Disagree." }, 
                          { v: 1, reason: "Violation." }, { v: 0, reason: "Pending" }, { v: 0, reason: "Pending" }, 
                          { v: 0, reason: "Pending" }, { v: 0, reason: "Pending" }, { v: 0, reason: "Pending" }
                        ], 
                        status: "Deliberating" 
                      },
                      { 
                        id: 2, 
                        name: "Group 2", 
                        votes: [
                          { v: 1, reason: "Violation." }, { v: 1, reason: "Yes, suspend." }, { v: 2, reason: "Satire." }, 
                          { v: 2, reason: "Context matters." }, { v: 1, reason: "Leaning yes." }, { v: 1, reason: "Yes." }, 
                          { v: 2, reason: "No." }, { v: 2, reason: "No." }, { v: 1, reason: "Yes." }, 
                          { v: 1, reason: "Yes." }, { v: 2, reason: "No." }, { v: 1, reason: "Yes." }, 
                          { v: 0, reason: "Pending" }, { v: 0, reason: "Pending" }, { v: 0, reason: "Pending" }
                        ], 
                        status: "Split" 
                      },
                      { 
                        id: 3, 
                        name: "Group 3", 
                        votes: [
                          { v: 2, reason: "Joke." }, { v: 2, reason: "Not a violation." }, { v: 2, reason: "Free speech." }, 
                          { v: 2, reason: "No history." }, { v: 2, reason: "Agreed." }, { v: 2, reason: "Safe." }, 
                          { v: 2, reason: "No." }, { v: 2, reason: "No." }, { v: 2, reason: "No." }, 
                          { v: 2, reason: "No." }, { v: 2, reason: "No." }, { v: 2, reason: "No." }, 
                          { v: 2, reason: "No." }, { v: 2, reason: "No." }, { v: 0, reason: "Pending" }
                        ], 
                        status: "Unanimous No", 
                        isUserGroup: true 
                      },
                      { 
                        id: 4, 
                        name: "Group 4", 
                        votes: [
                          { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, 
                          { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, 
                          { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, 
                          { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, 
                          { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }, { v: 1, reason: "Violation." }
                        ], 
                        status: "Unanimous Yes" 
                      },
                      { 
                        id: 5, 
                        name: "Group 5", 
                        votes: Array(15).fill({ v: 0, reason: "Pending..." }), 
                        status: "Waiting" 
                      },
                    ];

                    const groupsToShow = expandedCase === 495 ? groupsData : groupsData.filter(g => g.isUserGroup);

                    return (
                      <>
                        <div className={`space-y-3 ${expandedCase === 495 ? "pt-3 border-t border-gray-200 dark:border-white/10" : ""}`}>
                          {groupsToShow.map((group) => (
                            <div key={group.id} className={`flex flex-col gap-1 ${group.isUserGroup && expandedCase === 495 ? "bg-indigo-50 dark:bg-indigo-500/20 p-2 rounded -mx-2 border border-indigo-100 dark:border-indigo-500/30" : ""}`}>
                              <div className="flex justify-between items-center text-xs">
                                <span className={`font-medium ${group.isUserGroup ? "text-indigo-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300"}`}>
                                  {group.name} {group.isUserGroup && <span className="text-[10px] opacity-70">(You)</span>}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">{group.status}</span>
                              </div>
                              <div className="flex gap-1">
                                {group.votes.map((vote, i) => (
                                  <div
                                    key={i}
                                    className="flex-1 relative group/vote py-1"
                                  >
                                    <div
                                      className={`h-1.5 w-full rounded-full ${
                                        vote.v === 1
                                          ? "bg-green-500"
                                          : vote.v === 2
                                            ? "bg-red-500"
                                            : "bg-gray-200 dark:bg-gray-700"
                                      }`}
                                    />
                                    {vote.v !== 0 && (
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/vote:block w-32 p-2 bg-gray-900 text-white text-[10px] rounded shadow-lg z-50 pointer-events-none">
                                        {vote.reason}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                          <button
                            onClick={(e) => toggleCaseExpansion(e, 495)}
                            className="text-[10px] text-blue-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            {expandedCase === 495 ? "Hide Groups" : "View 5 Groups"}
                            {expandedCase === 495 ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-indigo-500/10 border border-gray-200 dark:border-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Check size={12} /> VOTING
                  </span>
                  <span className="text-xs text-gray-500 dark:text-indigo-300/60">
                    Proposal
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-indigo-100 group-hover:text-blue-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-2">
                  Proposal #106: Add Dark Mode as Default
                </p>
                <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-500 w-[45%]"></div>
                  <div className="h-full bg-red-500 w-[45%]"></div>
                </div>
                <div className="mt-1 flex justify-between text-xs font-medium">
                  <span className="text-green-600 dark:text-green-400">
                    45% Yes
                  </span>
                  <span className="text-gray-500 dark:text-indigo-300/60">
                    1d left
                  </span>
                  <span className="text-red-600 dark:text-red-400">45% No</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 text-xs font-medium text-center text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 transition-colors">
              View All Active Decisions →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FilterPanel;
