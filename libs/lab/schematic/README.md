# lab-schematics

Custom Nx schematics and generators for the workspace.

This library provides developer tooling to generate feature route modules and other code scaffolding patterns.

## Purpose

- Provide reusable code generation for workspace patterns.
- Keep schematic logic centralized in a single library.
- Support consistent feature module generation.

## Structure

- `src/index.ts`: schematic entrypoint.
- `src/feature-route-module`: generator implementation and schema.
- `generators.json`: schematic collection configuration.

## Work with Schematics

- Create a new workspace plugin (example):
```bash
nx g @nx/plugin:plugin libs/lab/schematics --importPath=@lab/schematics
```

- Create a new generator:
```bash
nx g @nx/plugin:generator --name=feature-route-module --path=libs/lab/schematics/src/feature-route-module
```

- Use the generator:
```bash
nx g @lab/schematics:feature-route-module --name=auth --directory=libs/auth/domain/src/lib
```

## Building

```bash
nx build lab-schematics
```
