# brands-feature

Feature library for the brands section of the application.

This library contains brands routing, list and edit components, and feature wiring for the brands UX.

## Purpose

- Provide feature routes for brand listing and editing.
- Host the standalone brands components used by `apps/gt-motive`.
- Keep brand UI and routing separate from domain logic.

## Structure

- `src/lib/brand-list`: brands list component and template.
- `src/lib/brand-edit`: brand edit component and template.
- `src/lib/brands-feature.module.ts`: feature module.
- `src/lib/brands.routes.ts`: route definitions.

## Commands

- `nx lint brands-feature`
