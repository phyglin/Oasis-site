import React, { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import FilterPanel from "./components/FilterPanel";
import VoteSection from "./components/Vote/VoteSection";
import JudgeSection from "./components/Judge/JudgeSection";
import ProfileSection from "./components/Profile/ProfileSection";
import Settings from "./components/Settings/Settings";
import { statuses } from "./data/statuses";
import { initialProposals } from "./data/proposals";
import { initialCases } from "./data/cases";
import { currentUserProfile } from "./data/profiles";
import { generatePosts } from "./utils/generators";

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [posts, setPosts] = useState(generatePosts(10, statuses));
  const [activeMenu, setActiveMenu] = useState("public-square");
  const [savedFilter, setSavedFilter] = useState({
    anonymous: true,
    real: true,
    public: true,
    institution: true,
    company: true,
  });
  const [selectedStatuses, setSelectedStatuses] = useState({
    anonymous: true,
    real: true,
    public: true,
    institution: true,
    company: true,
  });
  const [voteProposals, setVoteProposals] = useState(initialProposals);
  const [showNewProposal, setShowNewProposal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    category: "feature",
  });
  const [cases, setCases] = useState(initialCases);
  const [userProfile, setUserProfile] = useState(currentUserProfile);

  const toggleStatus = (statusKey) => {
    setSelectedStatuses((prev) => ({ ...prev, [statusKey]: !prev[statusKey] }));
  };

  const selectAll = () => {
    setSelectedStatuses({
      anonymous: true,
      real: true,
      public: true,
      institution: true,
      company: true,
    });
  };

  const saveFilter = () => {
    setSavedFilter({ ...selectedStatuses });
  };

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
    setSelectedStatuses({ ...savedFilter });
  };

  const voteOnProposal = (proposalId, voteType) => {
    setVoteProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === proposalId) {
          return {
            ...proposal,
            upvotes:
              voteType === "up" ? proposal.upvotes + 1 : proposal.upvotes,
            downvotes:
              voteType === "down" ? proposal.downvotes + 1 : proposal.downvotes,
          };
        }
        return proposal;
      }),
    );
  };

  const submitProposal = () => {
    if (!newProposal.title.trim() || !newProposal.description.trim()) return;

    const proposal = {
      id: Date.now(),
      title: newProposal.title,
      description: newProposal.description,
      category: newProposal.category,
      author: "You",
      authorStatus: "real",
      upvotes: 0,
      downvotes: 0,
      status: "open",
      isDeveloper: false,
      isCritical: false,
      createdAt: "0m",
    };

    setVoteProposals((prev) => [proposal, ...prev]);
    setShowNewProposal(false);
    setNewProposal({ title: "", description: "", category: "feature" });
  };

  const voteOnNote = (postId, noteId, voteType) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId && post.communityNotes) {
          return {
            ...post,
            communityNotes: post.communityNotes.map((note) => {
              if (note.id === noteId) {
                return {
                  ...note,
                  upvotes: voteType === "up" ? note.upvotes + 1 : note.upvotes,
                  downvotes:
                    voteType === "down" ? note.downvotes + 1 : note.downvotes,
                };
              }
              return note;
            }),
          };
        }
        return post;
      }),
    );
  };

  const addNote = (postId, noteData) => {
    const newNote = {
      id: `${postId}-note-${Date.now()}`,
      author: "You",
      authorStatus: "real",
      specialty: noteData.specialty || null,
      content: noteData.content,
      sources: noteData.sources
        ? noteData.sources.split(",").map((s) => s.trim())
        : [],
      category: noteData.category,
      upvotes: 0,
      downvotes: 0,
      time: "0m",
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            communityNotes: post.communityNotes
              ? [...post.communityNotes, newNote]
              : [newNote],
          };
        }
        return post;
      }),
    );
  };

  const handleFlagPost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newFlags = (post.flags || 0) + 1;
          const shouldHide = newFlags >= 5;
          return {
            ...post,
            flags: newFlags,
            isHidden: shouldHide,
          };
        }
        return post;
      }),
    );
  };

  const handleCreatePost = (content) => {
    const newPost = {
      id: Date.now(),
      username: "You",
      status: "real",
      time: "Just now",
      content: content,
      comments: 0,
      reposts: 0,
      likes: 0,
      saves: 0,
      communityNotes: [],
      flags: 0,
      isHidden: false,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePinItem = (item) => {
    setPinnedItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const submitJudgeVote = (caseId, vote) => {
    setCases((prevCases) =>
      prevCases.map((caseData) => {
        if (caseData.id === caseId) {
          const updatedGroups = caseData.groups.map((group) => {
            if (group.groupId === caseData.currentUserGroup) {
              const juror = group.jurors.find((j) => j.isCurrentUser);
              const newVote = {
                jurorId: juror.id,
                agrees: vote.agrees,
                explanation: vote.explanation,
                timestamp: "0m",
              };
              return {
                ...group,
                votes: [...group.votes, newVote],
                status:
                  group.votes.length + 1 === group.jurors.length
                    ? "completed"
                    : "voting",
              };
            }
            return group;
          });

          return {
            ...caseData,
            groups: updatedGroups,
            currentUserVoted: true,
          };
        }
        return caseData;
      }),
    );
  };

  const updateProfile = (profileData) => {
    setUserProfile((prev) => ({
      ...prev,
      ...profileData,
    }));
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => selectedStatuses[post.status]);
  }, [posts, selectedStatuses]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-transparent items-center">
      {/* Dev Tool: View Toggle */}
      <div className="w-full bg-black text-white py-2 px-4 flex justify-between items-center z-50 shadow-md">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
          Developer View Control
        </span>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="viewMode"
              checked={!isVerified}
              onChange={() => setIsVerified(false)}
              className="accent-indigo-500"
            />
            Unverified User View
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="viewMode"
              checked={isVerified}
              onChange={() => setIsVerified(true)}
              className="accent-indigo-500"
            />
            Verified User View
          </label>
        </div>
      </div>

      <div className="flex w-full max-w-7xl h-full overflow-hidden">
        <Sidebar
          activeMenu={activeMenu}
          onMenuChange={handleMenuChange}
          isVerified={isVerified}
        />

        <div className="flex-1 overflow-y-auto">
          <div>
            {activeMenu === "vote" ? (
              <VoteSection
                proposals={voteProposals}
                onVote={voteOnProposal}
                showNewProposal={showNewProposal}
                setShowNewProposal={setShowNewProposal}
                newProposal={newProposal}
                setNewProposal={setNewProposal}
                onSubmitProposal={submitProposal}
                isVerified={isVerified}
                onPin={handlePinItem}
              />
            ) : activeMenu === "judge" ? (
              <JudgeSection
                cases={cases}
                onSubmitVote={submitJudgeVote}
                isVerified={isVerified}
                onPin={handlePinItem}
              />
            ) : activeMenu === "profile" ? (
              <ProfileSection
                profile={userProfile}
                onUpdateProfile={updateProfile}
                onVoteNote={voteOnNote}
                onAddNote={addNote}
                onFlagPost={handleFlagPost}
                isVerified={isVerified}
              />
            ) : activeMenu === "settings" ? (
              <Settings isVerified={isVerified} />
            ) : (
              <Feed
                posts={filteredPosts}
                onVoteNote={voteOnNote}
                onAddNote={addNote}
                onFlagPost={handleFlagPost}
                onCreatePost={handleCreatePost}
                isVerified={isVerified}
              />
            )}
          </div>
        </div>

        <FilterPanel
          selectedStatuses={selectedStatuses}
          onToggleStatus={toggleStatus}
          onSelectAll={selectAll}
          onSaveFilter={saveFilter}
          postsCount={posts.length}
          filteredCount={filteredPosts.length}
          isVerified={isVerified}
          activeMenu={activeMenu}
          pinnedItems={pinnedItems}
        />
      </div>
    </div>
  );
}

export default App;
