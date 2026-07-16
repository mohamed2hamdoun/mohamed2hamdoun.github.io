// data/timeline.ts — biography timeline + skills grouped by discipline.
// Ported from the approved Claude Design frontend (data/content.js).

export type TimelinePeriod = 'EARLY' | 'THEN' | 'NOW' | 'NEXT';

export interface TimelineEntry {
  period: TimelinePeriod;
  title: string;
  body: string;
}

export const timeline: TimelineEntry[] = [
  { period: 'EARLY', title: 'FIRST TECHNOLOGY INTEREST', body: 'Computers as a place where ideas become things.' },
  { period: 'THEN', title: 'FILMMAKING & VIDEO EDITING', body: 'Learning pacing, composition, and story in the edit.' },
  { period: 'THEN', title: 'YOUTUBE & VISUAL STORYTELLING', body: 'Producing and publishing — audience as feedback loop.' },
  { period: 'NOW', title: 'ARTIFICIAL INTELLIGENCE STUDIES', body: 'BCSAI undergraduate at the University of Fujairah, UAE.' },
  { period: 'NOW', title: 'MACHINE LEARNING RESEARCH', body: 'Feature enrichment for early diabetes prediction.' },
  { period: 'NOW', title: 'ACADEMIC PUBLICATION', body: 'Peer-reviewed paper in Algorithms.' },
  { period: 'NOW', title: 'CHATBOT DEVELOPER INTERN', body: 'Flora Group — LLM chatbots for logistics & HR, integrated with real APIs.' },
  { period: 'NOW', title: 'AGENTIC SYSTEMS & HACKATHONS', body: 'Top-3 awarded agentic AI system for housing arrears.' },
  { period: 'NOW', title: 'AI & WEB PROJECTS', body: 'Hermes design-intelligence platform, book knowledge vaults, personal AI systems.' },
  { period: 'NEXT', title: 'FUTURE DIRECTION', body: 'Intelligent decision systems that people actually trust.' },
];

export interface SkillGroup {
  group: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { group: 'AI & BACKEND', items: ['Python', 'FastAPI', 'Pydantic', 'SQLAlchemy', 'PostgreSQL', 'REST APIs', 'LangChain', 'LangGraph', 'LLM APIs', 'Langfuse', 'Ollama', 'Qwen'] },
  { group: 'MACHINE LEARNING', items: ['Scikit-learn', 'XGBoost', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Model evaluation', 'Experimental design'] },
  { group: 'WEB', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Three.js', 'HTML', 'CSS', 'JavaScript'] },
  { group: 'CREATIVE', items: ['Premiere Pro', 'After Effects', 'Photoshop', 'Filmmaking', 'Motion graphics', 'Visual storytelling'] },
];
