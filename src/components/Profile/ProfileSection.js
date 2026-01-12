import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfilePosts from "./ProfilePosts";

function ProfileSection({
  profile,
  onUpdateProfile,
  onVoteNote,
  onAddNote,
  onFlagPost,
  isVerified,
}) {
  return (
    <div className="min-h-full bg-white dark:bg-[#0f172a]/30 dark:backdrop-blur-md p-6">
      <ProfileHeader profile={profile} onUpdateProfile={onUpdateProfile} />

      <ProfileStats
        stats={profile.stats}
        isCurrentUser={profile.isCurrentUser}
        isVerified={isVerified}
      />
      <ProfilePosts
        posts={profile.posts}
        onVoteNote={onVoteNote}
        onAddNote={onAddNote}
        onFlagPost={onFlagPost}
      />
    </div>
  );
}

export default ProfileSection;
