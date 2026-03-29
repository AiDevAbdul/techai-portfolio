# Project Structure

```
techai-pk/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public-facing website
│   │   ├── page.tsx              # Home page (all sections)
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Single blog post
│   │   ├── portfolio/
│   │   │   └── page.tsx          # Portfolio listing
│   │   └── contact/
│   │       └── page.tsx          # Contact page
│   ├── (admin)/                  # Admin dashboard (protected)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Admin home / stats
│   │   ├── projects/
│   │   │   ├── page.tsx          # List all projects
│   │   │   ├── new/page.tsx      # Add new project
│   │   │   └── [id]/page.tsx     # Edit project
│   │   ├── blogs/
│   │   │   ├── page.tsx          # List all blogs
│   │   │   ├── new/page.tsx      # Add new blog post
│   │   │   └── [id]/page.tsx     # Edit blog post
│   │   ├── testimonials/
│   │   │   └── page.tsx          # Manage testimonials
│   │   ├── leads/
│   │   │   └── page.tsx          # View contact form submissions
│   │   └── settings/
│   │       └── page.tsx          # Site settings (bio, links, etc.)
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth
│   │   ├── projects/             # CRUD projects
│   │   ├── blogs/                # CRUD blogs
│   │   ├── testimonials/         # CRUD testimonials
│   │   ├── leads/                # Contact form submissions
│   │   └── upload/               # File upload handler
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── public/                   # Public site components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── admin/                    # Admin dashboard components
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── StatsCard.tsx
│   │   ├── DataTable.tsx
│   │   └── RichTextEditor.tsx
│   └── ui/                       # shadcn/ui components (auto-generated)
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # NextAuth config
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                  # Shared utilities
├── prisma/
│   └── schema.prisma             # Database schema
├── public/
│   └── images/                   # Static assets
├── .env.local                    # Environment variables (never commit)
├── .env.example                  # Safe env template
├── tailwind.config.ts
├── next.config.ts
└── CLAUDE.md                     # This file
```
