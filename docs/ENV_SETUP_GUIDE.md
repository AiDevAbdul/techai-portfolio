# Environment Variables Setup Guide for techai.pk

This guide walks you through setting up all environment variables for your Next.js project with Supabase.

## Quick Start

1. Copy `.env.example` to `.env.local`
2. Fill in values from your Supabase dashboard
3. Run `npm run dev`

---

## Environment Variables Explained

### 1. DATABASE_URL (Prisma/PostgreSQL)

**What it is:** Connection string to your Supabase PostgreSQL database

**Format:**
```
postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

**How to get it:**
1. Go to [supabase.com](https://supabase.com) → Select your project
2. Navigate to **Settings** → **Database** (left sidebar)
3. Under "Connection string", select **"URI"** from dropdown
4. Copy the full connection string
5. Replace `[YOUR-PASSWORD]` with your database password

**Example:**
```
DATABASE_URL="postgresql://postgres.jthxvhomtrmqqpstoena:port@136!@#$@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**Note:** Special characters in passwords must be URL-encoded:
- `@` → `%40`
- `#` → `%23`
- `!` → `%21`
- `$` → `%24`

---

### 2. NEXTAUTH_SECRET

**What it is:** Secret key for NextAuth.js session encryption

**How to generate:**
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Example:**
```
NEXTAUTH_SECRET="abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
```

**Security:** Change this in production!

---

### 3. NEXTAUTH_URL

**What it is:** Your application's URL for NextAuth callbacks

**Development:**
```
NEXTAUTH_URL="http://localhost:3000"
```

**Production:**
```
NEXTAUTH_URL="https://techai.pk"
```

---

### 4. NEXT_PUBLIC_SUPABASE_URL

**What it is:** Your Supabase project URL (safe to expose in browser)

**How to get it:**
1. Go to Supabase Dashboard → **Settings** → **API**
2. Copy the **Project URL**

**Format:**
```
https://[project-id].supabase.co
```

**Example:**
```
NEXT_PUBLIC_SUPABASE_URL="https://jthxvhomtrmqqpstoena.supabase.co"
```

---

### 5. NEXT_PUBLIC_SUPABASE_ANON_KEY

**What it is:** Public API key for client-side Supabase operations (safe to expose)

**How to get it:**
1. Go to Supabase Dashboard → **Settings** → **API**
2. Copy the **anon public** key

**Example:**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraHh2aG9tdHJtcXFwc3RvZW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MDAwMDAsImV4cCI6MTk4OTk5OTk5OX0.abc123def456"
```

---

### 6. SUPABASE_SERVICE_ROLE_KEY

**What it is:** Secret API key for server-side Supabase operations (NEVER expose in browser)

**How to get it:**
1. Go to Supabase Dashboard → **Settings** → **API**
2. Copy the **service_role** key (labeled as "secret")

**Example:**
```
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraHh2aG9tdHJtcXFwc3RvZW5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDUwMDAwMCwiZXhwIjoxOTg5OTk5OTk5fQ.xyz789abc123"
```

**Security:** This key has full database access. Keep it secret!

---

### 7. RESEND_API_KEY

**What it is:** API key for Resend email service (for contact form notifications)

**How to get it:**
1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to **API Keys**
4. Create a new API key
5. Copy it

**Example:**
```
RESEND_API_KEY="re_abc123def456ghi789jkl012mno345pqr"
```

---

### 8. ADMIN_EMAIL & ADMIN_PASSWORD

**What it is:** Default admin credentials for initial setup

**Used for:**
- Seeding the database with admin user
- Logging into `/login` page
- Accessing `/dashboard`

**Example:**
```
ADMIN_EMAIL="admin@techai.pk"
ADMIN_PASSWORD="your-secure-password-here"
```

**Security:** Change these in production!

---

## Complete .env.local Template

Copy this template and fill in your values:

```env
# ============================================
# DATABASE (Supabase PostgreSQL)
# ============================================
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# ============================================
# NEXTAUTH (Session Management)
# ============================================
NEXTAUTH_SECRET="your-generated-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# ============================================
# SUPABASE (Client & Server)
# ============================================
# Public (safe to expose in browser)
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"

