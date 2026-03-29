export default function Footer() {
  return (
    <footer className="bg-primary-section border-t border-primary-action py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold font-heading text-primary-action mb-4">
              techai
            </h3>
            <p className="text-text-muted text-sm">
              Learn It. Build It. Automate It.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Services</h4>
            <ul className="space-y-2 text-text-muted text-sm">
              <li><a href="#" className="hover:text-primary-action">Tutoring</a></li>
              <li><a href="#" className="hover:text-primary-action">Web Dev</a></li>
              <li><a href="#" className="hover:text-primary-action">Automation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-2 text-text-muted text-sm">
              <li><a href="/blog" className="hover:text-primary-action">Blog</a></li>
              <li><a href="/portfolio" className="hover:text-primary-action">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-primary-action">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Connect</h4>
            <ul className="space-y-2 text-text-muted text-sm">
              <li><a href="#" className="hover:text-primary-action">Twitter</a></li>
              <li><a href="#" className="hover:text-primary-action">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary-action">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-action pt-8 text-center text-text-muted text-sm">
          <p>&copy; 2026 techai.pk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
