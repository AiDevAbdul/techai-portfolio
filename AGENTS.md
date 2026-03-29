<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# techai.pk Implementation Notes

## Project Status: Complete ✓

All 9 implementation phases completed successfully. Full-stack personal brand website with admin dashboard.

## Key Implementation Details

### Architecture
- **Frontend**: Next.js 16 App Router with Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes (REST)
- **Database**: PostgreSQL (Supabase) + Prisma ORM v7
- **Auth**: NextAuth.js v5 (Credentials provider)
- **Email**: Resend for contact notifications
- **Storage**: Supabase for file uploads

### Route Structure
- `(public)` - Public-facing website (9 sections + detail pages)
- `(admin)` - Protected admin dashboard with CRUD operations
- `api/` - REST API endpoints for all resources

### Database Models
- User (admin credentials)
- Project (portfolio items)
- Blog (blog posts with rich text)
- Testimonial (client testimonials)
- Lead (contact form submissions)
- SiteSetting (site configuration)

### Important Notes for Future Development

1. **Prisma v7 Breaking Changes**:
   - Database URL moved to `prisma.config.ts` (not schema.prisma)
   - Run `npx prisma generate` after schema changes
   - Generated client at `src/generated/prisma/`

2. **Next.js 15+ Dynamic Routes**:
   - Route params are now `Promise<{ id: string }>` not `{ id: string }`
   - Must await params: `const { id } = await params`

3. **Environment Setup**:
   - Copy `.env.example` to `.env` and fill in values
   - Required: DATABASE_URL, NEXTAUTH_SECRET, RESEND_API_KEY
   - Supabase credentials for file uploads

4. **Development Commands**:
   - `npm run dev` - Start dev server
   - `npm run build` - Production build
   - `npx prisma generate` - Generate Prisma client
   - `npx prisma migrate dev` - Run migrations

5. **Admin Access**:
   - Login at `/login`
   - Default credentials from `.env` (ADMIN_EMAIL, ADMIN_PASSWORD)
   - Dashboard at `/dashboard`

6. **API Response Format**:
   - All endpoints return: `{ data: T | null, error: string | null }`
   - Validation via Zod schemas in `src/lib/validations.ts`

7. **Styling**:
   - Tailwind CSS only (no inline styles)
   - Custom colors defined in `tailwind.config.ts`
   - Dark mode by default
   - Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code)

## File Structure
```
src/
├── app/
│   ├── (public)/          # Public website routes
│   ├── (admin)/           # Protected admin routes
│   ├── api/               # REST API endpoints
│   ├── dashboard/         # Admin dashboard
│   ├── login/             # Login page
│   └── layout.tsx         # Root layout
├── components/
│   ├── admin/             # Admin UI components
│   └── public/            # Public site components
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client singleton
│   ├── email.ts           # Email templates
│   ├── storage.ts         # Supabase file upload
│   ├── validations.ts     # Zod schemas
│   └── utils.ts           # Utility functions
└── middleware.ts          # Route protection
```

## Next Steps for Deployment

1. Set up Supabase project and get connection string
2. Configure environment variables on Vercel
3. Run `npx prisma db push` to create database
4. Deploy to Vercel with custom domain
5. Test all CRUD operations and contact form
