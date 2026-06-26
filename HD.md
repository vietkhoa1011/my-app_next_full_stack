# — Project Conventions & Guidelines

This document captures the coding standards observed in this project and provides recommendations for development.

---

## Existing Project Conventions

### Architecture

- **App Router**: The project uses Next.js App Router (`src/app/`) with nested layouts, pages, and route handlers.
- **Feature-based modular structure**: Business logic is organized into feature modules under `src/features/` (e.g., `anime`, `search`, `homepage`).
-Current architecture: Hybrid
    - App Router
    - Partial Feature-based
    - Some business logic still exists under app/
- **Server/Client split**: Server Components are the default; Client Components explicitly declare `"use client"` at the top of the file.
- **Data flow**: Server Components fetch data via async service functions and pass props down to Client Components. Client Components call API routes for interactive features (e.g., search).
- **Prisma ORM**: Database access uses Prisma client with a PostgreSQL adapter. The client is a global singleton to avoid multiple instances during development.

### Folder Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/search/route.ts
│   ├── anime/[id]/page.tsx / AnimeDetailClient.tsx
│   ├── anime/page.tsx
│   ├── globals.css
│   ├── homepage-service.ts
│   ├── HomePageClient.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Shared reusable components
│   ├── home/HeroSection.tsx
│   ├── layout/Footer.tsx
│   ├── layout/Header.tsx
│   ├── ui/AnimeCardBase.tsx
│   ├── ui/Pagination.tsx
│   └── ui/ScoreBadge.tsx
├── features/               # Feature modules (self-contained)
│   ├── anime/
│   │   ├── components/
│   │   ├── mappers/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── homepage/
│   │   └── services/       # Re-exports from anime feature
│   └── search/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── generated/prisma/       # Auto-generated Prisma client (do not edit)
├── lib/prisma.ts           # Prisma client singleton
└── types/                  # Empty directory, reserved for global types
```

### Naming Conventions

| Category            | Convention                        | Examples                                            |
|---------------------|-----------------------------------|-----------------------------------------------------|
| Component files     | PascalCase                        | `HeroSection.tsx`, `AnimeCardBase.tsx`              |
| Hook files          | `use` prefix + PascalCase         | `useSearch.ts`                                      |
| Service files       | camelCase `.service.ts` suffix    | `search.service.ts`, `queries.ts`, `selects.ts`     |
| Utility files       | camelCase                         | `format.ts`, `genres.ts`, `url.ts`                  |
| Type files          | camelCase `.types.ts` suffix      | `search.types.ts`; or `Anime.ts` for feature types |
| Mapper files        | camelCase + `mapper` prefix       | `animeMappers.ts`                                   |
| Barrel exports      | `index.ts` per directory          | `src/features/search/index.ts`                      |
| Export style        | Default export for components     | `export default function HeroSection`               |
|                     | Named exports for utilities       | `export function formatScore`                       |

### TypeScript Conventions

- **Strict mode** enabled in `tsconfig.json` (`"strict": true`).
- **Path alias**: `@/` maps to `./src/*`.
- **Explicit type imports**: `import type { ... }` for type-only imports.
- **Interface composition**: `AnimeCard extends AnimeBase`.
- **Generics**: `PaginatedResult<T>` for paginated responses.
- **`as const`**: Used for Prisma select objects and shared constants to narrow types.
- **Union types**: `"sm" | "md"` for component size props.
- **Inline prop types**: Defined inline for simple component props with few fields.
- **Separate type interfaces**: Defined in dedicated type files for complex data shapes.

### React Conventions

- **Functional components only** — no class components.
- **`"use client"` directive**: Required for any component using hooks, event handlers, or browser APIs.
- **Server Components**: Default (no directive). Used for data fetching and passing props to Client Components.
- **State management**: `useState` for local state; `useCallback` wrapped event handlers in custom hooks.
- **Refs**: `useRef` for DOM element references and mutable values (debounce timers, AbortControllers).
- **Children type**: `React.ReactNode` via `Readonly<{ children: React.ReactNode }>`.

### Next.js Conventions

- **App Router** (`src/app/`) with `layout.tsx` and `page.tsx` files.
- **Dynamic routes**: Folder named `[param]` (e.g., `anime/[id]/`).
- **Async route params**: `params: Promise<{ id: string }>` pattern, resolved with `await params`.
- **Async search params**: `searchParams: Promise<{ page?: string }>`.
- **Dynamic rendering**: `export const dynamic = "force-dynamic"` on server pages that should not be statically rendered.
- **Metadata**: `export const metadata: Metadata = { ... }` in layout and page files.
- **Image component**: `next/image` with `fill` prop and `sizes` attribute; remote patterns configured in `next.config.ts`.
- **Route Handlers**: Named exports (`GET`, `POST`) in `app/api/[route]/route.ts` using `NextRequest` / `NextResponse`.
- **CSS**: Global styles in `globals.css` with `@import "tailwindcss"`.

### API Conventions

- **Route Handler pattern**: `export async function GET(request: NextRequest)`.
- **Response format**: `NextResponse.json({ ... })` with explicit status codes for errors.
- **Search API**: Uses Prisma `contains` with `mode: "insensitive"` for case-insensitive querying.
- **Error responses**: Returned as JSON with `{ results, query, total, error }` shape.
- **Client calls API internally**: Client Components call `/api/search` rather than using the Prisma client directly.

### Styling Conventions

- **Tailwind CSS v4**: Uses the `@import "tailwindcss"` syntax (not `@tailwind` directives).
- **Theme tokens**: CSS custom properties (`--background`, `--foreground`) with `@theme inline` in `globals.css`.
- **Dark theme**: Background `#0a0a1a`, foreground `#ededed`.
- **Glassmorphism**: Frequent use of `backdrop-blur`, `bg-white/5`, `bg-white/10`, `border border-white/10`.
- **Gradient accents**: `bg-linear-to-r from-purple-600 to-blue-600`, `bg-linear-to-br from-purple-600 to-pink-600`.
- **Custom utilities**: `.animate-fade-in` keyframe animation, `.scrollbar-thin` custom scrollbar styles.
- **Responsive**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` as a recurring container pattern.
- **Hover effects**: Cards use `hover:scale-105`, `group-hover` for child animations.

### Error Handling

- **try/catch in API routes**: Returns `{ status: 500 }` with error JSON.
- **Search hook error state**: Tracks `error` string, skips `AbortError` (aborted requests).
- **Null/undefined guards**: Conditional rendering for optional fields (e.g., `{anime.score > 0 && ...}`).
- **Fallback values**: `formatMembers` returns `"N/A"` for null; `getFallbackGenres` provides default genres when DB has none.
- **Invalid parameter handling**: `isNaN` check on route param `id`, renders a fallback UI.
- **Not-found handling**: Anime detail page renders a 404 view when `getAnimeById` returns null.
- **Loading/empty/error states**: Search dropdown handles all three states (loading skeleton, empty message, error display).

### File Organization

- **Feature modules** group related code: types, services, utils, components, hooks, and mappers in subdirectories.
- **Barrel exports**: Each feature directory has an `index.ts` that re-exports the public API.
- **Mappers separated from services**: `mappers/` contains data transformation logic; `services/` handles Prisma queries.
- **Shared UI components**: Placed in `src/components/ui/` for reuse across features.
- **Layout components**: Placed in `src/components/layout/` (Header, Footer).
- **Generated code**: Isolated in `src/generated/prisma/` and not manually edited.

### Import Order

1. **External packages** (react, next, prisma, third-party)
2. **Internal absolute imports** (using `@/` prefix from `src/`)
3. **Relative imports** (for same-directory siblings)

No blank-line separation between groups is consistently applied, but the ordering pattern is followed.

### Performance Guidelines

- **Prisma select projections**: Only requested fields are queried (e.g., `animeCardSelect`), avoiding `SELECT *`.
- **AbortController**: Used in `useSearch` to cancel stale API requests when the query changes.
- **Debounced search**: Input is debounced at 300ms (`DEBOUNCE_MS`) before triggering a fetch.
- **Parallel data fetching**: `Promise.all` is used on server pages to fetch independent data concurrently.
- **Image optimization**: `next/image` with `fill`, `sizes`, and `priority` for above-the-fold images.
- **`as const` on Prisma selects**: Prevents mutation and enables literal types for better type inference.

---

## Recommended Conventions

These are not currently enforced in the project but are suggested to improve consistency.

### Architecture

No project convention detected beyond what is listed above. No additional recommendations.

### Folder Structure

- **Recommendation**: Remove the empty `src/types/` directory if unused, or use it for shared global type declarations.
- **Recommendation**: Consider merging `src/app/homepage-service.ts` into `src/features/homepage/services/` to complete the feature isolation pattern.

### Naming Conventions

- **Recommendation**: Adopt a consistent suffix pattern for all type files (e.g., always `.types.ts`). Currently, `Anime.ts` uses no suffix while `search.types.ts` does.
- **Recommendation**: Rename `src/app/homepage-service.ts` to `src/app/homepage-service.ts` should be moved to the `homepage` feature. The current location breaks the feature isolation pattern.

### TypeScript Conventions

- **Recommendation**: Add `"noUnusedLocals": true` and `"noUnusedParameters": true` to `tsconfig.json` to enforce dead-code elimination.
- **Recommendation**: Use `satisfies` operator instead of `as const` for Prisma select objects when type validation is desired without losing literal types.

### React Conventions

- **Recommendation**: Define component prop types as named interfaces (e.g., `interface HeroSectionProps`) rather than inline object types, to improve reusability and readability.
- **Recommendation**: Use the `React.FC<Props>` pattern or consistently use function declarations with explicit prop interfaces — currently used inconsistently.

### Next.js Conventions

- **Recommendation**: Add `loading.tsx` and `error.tsx` files for each route segment that makes database calls, to improve user experience during loading and error states.
- **Recommendation**: Use `notFound()` from `next/navigation` instead of rendering inline 404 JSX in server components.

### API Conventions

- **Recommendation**: Define a standard API response wrapper type (e.g., `ApiResponse<T>`) to standardize success/error shapes across all endpoints.
- **Recommendation**: Add request validation (e.g., with Zod) for API routes that accept user input.

### Styling Conventions

- **Recommendation**: Extract commonly used style combinations (e.g., card glassmorphism classes, gradient text classes) into reusable utility classes in `globals.css`.
- **Recommendation**: Standardize gradient color combinations (currently uses purple/pink/blue in various orders) to a consistent brand palette.

### Error Handling

- **Recommendation**: Add a global `error.tsx` at the root `src/app/` level to catch rendering errors across all routes.
- **Recommendation**: Create a shared error boundary component for client components that wraps interactive features.

### File Organization

- **Recommendation**: Remove the duplicate `homepage-service.ts` at `src/app/homepage-service.ts` — the `src/features/homepage/services/index.ts` already re-exports the same functions from `src/features/anime/services/queries.ts`.

### Import Order

- **Recommendation**: Enforce a consistent import order with blank-line separation between groups:

  1. `react` / `next` core packages
  2. Third-party packages
  3. Internal absolute imports (`@/`)
  4. Relative imports

  Consider using `eslint-plugin-import` with `import/order` rule.

