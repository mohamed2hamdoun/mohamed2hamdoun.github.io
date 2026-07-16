// data/openSource.ts — smaller applied-ML / build projects from GitHub + CV.
// Secondary to the flagship case studies. Links point at real PUBLIC repos only;
// entries without a public repo omit the link. No invented results.

export interface OpenSourceProject {
  title: string;
  kind: string;
  description: string;
  tech: string[];
  /** Public repo URL, or null when the repo is private / not published. */
  repo: string | null;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    title: 'ChatGPT-like Web Application',
    kind: 'LLM / BACKEND',
    description:
      'A conversational web backend built on FastAPI and LLM APIs — prompt handling, conversation flow, chat-history management, and scalable real-time endpoints.',
    tech: ['Python', 'FastAPI', 'LLM APIs'],
    repo: null,
  },
  {
    title: 'California House Price Prediction',
    kind: 'APPLIED ML / REGRESSION',
    description:
      'End-to-end ML project predicting median California house values with an XGBoost regressor — full workflow from data analysis to model evaluation.',
    tech: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    repo: 'https://github.com/mohamed2hamdoun/houses-prices-prediction',
  },
  {
    title: 'Rocks vs Mines Prediction',
    kind: 'APPLIED ML / CLASSIFICATION',
    description:
      'A full classification pipeline — data loading, preprocessing, EDA, feature engineering, and model evaluation with Scikit-learn.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    repo: 'https://github.com/mohamed2hamdoun/ml-rocks-mines-prediction',
  },
  {
    title: 'Loan Status Prediction',
    kind: 'APPLIED ML / CLASSIFICATION',
    description:
      'Supervised classification predicting loan approval status, with preprocessing and model comparison.',
    tech: ['Python', 'Scikit-learn'],
    repo: 'https://github.com/mohamed2hamdoun/Loan-Status-Prediction-using-Machine-Learning',
  },
  {
    title: 'Fake News Prediction',
    kind: 'APPLIED ML / NLP',
    description:
      'Text-classification model that flags fake news, covering text preprocessing and feature extraction.',
    tech: ['Python', 'Scikit-learn', 'NLP'],
    repo: 'https://github.com/mohamed2hamdoun/fake-news-prediction',
  },
  {
    title: 'AI-Powered Applications (IBM)',
    kind: 'COURSEWORK / LLM',
    description:
      'A collection of AI-powered application projects built through IBM’s "Building AI-Powered Applications" course.',
    tech: ['Python', 'JavaScript', 'LLM APIs'],
    repo: 'https://github.com/mohamed2hamdoun/Building-AI-powered-applications-IBM-course',
  },
];
