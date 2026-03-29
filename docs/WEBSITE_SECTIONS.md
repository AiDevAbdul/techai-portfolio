# Website Sections (Public)

Build each section as a standalone component in `components/public/`:

## 1. Navbar
- Logo: "Tech**AI**.pk" (AI in cyan `#06B6D4`)
- Links: Home, Services, About, Portfolio, Blog
- CTA button: "Book a Call" → scrolls to contact
- Sticky on scroll, blur backdrop
- Dark/Light toggle

## 2. Hero
- Headline: "Abdul Wahab" with animated role switcher (Tutor / Developer / Speaker / Consultant)
- Tagline: **"Learn It. Build It. Automate It."**
- Two CTAs: "Book a Free Call" (primary) + "View My Work" (outlined)
- Stats bar: e.g. "50+ Students · 30+ Projects · 5+ Years"
- Subtle animated background (floating particles or grid)

## 3. Services (4 cards)
| Service | Icon | Color Accent |
|---|---|---|
| Tutoring | GraduationCap | Cyan `#06B6D4` |
| AI Automation | Bot | Violet `#7C3AED` |
| Web Development | Code2 | Pink `#F472B6` |
| Consultation | Handshake | Amber `#F59E0B` |

Each card: icon, title, 2-line description, "Get Started →" link

## 4. About
- Left: Professional photo + floating skill badges
- Right: Short bio, experience stats, downloadable CV button
- Skills: Next.js, Python, AI/ML, n8n, Make.com, Prompt Engineering

## 5. Portfolio
- Filterable grid (All / Web / AI / Tutoring)
- Cards pulled from database via API
- Each card: thumbnail, title, tags, live/GitHub links

## 6. Testimonials
- 3-column card grid
- Star rating, quote, name, role, service tag
- Data pulled from database

## 7. Blog Preview
- Latest 3 posts pulled from database
- Card: thumbnail, title, excerpt, read time, date
- "View All Posts →" link

## 8. Contact / Lead Form
- Fields: Name, Email, Service (dropdown), Message
- On submit: save to Lead table + send email via Resend
- Right side: WhatsApp button, social links, Calendly embed
- Social links: WhatsApp, LinkedIn, YouTube, GitHub

## 9. Footer
- Logo + tagline
- Quick nav links
- Social icons
- Newsletter signup (saves email to SiteSetting or separate model)
- Copyright: © 2025 Abdul Wahab · techai.pk
