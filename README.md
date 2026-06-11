# General structure of `libs/`

Pleas use `nx serve` to run local project

This project uses an Nx monorepo with a `libs/` folder that groups shared logic, domain layers, and reusable components.

## Overview

- `libs/brands`
  - `domain`: contains brands domain logic, state management, and data services.
  - `feature`: contains the feature module, components, and routes specific to the brands functionality.

- `libs/configuration`
  - `domain`: contains the domain logic for application configuration.
  - `infrastructure`: exposes concrete implementations of configuration services, providers, and adapters.

- `libs/error`
  - `src/lib/error`: contains shared error types, classes, and utilities.

- `libs/lab`
  - `button/ui`: reusable button components.
  - `forms/ui`: reusable form components and controls.
  - `ui`: general UI components such as avatar and loading indicators.
  - `util`: shared utilities and helpers.
  - `virtual-scroll`: reusable virtual scroll component.
  - `schematic`: custom Nx/Angular schematics/generators.

## Common patterns

Each library follows a similar structure:

- `project.json` defines targets, dependencies, and package configuration.
- `tsconfig.json` controls TypeScript compilation for that library.
- `src/lib` contains the library's main implementation.
- Inside `src/lib`, folders are organized by domain or component type.

## Expected usage

- `domain` libraries are the business and data layer.
- `feature` libraries contain routes and UI specific to a feature.
- `infrastructure` libraries contain concrete adapters and providers.
- `ui`, `button`, `forms`, `virtual-scroll`, and `util` libraries are shared components and utilities.
- `schematic` is for developer tooling and code generation.

## Example folder structure

- `libs/brands/domain/src/lib/+state`
- `libs/brands/feature/src/lib/brand-list`
- `libs/configuration/infrastructure/src/lib`
- `libs/lab/button/ui/src/lib`
- `libs/lab/forms/ui/src/lib`
- `libs/lab/ui/src/lib/avatar`
- `libs/lab/virtual-scroll/src/lib`
- `libs/lab/schematic/src/feature-route-module/files`

## Notes

- `libs/` is designed to be consumed by `gt-motive app`.
- Keeping libraries independent improves reusability and testability.
- Dependencies between `libs` should be explicit and managed by Nx.


     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI       : 21.2.14
Angular           : 21.2.16
Node.js           : 22.22.2
Package Manager   : yarn 1.22.22
Operating System  : darwin arm64

┌───────────────────────────────────┬───────────────────┬───────────────────┐
│ Package                           │ Installed Version │ Requested Version │
├───────────────────────────────────┼───────────────────┼───────────────────┤
│ @angular-devkit/build-angular     │ 21.2.14           │ ~21.2.0           │
│ @angular-devkit/core              │ 21.2.14           │ ~21.2.0           │
│ @angular-devkit/schematics        │ 21.2.14           │ ~21.2.0           │
│ @angular/build                    │ 21.2.14           │ ~21.2.0           │
│ @angular/cdk                      │ 21.2.14           │ ~21.2.0           │
│ @angular/cli                      │ 21.2.14           │ ~21.2.0           │
│ @angular/common                   │ 21.2.16           │ ~21.2.0           │
│ @angular/compiler                 │ 21.2.16           │ ~21.2.0           │
│ @angular/compiler-cli             │ 21.2.16           │ ~21.2.0           │
│ @angular/core                     │ 21.2.16           │ ~21.2.0           │
│ @angular/forms                    │ 21.2.16           │ ~21.2.0           │
│ @angular/language-service         │ 21.2.16           │ ~21.2.0           │
│ @angular/localize                 │ 21.2.16           │ ^21.2.16          │
│ @angular/material                 │ 21.2.14           │ ~21.2.0           │
│ @angular/platform-browser         │ 21.2.16           │ ~21.2.0           │
│ @angular/platform-browser-dynamic │ 21.2.16           │ ~21.2.0           │
│ @angular/router                   │ 21.2.16           │ ~21.2.0           │
│ @schematics/angular               │ 21.2.14           │ ~21.2.0           │
│ rxjs                              │ 7.8.2             │ ~7.8.0            │
│ typescript                        │ 5.9.3             │ ~5.9.0            │
│ zone.js                           │ 0.14.10           │ ~0.14.0           │
└───────────────────────────────────┴───────────────────┴───────────────────┘