import { getJestProjectsAsync } from '@nx/jest';
import type { Config } from 'jest';

export default async (): Promise<Config> => {
  const projects = await getJestProjectsAsync();
  return {
    projects: projects.filter(
      (project) =>
        project !== '<rootDir>/jest.config.ts' && project !== 'jest.config.ts',
    ),
  };
};
