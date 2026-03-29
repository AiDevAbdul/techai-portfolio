# Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String?
  thumbnail   String?
  liveUrl     String?
  githubUrl   String?
  tags        String[]
  category    String   // "web" | "ai" | "tutoring"
  featured    Boolean  @default(false)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Blog {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   // Rich text HTML from TipTap
  thumbnail   String?
  tags        String[]
  readTime    Int      // minutes
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String
  company   String?
  avatar    String?
  content   String
  rating    Int      @default(5)
  service   String   // "tutoring" | "web-dev" | "ai" | "consultation"
  featured  Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Lead {
  id        String   @id @default(cuid())
  name      String
  email     String
  service   String
  message   String
  status    String   @default("new") // "new" | "contacted" | "closed"
  createdAt DateTime @default(now())
}

model SiteSetting {
  id    String @id @default(cuid())
  key   String @unique
  value String
}
```
