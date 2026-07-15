// data/research.ts — publications, interests, principles.
// Ported from the approved Claude Design frontend (data/content.js).
// Do NOT invent DOI, citation count, impact factor, accuracy, or AUC values.

export interface Publication {
  id: string;
  title: string;
  journal: string;
  category: string;
  status: 'PUBLISHED' | 'UNDER REVIEW' | 'PREPRINT';
  /** [ ... ] placeholders await verified values (CONTENT_GAPS.md). */
  doi: string;
  /** null until a verified URL exists — UI hides "Read Paper" when null. */
  link: string | null;
  abstract: string;
  methods: string[];
  caseStudy: string;
}

export const publications: Publication[] = [
  {
    id: 'pub-1',
    title:
      'Probabilities Feature Enrichment for Improved Early Diabetes Prediction',
    journal: 'Algorithms',
    category: 'Machine Learning / Healthcare AI',
    status: 'PUBLISHED',
    doi: '[DOI AWAITING VERIFICATION]',
    // TODO(CLAUDE-CODE): add verified publication URL, then the "Read Paper" link appears.
    link: null,
    abstract:
      'Investigates enriching clinical feature spaces with class-conditional probability features derived from Gaussian Mixture Models and Kernel Density Estimation, combined with PCA and correlation reduction, to improve early diabetes prediction with logistic-regression classifiers.',
    methods: [
      'Logistic regression',
      'Gaussian Mixture Models',
      'Kernel Density Estimation',
      'PCA',
      'Correlation reduction',
      'Feature enrichment',
      'Evaluation metrics',
    ],
    caseStudy: '/work/diabetes-research',
  },
];

export const researchInterests = [
  'Healthcare AI',
  'Applied machine learning',
  'Energy systems',
  'Climate data',
  'Robustness',
  'Intelligent decision systems',
];

export interface ResearchPrinciple {
  title: string;
  body: string;
}

export const researchPrinciples: ResearchPrinciple[] = [
  { title: 'HONEST BASELINES', body: 'Improvements are measured against strong, simple baselines — never against strawmen.' },
  { title: 'PROVENANCE', body: 'Every figure traces to an experiment; every claim traces to evidence.' },
  { title: 'REPRODUCIBILITY', body: 'Pipelines are scripted end to end. If it can’t be re-run, it isn’t done.' },
  { title: 'CLARITY', body: 'A method that can’t be explained clearly isn’t understood yet.' },
];
