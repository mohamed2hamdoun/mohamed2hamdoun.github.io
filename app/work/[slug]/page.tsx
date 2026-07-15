import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getProject, projectSlugs } from '@/data/projects';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import Section from '@/components/case-study/Section';
import SpecList from '@/components/case-study/SpecList';
import ArchitectureDiagram from '@/components/case-study/ArchitectureDiagram';
import DecisionList from '@/components/case-study/DecisionList';
import ModuleGrid from '@/components/case-study/ModuleGrid';
import ResultBlock from '@/components/case-study/ResultBlock';
import NextProject from '@/components/case-study/NextProject';
import Bracketed from '@/components/case-study/Bracketed';

// Static params for every project slug (SSG).
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

// Next 15: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Not Found' };
  return { title: project.shortTitle, description: project.description };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  // Domain block — each project carries exactly one of these arrays; render
  // whichever exists (Hermes -> modules grid, others -> tagged SpecList).
  let domain: ReactNode = null;
  if (project.modules) {
    domain = (
      <Section tone="paper" label="MODULES" title="SYSTEM MODULES">
        <ModuleGrid modules={project.modules} />
      </Section>
    );
  } else if (project.components) {
    domain = (
      <Section tone="paper" label="COMPONENTS" title="SYSTEM COMPONENTS">
        <SpecList items={project.components} tag="C" tone="paper" />
      </Section>
    );
  } else if (project.methods) {
    domain = (
      <Section tone="paper" label="METHODS" title="METHODS & TECHNIQUES">
        <SpecList items={project.methods} tag="M" tone="paper" />
      </Section>
    );
  } else if (project.features) {
    domain = (
      <Section tone="paper" label="FEATURES" title="CAPABILITIES">
        <SpecList items={project.features} tag="F" tone="paper" />
      </Section>
    );
  }

  return (
    <article>
      <CaseStudyHero project={project} />

      <Section tone="paper" label="SUMMARY">
        <p
          className="max-w-[60ch] font-serif italic text-ink text-pretty"
          style={{ fontSize: 'clamp(22px,2.6vw,40px)', lineHeight: 1.32 }}
        >
          {cs.summary}
        </p>
      </Section>

      <Section tone="ink" label="CONTEXT" title="THE CONTEXT">
        <p
          className="max-w-[72ch] text-pretty text-muted"
          style={{ fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.65 }}
        >
          {cs.context}
        </p>
      </Section>

      <Section tone="paper" label="CHALLENGE" title="THE CHALLENGE">
        <p
          className="max-w-[72ch] text-pretty text-paper-ink"
          style={{ fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.65 }}
        >
          {cs.challenge}
        </p>
      </Section>

      {cs.constraints.length > 0 && (
        <Section tone="ink" label="CONSTRAINTS" title="CONSTRAINTS">
          <SpecList items={cs.constraints} layout="rail" tone="ink" />
        </Section>
      )}

      <Section tone="paper" label="ARCHITECTURE" title="SYSTEM ARCHITECTURE">
        <ArchitectureDiagram nodes={cs.architecture} />
      </Section>

      <Section tone="ink" label="DECISIONS" title="KEY DECISIONS">
        <DecisionList decisions={cs.decisions} />
      </Section>

      {domain}

      <Section tone="ink" label="RESULTS" title="RESULTS">
        <ResultBlock results={cs.results} outcome={project.outcome} />
      </Section>

      <Section tone="paper" label="LIMITATIONS" title="LIMITATIONS">
        <p
          className="max-w-[72ch] text-pretty text-paper-ink"
          style={{ fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.65 }}
        >
          <Bracketed text={cs.limitations} />
        </p>
      </Section>

      <Section tone="ink" label="LESSONS" title="LESSONS LEARNED">
        <p
          className="max-w-[68ch] font-serif italic text-pretty text-paper"
          style={{ fontSize: 'clamp(18px,1.8vw,26px)', lineHeight: 1.5 }}
        >
          {cs.lessons}
        </p>
      </Section>

      <NextProject slug={project.slug} />
    </article>
  );
}
