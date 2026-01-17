import React from "react";
import {
  Award,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  GitPullRequest,
  Scale,
  AlertCircle,
} from "lucide-react";
import { statuses, noteCategories } from "../../data/statuses";

function CommunityNote({ note, isTop, onVote }) {
  const category = noteCategories[note.category];

  const content = (
    <div
      className={`relative mb-4 -mx-6 pl-6 pr-6 py-4 border-l-2 ${category.borderColor} ${category.color} border-y border-white/5`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-lg mt-0.5 ${category.accentColor}`}>
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`font-bold text-sm ${category.accentColor} uppercase tracking-wide`}
            >
              {category.label}
            </span>
            {note.specialty &&
              note.specialty.split(", ").map((spec, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-0.5 bg-white/10 text-gray-300 rounded-full text-[10px] font-medium border border-white/10"
                >
                  <Award size={10} />
                  {spec}
                </span>
              ))}
            {note.supportedByExperts > 0 && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-bold border border-green-500/20">
                <ShieldCheck size={10} />
                Supported by {note.supportedByExperts} experts
              </span>
            )}
          </div>

          <p className="text-sm text-gray-200 leading-relaxed mb-3">
            {note.content}
          </p>

          {/* Detailed Context Sections */}
          {(note.changes || note.reasoning || note.impact) && (
            <div className="mt-3 mb-3 space-y-3 pt-3 border-t border-white/10">
              {note.changes && (
                <div className="text-xs">
                  <div className="flex items-center gap-2 font-semibold text-gray-300 mb-1">
                    <GitPullRequest size={12} className="text-blue-400" />
                    <span>Proposed Changes</span>
                  </div>
                  <p className="text-gray-400 pl-5">{note.changes}</p>
                </div>
              )}

              {note.reasoning && (
                <div className="text-xs">
                  <div className="flex items-center gap-2 font-semibold text-gray-300 mb-1">
                    <Scale size={12} className="text-amber-400" />
                    <span>Reasoning</span>
                  </div>
                  <p className="text-gray-400 pl-5">{note.reasoning}</p>
                </div>
              )}

              {note.impact && (
                <div className="text-xs">
                  <div className="flex items-center gap-2 font-semibold text-gray-300 mb-1">
                    <AlertCircle size={12} className="text-purple-400" />
                    <span>Impact Analysis</span>
                  </div>
                  <p className="text-gray-400 pl-5">{note.impact}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 mb-3">
            {note.sources && note.sources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.sources.map((source, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-blue-400 hover:underline cursor-pointer"
                  >
                    {source}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-3">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                by{" "}
                <span className="font-medium text-gray-400">{note.author}</span>
                <span className={statuses[note.authorStatus].color}>
                  {statuses[note.authorStatus].icon}
                </span>
              </span>
              <span>•</span>
              <span>{note.time}</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onVote("up")}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-green-400 transition-colors"
              >
                <ThumbsUp size={14} />
                <span>Helpful ({note.upvotes})</span>
              </button>
              <button
                onClick={() => onVote("down")}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-400 transition-colors"
              >
                <ThumbsDown size={14} />
                <span>Not Helpful ({note.downvotes})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}

export default CommunityNote;
