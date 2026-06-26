# AGENTS.md — Project Conventions & Guidelines

This document captures the coding standards observed in this project and provides recommendations for development.

---
# Anime CV Project – Rules for Cline

## Tech stack
- Next.js 16+ (App Router), React 19+, TypeScript strict
- Prisma ORM + PostgreSQL
- Tailwind CSS v4 (with `@import "tailwindcss"`)

## Project structure (important)
- `src/app/` – pages and API routes
- `src/features/` – feature modules: `anime`, `search`, `homepage` (each has `components/`, `services/`, `types/`, `mappers/`)
- `src/components/` – shared reusable UI components
- `src/lib/prisma.ts` – Prisma singleton

## Key conventions
- Server Components by default; use `"use client"` only when hooks/events are needed.
- Data fetching via service functions in `features/*/services/`; client-side calls go to `/api/*` routes.
- API responses: `{ data, error }` (error is a string), status code 500 for server errors.
- Prisma selects: always use `as const` objects (e.g., `animeCardSelect`) to limit fields.
- Use `next/image` with `fill` for images; sizes and remote patterns already configured.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Prisma: `npx prisma studio`, `npx prisma db push` (dev), `npx prisma migrate deploy` (prod)
- Generate: `npx prisma generate` after schema changes

## Rules
- Before writing code, read the related feature module first.
- Reuse existing services, mappers, and components before creating new ones.
- Prefer composition over inheritance.
- Never use `any`.
- Never duplicate business logic.
- Never alter API response shape without team agreement.
- Never rename exported functions or move files without explicit request.
- Never install new packages without permission.

## Error handling
- Use try/catch in API routes; return `{ data: null, error: message }`.
- In client hooks, handle AbortError silently (aborted requests are expected).
- On detail page, check `isNaN(id)` and render fallback; use `notFound()` for missing data.