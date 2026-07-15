import { describe, it, expect } from 'vitest';
import {
  projects,
  projectSlugs,
  getProject,
  nextProject,
  type ProjectCategory,
} from '@/data/projects';

// Replicates the /work index filter (components/work/WorkIndex.tsx): 'All' returns
// everything, any other category returns projects whose `tags` include it.
const filterByCategory = (cat: ProjectCategory) =>
  cat === 'All' ? projects : projects.filter((p) => p.tags.includes(cat));

describe('getProject', () => {
  it('returns the matching project for a known slug', () => {
    expect(getProject('hermes')?.slug).toBe('hermes');
    expect(getProject('agentic-housing')?.title).toContain('HOUSING');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProject('does-not-exist')).toBeUndefined();
  });
});

describe('nextProject', () => {
  it('advances to the following project', () => {
    expect(nextProject('agentic-housing').slug).toBe('diabetes-research');
  });

  it('wraps around from the last project to the first', () => {
    const last = projects[projects.length - 1];
    expect(nextProject(last.slug).slug).toBe(projects[0].slug);
  });
});

describe('projectSlugs', () => {
  it('has one slug per project, in order', () => {
    expect(projectSlugs).toHaveLength(projects.length);
    expect(projectSlugs).toEqual(projects.map((p) => p.slug));
  });
});

describe('filterByCategory (WorkIndex filter)', () => {
  it("returns all projects for 'All'", () => {
    expect(filterByCategory('All')).toHaveLength(projects.length);
  });

  it('returns only projects tagged with a specific category', () => {
    expect(filterByCategory('Research').map((p) => p.slug)).toEqual(['diabetes-research']);
    expect(filterByCategory('Web').map((p) => p.slug)).toEqual(['hermes']);
    // every flagship project is tagged 'AI Systems'
    expect(filterByCategory('AI Systems')).toHaveLength(projects.length);
  });

  it('returns an empty list for a category no project carries', () => {
    expect(filterByCategory('Film & Motion')).toHaveLength(0);
  });
});
