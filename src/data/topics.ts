export const CareerTopics = [
  {
    id: 1,
    title: "After-Work Escape Mode",
    description:
      "Say you can’t join 회식 tonight—without sounding rude or selfish.",
    aiRole: "Your Korean team leader",
    myRole: "Junior employee in a Korean company",
  },
  {
    id: 2,
    title: "Fix-It Like a Pro",
    description: "Admit a mistake + propose a smart solution the Korean way.",
    aiRole: "Your Korean manager",
    myRole: "Junior staff who made a mistake",
  },
  {
    id: 3,
    title: "Pitch Without Overstepping",
    description: "Share ideas with leaders confidently, not arrogantly.",
    aiRole: "Your Korean team lead",
    myRole: "Junior planner/teammate in Korea",
  },
  {
    id: 4,
    title: "Senior… Could You Help Me?",
    description:
      "Ask for help politely, so you sound professional not dependent.",
    aiRole: "Busy Korean senior coworker",
    myRole: "Intern or new hire in Korea",
  },
  {
    id: 5,
    title: "Speak Up, Stay Respectful",
    description:
      "Join discussions in hierarchy-heavy rooms without stepping on toes.",
    aiRole: "Korean team leader running the meeting",
    myRole: "Junior teammate in a meeting",
  },
];



export const LoveTopics = [
  {
    id: 1,
    title: "Could You Soften Your Tone…?",
    description: "Ask someone to speak gently—without sounding accusatory.",
    aiRole: "Korean boyfriend/girlfriend",
    myRole: "Partner in a Korean–non-Korean couple",
  },
  {
    id: 2,
    title: "Why Did You Reply So Late?",
    description: "Explain late replies reassuringly, without defensiveness.",
    aiRole: "Busy Korean partner",
    myRole: "Partner feeling anxious about replies",
  },
  {
    id: 3,
    title: "I Miss You… But No Pressure",
    description: "Express longing warmly—never clingy.",
    aiRole: "Korean partner with little time",
    myRole: "Partner in a busy or long-distance relationship",
  },
  {
    id: 4,
    title: "Clumsy Crush Signals",
    description: "Recognize awkward affection and respond kindly.",
    aiRole: "Korean friend who might misunderstand",
    myRole: "Friend with a crush in Korea",
  },
  {
    id: 5,
    title: "The “What Are We?” Talk",
    description: "Define the relationship honestly but gently.",
    aiRole: "Korean “some” partner",
    myRole: "In an “almost-relationship”",
  },
];
export const BelongingTopics = [
  {
    id: 1,
    title: "Midnight Mom Energy",
    description: "Thank your friend’s mom for late-night food—warm, not stiff.",
    aiRole: "Korean host / house “mom”",
    myRole: "Student or worker living in Korea",
  },
  {
    id: 2,
    title: "Seaside Ajumma Vibes",
    description: "Balance extra kindness + hidden pressure at local shops.",
    aiRole: "Korean ajumma shop owner",
    myRole: "Customer at a Korean market or restaurant",
  },
  {
    id: 3,
    title: "Banter Mode Unlocked",
    description: "Shift from polite → playful without sounding rude.",
    aiRole: "Same-age Korean friend",
    myRole: "Friend in a mixed Korean–global friend group",
  },
  {
    id: 4,
    title: "First Round Tension",
    description: "Find the right mix of casual + respectful at a group drink.",
    aiRole: "Charismatic Korean senior / team lead",
    myRole: "Newcomer at a Korean drinking gathering",
  },
  {
    id: 5,
    title: "Soft-Heart Moment",
    description: "Say “that hurt” calmly K-style nuance, zero drama.",
    aiRole: "Korean friend who thought it was just banter",
    myRole: "Friend who got hurt by a joke",
  },
];
export const KPopTopics = [
  {
    id: 1,
    title: "Bias Talk IRL",
    description:
      "Learn how to talk about your bias naturally excited but still respectful.",
    aiRole: "Korean friend who also likes K-pop",
    myRole: "K-pop fan learning Korean",
  },
  {
    id: 2,
    title: "Playlist Recommendation Mode",
    description:
      "Share songs you like and explain why without sounding awkward or pushy.",
    aiRole: "Korean friend / crush listening",
    myRole: "Friend sharing songs",
  },
  {
    id: 3,
    title: "Dance Challenge Talk",
    description:
      "Chat about dance practice, trends, and TikTok challenges in natural Korean.",
    aiRole: "Korean friend or dance buddy",
    myRole: "K-pop / dance fan",
  },
  {
    id: 4,
    title: "Fan Community Slang 101",
    description:
      "Understand and use light Korean fan expressions without overdoing it.",
    aiRole: "Korean longtime fan friend",
    myRole: "Fan learning Korean fandom slang",
  },
  {
    id: 5,
    title: "Concert Memory Reload",
    description:
      "Describe your concert experiences with vivid but natural expressions.",
    aiRole: "Korean friend who wants to hear about it",
    myRole: "Fan after a concert",
  },
];

export const topicsByCategory = {
  Career: CareerTopics,
  
  Romance: LoveTopics,
  Belonging: BelongingTopics,
  "K-POP": KPopTopics,
} as const;
