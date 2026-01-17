import React from "react";
import { Mic, Users, Eye, Shield } from "lucide-react";
import { constitution } from "../../data/rules";

const iconMap = {
  Mic: Mic,
  Users: Users,
  Eye: Eye,
  Shield: Shield,
};

function Constitution() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
          The Oasis Constitution
        </h2>
        <p className="text-lg text-gray-600 dark:text-indigo-200/80">
          These are the foundational axioms of our digital nation. They are the
          immutable core upon which all other laws are built.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {constitution.map((item) => {
          const Icon = iconMap[item.icon] || Shield;
          return (
            <div
              key={item.id}
              className="bg-white dark:glass-panel border border-gray-200 dark:border-white/10 rounded-xl p-8 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-indigo-500/20 text-blue-600 dark:text-indigo-300 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-indigo-200/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Constitution;
