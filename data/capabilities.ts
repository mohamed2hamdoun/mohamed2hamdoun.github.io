// data/capabilities.ts — "WHAT I DO" areas, process stages, working principles.
// Ported from the approved Claude Design frontend (data/content.js).

export interface Capability {
  num: string;
  title: string;
  body: string;
  tech: string[];
  project: { label: string; href: string };
  proof: string;
  /** decorative diagram key */
  diagram: 'graph' | 'screen' | 'chart' | 'frames';
}

export const capabilities: Capability[] = [
  {
    num: '01',
    title: 'AI SYSTEMS AND AGENTS',
    body: 'Agentic architectures with explicit state, deterministic decision layers, and human escalation — systems that can be trusted, audited, and debugged.',
    tech: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Pydantic', 'Ollama', 'Qwen'],
    project: { label: 'HOUSING ARREARS AGENT', href: '/work/agentic-housing' },
    proof: 'Top 3 — hackathon challenge category, awarded.',
    diagram: 'graph',
  },
  {
    num: '02',
    title: 'WEB PRODUCTS AND INTERFACES',
    body: 'Component-based frontends where the engineering serves the experience — typed, fast, and designed like they were meant to be looked at.',
    tech: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Three.js', 'REST APIs', 'SQL'],
    project: { label: 'HERMES PLATFORM', href: '/work/hermes' },
    proof: 'End-to-end local design-to-website pipeline.',
    diagram: 'screen',
  },
  {
    num: '03',
    title: 'MACHINE LEARNING RESEARCH',
    body: 'Honest methodology on real problems: feature engineering, generative density models, and evaluation that survives peer review.',
    tech: ['Scikit-learn', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib', 'Experimental design'],
    project: { label: 'EARLY DIABETES PREDICTION', href: '/work/diabetes-research' },
    proof: 'Peer-reviewed publication in Algorithms.',
    diagram: 'chart',
  },
  {
    num: '04',
    title: 'CREATIVE DIRECTION AND MOTION',
    body: 'Four years of filmmaking and motion design shape how systems communicate — pacing, hierarchy, and story applied to technical work.',
    tech: ['Premiere Pro', 'After Effects', 'Photoshop', 'Motion graphics', 'Visual storytelling'],
    project: { label: 'CREATIVE ARCHIVE', href: '/work#archive' },
    proof: '4+ years of creative production.',
    diagram: 'frames',
  },
];

export interface ProcessStage {
  num: string;
  name: string;
  note: string;
}

export const processStages: ProcessStage[] = [
  { num: '01', name: 'UNDERSTAND', note: 'Problem, users, constraints' },
  { num: '02', name: 'RESEARCH', note: 'Prior art, data, references' },
  { num: '03', name: 'ARCHITECT', note: 'System states, contracts' },
  { num: '04', name: 'BUILD', note: 'Iterative, working software' },
  { num: '05', name: 'TEST', note: 'Failure cases first' },
  { num: '06', name: 'REFINE', note: 'Critique loops, polish' },
  { num: '07', name: 'DELIVER', note: 'Documented, handed off' },
];

export interface Principle {
  num: string;
  title: string;
  body: string;
}

export const principles: Principle[] = [
  { num: '01', title: 'SYSTEMS SHOULD COMMUNICATE', body: 'Complex systems should not only work; they should explain themselves clearly.' },
  { num: '02', title: 'STRUCTURE IS LEVERAGE', body: 'Explicit states, contracts, and critique loops beat raw capability.' },
  { num: '03', title: 'HONESTY IN NUMBERS', body: 'No invented metrics. Verified results only, placeholders everywhere else.' },
  { num: '04', title: 'CRAFT CARRIES MEANING', body: 'The filmmaking instinct: pacing and hierarchy are part of the message.' },
];
