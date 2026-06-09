import nx from '@nx/eslint-plugin';
import baseConfig from './eslint.base.config.mjs';

export default [
  ...baseConfig,
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"],
          depConstraints: [
            {
              sourceTag: "type:domain",
              onlyDependOnLibsWithTags: ["type:util"],
            },
            {
              sourceTag: "type:ui",
              onlyDependOnLibsWithTags: ["type:ui", "type:util", "type:domain"],
            },
            {
              sourceTag: "type:infrastructure",
              onlyDependOnLibsWithTags: ["type:domain", "type:util"],
            },
            {
              sourceTag: "type:state",
              onlyDependOnLibsWithTags: [
                "type:domain",
                "type:util",
                "type:infrastructure",
              ],
            },
            {
              sourceTag: "type:feature",
              onlyDependOnLibsWithTags: [
                "type:domain",
                "type:ui",
                "type:util",
                "type:infrastructure",
                "type:state",
              ],
            },
            {
              sourceTag: "type:app",
              onlyDependOnLibsWithTags: [
                "type:feature",
                "type:ui",
                "type:util",
                "type:domain",
                "type:infrastructure",
                "type:state",
              ],
            },
            {
              sourceTag: "type:util",
              onlyDependOnLibsWithTags: ["type:util"],
            },
            {
              sourceTag: "scope:lab",
              onlyDependOnLibsWithTags: ["scope:lab", "type:util"],
            },
            {
              sourceTag: "scope:shared",
              onlyDependOnLibsWithTags: ["scope:shared", "type:util"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
