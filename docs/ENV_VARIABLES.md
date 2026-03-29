# Environment Variables

Create `.env.local` with:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Supabase (storage + db)
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Resend (email)
RESEND_API_KEY="..."
CONTACT_EMAIL="your@email.com"

# Admin credentials (seed only)
ADMIN_EMAIL="admin@techai.pk"
ADMIN_PASSWORD="set-a-strong-password"
```
