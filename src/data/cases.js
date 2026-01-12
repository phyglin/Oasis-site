export const termsOfService = [
  {
    id: "tos-1",
    section: "2.1",
    title: "Hate Speech",
    description:
      "Content that promotes hatred or violence against individuals or groups",
  },
  {
    id: "tos-2",
    section: "2.2",
    title: "Harassment",
    description: "Targeting individuals with unwanted contact or abuse",
  },
  {
    id: "tos-3",
    section: "2.3",
    title: "Misinformation",
    description:
      "Deliberate spreading of false information that could cause harm",
  },
  {
    id: "tos-4",
    section: "2.4",
    title: "Spam",
    description:
      "Repetitive or irrelevant content posted to multiple locations",
  },
  {
    id: "tos-5",
    section: "2.5",
    title: "Impersonation",
    description: "Pretending to be another person or entity",
  },
  {
    id: "tos-6",
    section: "2.6",
    title: "Copyright Violation",
    description: "Posting copyrighted content without permission",
  },
  {
    id: "tos-7",
    section: "3.1",
    title: "Violent Content",
    description: "Graphic violence or threats of violence",
  },
];

export const initialCases = [
  {
    id: "case-001",
    reportedUser: "BadActor123",
    reportedContent:
      "This is clearly spam content being posted repeatedly across multiple threads.",
    contentType: "post",
    moderatorNotes:
      "User has posted identical content 15+ times in the last hour across different topics.",
    violatedSection: "tos-4",
    status: "active", // active, completed
    createdAt: "2h",
    groups: [
      {
        groupId: 1,
        jurors: generateJurors(10),
        votes: [], // Will be filled as jurors vote
        status: "pending", // pending, voting, completed
      },
      {
        groupId: 2,
        jurors: generateJurors(10),
        votes: [],
        status: "pending",
      },
      {
        groupId: 3,
        jurors: generateJurors(10),
        votes: [],
        status: "pending",
      },
      {
        groupId: 4,
        jurors: generateJurors(10),
        votes: [],
        status: "pending",
      },
      {
        groupId: 5,
        jurors: generateJurors(10),
        votes: [],
        status: "pending",
      },
    ],
    currentUserGroup: 1, // Which group the current user is in (null if not assigned)
    currentUserVoted: false,
    finalVerdict: null, // Will be set when all groups complete
    groupResults: [], // Will store results from each group
  },
  {
    id: "case-002",
    reportedUser: "TrollUser456",
    reportedContent:
      "You are all idiots and should leave this platform. Nobody wants you here.",
    contentType: "comment",
    moderatorNotes:
      "Pattern of harassment across multiple users over the past week.",
    violatedSection: "tos-2",
    status: "completed",
    createdAt: "2d",
    groups: [
      {
        groupId: 1,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 2,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 3,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, false),
        status: "completed",
      },
      {
        groupId: 4,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 5,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, false),
        status: "completed",
      },
    ],
    currentUserGroup: 1,
    currentUserVoted: true,
    finalVerdict: "upheld", // upheld, overturned
    groupResults: [
      { groupId: 1, agreed: 7, disagreed: 3, verdict: "agreed" },
      { groupId: 2, agreed: 8, disagreed: 2, verdict: "agreed" },
      { groupId: 3, agreed: 4, disagreed: 6, verdict: "disagreed" },
      { groupId: 4, agreed: 6, disagreed: 4, verdict: "agreed" },
      { groupId: 5, agreed: 4, disagreed: 6, verdict: "disagreed" },
    ],
  },
  {
    id: "case-003",
    reportedUser: "CryptoKing99",
    reportedContent:
      "URGENT: Send ETH to this address to verify your wallet and receive airdrop! This is a limited time offer from the official team.",
    contentType: "post",
    moderatorNotes:
      "Classic phishing attempt impersonating official channels. Multiple reports.",
    violatedSection: "tos-5",
    status: "active",
    createdAt: "45m",
    groups: [
      { groupId: 1, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 2, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 3, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 4, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 5, jurors: generateJurors(10), votes: [], status: "pending" },
    ],
    currentUserGroup: 1,
    currentUserVoted: false,
    finalVerdict: null,
    groupResults: [],
  },
  {
    id: "case-004",
    reportedUser: "HealthGuru_Real",
    reportedContent:
      "Doctors don't want you to know this: Drinking concentrated bleach cures all viruses instantly. Big Pharma is hiding the truth.",
    contentType: "post",
    moderatorNotes:
      "Dangerous medical misinformation posing immediate risk to health/safety.",
    violatedSection: "tos-3",
    status: "active",
    createdAt: "3h",
    groups: [
      { groupId: 1, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 2, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 3, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 4, jurors: generateJurors(10), votes: [], status: "pending" },
      { groupId: 5, jurors: generateJurors(10), votes: [], status: "pending" },
    ],
    currentUserGroup: null,
    currentUserVoted: false,
    finalVerdict: null,
    groupResults: [],
  },
  {
    id: "case-005",
    reportedUser: "CinemaCritique",
    reportedContent:
      "Here is a 15 second clip from the new blockbuster movie to illustrate the lighting technique I'm discussing in this review.",
    contentType: "post",
    moderatorNotes: "Automated copyright flag for using movie footage.",
    violatedSection: "tos-6",
    status: "completed",
    createdAt: "1w",
    groups: [
      {
        groupId: 1,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, false),
        status: "completed",
      },
      {
        groupId: 2,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, false),
        status: "completed",
      },
      {
        groupId: 3,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, false),
        status: "completed",
      },
      {
        groupId: 4,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 5,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, false),
        status: "completed",
      },
    ],
    currentUserGroup: null,
    currentUserVoted: false,
    finalVerdict: "overturned",
    groupResults: [
      { groupId: 1, agreed: 2, disagreed: 8, verdict: "disagreed" },
      { groupId: 2, agreed: 1, disagreed: 9, verdict: "disagreed" },
      { groupId: 3, agreed: 3, disagreed: 7, verdict: "disagreed" },
      { groupId: 4, agreed: 6, disagreed: 4, verdict: "agreed" },
      { groupId: 5, agreed: 0, disagreed: 10, verdict: "disagreed" },
    ],
  },
  {
    id: "case-006",
    reportedUser: "RadicalVoice",
    reportedContent:
      "We need to cleanse our society of [Protected Group]. They are the root of all evil and should be removed by any means necessary.",
    contentType: "post",
    moderatorNotes: "Clear hate speech violation under section 2.1.",
    violatedSection: "tos-1",
    status: "completed",
    createdAt: "4d",
    groups: [
      {
        groupId: 1,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 2,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 3,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 4,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
      {
        groupId: 5,
        jurors: generateJurors(10),
        votes: generateCompletedVotes(10, true),
        status: "completed",
      },
    ],
    currentUserGroup: 1,
    currentUserVoted: true,
    finalVerdict: "upheld",
    groupResults: [
      { groupId: 1, agreed: 9, disagreed: 1, verdict: "agreed" },
      { groupId: 2, agreed: 10, disagreed: 0, verdict: "agreed" },
      { groupId: 3, agreed: 8, disagreed: 2, verdict: "agreed" },
      { groupId: 4, agreed: 9, disagreed: 1, verdict: "agreed" },
      { groupId: 5, agreed: 7, disagreed: 3, verdict: "agreed" },
    ],
  },
];

function generateJurors(count) {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Iris",
    "Jack",
    "Kate",
    "Leo",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `juror-${Math.random().toString(36).substr(2, 9)}`,
    name: names[i % names.length] + Math.floor(Math.random() * 100),
    isCurrentUser: i === 0, // First juror is current user for demo
  }));
}

function generateCompletedVotes(count, majorityAgrees) {
  const agreeCount = majorityAgrees
    ? Math.floor(count * 0.6) + Math.floor(Math.random() * 2)
    : Math.floor(count * 0.4);
  const votes = [];

  for (let i = 0; i < count; i++) {
    votes.push({
      jurorId: `juror-${i}`,
      agrees: i < agreeCount,
      explanation:
        i < agreeCount
          ? "This clearly violates the terms. The evidence is substantial."
          : "I don't think this rises to the level of a violation. Context matters.",
      timestamp: "1d",
    });
  }

  return votes;
}
