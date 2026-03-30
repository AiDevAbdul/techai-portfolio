# Environment Variables Quick Reference

## Copy-Paste Template

```env
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
NEXTAUTH_SECRET="your-generated-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
RESEND_API_KEY="re_your_api_key_here"
ADMIN_EMAIL="admin@techai.pk"
ADMIN_PASSWORD="admin123"
```

## Where to Get Each Value

| Variable | Source | How to Get |
|----------|--------|-----------|
| `DATABASE_URL` | Supabase | Settings → Database → Connection string (URI) |
| `NEXTAUTH_SECRET` | Generate | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app | `http://localhost:3000` (dev) or `https://techai.pk` (prod) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | Settings → API → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | Settings → API → service_role key |
| `RESEND_API_KEY` | Resend | https://resend.com → API Keys |
| `ADMIN_EMAIL` | You | Email for admin login |
| `ADMIN_PASSWORD` | You | Password for admin login |

## Setup Steps

1. **Create Supabase Project**
   - Go to supabase.com
   - Create new project
   - Wait 2-3 minutes for setup

2. **Get Database Connection**
   - Settings → Database → Connection string (URI)
   - Copy full string
   - URL-encode special characters if needed

3. **Get API Keys**
   - Settings → API
   - Copy Project URL, anon key, service_role key

4. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   ```

5. **Create .env.local**
   - Copy `.env.example`
   - Fill in all values
   - Save as `.env.local`

6. **Test Connection**
   ```bash
   npx prisma db push
   ```

7. **Seed Database**
   ```bash
   npm run prisma:seed
   ```

## Important Notes

- ✅ `NEXT_PUBLIC_*` variables are safe to expose in browser
- ❌ `SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed in browser
- 🔐 Special characters in passwords need URL encoding
- 📝 Never commit `.env.local` to git
- 🔄 Change secrets in production

## URL Encoding Reference

If your password has special characters:

```
@ → %40
# → %23
! → %21
$ → %24
: → %3A
/ → %2F
? → %3F
& → %26
= → %3D
```

Example: `password@123#abc` → `password%40123%23abc`

## Verification

After setting up, verify everything works:

```bash
# Test database connection
npx prisma db push

# Start dev server
npm run dev

# Visit http://localhost:3000
# Login at http://localhost:3000/login
# Email: admin@techai.pk
# Password: (your ADMIN_PASSWORD)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Can't reach database" | Check DATABASE_URL, verify Supabase project is active |
| "Invalid connection string" | URL-encode special characters in password |
| "Authentication failed" | Verify NEXTAUTH_SECRET is set |
| "Storage upload fails" | Check SUPABASE_SERVICE_ROLE_KEY, verify buckets exist |
| "Email not sending" | Verify RESEND_API_KEY, check Resend account |

## Files to Reference

- `ENV_SETUP_GUIDE.md` - Detailed setup instructions
- `SEEDING_GUIDE.md` - Database seeding guide
- `.env.example` - Template with all variables
