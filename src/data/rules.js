export const constitution = [
  {
    id: "c1",
    icon: "Mic",
    title: "Unrestricted Expression",
    description:
      "Free speech is the cornerstone of our community. All ideas, no matter how controversial, have the right to be heard unless they directly incite immediate violence or harm.",
  },
  {
    id: "c2",
    icon: "Users",
    title: "Community Sovereignty",
    description:
      "Power resides with the people. The rules of this platform are written, judged, and enforced by verified users, not by a central authority or corporate board.",
  },
  {
    id: "c3",
    icon: "Eye",
    title: "Radical Transparency",
    description:
      "Justice must be seen to be done. All moderation decisions, algorithm changes, and governance votes are public record, accessible to everyone.",
  },
  {
    id: "c4",
    icon: "Shield",
    title: "Digital Privacy",
    description:
      "Your data belongs to you. We respect the right to anonymity for unverified accounts and protect the private information of verified citizens.",
  },
];

export const termsOfService = [
  {
    id: "tos1",
    section: "1.0",
    title: "Expression & Content Standards",
    description:
      "While the Constitution guarantees free speech, this section defines the boundaries necessary for a functioning society. Direct threats of physical harm, doxxing (revealing private personal information), and child exploitation material are strictly prohibited. Mere offensiveness or unpopular opinions are NOT grounds for removal.",
    relatedConstitutionId: "c1",
  },
  {
    id: "tos2",
    section: "2.0",
    title: "The Judicial Process",
    description:
      "When content is flagged, it is not judged by an employee, but by a randomly selected jury of verified peers. Jurors must evaluate content based on these Terms and the Constitution, putting aside personal bias. 'Upheld' verdicts require a consensus, ensuring that only clear violations are punished.",
    relatedConstitutionId: "c2",
  },
  {
    id: "tos3",
    section: "3.0",
    title: "Verification & Voting Rights",
    description:
      "To prevent mob rule by bot farms, only verified humans may vote on proposals or sit on juries. Verification requires proof of unique humanity but does not require public disclosure of real-world identity on your profile.",
    relatedConstitutionId: "c2",
  },
  {
    id: "tos4",
    section: "4.0",
    title: "Spam & Artificial Traffic",
    description:
      "The Public Square is for human discourse. Automated accounts (bots) must be clearly labeled. Undisclosed automated posting, vote manipulation, or artificial amplification of content is a violation of community trust and will be penalized.",
    relatedConstitutionId: "c3",
  },
  {
    id: "tos5",
    section: "5.0",
    title: "Data Ownership",
    description:
      "We do not sell user data to third parties. You retain the copyright to the content you create. By posting, you grant Oasis a license to display it, but you may delete your account and content at any time, subject to the immutable nature of public blockchain records where applicable.",
    relatedConstitutionId: "c4",
  },
];
