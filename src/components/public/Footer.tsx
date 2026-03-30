export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Tutoring', href: '#' },
      { label: 'Web Development', href: '#' },
      { label: 'AI Automation', href: '#' },
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '#contact' },
    ],
    social: [
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  };

  return (
    <footer className="bg-primary-section border-t border-primary-action/30 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-bold font-heading text-primary-action mb-4 group hover:text-primary-hover transition-colors">
              <span className="text-text-primary">tech</span>
              <span className="text-ai-highlight">ai</span>
              <span className="text-text-primary">.pk</span>
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Learn It. Build It. Automate It. — Empowering professionals through education and innovation.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold text-text-primary mb-4 uppercase text-xs tracking-wide">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-primary-action transition-colors duration-300 text-sm group inline-flex items-center gap-1"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold text-text-primary mb-4 uppercase text-xs tracking-wide">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-primary-action transition-colors duration-300 text-sm group inline-flex items-center gap-1"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold text-text-primary mb-4 uppercase text-xs tracking-wide">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-primary-action transition-colors duration-300 text-sm group inline-flex items-center gap-1"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-action/30 pt-8 text-center text-text-muted text-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p>&copy; {currentYear} techai.pk. All rights reserved. | Crafted with care by Abdul Wahab</p>
        </div>
      </div>
    </footer>
  );
}
