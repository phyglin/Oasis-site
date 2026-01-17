import React from "react";
import Constitution from "./Constitution";
import TermsOfService from "./TermsOfService";
import { Scroll, Book } from "lucide-react";

function RulesSection({ activeTab = "constitution", onTabChange }) {
  return (
    <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl">
      <div className="py-8 text-center border-b border-gray-200 dark:border-white/10 mb-6">
        <h2 className="text-4xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
          Community Law
        </h2>
        <p className="text-gray-600 dark:text-indigo-300 text-sm">
          The foundation of our digital society
        </p>
      </div>

      <div className="px-6 pb-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => onTabChange("constitution")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "constitution"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100 hover:bg-gray-200/50 dark:hover:bg-white/5"
              }`}
            >
              <Scroll size={18} />
              Constitution
            </button>
            <button
              onClick={() => onTabChange("terms")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "terms"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100 hover:bg-gray-200/50 dark:hover:bg-white/5"
              }`}
            >
              <Book size={18} />
              Terms of Service
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "constitution" ? <Constitution /> : <TermsOfService />}
        </div>
      </div>
    </div>
  );
}

export default RulesSection;
