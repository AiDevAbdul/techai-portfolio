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
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold font-heading text-text-primary mb-4">
            Services
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Comprehensive solutions tailored to your needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-primary-section to-primary-bg border border-primary-action/50 rounded-xl p-6 hover:border-primary-action transition-all duration-300 hover:shadow-lg hover:shadow-primary-action/20 transform hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-action mb-2 group-hover:text-primary-hover transition-colors">
                {service.title}
              </h3>
              <p className="text-text-muted group-hover:text-text-primary transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
