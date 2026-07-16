// data/projects.ts — flagship projects, work-index entries, creative archive.
// Ported from the approved Claude Design frontend (data/projects.js), typed for production.
// Any string wrapped in [ ... ] is an explicit placeholder awaiting verified content
// (tracked in CONTENT_GAPS.md). Do NOT invent metrics, dates, or outcomes.
//
// TODO(CLAUDE-CODE): long-form case-study bodies may later move to MDX under content/projects/*.
// The typed `caseStudy` object below is the interim source and is already render-ready.

export type ProjectStatus =
  | 'published'
  | 'awarded'
  | 'in-development'
  | 'working'
  | 'concept';

export type ProjectLayout = 'dark-full' | 'ivory-split' | 'grid' | 'image-led';

export type ProjectCategory =
  | 'All'
  | 'AI Systems'
  | 'Research'
  | 'Web'
  | 'Creative Technology'
  | 'Film & Motion';

export interface ArchitectureNode {
  node: string;
  desc: string;
}
export interface Decision {
  title: string;
  body: string;
}
export interface HermesModule {
  name: string;
  state: 'implemented' | 'experimental' | 'planned';
}

export interface CaseStudy {
  summary: string;
  context: string;
  challenge: string;
  constraints: string[];
  architecture: ArchitectureNode[];
  decisions: Decision[];
  results: string;
  limitations: string;
  lessons: string;
}

export interface Project {
  slug: string;
  num: string;
  title: string;
  shortTitle: string;
  category: string;
  /** Filter tags used by the /work index (subset of ProjectCategory). */
  tags: ProjectCategory[];
  year: string;
  /** Human-readable status line shown in the UI. */
  status: string;
  /** Machine status for badges/filtering. */
  statusKind: ProjectStatus;
  role: string;
  description: string;
  tech: string[];
  outcome: string;
  layout: ProjectLayout;
  /** Placeholder asset key -> /public/placeholders/<image>.webp (see ASSET_REQUIREMENTS.md). */
  image: string;
  /** Public repo URL, when one exists. */
  repo?: string | null;
  featured: boolean;
  components?: string[];
  methods?: string[];
  modules?: HermesModule[];
  features?: string[];
  caseStudy: CaseStudy;
}

export const categories: ProjectCategory[] = [
  'All',
  'AI Systems',
  'Research',
  'Web',
  'Creative Technology',
  'Film & Motion',
];

