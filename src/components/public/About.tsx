export default function About() {
  return (
    <section className="py-20 px-4 bg-primary-section">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold font-heading mb-8 text-text-primary">
          About Me
        </h2>
        <div className="space-y-6 text-text-muted">
          <p>
            I'm Abdul Wahab, a passionate educator and technology enthusiast with expertise in web development, AI automation, and online tutoring. With years of experience in the tech industry, I've helped hundreds of students and professionals master new skills.
          </p>
          <p>
            My mission is to make technology accessible and understandable for everyone. Whether you're looking to learn programming, automate your workflows, or build your next web application, I'm here to help.
          </p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-primary-action mb-4">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'Python',
                'AI/ML',
                'Web Design',
                'DevOps',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-primary-action/20 text-primary-action rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
