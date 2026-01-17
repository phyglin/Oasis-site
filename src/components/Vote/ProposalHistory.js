import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import ProposalCard from "./ProposalCard";

function ProposalHistory({ proposals, onSelectProposal }) {
  const scrollContainerRef = useRef(null);
  const historyProposals = proposals
    .filter((p) => ["passed", "rejected"].includes(p.status))
    .sort((a, b) => {
      // Parse "30d", "45d" roughly for sorting, or just assume they are sorted if possible.
      // But let's try a basic sort if they have numeric days.
      const getDays = (str) => parseInt(str) || 0;
      return getDays(a.createdAt) - getDays(b.createdAt);
    });

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (historyProposals.length === 0) return null;

  return (
    <div className="mb-8 border-b border-gray-200 dark:border-white/10 pb-6">
      <div className="px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="text-gray-500 dark:text-indigo-400" size={20} />
          <h3 className="text-lg font-bold text-gray-800 dark:text-indigo-100">
            Proposal History
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-indigo-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-indigo-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 px-4 pb-4 hide-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {historyProposals.map((proposal) => (
          <div key={proposal.id} className="min-w-[300px] snap-center">
            <ProposalCard
              proposal={proposal}
              variant="default"
              onSelect={onSelectProposal}
              isVerified={false} // History items usually read-only
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProposalHistory;
