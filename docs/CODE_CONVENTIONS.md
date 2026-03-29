# Code Conventions

- Use **TypeScript** everywhere — no plain `.js` files
- Use **server components** by default; add `"use client"` only when needed
- All API routes return `{ data, error }` shaped responses
- Use **Zod** for all form and API input validation
- Component names: **PascalCase** — `HeroSection.tsx`
- Utility functions: **camelCase** — `formatDate.ts`
- Keep components under **150 lines** — split if larger
- No inline styles — use Tailwind classes only
- Images: always use `next/image` with `alt` text