export const projects: Project[] = [
  {
    slug: 'agentic-housing',
    num: '01',
    title: 'AGENTIC AI FOR HOUSING ARREARS',
    shortTitle: 'HOUSING ARREARS AGENT',
    category: 'Agentic AI / GovTech / Hackathon',
    tags: ['AI Systems'],
    year: '[YEAR TBC]',
    status: 'AWARDED — TOP 3, CHALLENGE CATEGORY',
    statusKind: 'awarded',
    role: 'System architecture, agent design, engineering',
    description:
      'An agentic AI system designed to transform a multi-day housing-arrears rescheduling process into an immediate AI-assisted service.',
    tech: ['Python', 'LangGraph', 'FastAPI', 'Pydantic', 'OCR', 'Ollama'],
    outcome:
      'Placed in the top three of the hackathon challenge category and received an award.',
    layout: 'dark-full',
    image: 'housing-agent-dashboard',
    repo: 'https://github.com/mohamed2hamdoun/sahel_agent',
    featured: true,
    components: [
      'Intake validation',
      'Document intelligence',
      'OCR',
      'Financial analysis',
      'Hardship context understanding',
      'Policy decision logic',
      'Human escalation',
      'Auditability',
    ],
    caseStudy: {
      summary:
        'A multi-day, paperwork-heavy rescheduling process reimagined as an immediate, auditable, AI-assisted service — agents handle intake, document intelligence and policy logic; humans stay in the loop for judgment calls.',
      context:
        'Housing-arrears rescheduling traditionally requires residents to submit documents, wait for manual review, and go through several back-and-forth rounds before a decision. Built under hackathon constraints for a GovTech challenge.',
      challenge:
        'Compress a multi-day administrative workflow into minutes without sacrificing policy compliance, fairness in hardship assessment, or the ability to audit every decision.',
      constraints: [
        'Hackathon time budget',
        'Local-first model execution (Ollama)',
        'Strict auditability of every agent decision',
        'Human escalation path required by design',
      ],
      architecture: [
        { node: 'INTAKE VALIDATION', desc: 'Structured intake, eligibility pre-checks' },
        { node: 'DOCUMENT INTELLIGENCE', desc: 'Classification + field extraction, OCR fallback' },
        { node: 'FINANCIAL ANALYSIS', desc: 'Income / obligation assessment' },
        { node: 'HARDSHIP CONTEXT', desc: 'Natural-language hardship understanding' },
        { node: 'POLICY DECISION LOGIC', desc: 'Deterministic rules over agent findings' },
        { node: 'HUMAN ESCALATION', desc: 'Edge cases routed to a case officer' },
        { node: 'AUDIT TRAIL', desc: 'Every step logged and replayable' },
      ],
      decisions: [
        {
          title: 'LangGraph state machine over free-form agents',
          body: 'Explicit graph states made the flow auditable and debuggable — a hard requirement for a government decision process.',
        },
        {
          title: 'Policy logic kept deterministic',
          body: 'LLMs gather and structure evidence; the final decision applies explicit policy rules, so outcomes are explainable.',
        },
        {
          title: 'Escalation as a first-class node',
          body: 'Ambiguity routes to a human with the full evidence bundle rather than forcing a machine decision.',
        },
      ],
      results:
        'Placed in the top three of the hackathon challenge category and received an award. [DEMO METRICS AWAITING VERIFICATION — do not publish timing claims until measured.]',
      limitations:
        'Hackathon prototype: policy rules covered the challenge scenario, not the full regulation set. OCR quality varies with scan condition.',
      lessons:
        'Agentic systems earn trust through structure — explicit states, deterministic decision layers, and human escalation matter more than raw model capability.',
    },
  },
  {
    slug: 'diabetes-research',
    num: '02',
    title:
      'PROBABILITIES FEATURE ENRICHMENT FOR IMPROVED EARLY DIABETES PREDICTION',
    shortTitle: 'EARLY DIABETES PREDICTION',
    category: 'Machine Learning Research / Healthcare AI',
    tags: ['Research', 'AI Systems'],
    year: '[YEAR TBC]',
    status: 'PUBLISHED — ALGORITHMS (JOURNAL)',
    statusKind: 'published',
    role: 'Research, methodology, experiments, writing',
    description:
      'Published research on enriching feature spaces with probability-derived features to improve early diabetes prediction.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    outcome: 'Peer-reviewed publication in Algorithms.',
    layout: 'ivory-split',
    image: 'diabetes-research-chart',
    featured: true,
    methods: [
      'Logistic regression',
      'Gaussian Mixture Models',
      'Kernel Density Estimation',
      'PCA',
      'Correlation reduction',
      'Feature enrichment',
      'Evaluation metrics',
    ],
    caseStudy: {
      summary:
        'A feature-enrichment method: probability estimates from generative models (GMM, KDE) are injected back into the feature space to give downstream classifiers earlier, cleaner signal for diabetes prediction.',
      context:
        'Early diabetes prediction is a well-studied tabular ML problem where marginal gains matter clinically. The work explores whether density-derived probability features add usable signal.',
      challenge:
        'Improve early prediction without inventing data — enrich what the features already encode, and evaluate honestly.',
      constraints: [
        'Peer-review methodological rigor',
        'Reproducible pipeline',
        'No cherry-picked metrics',
      ],
      architecture: [
        { node: 'RAW FEATURES', desc: 'Clinical tabular inputs' },
        { node: 'DENSITY MODELS', desc: 'GMM + KDE per class' },
        { node: 'PROBABILITY FEATURES', desc: 'Class-conditional likelihoods appended' },
        { node: 'REDUCTION', desc: 'PCA + correlation pruning' },
        { node: 'CLASSIFIER', desc: 'Logistic regression baseline + enriched runs' },
        { node: 'EVALUATION', desc: 'Held-out metrics, comparative analysis' },
      ],
      decisions: [
        {
          title: 'Enrich, don’t replace',
          body: 'Probability features are appended to the original space so gains are attributable and the baseline stays honest.',
        },
        {
          title: 'Simple downstream classifier',
          body: 'Logistic regression keeps the study about the features, not model horsepower.',
        },
      ],
      results:
        '[EXPERIMENTAL FIGURES AWAITING AUTHOR-SUPPLIED VALUES — chart placeholders must be replaced with the published figures. Do not invent metric values.]',
      limitations:
        'Findings are dataset-scoped; broader clinical validation is future work.',
      lessons:
        'Careful feature work on honest baselines is publishable — rigor beats novelty theater.',
    },
  },
  {
    slug: 'hermes',
    num: '03',
    title: 'HERMES — AI DESIGN INTELLIGENCE PLATFORM',
    shortTitle: 'HERMES',
    category: 'Local AI / Web Generation / Agentic Systems',
    tags: ['AI Systems', 'Web', 'Creative Technology'],
    year: 'ONGOING',
    status: 'IN ACTIVE DEVELOPMENT',
    statusKind: 'in-development',
    role: 'Concept, architecture, full build',
    description:
      'A local-model-powered platform for researching visual references, extracting design intelligence, generating websites, reviewing outputs, and improving results through iterative feedback.',
    tech: ['Python', 'Qwen (local)', 'Ollama', 'FastAPI', 'TypeScript', 'Embeddings'],
    outcome:
      'Working local pipeline; critic and learning loops under active development.',
    layout: 'grid',
    image: 'hermes-system',
    featured: true,
    modules: [
      { name: 'DESIGN RESEARCH', state: 'implemented' },
      { name: 'VISUAL EXTRACTION', state: 'implemented' },
      { name: 'EMBEDDINGS', state: 'implemented' },
      { name: 'DESIGN SPECIFICATION', state: 'implemented' },
      { name: 'LOCAL QWEN BUILDER', state: 'implemented' },
      { name: 'FILE GENERATION', state: 'implemented' },
      { name: 'BROWSER PREVIEW', state: 'experimental' },
      { name: 'VISUAL CRITIC', state: 'experimental' },
      { name: 'UX CRITIC', state: 'experimental' },
      { name: 'REPAIR LOOP', state: 'planned' },
      { name: 'LEARNING LOOP', state: 'planned' },
    ],
    caseStudy: {
      summary:
        'An end-to-end design intelligence loop that runs on local models: research references, extract visual DNA, specify, generate, preview, critique, repair, learn — without sending work to remote APIs.',
      context:
        'Personal research platform exploring whether local open models can drive a serious design-generation pipeline.',
      challenge:
        'Local models are weaker than frontier APIs — the system has to make up the gap with structure: extraction, specification, critique and repair loops.',
      constraints: [
        'Fully local inference',
        'Consumer hardware budget',
        'Iterative critic-driven quality control',
      ],
      architecture: [
        { node: 'DESIGN RESEARCH', desc: 'Reference collection and analysis' },
        { node: 'VISUAL EXTRACTION', desc: 'Palette, type, layout DNA' },
        { node: 'SPEC', desc: 'Structured design specification' },
        { node: 'QWEN BUILDER', desc: 'Local generation of site code' },
        { node: 'PREVIEW + CRITICS', desc: 'Browser render, visual + UX critique' },
        { node: 'REPAIR / LEARNING', desc: 'Feedback folded into next iteration' },
      ],
      decisions: [
        {
          title: 'Specification as the contract',
          body: 'Generation quality jumped when the builder consumed a structured spec instead of raw prompts.',
        },
        {
          title: 'Critics as separate agents',
          body: 'Independent visual and UX critics catch different failure classes than the builder self-review.',
        },
      ],
      results:
        'Working research → spec → generation → preview pipeline on local Qwen. Critic and repair loops are experimental; learning loop is planned. Module states are labeled honestly throughout this site.',
      limitations:
        'Local model ceiling on complex layouts; critic reliability still being evaluated.',
      lessons:
        'Structure is leverage: extraction, specs, and critique loops let smaller local models punch above their weight.',
    },
  },
  {
    slug: 'book-vault',
    num: '04',
    title: 'AI BOOK SUMMARIZATION AND KNOWLEDGE SYSTEM',
    shortTitle: 'BOOK KNOWLEDGE VAULTS',
    category: 'Local AI / Document Intelligence / Knowledge Tools',
    tags: ['AI Systems', 'Creative Technology'],
    year: 'ONGOING',
    status: 'WORKING SYSTEM',
    statusKind: 'working',
    role: 'Design, architecture, full build',
    description:
      'A system that processes books page by page and turns them into comprehensive, story-driven, visually structured Obsidian knowledge vaults.',
    tech: ['Python', 'Ollama', 'OCR', 'Mermaid', 'Obsidian'],
    outcome:
      'Produces complete, navigable knowledge vaults with page-level citations.',
    layout: 'image-led',
    image: 'book-vault',
    featured: true,
    features: [
      'Selectable-text extraction',
      'OCR fallback',
      'Chapter detection',
      'Chunk processing',
      'Page citations',
      'Story-driven summaries',
      'Mermaid diagrams',
      'Mind maps',
      'Obsidian output',
      'Resume recovery',
      'Failure isolation',
      'Mismatch protection',
    ],
    caseStudy: {
      summary:
        'Books go in; structured, cited, story-driven Obsidian vaults come out — with diagrams, mind maps, and page-level citations, resilient to failures mid-run.',
      context:
        'Reading heavy non-fiction produces fragile notes. This system makes knowledge durable: every claim traceable to a page, every chapter mapped visually.',
      challenge:
        'Long-document processing fails in boring ways — encoding, OCR gaps, chapter mismatches, crashes at page 400. Reliability engineering is the product.',
      constraints: [
        'Local model execution',
        'Hours-long runs must survive interruption',
        'Citations must be exact to the page',
      ],
      architecture: [
        { node: 'EXTRACTION', desc: 'Selectable text first, OCR fallback' },
        { node: 'CHAPTER DETECTION', desc: 'Structure recovery from raw pages' },
        { node: 'CHUNK PROCESSING', desc: 'Windowed summarization with citations' },
        { node: 'SYNTHESIS', desc: 'Story-driven chapter narratives' },
        { node: 'VISUALIZATION', desc: 'Mermaid diagrams + mind maps' },
        { node: 'VAULT OUTPUT', desc: 'Linked Obsidian markdown' },
        { node: 'RECOVERY', desc: 'Resume, failure isolation, mismatch protection' },
      ],
      decisions: [
        {
          title: 'Page citations as a hard invariant',
          body: 'Every generated claim carries its source page — summaries without provenance were rejected early.',
        },
        {
          title: 'Resume-first architecture',
          body: 'State checkpoints after every chunk so an interrupted 6-hour run resumes, not restarts.',
        },
      ],
      results:
        'Working system producing complete vaults. [SAMPLE VAULT SCREENSHOTS AWAITING EXPORT — placeholders shown.]',
      limitations:
        'Diagram quality varies with chapter structure; scanned books depend on OCR quality.',
      lessons:
        'For long-running AI pipelines, the unglamorous parts — recovery, isolation, provenance — are what make the output trustworthy.',
    },
  },
];

