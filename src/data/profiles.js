import { generatePosts } from "../utils/generators";
import { statuses } from "./statuses";

export const currentUserProfile = {
  id: "user-current",
  username: "YourUsername",
  displayName: "Your Display Name",
  bio: "Welcome to my profile! Passionate about technology, community building, and transparency.",
  status: "real", // anonymous, real, public, institution, company
  verified: true,
  specialty: "Software Engineering",
  profilePicture: null, // URL to profile picture
  backgroundImage: null, // URL to background image
  joinedDate: "January 2024",
  location: "Internet",
  website: "https://example.com",
  stats: {
    followers: 1247,
    following: 432,
    posts: 156,
    likes: 3842,
    communityNotesWritten: 23,
    juryDutiesServed: 15,
    verdictAccuracy: "92%",
    proposalsSubmitted: 5,
    proposalsPassed: 2,
    proposalVotes: 42,
  },
  posts: generatePosts(15, statuses), // User's posts
  isCurrentUser: true,
};

export const exampleProfiles = [
  {
    id: "user-1",
    username: "TechEnthusiast",
    displayName: "Alex Thompson",
    bio: "Building the future, one line of code at a time.",
    status: "public",
    verified: true,
    specialty: "AI Research",
    joinedDate: "March 2023",
    stats: {
      followers: 5432,
      following: 891,
      posts: 423,
      likes: 12453,
    },
    isCurrentUser: false,
  },
  {
    id: "user-2",
    username: "NewsDaily",
    displayName: "Daily News Network",
    bio: "Your trusted source for verified news and information.",
    status: "institution",
    verified: true,
    joinedDate: "June 2022",
    stats: {
      followers: 89234,
      following: 234,
      posts: 5678,
      likes: 234567,
    },
    isCurrentUser: false,
  },
];
