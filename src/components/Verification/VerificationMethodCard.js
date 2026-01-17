import React from "react";
import { ArrowRight } from "lucide-react";

function VerificationMethodCard({
  icon: Icon,
  title,
  description,
  onSelect,
  recommended,
}) {
  return (
    <div className="relative group p-6 bg-white dark:bg-black/20 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300">
      {recommended && (
        <span className="absolute top-4 right-4 px-2 py-1 text-xs font-bold text-green-700 bg-green-100 dark:bg-green-500/20 dark:text-green-300 rounded border border-green-200 dark:border-green-500/30">
          RECOMMENDED
        </span>
      )}
      <div className="mb-4 p-3 bg-gray-100 dark:bg-white/5 rounded-lg w-fit border border-gray-200 dark:border-white/10">
        <Icon size={24} className="text-gray-700 dark:text-gray-200" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
        {description}
      </p>
      <button
        onClick={onSelect}
        className="w-full py-3 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white/10 hover:bg-gray-800 dark:hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-transparent dark:border-white/10"
      >
        Select Method
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default VerificationMethodCard;
