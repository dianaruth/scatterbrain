<!--
  Scatterbrain PR template. Fill in each section; delete any that genuinely don't apply.
  Keep it honest — if something wasn't tested or was skipped, say so.
-->

## What

<!-- A short description of the change and the user-facing outcome. -->

## Why

<!-- The problem this solves or the need it addresses. Link the issue if there is one. -->

## Related plan

<!--
  Link the feature plan this work belongs to, e.g. plans/features/01-scaffold-ci.md
  Update that plan's Status + Changelog as part of this PR.
-->
- Plan: `plans/features/NN-...md`

## Changes

<!-- Bullet the notable changes: files/areas touched, new components, schema/migrations, deps added. -->
-

## Screenshots / recordings

<!-- For any UI change, include before/after screenshots or a short clip. Note light + dark mode. -->

## Testing

<!-- How you verified this works. Be specific. -->
- [ ] `tsc --noEmit` passes (strict)
- [ ] Lint passes
- [ ] Unit/component tests added or updated and passing
- [ ] E2E (Playwright) passing, if applicable
- [ ] Manual verification (describe steps):

## Checklist

- [ ] Strictly typed — no `any` / `unknown` / `object` / `as` escape hatches (or explicitly justified)
- [ ] No `@ts-ignore` / `@ts-expect-error` / `eslint-disable` without an inline justification
- [ ] No secrets or keys committed; client bundle stays free of server-only secrets
- [ ] Relevant feature plan file updated (Status / Outcome / Changelog)
- [ ] Scope is focused — unrelated changes split into their own PR

## Notes for reviewer

<!-- Anything that needs context: tradeoffs, follow-ups, known gaps, things you want eyes on. -->
