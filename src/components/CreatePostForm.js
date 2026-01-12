import React, { useState } from "react";
import { Send } from "lucide-react";

function CreatePostForm({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <div className="border-b border-gray-200 dark:border-indigo-500/20 p-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 flex-shrink-0">
          Y
        </div>
        <form className="flex-1" onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in the Oasis?"
            style={{ backgroundColor: "transparent" }}
            className="w-full !bg-transparent border-none text-gray-900 dark:text-indigo-100 placeholder-gray-500 dark:placeholder-indigo-300/30 focus:ring-0 text-lg resize-none mb-2 p-3"
            rows="3"
          />
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2"
            >
              <Send size={16} />
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
