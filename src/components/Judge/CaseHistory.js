import React from "react";
import { Scale, CheckCircle, XCircle, Clock } from "lucide-react";

function CaseHistory({ cases, onSelectCase }) {
  const completedCases = cases.filter((c) => c.status === "completed");

  if (completedCases.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Scale
          className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
          size={48}
        />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No Cases Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Cases you review will appear here
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 px-4">
        Your Case History
      </h3>
      <div className="space-y-3">
        {completedCases.map((caseData) => {
          const userGroup = caseData.groups.find(
            (g) => g.groupId === caseData.currentUserGroup,
          );
          const userVote = userGroup?.votes.find((v) => {
            const juror = userGroup.jurors.find((j) => j.isCurrentUser);
            return v.jurorId === juror?.id;
          });

          return (
            <div
              key={caseData.id}
              onClick={() => onSelectCase(caseData)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:bg-gray-700/50 transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {caseData.id}
                    </span>
                    {caseData.finalVerdict && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          caseData.finalVerdict === "upheld"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                            : "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                        }`}
                      >
                        {caseData.finalVerdict === "upheld"
                          ? "Upheld"
                          : "Overturned"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    User: {caseData.reportedUser}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {caseData.reportedContent}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 mt-3">
                <div className="flex items-center gap-4 text-sm">
                  {userVote && (
                    <span className="flex items-center gap-1">
                      {userVote.agrees ? (
                        <>
                          <CheckCircle
                            size={14}
                            className="text-red-600 dark:text-red-500"
                          />
                          <span className="text-red-600 dark:text-red-500">
                            You Agreed
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={14}
                            className="text-green-600 dark:text-green-500"
                          />
                          <span className="text-green-600 dark:text-green-500">
                            You Disagreed
                          </span>
                        </>
                      )}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Clock size={14} />
                    {caseData.createdAt}
                  </span>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CaseHistory;
