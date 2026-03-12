export interface CountryPosition {
  country: string;
  position: number; // 0-100
}

export interface ScaleData {
  id: string;
  name: string;
  leftLabel: string;
  rightLabel: string;
  description: string;
  leftDescription: string;
  rightDescription: string;
  countries: CountryPosition[];
  scenarioQuestions: string[];
}

export const cultureScales: ScaleData[] = [
  {
    id: "communicating",
    name: "Communicating",
    leftLabel: "Low-context",
    rightLabel: "High-context",
    description:
      "How much is communicated through explicit statements versus implicit understanding, body language, and shared context.",
    leftDescription:
      "Good communication is precise, simple, and clear. Messages are expressed and understood at face value.",
    rightDescription:
      "Good communication is sophisticated, nuanced, and layered. Messages are often implied and require reading between the lines.",
    countries: [
      { country: "🇺🇸 US", position: 8 },
      { country: "🇦🇺 Australia", position: 12 },
      { country: "🇳🇱 Netherlands", position: 15 },
      { country: "🇩🇪 Germany", position: 18 },
      { country: "🇬🇧 UK", position: 30 },
      { country: "🇫🇷 France", position: 55 },
      { country: "🇧🇷 Brazil", position: 62 },
      { country: "🇮🇳 India", position: 68 },
      { country: "🇰🇷 Korea", position: 82 },
      { country: "🇯🇵 Japan", position: 92 },
    ],
    scenarioQuestions: [
      "You're presenting a proposal to colleagues from a high-context culture. How would you adjust your communication style to ensure your key points land effectively?",
      "A colleague responds to your email with 'That's an interesting idea.' In your culture, what would this mean — and how might it be interpreted differently in a high-context environment?",
    ],
  },
  {
    id: "evaluating",
    name: "Evaluating",
    leftLabel: "Direct negative feedback",
    rightLabel: "Indirect negative feedback",
    description:
      "How bluntly negative feedback is given — from frank and straightforward to soft, diplomatic, and wrapped in positive messages.",
    leftDescription:
      "Negative feedback is given frankly, bluntly, and honestly. Critical messages stand alone, not softened by praise.",
    rightDescription:
      "Negative feedback is given softly, subtly, and diplomatically. It is wrapped in positive messages and delivered privately.",
    countries: [
      { country: "🇮🇱 Israel", position: 5 },
      { country: "🇳🇱 Netherlands", position: 10 },
      { country: "🇷🇺 Russia", position: 15 },
      { country: "🇩🇪 Germany", position: 20 },
      { country: "🇫🇷 France", position: 32 },
      { country: "🇺🇸 US", position: 45 },
      { country: "🇬🇧 UK", position: 55 },
      { country: "🇧🇷 Brazil", position: 62 },
      { country: "🇮🇳 India", position: 70 },
      { country: "🇯🇵 Japan", position: 88 },
    ],
    scenarioQuestions: [
      "You need to tell a team member from a culture that favors indirect feedback that their work is below expectations. How would you approach this conversation?",
      "Your manager from a direct-feedback culture tells you bluntly that your report 'doesn't work.' How do you interpret and respond to this?",
    ],
  },
  {
    id: "persuading",
    name: "Persuading",
    leftLabel: "Principles-first",
    rightLabel: "Applications-first",
    description:
      "Whether people are persuaded by theoretical arguments and principles or by practical examples and concrete evidence.",
    leftDescription:
      "People are trained to develop theory and complex concepts before presenting a conclusion. The theoretical framework is valued.",
    rightDescription:
      "People are trained to begin with a concrete example or practical application. Theoretical discussions are avoided in business.",
    countries: [
      { country: "🇮🇹 Italy", position: 10 },
      { country: "🇫🇷 France", position: 15 },
      { country: "🇩🇪 Germany", position: 20 },
      { country: "🇷🇺 Russia", position: 25 },
      { country: "🇧🇷 Brazil", position: 40 },
      { country: "🇬🇧 UK", position: 65 },
      { country: "🇺🇸 US", position: 80 },
      { country: "🇦🇺 Australia", position: 85 },
    ],
    scenarioQuestions: [
      "You're pitching an idea to a principles-first audience. How would you restructure your usual presentation to be more persuasive?",
      "A colleague keeps asking 'but why?' before accepting your proposal. What does this signal about their persuasion style, and how would you adapt?",
    ],
  },
  {
    id: "leading",
    name: "Leading",
    leftLabel: "Egalitarian",
    rightLabel: "Hierarchical",
    description:
      "How much respect and deference is shown to authority figures and how flat or layered organizational structures are.",
    leftDescription:
      "The ideal distance between a boss and subordinate is low. The best boss is a facilitator among equals. Organizational structures are flat.",
    rightDescription:
      "The ideal distance between a boss and subordinate is high. The best boss is a strong director who leads from the front. Status is important.",
    countries: [
      { country: "🇩🇰 Denmark", position: 5 },
      { country: "🇳🇱 Netherlands", position: 10 },
      { country: "🇦🇺 Australia", position: 18 },
      { country: "🇺🇸 US", position: 25 },
      { country: "🇬🇧 UK", position: 30 },
      { country: "🇫🇷 France", position: 55 },
      { country: "🇧🇷 Brazil", position: 62 },
      { country: "🇮🇳 India", position: 75 },
      { country: "🇨🇳 China", position: 82 },
      { country: "🇯🇵 Japan", position: 88 },
    ],
    scenarioQuestions: [
      "You're managing a team with members from both egalitarian and hierarchical cultures. How do you run meetings so everyone contributes comfortably?",
      "You've been assigned a senior mentor from a hierarchical culture. How would you approach the relationship differently than with a peer-like mentor?",
    ],
  },
  {
    id: "deciding",
    name: "Deciding",
    leftLabel: "Consensual",
    rightLabel: "Top-down",
    description:
      "Whether decisions are made by group agreement or by an individual in authority.",
    leftDescription:
      "Decisions are made by group agreement. The process may take longer but implementation is fast because everyone is committed.",
    rightDescription:
      "Decisions are made by individuals (usually the boss). The process is quick but may require selling the decision afterward.",
    countries: [
      { country: "🇯🇵 Japan", position: 5 },
      { country: "🇸🇪 Sweden", position: 12 },
      { country: "🇳🇱 Netherlands", position: 18 },
      { country: "🇩🇪 Germany", position: 25 },
      { country: "🇬🇧 UK", position: 45 },
      { country: "🇺🇸 US", position: 55 },
      { country: "🇧🇷 Brazil", position: 65 },
      { country: "🇫🇷 France", position: 72 },
      { country: "🇮🇳 India", position: 80 },
      { country: "🇨🇳 China", position: 88 },
      { country: "🇳🇬 Nigeria", position: 92 },
    ],
    scenarioQuestions: [
      "Your team uses a top-down decision style, but you're partnering with a team that prefers consensus. How do you align on a joint project decision?",
      "A decision was made quickly by leadership, but team members from a consensual culture feel unheard. How do you address this?",
    ],
  },
  {
    id: "trusting",
    name: "Trusting",
    leftLabel: "Task-based",
    rightLabel: "Relationship-based",
    description:
      "Whether trust is built through business-related activities or through personal connections and shared meals.",
    leftDescription:
      "Trust is built through business activities. Work relationships are built and dropped easily based on practicality.",
    rightDescription:
      "Trust is built through sharing meals, evening drinks, and personal connections. Relationships are long-lasting and deep.",
    countries: [
      { country: "🇺🇸 US", position: 8 },
      { country: "🇳🇱 Netherlands", position: 12 },
      { country: "🇩🇰 Denmark", position: 15 },
      { country: "🇬🇧 UK", position: 22 },
      { country: "🇩🇪 Germany", position: 28 },
      { country: "🇫🇷 France", position: 48 },
      { country: "🇧🇷 Brazil", position: 68 },
      { country: "🇮🇳 India", position: 75 },
      { country: "🇨🇳 China", position: 82 },
      { country: "🇸🇦 Saudi Arabia", position: 90 },
    ],
    scenarioQuestions: [
      "You're starting a project with partners from a relationship-based culture. What steps would you take in the first few weeks to build trust effectively?",
      "A new colleague from a task-based culture seems to skip social invitations. How do you interpret this, and should you adapt your approach?",
    ],
  },
  {
    id: "disagreeing",
    name: "Disagreeing",
    leftLabel: "Confrontational",
    rightLabel: "Avoids confrontation",
    description:
      "Whether open disagreement is seen as positive for the team or as harmful to group harmony.",
    leftDescription:
      "Disagreement and debate are positive for the team. Open confrontation is seen as appropriate and won't damage relationships.",
    rightDescription:
      "Disagreement and confrontation are negative for the team. Open conflict is seen as inappropriate and can break relationships.",
    countries: [
      { country: "🇮🇱 Israel", position: 5 },
      { country: "🇫🇷 France", position: 12 },
      { country: "🇩🇪 Germany", position: 18 },
      { country: "🇳🇱 Netherlands", position: 22 },
      { country: "🇺🇸 US", position: 42 },
      { country: "🇬🇧 UK", position: 48 },
      { country: "🇧🇷 Brazil", position: 58 },
      { country: "🇮🇳 India", position: 65 },
      { country: "🇨🇳 China", position: 78 },
      { country: "🇯🇵 Japan", position: 85 },
      { country: "🇹🇭 Thailand", position: 92 },
    ],
    scenarioQuestions: [
      "In a meeting with colleagues who avoid confrontation, you strongly disagree with the proposed plan. How do you express your concerns without causing discomfort?",
      "A colleague from a confrontational culture challenges your idea passionately in front of the team. How do you respond constructively?",
    ],
  },
  {
    id: "scheduling",
    name: "Scheduling",
    leftLabel: "Linear-time",
    rightLabel: "Flexible-time",
    description:
      "Whether time is viewed as a fixed commodity to be scheduled strictly, or as a flexible resource that adapts to circumstances.",
    leftDescription:
      "Project steps are approached sequentially. Deadlines and schedules are firm. Punctuality and organization are highly valued.",
    rightDescription:
      "Project steps are approached fluidly. Many things are dealt with at once. Plans are adaptable and interruptions are normal.",
    countries: [
      { country: "🇩🇪 Germany", position: 5 },
      { country: "🇯🇵 Japan", position: 10 },
      { country: "🇸🇪 Sweden", position: 15 },
      { country: "🇺🇸 US", position: 22 },
      { country: "🇬🇧 UK", position: 28 },
      { country: "🇫🇷 France", position: 42 },
      { country: "🇧🇷 Brazil", position: 68 },
      { country: "🇮🇳 India", position: 75 },
      { country: "🇳🇬 Nigeria", position: 82 },
      { country: "🇸🇦 Saudi Arabia", position: 88 },
    ],
    scenarioQuestions: [
      "You're coordinating a project with a team that has a flexible-time approach. How do you set expectations around deadlines and deliverables?",
      "A meeting with a linear-time culture partner started 20 minutes late due to your scheduling. How do you recover and what changes would you make going forward?",
    ],
  },
];
