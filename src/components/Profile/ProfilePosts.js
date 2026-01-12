import React, { useState } from "react";
import Post from "../Post";

function ProfilePosts({ posts, onVoteNote, onAddNote, onFlagPost }) {
  const [filter, setFilter] = useState("all"); // all, posts, replies, media

  return (
    <div className="bg-white dark:glass-panel rounded-xl shadow-sm border border-gray-200 dark:border-indigo-500/20 overflow-hidden transition-all duration-300">
      {/* Filter Tabs */}
      <div className="border-b border-gray-200 dark:border-indigo-500/20">
        <div className="flex">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              filter === "all"
                ? "text-blue-600 dark:text-indigo-300 border-b-2 border-blue-600 dark:border-indigo-400"
                : "text-gray-600 dark:text-indigo-300/60 hover:text-gray-900 dark:hover:text-indigo-200"
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setFilter("posts")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              filter === "posts"
                ? "text-blue-600 dark:text-indigo-300 border-b-2 border-blue-600 dark:border-indigo-400"
                : "text-gray-600 dark:text-indigo-300/60 hover:text-gray-900 dark:hover:text-indigo-200"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setFilter("replies")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              filter === "replies"
                ? "text-blue-600 dark:text-indigo-300 border-b-2 border-blue-600 dark:border-indigo-400"
                : "text-gray-600 dark:text-indigo-300/60 hover:text-gray-900 dark:hover:text-indigo-200"
            }`}
          >
            Replies
          </button>
          <button
            onClick={() => setFilter("media")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              filter === "media"
                ? "text-blue-600 dark:text-indigo-300 border-b-2 border-blue-600 dark:border-indigo-400"
                : "text-gray-600 dark:text-indigo-300/60 hover:text-gray-900 dark:hover:text-indigo-200"
            }`}
          >
            Media
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div>
        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-indigo-300/60">
            No posts yet
          </div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onVoteNote={onVoteNote}
              onAddNote={onAddNote}
              onFlagPost={onFlagPost}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePosts;
