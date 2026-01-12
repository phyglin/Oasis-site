import React from "react";
import { CheckCircle, XCircle, Scale, ArrowLeft } from "lucide-react";
import { termsOfService } from "../../data/cases";
import VerdictSummary from "./VerdictSummary";

function CaseDetails({ caseData, onBack }) {
  const violatedTerm = termsOfService.find(
    (t) => t.id === caseData.violatedSection,
  );
  const userGroup = caseData.groups.find(
    (g) => g.groupId === caseData.currentUserGroup,
  );
  const userVote = userGroup?.votes.find(
    (v) => v.jurorId === userGroup.jurors.find((j) => j.isCurrentUser)?.id,
  );

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to History
      </button>

      <div className="px-2">
        <div className="mb-10 pb-8 border-b border-gray-200 dark:border-indigo-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Scale size={24} className="text-gray-600 dark:text-indigo-400" />
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-indigo-100">
              Case {caseData.id}
            </h2>
            {caseData.finalVerdict && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ml-2 ${
                  caseData.finalVerdict === "upheld"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-500/30"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-500/30"
                }`}
              >
                {caseData.finalVerdict === "upheld" ? "Upheld" : "Overturned"}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-indigo-300/60 ml-9">
            Reviewed {caseData.createdAt} ago
          </p>
        </div>

        {/* Reported Content */}
        <div className="mb-10 pb-8 border-b border-gray-200 dark:border-indigo-500/20">
          <h3 className="font-bold text-gray-900 dark:text-indigo-100 mb-4 text-xl">
            Reported Content
          </h3>
          <div className="pl-4 border-l-2 border-indigo-500/30">
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-indigo-300/60">
              <span className="font-semibold">User:</span>
              <span>{caseData.reportedUser}</span>
            </div>
            <div className="text-lg text-gray-800 dark:text-indigo-100 italic leading-relaxed">
              "{caseData.reportedContent}"
            </div>
          </div>
        </div>

        {/* Violation */}
        <div className="mb-10 pb-8 border-b border-gray-200 dark:border-indigo-500/20">
          <h3 className="font-bold text-gray-900 dark:text-indigo-100 mb-4 text-xl">
            Alleged Violation
          </h3>
          <div className="pl-4 border-l-2 border-red-500/30">
            <div className="font-bold text-red-900 dark:text-red-200 mb-2 text-lg">
              Section {violatedTerm.section}: {violatedTerm.title}
            </div>
            <p className="text-gray-700 dark:text-indigo-200/80 mb-4 leading-relaxed">
              {violatedTerm.description}
            </p>
            <div className="text-sm text-gray-600 dark:text-indigo-300/80">
              <span className="font-semibold text-gray-900 dark:text-indigo-100">
                Moderator Notes:
              </span>{" "}
              {caseData.moderatorNotes}
            </div>
          </div>
        </div>

        {/* Your Vote */}
        {userVote && (
          <div className="mb-10 pb-8 border-b border-gray-200 dark:border-indigo-500/20">
            <h3 className="font-bold text-gray-900 dark:text-indigo-100 mb-4 text-xl">
              Your Judgment
            </h3>
            <div className="pl-4 border-l-2 border-indigo-500/30">
              <div className="flex items-center gap-2 mb-2">
                {userVote.agrees ? (
                  <>
                    <CheckCircle
                      size={20}
                      className="text-red-600 dark:text-red-400"
                    />
                    <span className="font-semibold text-red-900 dark:text-red-200">
                      Agreed with Moderator
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                    <span className="font-semibold text-green-900 dark:text-green-200">
                      Disagreed with Moderator
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-700 dark:text-indigo-200/80 leading-relaxed">
                "{userVote.explanation}"
              </p>
            </div>
          </div>
        )}

        {/* Verdict Summary */}
        {caseData.finalVerdict && (
          <div className="mb-10 pb-8 border-b border-gray-200 dark:border-indigo-500/20">
            <VerdictSummary caseData={caseData} />
          </div>
        )}

        {/* All Group Results */}
        <div className="mb-10 pb-8 border-b border-gray-200 dark:border-indigo-500/20">
          <h3 className="font-bold text-gray-900 dark:text-indigo-100 mb-4 text-xl">
            Group Results
          </h3>
          <div className="space-y-4">
            {caseData.groups.map((group, idx) => {
              const result = caseData.groupResults.find(
                (r) => r.groupId === group.groupId,
              );
              const isUserGroup = group.groupId === caseData.currentUserGroup;

              return (
                <div
                  key={group.groupId}
                  className={`p-4 rounded-lg ${
                    isUserGroup
                      ? "bg-indigo-50 dark:bg-indigo-500/10"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 dark:text-indigo-100">
                        Group {group.groupId}
                      </span>
                      {isUserGroup && (
                        <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 px-2 py-0.5 rounded">
                          Your Group
                        </span>
                      )}
                    </div>
                    {result && (
                      <span
                        className={`text-sm font-semibold ${
                          result.verdict === "agreed"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {result.verdict === "agreed" ? "Agreed" : "Disagreed"}
                      </span>
                    )}
                  </div>
                  {result && (
                    <div className="flex gap-4 text-sm">
                      <span className="text-red-600 dark:text-red-300">
                        Agree: {result.agreed}
                      </span>
                      <span className="text-green-600 dark:text-green-300">
                        Disagree: {result.disagreed}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* All Juror Explanations from User's Group */}
        {userGroup && userGroup.votes.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 dark:text-indigo-100 mb-4 text-xl">
              Juror Explanations (Your Group)
            </h3>
            <div className="space-y-6">
              {userGroup.votes.map((vote, idx) => {
                const juror = userGroup.jurors.find(
                  (j) => j.id === vote.jurorId,
                );
                return (
                  <div
                    key={idx}
                    className="pl-4 border-l-2 border-gray-200 dark:border-indigo-500/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-indigo-100">
                        {juror?.isCurrentUser
                          ? "You"
                          : juror?.name || "Anonymous"}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          vote.agrees
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {vote.agrees ? "AGREED" : "DISAGREED"}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-indigo-200/80 leading-relaxed">
                      "{vote.explanation}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseDetails;
