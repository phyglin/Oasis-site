import React, { useState } from "react";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  AlertCircle,
  Flag,
} from "lucide-react";
import { statuses } from "../data/statuses";
import CommunityNote from "./CommunityNotes/CommunityNote";
import AddNoteForm from "./CommunityNotes/AddNoteForm";

function Post({ post, onVoteNote, onAddNote, onFlagPost }) {
  const [showAddNote, setShowAddNote] = useState(false);

  const getTopNote = (notes) => {
    if (!notes || notes.length === 0) return null;

    const scoredNotes = notes.map((note) => {
      const netVotes = note.upvotes - note.downvotes;
      const verifiedBonus =
        (note.authorStatus === "public" || note.authorStatus === "real") &&
        note.specialty
          ? 100
          : 0;
      return {
        ...note,
        score: netVotes + verifiedBonus,
      };
    });

    return scoredNotes.sort((a, b) => b.score - a.score)[0];
  };

  const topNote = post.communityNotes ? getTopNote(post.communityNotes) : null;

  if (post.isHidden) {
    return (
      <div className="border-b border-gray-200 dark:border-white/10 p-6 transition-all duration-300">
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-500 italic justify-center">
          <AlertCircle size={24} />
          <span>
            This post has been flagged by the community and is currently under
            moderation review.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 dark:border-white/10 p-6 transition-all duration-300 overflow-hidden hover:bg-gray-50 dark:hover:bg-white/5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
          {post.username[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {post.username}
            </span>
            <span className={statuses[post.status].color}>
              {statuses[post.status].icon}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.time}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!showAddNote && (
            <button
              onClick={() => setShowAddNote(true)}
              className="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Add community note"
            >
              <AlertCircle size={18} />
            </button>
          )}
          <button
            onClick={() => onFlagPost && onFlagPost(post.id)}
            className="text-gray-500 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Flag for moderation"
          >
            <Flag size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
        {post.content}
      </p>

      {/* Top Community Note */}
      {topNote && (
        <CommunityNote
          note={topNote}
          onVote={(voteType) => onVoteNote(post.id, topNote.id, voteType)}
        />
      )}

      {/* Add Note Button/Form */}
      {showAddNote && (
        <AddNoteForm
          onSubmit={(noteData) => {
            onAddNote(post.id, noteData);
            setShowAddNote(false);
          }}
          onCancel={() => setShowAddNote(false)}
        />
      )}

      {/* Interaction Icons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10">
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-500 hover:text-green-600 dark:hover:text-emerald-400 transition-colors">
          <Repeat2 size={18} />
          <span className="text-sm">{post.reposts}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-500 hover:text-red-600 dark:hover:text-rose-400 transition-colors">
          <Heart size={18} />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-amber-400 transition-colors">
          <Bookmark size={18} />
          <span className="text-sm">{post.saves}</span>
        </button>
      </div>
    </div>
  );
}

export default Post;
