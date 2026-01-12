import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Award,
} from "lucide-react";
import { statuses } from "../../data/statuses";

function ProfileHeader({ profile, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: profile.displayName,
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
  });

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:glass-panel rounded-lg shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden mb-6 transition-all duration-300">
      {/* Background Image */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-700 relative">
        {profile.backgroundImage && (
          <img
            src={profile.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        )}
        {profile.isCurrentUser && (
          <button className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
            <Camera size={16} />
            Edit Cover
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        {/* Profile Picture */}
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-black bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                profile.username[0].toUpperCase()
              )}
            </div>
            {profile.isCurrentUser && (
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white p-2 rounded-full shadow-lg transition-colors">
                <Camera size={18} />
              </button>
            )}
          </div>

          {profile.isCurrentUser && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 border border-transparent dark:border-white/20 rounded-lg font-medium transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* User Info */}
        {isEditing ? (
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={editData.displayName}
                onChange={(e) =>
                  setEditData({ ...editData, displayName: e.target.value })
                }
                className="w-full px-3 py-2 bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 dark:text-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
                Bio
              </label>
              <textarea
                value={editData.bio}
                onChange={(e) =>
                  setEditData({ ...editData, bio: e.target.value })
                }
                className="w-full px-3 py-2 bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 dark:text-indigo-100"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
                Location
              </label>
              <input
                type="text"
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
                className="w-full px-3 py-2 bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 dark:text-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
                Website
              </label>
              <input
                type="url"
                value={editData.website}
                onChange={(e) =>
                  setEditData({ ...editData, website: e.target.value })
                }
                className="w-full px-3 py-2 bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 dark:text-indigo-100"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.4)] text-white rounded-lg font-medium transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-indigo-500/10 hover:bg-gray-300 dark:hover:bg-indigo-500/20 text-gray-700 dark:text-indigo-200 border border-transparent dark:border-indigo-500/30 rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {profile.displayName}
                </h1>
                <span
                  className={statuses[profile.status].color}
                  title={statuses[profile.status].label}
                >
                  {statuses[profile.status].icon}
                </span>
                {profile.verified && (
                  <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-200 dark:border dark:border-blue-500/30 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <Award size={12} />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                @{profile.username}
              </p>
            </div>

            {profile.bio && (
              <p className="text-gray-800 dark:text-gray-300 mb-4">
                {profile.bio}
              </p>
            )}

            {profile.specialty && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 dark:border dark:border-purple-500/20 rounded-full text-sm font-medium">
                  <Award size={14} />
                  {profile.specialty}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <LinkIcon size={16} />
                  <span>{profile.website.replace("https://", "")}</span>
                </a>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Joined {profile.joinedDate}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