// Creative archive — secondary to AI/research work.
export interface ArchiveItem {
  id: string;
  label: string;
  kind: string;
  tags: ProjectCategory[];
  note: string;
}

export const archive: ArchiveItem[] = [
  { id: 'a1', label: 'SHORT-FORM FILM EDIT', kind: 'FILM', tags: ['Film & Motion'], note: '[CLIP AWAITING EXPORT]' },
  { id: 'a2', label: 'MOTION GRAPHICS PACKAGE', kind: 'MOTION', tags: ['Film & Motion'], note: '[REEL AWAITING EXPORT]' },
  { id: 'a3', label: 'YOUTUBE PRODUCTION', kind: 'VIDEO', tags: ['Film & Motion'], note: '[THUMBNAILS AWAITING SELECTION]' },
  { id: 'a4', label: 'INTERFACE EXPERIMENT', kind: 'UI', tags: ['Web', 'Creative Technology'], note: '[SCREEN RECORDING NEEDED]' },
  { id: 'a5', label: '3D / WEBGL STUDY', kind: '3D', tags: ['Creative Technology'], note: '[RENDER NEEDED]' },
  { id: 'a6', label: 'CINEMATIC COLOR STUDY', kind: 'FILM', tags: ['Film & Motion'], note: '[STILLS AWAITING GRADE]' },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const projectSlugs = projects.map((p) => p.slug);
