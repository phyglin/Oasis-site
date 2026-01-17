import React from "react";
import { Pin, Check, Gavel } from "lucide-react";
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

  return (
    <div className="w-80 bg-gray-100 dark:bg-black/20 dark:backdrop-blur-xl border-x border-gray-200 dark:border-white/10 p-6 sticky top-0 h-screen overflow-y-auto transition-colors duration-300">
      {showFilters && (
        <>
          <h3 className="font-bold text-gray-800 dark:text-indigo-100 mb-4 text-lg">
            Filtering
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select which status types to view:
          </p>

          <div className="flex gap-2 mb-4">
            <button
              onClick={onSelectAll}
              className="flex-1 px-3 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 border border-transparent dark:border-white/10 rounded-lg text-sm font-medium transition-all"
            >
              Select All
            </button>
            <button
              onClick={onSaveFilter}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all"
            >
              Save
            </button>
          </div>

          <div className="space-y-1">
            {Object.entries(statuses).map(([key, status]) => (
              <label
                key={key}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses[key]}
                  onChange={() => onToggleStatus(key)}
                  className="w-4 h-4 rounded text-blue-600 dark:text-indigo-500 bg-gray-300 dark:bg-white/5 border-gray-400 dark:border-white/20 focus:ring-indigo-500/40"
                />
                <span className={status.color}>{status.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex-1">
                  {status.label}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredCount} of {postsCount} posts
            </p>
          </div>
        </>
      )}

      <div
        className={`${showFilters ? "mt-8 pt-6 border-t border-gray-200 dark:border-white/10" : ""}`}
      >
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
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 1, 1, 1, 2, 2, 0, 0, 0, 0].map((s, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          s === 1
                            ? "bg-green-500"
                            : s === 2
                              ? "bg-red-500"
                              : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-blue-600 dark:text-indigo-400 hover:underline">
                    View 5 Groups
                  </span>
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
