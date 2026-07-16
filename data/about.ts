// data/about.ts — education, certifications, and professional experience.
// All entries verified from Mohamed's CV (2026). No invented dates or claims.

export interface Education {
  program: string;
  degree: string;
  institution: string;
  location: string;
  timeframe: string;
  status: string;
}

export const education: Education = {
  program: 'Bachelor of Computer Science in AI & Machine Learning',
  degree: 'BCSAI',
  institution: 'University of Fujairah',
  location: 'United Arab Emirates',
  timeframe: 'Expected 2028',
  status: 'IN PROGRESS',
};

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export const certifications: Certification[] = [
  { title: 'IBM AI Engineering', issuer: 'Coursera', year: '2025' },
  { title: 'IBM Generative AI Engineering', issuer: 'Coursera', year: '2025' },
  { title: 'Introduction to Front-End Development', issuer: 'Meta · Coursera', year: '2025' },
  { title: 'CS50x — Introduction to Programming with Python', issuer: 'Harvard', year: '2023' },
  { title: 'Google IT Automation with Python', issuer: 'Coursera', year: '2022' },
];

export interface Experience {
  role: string;
  company: string;
  timeframe: string;
  summary: string;
  points: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    role: 'Chatbot Developer Intern',
    company: 'Flora Group W.L.L',
    timeframe: '2 months',
    summary:
      'Built and enhanced an AI-powered chatbot supporting logistics and HR systems, integrated with real-world internal and external APIs.',
    points: [
      'Implemented LLM-based conversational logic with LangChain and LangGraph.',
      'Integrated chatbot functionality with internal and external APIs to handle manager-level requests.',
      'Built Python backend components and applied observability with Langfuse.',
      'Worked across authentication, role-based requests, and client interaction workflows.',
    ],
    tech: ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'Langfuse', 'REST APIs'],
  },
];
