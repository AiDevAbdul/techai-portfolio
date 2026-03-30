const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'admin123',
    10
  );

  const user = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@techai.pk' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@techai.pk',
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', user);

  // Create default site settings
  const settings = [
    { key: 'site_title', value: 'techai.pk' },
    { key: 'site_description', value: 'Learn It. Build It. Automate It.' },
    { key: 'site_email', value: 'contact@techai.pk' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('Site settings created');

  // Create sample projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Full-stack e-commerce solution with payment integration',
      content: 'Built a complete e-commerce platform using Next.js and Stripe. Features include product catalog, shopping cart, order management, and admin dashboard.',
      tags: ['Next.js', 'React', 'Stripe', 'PostgreSQL'],
      category: 'web',
      featured: true,
      order: 1,
    },
    {
      title: 'AI Content Generator',
      slug: 'ai-content-generator',
      description: 'AI-powered tool for generating blog content and social media posts',
      content: 'Developed an AI content generator using OpenAI API. Allows users to generate high-quality content for blogs and social media with customizable tone and style.',
      tags: ['OpenAI', 'Next.js', 'TypeScript', 'Tailwind'],
      category: 'ai',
      featured: true,
      order: 2,
    },
    {
      title: 'Learning Management System',
      slug: 'learning-management-system',
      description: 'Complete LMS for online course delivery and student management',
      content: 'Created a comprehensive LMS with course creation, video hosting, quizzes, and progress tracking. Supports multiple instructors and thousands of students.',
      tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
      category: 'tutoring',
      featured: true,
      order: 3,
    },
    {
      title: 'Real-time Analytics Dashboard',
      slug: 'analytics-dashboard',
      description: 'Real-time data visualization and analytics platform',
      content: 'Built a real-time analytics dashboard with WebSocket integration for live data updates. Includes custom charts, filters, and export functionality.',
      tags: ['React', 'WebSocket', 'Chart.js', 'Node.js'],
      category: 'web',
      featured: false,
      order: 4,
    },
    {
      title: 'Automation Workflow Builder',
      slug: 'automation-workflow',
      description: 'No-code automation tool for business processes',
      content: 'Developed a visual workflow builder for automating repetitive business tasks. Integrates with popular APIs and supports conditional logic.',
      tags: ['React', 'Node.js', 'MongoDB', 'Zapier API'],
      category: 'ai',
      featured: false,
      order: 5,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  console.log('Sample projects created');

  // Create sample blogs
  const blogs = [
    {
      title: 'Getting Started with Next.js 16',
      slug: 'getting-started-nextjs-16',
      excerpt: 'Learn the basics of Next.js 16 and build your first application',
      content: `# Getting Started with Next.js 16

Next.js 16 introduces several exciting features and improvements. In this guide, we'll explore the fundamentals and get you up and running.

## What's New in Next.js 16?

- Enhanced App Router capabilities
- Improved performance optimizations
- Better TypeScript support
- Streamlined API routes

## Installation

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Creating Your First Page

Pages in Next.js are React components exported from files in the app directory.

## Conclusion

Next.js 16 makes it easier than ever to build modern web applications. Start exploring today!`,
      tags: ['Next.js', 'React', 'Web Development'],
      category: 'web',
      readTime: 8,
      published: true,
    },
    {
      title: 'AI Integration Best Practices',
      slug: 'ai-integration-best-practices',
      excerpt: 'Essential practices for integrating AI into your applications',
      content: `# AI Integration Best Practices

Integrating AI into your applications requires careful planning and implementation. Here are the best practices to follow.

## 1. Choose the Right Model

Different AI models serve different purposes. Consider your use case carefully.

## 2. Handle Errors Gracefully

Always implement proper error handling for API calls and model responses.

## 3. Optimize for Performance

Cache responses when possible and implement rate limiting to avoid excessive API calls.

## 4. Security Considerations

Never expose API keys in client-side code. Always use environment variables and server-side proxies.

## 5. Monitor and Iterate

Track usage patterns and continuously improve your implementation based on user feedback.

## Conclusion

With these practices in mind, you'll be well-equipped to build robust AI-powered applications.`,
      tags: ['AI', 'OpenAI', 'Best Practices'],
      category: 'ai',
      readTime: 10,
      published: true,
    },
    {
      title: 'Effective Teaching Strategies for Online Learning',
      slug: 'teaching-strategies-online',
      excerpt: 'Proven strategies for delivering engaging online education',
      content: `# Effective Teaching Strategies for Online Learning

Online education has become mainstream. Here are strategies to make your online teaching more effective.

## 1. Engagement is Key

Use interactive elements like quizzes, discussions, and live sessions to keep students engaged.

## 2. Clear Communication

Establish clear expectations and maintain regular communication with your students.

## 3. Structured Content

Organize your course content logically with clear learning objectives for each module.

## 4. Feedback and Support

Provide timely feedback on assignments and be available to answer questions.

## 5. Use Technology Wisely

Leverage tools that enhance learning without overwhelming students.

## Conclusion

Effective online teaching combines good pedagogy with thoughtful use of technology.`,
      tags: ['Education', 'Online Learning', 'Teaching'],
      category: 'tutoring',
      readTime: 7,
      published: true,
    },
    {
      title: 'Database Optimization Techniques',
      slug: 'database-optimization',
      excerpt: 'Techniques to optimize your database performance',
      content: `# Database Optimization Techniques

Database performance is crucial for application scalability. Learn key optimization techniques.

## 1. Indexing

Create indexes on frequently queried columns to speed up queries.

## 2. Query Optimization

Write efficient queries and avoid N+1 problems.

## 3. Connection Pooling

Use connection pooling to manage database connections efficiently.

## 4. Caching

Implement caching strategies to reduce database load.

## 5. Monitoring

Regularly monitor query performance and identify bottlenecks.

## Conclusion

These optimization techniques will help you build scalable applications.`,
      tags: ['Database', 'Performance', 'PostgreSQL'],
      category: 'web',
      readTime: 9,
      published: true,
    },
    {
      title: 'Automation Tools That Save Time',
      slug: 'automation-tools-save-time',
      excerpt: 'Discover automation tools that can streamline your workflow',
      content: `# Automation Tools That Save Time

Automation can significantly reduce manual work and increase productivity.

## Popular Automation Tools

### Zapier
Connect your favorite apps and automate workflows without coding.

### Make (formerly Integromat)
Visual workflow builder with advanced automation capabilities.

### n8n
Open-source workflow automation tool with extensive integrations.

## Benefits of Automation

- Reduced manual errors
- Increased productivity
- Cost savings
- Better consistency

## Getting Started

Start with simple automations and gradually build more complex workflows.

## Conclusion

Automation is essential in modern business. Start automating today!`,
      tags: ['Automation', 'Productivity', 'Tools'],
      category: 'general',
      readTime: 6,
      published: true,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    });
  }

  console.log('Sample blogs created');

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Ahmed Hassan',
      role: 'CEO',
      company: 'TechStart Solutions',
      content: 'Abdul transformed our business with his web development expertise. The platform he built increased our efficiency by 40%.',
      rating: 5,
      service: 'web-dev',
      featured: true,
      order: 1,
    },
    {
      name: 'Fatima Khan',
      role: 'Student',
      company: 'University of Karachi',
      content: 'The tutoring sessions were incredibly helpful. Abdul explains complex concepts in a way that\'s easy to understand.',
      rating: 5,
      service: 'tutoring',
      featured: true,
      order: 2,
    },
    {
      name: 'Muhammad Ali',
      role: 'Product Manager',
      company: 'Digital Innovations Inc',
      content: 'Abdul\'s AI integration solutions helped us automate our entire workflow. Highly recommended!',
      rating: 5,
      service: 'ai',
      featured: true,
      order: 3,
    },
    {
      name: 'Sarah Johnson',
      role: 'Founder',
      company: 'Creative Agency Pro',
      content: 'Working with Abdul was a game-changer. His consultation helped us scale our operations efficiently.',
      rating: 5,
      service: 'consultation',
      featured: false,
      order: 4,
    },
    {
      name: 'Hassan Raza',
      role: 'CTO',
      company: 'CloudTech Systems',
      content: 'Exceptional technical skills and great communication. Abdul delivered exactly what we needed on time.',
      rating: 5,
      service: 'web-dev',
      featured: false,
      order: 5,
    },
    {
      name: 'Amina Malik',
      role: 'Learning Director',
      company: 'EdTech Academy',
      content: 'Abdul\'s teaching methodology is outstanding. Students consistently achieve better results with his guidance.',
      rating: 5,
      service: 'tutoring',
      featured: false,
      order: 6,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.name.toLowerCase().replace(/\s+/g, '-') },
      update: testimonial,
      create: testimonial,
    });
  }

  console.log('Sample testimonials created');
  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
