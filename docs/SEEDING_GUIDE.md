# Database Seeding Guide

This guide explains how to seed your techai.pk database with sample data.

## What Gets Seeded

The seed script populates your database with:

### Admin User
- Email: `admin@techai.pk`
- Password: `admin123` (from .env ADMIN_PASSWORD)

### Site Settings
- Site title, description, and contact email

### 5 Sample Projects
1. **E-Commerce Platform** - Full-stack e-commerce with Stripe
2. **AI Content Generator** - OpenAI-powered content tool
3. **Learning Management System** - Complete LMS platform
4. **Real-time Analytics Dashboard** - WebSocket-based analytics
5. **Automation Workflow Builder** - No-code automation tool

### 5 Sample Blog Posts
1. Getting Started with Next.js 16
2. AI Integration Best Practices
3. Effective Teaching Strategies for Online Learning
4. Database Optimization Techniques
5. Automation Tools That Save Time

### 6 Sample Testimonials
- Covering web development, tutoring, AI, and consultation services
- All with 5-star ratings

## Prerequisites

1. **Database Connection**: You need a working PostgreSQL database
   - Supabase (recommended)
   - Local PostgreSQL
   - Any PostgreSQL-compatible database

2. **Environment Variables**: Update `.env` with:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/database"
   ADMIN_EMAIL="admin@techai.pk"
   ADMIN_PASSWORD="admin123"
   ```

## How to Run

### Option 1: Using npm script
```bash
npm run prisma:seed
```

### Option 2: Direct node execution
```bash
node prisma/seed.js
```

## Troubleshooting

### "Can't reach database server"
- Verify your DATABASE_URL is correct
- Check that your database server is running
- For Supabase: Ensure your project is active and the connection string is valid

### "Invalid connection string"
- Special characters in passwords must be URL-encoded
  - `@` → `%40`
  - `#` → `%23`
  - `!` → `%21`
  - `$` → `%24`

### "User was denied access"
- Check your database credentials (username/password)
- Verify the user has permission to create tables

## After Seeding

1. Verify data in your database:
   ```bash
   npx prisma studio
   ```

2. Login to admin dashboard:
   - URL: `http://localhost:3000/login`
   - Email: `admin@techai.pk`
   - Password: `admin123`

3. View seeded content:
   - Projects: `/dashboard/projects`
   - Blogs: `/dashboard/blogs`
   - Testimonials: `/dashboard/testimonials`

## Re-seeding

To clear and re-seed your database:

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Then seed again
npm run prisma:seed
```

## Customizing Seed Data

Edit `prisma/seed.js` to modify:
- Project details and categories
- Blog content and tags
- Testimonial content and ratings
- Admin credentials

Then run the seed script again.
