export const generateUsername = () => {
  const adjectives = [
    "Cool",
    "Happy",
    "Swift",
    "Bright",
    "Bold",
    "Wild",
    "Calm",
    "Smart",
    "Quick",
    "Free",
  ];
  const nouns = [
    "Tiger",
    "Phoenix",
    "Wolf",
    "Eagle",
    "Lion",
    "Bear",
    "Falcon",
    "Fox",
    "Shark",
    "Hawk",
  ];
  const num = Math.floor(Math.random() * 999);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${num}`;
};

export const generateTime = () => {
  const units = ["m", "h", "d"];
  const unit = units[Math.floor(Math.random() * units.length)];
  let value;
  if (unit === "m") value = Math.floor(Math.random() * 59) + 1;
  else if (unit === "h") value = Math.floor(Math.random() * 23) + 1;
  else value = Math.floor(Math.random() * 7) + 1;
  return `${value}${unit}`;
};

export const generateContent = () => {
  const contents = [
    "Just launched my new project! Really excited about the possibilities ahead.",
    "Beautiful sunset today. Sometimes you need to pause and appreciate the moment.",
    "Working on something interesting. Can't wait to share more details soon!",
    "Best coffee I've had in months. Small pleasures matter.",
    "Thoughts on the latest tech trends? Would love to hear your perspectives.",
    "Finally finished that book I've been reading. Highly recommend it!",
    "Weekend vibes are hitting different today. Hope everyone is doing well.",
    "Learning something new every day. Growth mindset is everything.",
    "Great conversation with an old friend. Connection is what life's about.",
    "Trying out a new recipe tonight. Wish me luck with the cooking adventure!",
    "Studies show that coffee increases productivity by 300% every morning!",
    "Breaking: Scientists discover that the earth is actually cube-shaped!",
  ];
  return contents[Math.floor(Math.random() * contents.length)];
};

export const generateCommunityNote = (postId) => {
  const noteContents = [
    {
      text: "This claim lacks scientific evidence. Multiple peer-reviewed studies show different results.",
      sources: ["Nature Journal 2024", "Science Direct Research"],
      specialty: "Biology",
      category: "misinformation",
    },
    {
      text: "The statistics cited are outdated. Current data from WHO shows contrasting information.",
      sources: ["WHO Report 2025", "CDC Guidelines"],
      specialty: "Public Health",
      category: "misinformation",
    },
    {
      text: "This is satirical content and should not be taken literally.",
      sources: ["Original source context"],
      specialty: null,
      category: "context",
    },
    {
      text: "This content appears to be AI-generated. Analysis shows common AI patterns and lacks authentic human markers.",
      sources: ["AI Detection Analysis"],
      specialty: "AI Research",
      category: "ai-generated",
    },
    {
      text: "This image has been digitally altered. Original version shows different details.",
      sources: ["Reverse image search", "Metadata analysis"],
      specialty: "Digital Forensics",
      category: "manipulated-media",
    },
    {
      text: "Important context: This quote is taken out of context. Full statement provides different meaning.",
      sources: ["Original transcript", "Full interview"],
      specialty: null,
      category: "missing-context",
    },
  ];

  if (Math.random() > 0.7) {
    const numNotes = Math.floor(Math.random() * 2) + 1;
    return Array.from({ length: numNotes }, (_, i) => {
      const noteData = noteContents[i % noteContents.length];
      return {
        id: `${postId}-note-${i}`,
        author: generateUsername(),
        authorStatus: Math.random() > 0.5 ? "public" : "real",
        specialty: noteData.specialty,
        content: noteData.text,
        sources: noteData.sources,
        category: noteData.category,
        upvotes: Math.floor(Math.random() * 500),
        downvotes: Math.floor(Math.random() * 100),
        time: generateTime(),
        supportedByExperts: noteData.specialty
          ? Math.floor(Math.random() * 10) + 1
          : 0,
      };
    });
  }
  return null;
};

export const generatePosts = (count, statuses) => {
  const statusKeys = Object.keys(statuses);
  const posts = [];

  for (let i = 0; i < count; i++) {
    const statusIndex = i % statusKeys.length;
    const post = {
      id: i + 1,
      username: generateUsername(),
      status: statusKeys[statusIndex],
      time: generateTime(),
      content: generateContent(),
      comments: Math.floor(Math.random() * 100),
      reposts: Math.floor(Math.random() * 50),
      likes: Math.floor(Math.random() * 200),
      saves: Math.floor(Math.random() * 30),
    };
    post.communityNotes = generateCommunityNote(post.id);
    posts.push(post);
  }

  for (let i = posts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [posts[i], posts[j]] = [posts[j], posts[i]];
  }

  return posts;
};
