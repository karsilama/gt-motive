# brands-domain

Domain layer for the brands feature.

This library contains brands state, actions, effects, selectors, facade, and error handling for the brands domain.

## Purpose

- Manage brands state and business logic.
- Expose a `BrandsFacade` for UI consumption.
- Provide domain-specific interceptors and error handling.

## Structure

- `src/lib/+state`: actions, effects, facade, reducer, selectors.
- `src/lib/brands-domain.module.ts`: domain module bootstrap.

## Commands

- `nx lint brands-domain`
