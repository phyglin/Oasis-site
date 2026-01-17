import React from "react";
import { Scale } from "lucide-react";
import { termsOfService } from "../../data/rules";

function TermsOfService() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h2>
        <p className="text-lg text-gray-600 dark:text-indigo-200/80">
          The practical application of our Constitutional values. These rules
          define how we judge content and conduct in the Public Square.
        </p>
      </div>

      <div className="space-y-6">
        {termsOfService.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:glass-panel border border-gray-200 dark:border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-indigo-400 bg-blue-50 dark:bg-indigo-500/10 px-2 py-1 rounded border border-blue-100 dark:border-indigo-500/20">
                  Sec {item.section}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-indigo-200/70 leading-relaxed mb-4">
                  {item.description}
                </p>
                {item.relatedConstitutionId && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-indigo-300/50">
                    <Scale size={14} />
                    <span>
                      Upholds Constitution Principle #
                      {item.relatedConstitutionId.replace("c", "")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermsOfService;
