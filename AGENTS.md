# AGENTS.md — NexCMS

> **Extends:** `ShadowWalkerNC/.github/AGENTS.md` — all global rules apply unconditionally.
> **Auto-loaded by:** Claude Code · GitHub Copilot · OpenAI Codex · Cursor · Windsurf
> **Canonical global system:** [ShadowWalkerNC/.github](https://github.com/ShadowWalkerNC/.github)

---

## Project Identity

```
Project:      NexCMS
Description:  Free, open-source, self-hosted CMS for the modern web.
              Install once, own forever. No monthly fees, no lock-in.
              Joomla-inspired extension model rebuilt on Node.js + React.
Status:       Phase 0 — Architecture & Planning
Phase:        0 — Schema, wireframes, API contracts, manifest spec,
              AppContext design, GitHub + monorepo setup
Priority:     Active — architecture phase
Open-source:  Yes (MIT)
Monorepo:     Yes — pnpm workspaces + Turborepo
```

---

## Tech Stack

```
Language:       TypeScript (all packages)
Monorepo:       pnpm workspaces + Turborepo
Runtime (dev):  Bun (~4x faster installs + cold starts)
Runtime (prod): Node.js 22 (ecosystem stability)
Backend:        Hono (web-standard, runs on Node, Bun, Cloudflare Workers)
Database:       PostgreSQL 16 (self-hosted, no vendor dependency)
ORM:            Drizzle ORM (TypeScript-native, closest to raw SQL)
Auth:           Self-contained JWT (jose + bcrypt) — no cloud auth services
Admin UI:       React 19 + Vite + Shadcn/UI + TanStack Query
Public site:    Next.js 15 App Router (RSC + SSR + ISR)
Page builder:   Craftjs (open-source, React, extensible)
Extensions:     eventemitter3 hooks + dynamic ESM import() + WASM runtime
WASM runtime:   Node.js native WASM + @wasmer/wasi (sandboxed plugins)
Formula engine: mathjs (safe expression evaluation, never eval())
Styling:        Tailwind CSS + CSS Variables + Shadcn/UI
Media:          Local disk + pluggable S3 adapter
Deployment:     Docker + Railway/Render + Cloudflare Workers
CI/CD:          GitHub Actions
Shared types:   packages/types/ — single source of truth for all contracts
```

> **Why no Supabase:** NexCMS's core promise is zero vendor dependency. Raw PostgreSQL + self-contained JWT + local/S3 media. No managed cloud services in the core.

---

## Monorepo Structure

```
nexcms/
├── packages/
│   ├── types/              ← Single source of truth for all TS types + API contracts
│   ├── core/               ← Hono API engine (runs Node, Bun, Workers)
│   ├── admin/              ← Admin panel (React 19 SPA + Vite)
│   ├── web/                ← Public site renderer (Next.js 15 App Router)
│   ├── cli/                ← NexCMS CLI tool
│   ├── theme-engine/       ← Theme loading + injection system
│   ├── extension-engine/   ← Extension loading + eventemitter3 hooks
│   ├── formula-engine/     ← mathjs safe expression evaluator
│   ├── wasm-runtime/       ← WebAssembly sandbox (@wasmer/wasi)
│   ├── client/             ← Public JS/TS SDK for external integrations
│   ├── themes/             ← Hearth, Obsidian, Steel, Bloom, Ghost, Spark
│   └── extensions/         ← NexForms, NexSEO, NexBlog, NexMenu, NexGallery,
│                               NexShop, NexBooking, NexAnalytics, NexAI
├── migrations/             ← Core DB migrations (Drizzle Kit)
├── docs/                   ← Documentation site
├── templates/              ← Premade site templates
├── scripts/                ← Build + seed scripts
├── docker-compose.yml      ← Local dev environment standard
├── turbo.json              ← Turborepo pipeline config
├── pnpm-workspace.yaml     ← Workspace package config
├── CHANGELOG.md
├── CONTRIBUTING.md
└── README.md
```

---

## Active Agents for NexCMS

```
Always active:    COHERENCE · SECURITY · DOCS

Default on-demand (most sessions will need these):
  ARCHITECT     ← System design, package boundaries, extension API contracts,
                  AppContext design, WASM sandbox architecture
  ENGINEER      ← Hono API, Drizzle schema, React admin, Next.js renderer
  DATABASE      ← Drizzle schema, migrations, PostgreSQL design

Load when relevant:
  DEVOPS        ← Docker config, Turborepo pipelines, GitHub Actions, deploy
  QA            ← Test strategy, coverage, performance benchmarks
  UX            ← Admin panel UX, page builder UX, installer flow
  PRODUCT       ← Phase planning, roadmap decisions, feature scope
  AI            ← NexAI extension, WASM runtime design, formula engine

Rarely needed:
  BUSINESS      ← Open-source licensing, extension marketplace model,
                  community growth strategy
```

---

## Project-Specific Rules

These extend global rules. Global Tier 1–3 rules cannot be overridden.

1. **Zero vendor dependency in core.** The core engine (packages/core/) must run with no managed cloud services — no Supabase, no Auth0, no cloud storage. Self-hosted PostgreSQL + local disk is the baseline. ARCHITECT has veto on any core dependency that violates this.
2. **Monorepo discipline.** All code belongs in the correct package. Packages may only import from other packages via their published interface (not `src/` directly). New cross-package dependencies require ARCHITECT review.
3. **Turborepo pipeline compliance.** All build, test, and lint tasks declared in `turbo.json`. No ad-hoc build steps outside the pipeline without justification.
4. **Extension API is a public contract.** The extension manifest spec (`nexcms.manifest.json`), hook events, and `AppContext` interface are public APIs. Any breaking change requires: ARCHITECT review + major version bump + CHANGELOG entry + deprecation notice. Treat it like a published NPM package.
5. **types package is the single source of truth.** All TypeScript interfaces and API contracts live in `packages/types/`. No package defines its own duplicate types. Violations are critical bugs.
6. **Migrations are Drizzle-managed and forward-only.** All schema changes via Drizzle Kit migrations in `migrations/`. No raw SQL outside migrations. DATABASE agent reviews all migrations before push.
7. **WASM runtime is sandboxed.** Extensions running in WASM must declare all capabilities in their manifest. The sandbox grants only declared capabilities. Do not expand the default capability grant without ARCHITECT + SECURITY review.
8. **Formula engine uses mathjs, never eval().** All formula fields evaluated via `mathjs`. Never use `eval()`, `new Function()`, or any other dynamic execution for formulas. SECURITY agent hard veto on violations.
9. **docker-compose is the dev standard.** All local development via `docker-compose up`. Do not introduce mandatory manual setup steps outside Docker.
10. **Open-source safe.** No secrets in committed files. `.env.example` updated alongside every new env var. All dependencies must be MIT, Apache-2.0, or compatible — no GPL in the core (it would restrict commercial use of self-hosted installs).
11. **Bun for dev, Node.js for prod.** Development tooling uses Bun. Production Docker images use Node.js 22. Do not write Bun-specific code in packages/core/ — Hono must remain runtime-agnostic.
12. **Branch naming:** `feature/[package]-[short-description]` · `fix/[package]-[issue]` · `chore/[scope]` · `docs/[topic]`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for JWT signing (min 32 chars) |
| `JWT_REFRESH_SECRET` | Yes | Separate secret for refresh tokens |
| `MEDIA_STORAGE` | Yes | `local` or `s3` |
| `MEDIA_LOCAL_PATH` | If local | Absolute path to media uploads directory |
| `S3_BUCKET` | If S3 | S3 bucket name |
| `S3_REGION` | If S3 | AWS region |
| `S3_ACCESS_KEY` | If S3 | AWS access key |
| `S3_SECRET_KEY` | If S3 | AWS secret key |
| `ANTHROPIC_API_KEY` | NexAI ext only | Claude API key — NexAI extension only |
| `PORT` | No (default 3000) | Hono server port |
| `NODE_ENV` | Yes | `development` or `production` |

Never commit values. Always use `.env.example`. Self-hosters must be able to run NexCMS with only `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, and `MEDIA_LOCAL_PATH`.

---

## Current Phase Context

```
Phase:              0 — Architecture & Planning
Phase goal:         Define the complete technical foundation before writing
                    any production code. Schema, API contracts, manifest spec,
                    AppContext design, wireframes, monorepo scaffolding.
Timeline:           Now → July 2026
Definition of done: Drizzle schema complete. Full API contract spec written.
                    Extension manifest spec finalized. AppContext interface
                    designed. Admin panel wireframes complete. Monorepo
                    scaffolding with all packages created (empty stubs ok).
Next phase:         Phase 1 — Core Engine (Jul–Sep 2026)
                    Hono API, Drizzle schema live, admin panel, page builder,
                    formula engine, first theme.
```

---

## Roadmap Reference

| Phase | Timeline | Goal |
|---|---|---|
| **0 — Architecture** | Now → Jul 2026 | Schema, wireframes, API contracts, monorepo setup |
| **1 — Core Engine** | Jul–Sep 2026 | Hono API, Drizzle, admin panel, page builder, first theme |
| **2 — Extensions & Themes** | Sep–Nov 2026 | Theme engine, extension installer, JS runtime, 4 core extensions |
| **3 — Visual Builder** | Nov 2026–Jan 2027 | Craftjs drag-and-drop, WASM runtime beta |
| **4 — CLI & Deploy** | Q1 2027 | CLI, Docker, multi-site, static export, Cloudflare Workers |
| **5 — Community** | Q2 2027+ | Docs site, extension registry, community forum |

---

## Known Issues / Watch List

- **Phase 0 only:** No production code exists yet. All agent work in this phase is architecture, schema design, and spec writing. Do not begin implementing packages/core/ before Phase 0 is formally closed.
- **Extension API stability:** Even in Phase 0, the extension manifest spec and AppContext interface must be treated as public API. Once finalized, changing them in Phase 1+ has downstream impact on any early third-party extension developers.
- **WASM sandbox scope:** The WASM capability model must be fully designed in Phase 0. Expanding it post-launch is a security-sensitive operation.
- **GPL dependency check:** Every proposed npm dependency must be license-checked. GPL or LGPL dependencies in core violate the open-source commercial promise. Run `license-checker` before finalizing any package.json.
- **Bun vs Node boundary:** Packages/core/ is the Hono engine and must remain runtime-agnostic. Do not use Bun-native APIs (e.g., `Bun.serve`, `Bun.file`) inside core. Bun is a dev tooling choice, not a runtime requirement.
- **Self-hosting promise:** Any architectural decision that introduces a required third-party service (auth, storage, email) without a self-hosted alternative violates the core product promise. ARCHITECT hard veto.

---

## Agent Confirmation for NexCMS

After loading this file, add to `DISPATCH CONFIRMED`:

```
Project AGENTS.md: loaded — NexCMS
Stack: TypeScript · Hono · Next.js 15 · Drizzle · PostgreSQL · Turborepo
Phase: 0 — Architecture & Planning (no production code yet)
Project rules active: 12 overrides
Vendor dependency rule: ACTIVE — no managed cloud services in core
Extension API: public contract — design decisions are irreversible post-Phase 1
Known issues noted: yes
```

---

*Version: 1.0 | Extends: ShadowWalkerNC/.github/AGENTS.md | Project: NexCMS*
