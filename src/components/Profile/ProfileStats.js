import React from "react";
import {
  Users,
  UserPlus,
  FileText,
  Heart,
  Scale,
  Vote,
  Gavel,
  CheckCircle2,
  Award,
} from "lucide-react";

function ProfileStats({ stats, isCurrentUser, isVerified }) {
  const mainStats = [
    { label: "Followers", value: stats.followers, icon: Users },
    { label: "Following", value: stats.following, icon: UserPlus },
    { label: "Posts", value: stats.posts, icon: FileText },
    { label: "Likes", value: stats.likes, icon: Heart },
  ];

  const judgeStats = isCurrentUser
    ? [
        {
          label: "Cases Judged",
          value: stats.juryDutiesServed || 0,
          icon: Gavel,
        },
        {
          label: "Verdict Accuracy",
          value: stats.verdictAccuracy || "N/A",
          icon: CheckCircle2,
        },
      ]
    : [];

  const proposalStats = isCurrentUser
    ? [
        {
          label: "Votes Cast",
          value: stats.proposalVotes || 0,
          icon: Scale,
        },
        {
          label: "Proposals Submitted",
          value: stats.proposalsSubmitted,
          icon: Vote,
        },
        {
          label: "Proposals Passed",
          value: stats.proposalsPassed || 0,
          icon: Award,
        },
      ]
    : [];

  return (
    <div className="bg-white dark:glass-panel rounded-lg shadow-sm border border-gray-200 dark:border-indigo-500/20 p-6 mb-6 transition-all duration-300">
      <h3 className="font-bold text-gray-900 dark:text-indigo-100 mb-4">
        Statistics
      </h3>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {mainStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-indigo-500/10 rounded-lg border border-transparent dark:border-indigo-500/20 transition-colors"
            >
              <Icon size={20} className="text-gray-600 dark:text-indigo-400" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-indigo-100 dark:text-glow">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 dark:text-indigo-300/70">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Stats */}
      {isCurrentUser && isVerified && (
        <div className="pt-6 border-t border-gray-200 dark:border-indigo-500/20">
          <h4 className="font-semibold text-gray-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
            <Gavel size={18} />
            Justice System Activity
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {judgeStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-indigo-500/10 rounded-lg border border-transparent dark:border-indigo-500/20 transition-colors"
                >
                  <Icon
                    size={20}
                    className="text-gray-600 dark:text-indigo-400"
                  />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-indigo-100 dark:text-glow">
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-indigo-300/70">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h4 className="font-semibold text-gray-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
            <Vote size={18} />
            Governance Activity
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {proposalStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-indigo-500/10 rounded-lg border border-transparent dark:border-indigo-500/20 transition-colors"
                >
                  <Icon
                    size={20}
                    className="text-gray-600 dark:text-indigo-400"
                  />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-indigo-100 dark:text-glow">
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-indigo-300/70">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileStats;
