import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

function VerdictSummary({ caseData }) {
  const totalAgreed = caseData.groupResults.filter(
    (r) => r.verdict === "agreed",
  ).length;
  const totalDisagreed = caseData.groupResults.filter(
    (r) => r.verdict === "disagreed",
  ).length;

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-2">Final Verdict</h3>
      <div
        className={`border-2 rounded-lg p-4 ${
          caseData.finalVerdict === "upheld"
            ? "bg-red-50 border-red-200"
            : "bg-green-50 border-green-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          {caseData.finalVerdict === "upheld" ? (
            <>
              <CheckCircle size={20} className="text-red-600" />
              <span className="font-semibold text-red-900">
                Moderator Action Upheld
              </span>
            </>
          ) : (
            <>
              <XCircle size={20} className="text-green-600" />
              <span className="font-semibold text-green-900">
                Moderator Action Overturned
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-700">
          The community justice panel reviewed this case and voted to{" "}
          <strong>
            {caseData.finalVerdict === "upheld" ? "uphold" : "overturn"}
          </strong>{" "}
          the moderator's initial decision.
        </p>
        <div className="mt-3 text-sm">
          <span className="font-medium">Group Consensus:</span>
          <span className="text-red-600 ml-2">{totalAgreed} groups agreed</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-green-600">
            {totalDisagreed} groups disagreed
          </span>
        </div>
      </div>
    </div>
  );
}

export default VerdictSummary;