# Secret (server-side only, NEVER expose)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# ============================================
# EMAIL (Resend)
# ============================================
RESEND_API_KEY="re_your_api_key_here"

# ============================================
# ADMIN CREDENTIALS (Initial Setup)
# ============================================
ADMIN_EMAIL="admin@techai.pk"
ADMIN_PASSWORD="your-secure-password"
```

---

## Setup Checklist

### Step 1: Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Click "New Project"
- [ ] Fill in project name, database password, region
- [ ] Wait for project to be created (2-3 minutes)

### Step 2: Get Database Connection String
- [ ] In Supabase Dashboard, go to **Settings** → **Database**
- [ ] Copy the connection string (URI format)
- [ ] Add to `.env.local` as `DATABASE_URL`

### Step 3: Get API Keys
- [ ] In Supabase Dashboard, go to **Settings** → **API**
- [ ] Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copy **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Generate NextAuth Secret
- [ ] Run: `openssl rand -base64 32`
- [ ] Copy output → `NEXTAUTH_SECRET`

### Step 5: Setup Resend (Optional for Email)
- [ ] Go to [resend.com](https://resend.com)
- [ ] Create account and API key
- [ ] Add to `.env.local` as `RESEND_API_KEY`

### Step 6: Create Storage Buckets
- [ ] In Supabase Dashboard, go to **Storage**
- [ ] Create these buckets:
  - [ ] `projects` (for project images)
  - [ ] `blog` (for blog post images)
  - [ ] `testimonials` (for testimonial images)
  - [ ] `uploads` (for general uploads)
- [ ] Set each bucket to allow public read access

### Step 7: Test Connection
- [ ] Run: `npx prisma db push`
- [ ] Should create all database tables
- [ ] Run: `npm run dev`
- [ ] Visit: `http://localhost:3000`

### Step 8: Seed Database
- [ ] Run: `npm run prisma:seed`
- [ ] Should populate sample data
- [ ] Login at `/login` with admin credentials

---

## Troubleshooting

### "Can't reach database server"
- Verify DATABASE_URL is correct
- Check Supabase project is active
- Ensure special characters are URL-encoded

### "Invalid connection string"
- Special characters need URL encoding
- Use this format: `postgresql://postgres.[id]:[encoded-password]@aws-0-[region].pooler.supabase.com:6543/postgres`

### "Authentication failed"
- Double-check NEXTAUTH_SECRET is set
- Verify ADMIN_EMAIL and ADMIN_PASSWORD in .env

### "Storage upload fails"
- Verify SUPABASE_SERVICE_ROLE_KEY is set
- Check storage buckets exist in Supabase
- Ensure bucket policies allow uploads

### "Email not sending"
- Verify RESEND_API_KEY is correct
- Check Resend account is active
- Verify sender email is verified in Resend

---

## Security Best Practices

1. **Never commit .env.local to git**
   - Add to `.gitignore` (already done)

2. **Rotate secrets regularly**
   - Change NEXTAUTH_SECRET periodically
   - Regenerate API keys if compromised

3. **Use different values per environment**
   - Development: localhost URLs
   - Production: your domain

4. **Keep service role key secret**
   - Never expose in client-side code
   - Only use on server (API routes, server components)

5. **Monitor API usage**
   - Check Supabase dashboard for unusual activity
   - Set up billing alerts

---

## Environment-Specific Examples

### Development (.env.local)
```env
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
RESEND_API_KEY="re_xxx"
ADMIN_EMAIL="admin@techai.pk"
ADMIN_PASSWORD="admin123"
```

### Production (Vercel Environment Variables)
```env
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
NEXTAUTH_SECRET="production-secret-key-generated-securely"
NEXTAUTH_URL="https://techai.pk"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
RESEND_API_KEY="re_xxx"
ADMIN_EMAIL="admin@techai.pk"
ADMIN_PASSWORD="secure-production-password"
```

---

## Next Steps

1. Follow the setup checklist above
2. Create `.env.local` with all variables
3. Run `npx prisma db push` to create tables
4. Run `npm run prisma:seed` to add sample data
5. Run `npm run dev` to start development server
6. Visit `http://localhost:3000/login` to test admin access

For more help, see `SEEDING_GUIDE.md` for database seeding instructions.
