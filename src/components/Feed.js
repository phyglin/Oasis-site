import React from "react";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";

function Feed({
  posts,
  onVoteNote,
  onAddNote,
  onFlagPost,
  onCreatePost,
  isVerified,
}) {
  return (
    <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl">
      <h2 className="text-4xl font-display font-bold text-center text-gray-800 dark:text-gray-100 py-8 border-b border-gray-200 dark:border-white/10">
        Feed
      </h2>
      {posts.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-indigo-300">
            No posts match your selected filters.
          </p>
        </div>
      ) : (
        <div>
          <CreatePostForm onSubmit={onCreatePost} />
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onVoteNote={onVoteNote}
              onAddNote={onAddNote}
              onFlagPost={onFlagPost}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
