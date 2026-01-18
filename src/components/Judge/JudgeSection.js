import React, { useState, useMemo } from "react";
import { Scale, History, Search, ArrowDownUp, Shield, Gavel, Filter, Settings } from "lucide-react";
import ActiveCase from "./ActiveCase";
import CaseDetails from "./CaseDetails";
import CaseCard from "./CaseCard";

function JudgeSection({ cases, onSubmitVote, isVerified, onPin }) {
  const [isJuror, setIsJuror] = useState(false); // Opt-in state
  const [scope, setScope] = useState(isVerified ? "my" : "all"); // 'my', 'all'
  const [statusFilter, setStatusFilter] = useState("active"); // 'active', 'resolved'
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest', 'oldest'
  const [selectedCase, setSelectedCase] = useState(null);

  React.useEffect(() => {
    if (!isVerified && scope === "my") {
      setScope("all");
    }
  }, [isVerified, scope]);

  const filteredCases = useMemo(() => {
    return cases
      .filter((c) => {
        // Scope Filter
        if (scope === "my") {
          return (
            c.currentUserGroup !== undefined && c.currentUserGroup !== null
          );
        }
        return true;
      })
      .filter((c) => {
        // Status Filter
        if (statusFilter === "active") return c.status === "active";
        if (statusFilter === "resolved") return c.status === "completed";
        return true;
      })
      .filter((c) => {
        // Search Filter
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          c.id.toLowerCase().includes(q) ||
          c.reportedUser.toLowerCase().includes(q) ||
          c.reportedContent.toLowerCase().includes(q) ||
          c.violatedSection.toLowerCase().includes(q)
        );
      });
  }, [cases, scope, statusFilter, searchQuery]);

  // Sort logic (simple demo version)
  const sortedCases = useMemo(() => {
    return [...filteredCases].sort((a, b) => {
      // In a real app, parse date strings. For now, we assume 'newest' is default order in data or simply reverse.
      if (sortOrder === "newest") return 0; // Default
      return -1; // Reverse default
    });
  }, [filteredCases, sortOrder]);

  // Opt-in View (The "First Layer")
  if (!isJuror) {
    return (
      <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gavel size={40} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Join the Community Jury
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-indigo-200/80 mb-12">
            Judging is an opt-in responsibility. You serve as the <span className="font-semibold text-indigo-600 dark:text-indigo-400">Second Layer of Review</span>. Moderators have identified potential violations; now, the community decides the outcome.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Filter size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Moderator Review</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cases are first reviewed by moderators who cite specific rule violations before passing them to the jury.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Scale size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Jury System</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                5 groups of 15 randomly selected jurors independently review the evidence to ensure a fair, unbiased trial.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Your Verdict</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review the moderator's citation and the content. Your vote helps determine if the rules were truly broken.
              </p>
            </div>
          </div>

          {!isVerified ? (
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-lg p-4 mb-6">
              <p className="text-amber-800 dark:text-amber-200 font-medium flex items-center justify-center gap-2">
                <Shield size={16} />
                You must be a verified user to join the jury.
              </p>
            </div>
          ) : (
            <button
              onClick={() => setIsJuror(true)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
            >
              Opt-in to Jury Duty
            </button>
          )}
          
          <p className="mt-4 text-xs text-gray-400">
            You can opt-out at any time from the settings menu.
          </p>
        </div>
      </div>
    );
  }

  if (selectedCase) {
    // Check if we should show the Voting Interface (ActiveCase) or Read-Only Details (CaseDetails)
    // Show voting interface if:
    // 1. Case is active
    // 2. User is assigned (currentUserGroup)
    // 3. User hasn't voted yet
    const canVote =
      selectedCase.status === "active" &&
      selectedCase.currentUserGroup &&
      !selectedCase.currentUserVoted;

    if (canVote) {
      return (
        <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl">
          <div className="px-4 py-4">
            <button
              onClick={() => setSelectedCase(null)}
              className="text-sm mb-4 text-gray-500 hover:text-gray-900 dark:text-indigo-300 dark:hover:text-indigo-100"
            >
              ← Back to cases
            </button>
            <ActiveCase
              caseData={selectedCase}
              onSubmitVote={(id, vote) => {
                onSubmitVote(id, vote);
                setSelectedCase(null);
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl">
        <CaseDetails
          caseData={selectedCase}
          onBack={() => setSelectedCase(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl pb-8 relative">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsJuror(false)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:text-white/20 dark:hover:text-white transition-colors"
          title="Opt-out of Jury Duty"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="py-8 text-center border-b border-gray-200 dark:border-white/10 mb-6">
        <h2 className="text-4xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
          Community Justice System
        </h2>
        <p className="text-gray-600 dark:text-indigo-300 text-sm">
          Participate in content moderation decisions
        </p>
      </div>

      {/* Controls Container */}
      <div className="px-6 mb-6">
        {/* Toggle Groups */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          {/* Scope Toggle */}
          <div className="flex bg-gray-100 dark:bg-indigo-900/20 p-1 rounded-lg">
            <button
              onClick={() => isVerified && setScope("my")}
              disabled={!isVerified}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                scope === "my"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
              } ${!isVerified ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              My Cases
            </button>
            <button
              onClick={() => setScope("all")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                scope === "all"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
              }`}
            >
              All Cases
            </button>
          </div>

          {/* Status Toggle */}
          <div className="flex bg-gray-100 dark:bg-indigo-900/20 p-1 rounded-lg">
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                statusFilter === "active"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
              }`}
            >
              <Scale size={14} />
              Active
            </button>
            <button
              onClick={() => setStatusFilter("resolved")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                statusFilter === "resolved"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-indigo-300 hover:text-gray-900 dark:hover:text-indigo-100"
              }`}
            >
              <History size={14} />
              Resolved
            </button>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-indigo-300/50"
            />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-gray-50 dark:bg-indigo-900/10 border border-gray-200 dark:border-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-indigo-100 placeholder-gray-500 dark:placeholder-indigo-300/30"
            />
          </div>
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 text-sm rounded-lg bg-gray-50 dark:bg-indigo-900/10 border border-gray-200 dark:border-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-indigo-100 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <ArrowDownUp
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-indigo-300/50 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Case Grid */}
      <div className="px-6">
        {sortedCases.length > 0 ? (
          <div className="space-y-4">
            {sortedCases.map((c) => (
              <CaseCard
                key={c.id}
                caseData={c}
                onClick={() => setSelectedCase(c)}
                onPin={onPin}
                isVerified={isVerified}
              />
            ))}
          </div>
        ) : (
          <div className="mx-4 bg-white/50 dark:glass-panel rounded-xl border border-gray-200 dark:border-indigo-500/20 p-12 text-center transition-all duration-300 shadow-sm backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-indigo-500/10 flex items-center justify-center">
              <Scale className="text-gray-400 dark:text-indigo-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-indigo-100 mb-3">
              No Cases Found
            </h3>
            <p className="text-gray-600 dark:text-indigo-200/70 mb-6 max-w-md mx-auto">
              {scope === "my" && statusFilter === "active"
                ? "You don't have any active jury duties at the moment."
                : "No cases match your current filters."}
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-8 mx-6 pt-6 border-t border-gray-200 dark:border-indigo-500/20 text-center">
        <p className="text-sm text-gray-500 dark:text-indigo-300/60">
          Transparency is key. All resolved cases are public record.
        </p>
      </div>
    </div>
  );
}

export default JudgeSection;
