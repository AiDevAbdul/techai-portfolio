import { prisma } from '@/lib/prisma';
import StatsCard from '@/components/admin/StatsCard';

export default async function DashboardPage() {
  const [projectCount, blogCount, testimonialCount, leadCount] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.testimonial.count(),
    prisma.lead.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-text-primary mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Projects" value={projectCount} icon="📁" />
        <StatsCard label="Blog Posts" value={blogCount} icon="📝" />
        <StatsCard label="Testimonials" value={testimonialCount} icon="⭐" />
        <StatsCard label="Leads" value={leadCount} icon="📧" />
      </div>

      <div className="mt-12 bg-primary-section border border-primary-action rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Quick Stats
        </h2>
        <p className="text-text-muted">
          Welcome to your admin dashboard. Use the sidebar to manage your content.
        </p>
      </div>
    </div>
  );
}
