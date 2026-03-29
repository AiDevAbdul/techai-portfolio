export default function Services() {
  const services = [
    {
      icon: '📚',
      title: 'Online Tutoring',
      description: 'Expert guidance in programming, web development, and tech fundamentals.',
    },
    {
      icon: '🤖',
      title: 'AI Automation',
      description: 'Streamline workflows with intelligent automation solutions.',
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Modern, scalable web applications built with latest technologies.',
    },
    {
      icon: '🎤',
      title: 'Tech Speaking',
      description: 'Engaging talks on emerging technologies and industry trends.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-primary-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold font-heading text-center mb-16 text-text-primary">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-primary-section border border-primary-action rounded-lg p-6 hover:border-primary-hover transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-primary-action mb-2">
                {service.title}
              </h3>
              <p className="text-text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
