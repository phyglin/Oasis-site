import React, { useState } from "react";
import { AlertTriangle, Scale, Users } from "lucide-react";
import { termsOfService } from "../../data/cases";

function ActiveCase({ caseData, onSubmitVote }) {
  const [vote, setVote] = useState({ agrees: null, explanation: "" });

  const violatedTerm = termsOfService.find(
    (t) => t.id === caseData.violatedSection,
  );
  const userGroup = caseData.groups.find(
    (g) => g.groupId === caseData.currentUserGroup,
  );

  const handleSubmit = () => {
    if (vote.agrees === null || !vote.explanation.trim()) return;
    onSubmitVote(caseData.id, vote);
  };

  if (caseData.currentUserVoted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="text-center py-8">
          <Scale
            className="mx-auto mb-4 text-green-600 dark:text-green-500"
            size={48}
          />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Vote Submitted
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your judgment. You can view the results once all
            groups complete their review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle
          className="text-orange-600 dark:text-orange-500"
          size={32}
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Active Case: {caseData.id}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You are part of Group {caseData.currentUserGroup} •{" "}
            {userGroup.jurors.length} jurors
          </p>
        </div>
      </div>

      {/* Reported Content */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Reported Content
        </h3>
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-2">
          <div className="flex items-start gap-2 mb-2">
            <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
              User:
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {caseData.reportedUser}
            </span>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
            <p className="text-gray-800 dark:text-gray-300">
              {caseData.reportedContent}
            </p>
          </div>
        </div>
      </div>

      {/* Violation Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Alleged Violation
        </h3>
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-semibold text-red-900 dark:text-red-200 mb-1">
                Section {violatedTerm.section}: {violatedTerm.title}
              </div>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                {violatedTerm.description}
              </p>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Moderator Notes:</span>{" "}
                {caseData.moderatorNotes}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voting Interface */}
      <div className="border-t dark:border-gray-700 pt-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Your Judgment
        </h3>

        <div className="mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Do you agree with the moderator that this content violates the Terms
            of Service?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setVote({ ...vote, agrees: true })}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                vote.agrees === true
                  ? "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-900 dark:text-red-200"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >
              <div className="font-semibold">Agree</div>
              <div className="text-xs mt-1">This violates ToS</div>
            </button>
            <button
              onClick={() => setVote({ ...vote, agrees: false })}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                vote.agrees === false
                  ? "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-900 dark:text-green-200"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >
              <div className="font-semibold">Disagree</div>
              <div className="text-xs mt-1">No violation</div>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Explanation (Required) *
          </label>
          <textarea
            value={vote.explanation}
            onChange={(e) => setVote({ ...vote, explanation: e.target.value })}
            placeholder="Explain your reasoning. This will be visible to other jurors after the case concludes."
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Your explanation helps maintain transparency and accountability in
            the judgment process.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={vote.agrees === null || !vote.explanation.trim()}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          Submit Judgment
        </button>
      </div>

      {/* Group Progress */}
      <div className="mt-6 pt-6 border-t dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <Users size={16} />
            Group Progress: {userGroup.votes.length}/{userGroup.jurors.length}{" "}
            votes
          </span>
          <span>Created {caseData.createdAt} ago</span>
        </div>
      </div>
    </div>
  );
}

export default ActiveCase;
