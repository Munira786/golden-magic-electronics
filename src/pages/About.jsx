import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";
import Reveal from "../components/Reveal.jsx";

const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "200+", label: "Business Clients" },
  { value: "24/7", label: "Technical Support" },
];

const HERO_BADGES = ["Established in 2005", "500+ Projects Delivered", "200+ Business Clients", "24/7 Technical Support"];

const METRICS = [
  { icon: "fa-hourglass-end", value: "20+", label: "Years of Experience", description: "Serving businesses since 2005 with trusted solutions" },
  { icon: "fa-rocket", value: "500+", label: "Projects Delivered", description: "Successfully completed across Dubai and UAE" },
  { icon: "fa-handshake", value: "200+", label: "Business Clients", description: "Trusted by leading companies across industries" },
  { icon: "fa-headset", value: "24/7", label: "Technical Support", description: "Round-the-clock assistance for your systems" },
  { icon: "fa-map-location-dot", value: "100%", label: "UAE Coverage", description: "Available throughout the Emirates" },
];

const TECH = [
  { icon: "fa-server", title: "IT Infrastructure", description: "Complete server infrastructure, data center solutions, and enterprise-grade systems designed for reliability and scalability.", tags: ["Server Design", "Data Centers", "Backup Systems"] },
  { icon: "fa-camera", title: "CCTV & Surveillance", description: "Professional surveillance systems with HD recording, cloud storage, and remote monitoring for secure premises.", tags: ["HD Cameras", "Cloud Recording", "Remote Monitoring"] },
  { icon: "fa-network-wired", title: "Structured Cabling", description: "Modern cabling infrastructure that supports high-speed connectivity, future expansions, and reliable network performance.", tags: ["Cat6/Cat7", "Fiber Optics", "Cable Management"] },
  { icon: "fa-wifi", title: "Network Solutions", description: "Secure networking with firewalls, VPNs, wireless solutions, and network optimization for seamless operations.", tags: ["Firewalls", "Wireless", "VPN Security"] },
  { icon: "fa-microchip", title: "Server Infrastructure", description: "Robust server systems, virtualization, redundancy, and failover capabilities to ensure business continuity.", tags: ["Virtualization", "Redundancy", "Failover"] },
  { icon: "fa-wand-magic-sparkles", title: "Managed IT Services", description: "Proactive monitoring, maintenance, updates, and support to keep your systems running optimally and securely.", tags: ["24/7 Monitoring", "Maintenance", "Security Updates"] },
];

const ADVANTAGES = [
  { icon: "fa-users-gear", title: "Experienced Technical Team", text: "Certified professionals with deep expertise in IT infrastructure, security, and enterprise solutions" },
  { icon: "fa-layer-group", title: "Enterprise-Grade Solutions", text: "Scalable, reliable systems designed to support business growth and operational complexity" },
  { icon: "fa-bolt", title: "Fast Response & Support", text: "24/7 technical assistance ensuring minimal downtime and rapid issue resolution" },
  { icon: "fa-handshake", title: "End-to-End Services", text: "Complete solution delivery from planning and design through implementation and ongoing support" },
];

const APPROACH = [
  { icon: "fa-user-check", title: "Understand Your Business", description: "We begin every project by understanding the client's business goals, operational challenges, and future growth plans. Taking time to listen ensures solutions align perfectly with expectations.", points: ["Comprehensive needs assessment", "Infrastructure evaluation", "Growth roadmap discussion"] },
  { icon: "fa-pencil-ruler", title: "Design Custom Solutions", description: "Our team develops practical and scalable technology solutions tailored to the client's environment and requirements. Every design is tested and validated before deployment.", points: ["Architecture planning", "System optimization", "Risk mitigation"], reverse: true },
  { icon: "fa-gear", title: "Deploy & Provide Ongoing Support", description: "From deployment to ongoing maintenance, we ensure every solution performs reliably and continues delivering value. Our support team remains available for any adjustments or expansions.", points: ["Professional deployment", "Staff training & documentation", "24/7 technical support"] },
];

const TRUST_POINTS = [
  { icon: "fa-calendar-check", title: "Established Since 2005", text: "Over two decades of experience serving businesses across Dubai and the UAE." },
  { icon: "fa-lightbulb", title: "Proven Expertise", text: "Extensive knowledge of IT infrastructure, CCTV systems, networking, and structured cabling." },
  { icon: "fa-headset", title: "Reliable Support", text: "Dedicated technical assistance and long-term service partnerships for business continuity." },
  { icon: "fa-award", title: "Quality Commitment", text: "Trusted products, professional implementation, and high standards on every project." },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Golden Magic Electronics | IT Infrastructure & Security Solutions Since 2005"
        description="Learn about Golden Magic Electronics, a trusted UAE technology solutions provider delivering IT infrastructure, CCTV, networking, structured cabling, and enterprise support services since 2005."
      />

      <div className="page-content">
        <section className="page-hero">
          <div className="page-hero-grid with-visual">
            <div className="page-hero-copy">
              <p className="eyebrow">About Golden Magic Electronics</p>
              <h1 className="page-hero-title">20+ Years of Trusted Technology Solutions Since 2005</h1>
              <p className="page-hero-text">
                Since 2005, Golden Magic Electronics has helped businesses across Dubai and the UAE build secure IT
                infrastructure, surveillance systems, networking solutions, structured cabling, server
                infrastructure, and managed technology environments.
              </p>
              <div className="page-hero-badges">
                {HERO_BADGES.map((badge) => (
                  <div className="badge-pill" key={badge}>
                    <i className="fa-solid fa-check" aria-hidden="true"></i> {badge}
                  </div>
                ))}
              </div>
              <div className="button-row mt-8">
                <Button to="/contact" variant="primary">Request Consultation</Button>
                <Button to="/contact" variant="outline">Contact Our Team</Button>
              </div>
            </div>

            <div className="page-hero-visual">
              <div className="page-hero-image-wrapper">
                <div className="page-hero-image-frame">
                  <img src="/about_page_img.png" alt="Golden Magic Electronics technology infrastructure" loading="lazy" />
                </div>
                <div className="page-hero-card">
                  <div className="page-hero-card-icon">
                    <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: "0" }}>Enterprise Solutions</p>
                    <h3>Dubai IT Infrastructure</h3>
                    <p>Professional deployment and support for CCTV, networking, structured cabling, and server systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-gap">
          <div className="grid" style={{ gridTemplateColumns: "0.95fr 0.75fr", alignItems: "start" }}>
            <div>
              <p className="section-label">Our Story</p>
              <h2 className="section-title" style={{ margin: "0 0 0.75rem", textAlign: "left" }}>
                Building trusted UAE technology systems since 2005
              </h2>
              <p className="mt-6" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                Founded in 2005, Golden Magic Electronics began as a trusted electronics solutions provider in Dubai.
                Over the years, the company expanded into enterprise IT infrastructure, CCTV surveillance,
                networking, structured cabling, and managed technology services.
              </p>
              <p className="mt-6" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                Today, GME supports businesses across the UAE with secure, scalable, and reliable technology
                solutions. Our focus remains on delivering practical systems that improve operations, strengthen
                security, and support long-term growth.
              </p>
            </div>
            <div className="value-card">
              <h3>Why our approach works</h3>
              <div className="mt-6" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { title: "Local UAE experience", text: "Deep knowledge of Dubai business environments, regulations, and technology needs." },
                  { title: "Enterprise-grade delivery", text: "Structured processes and technical discipline ensure every project is deployed with confidence." },
                  { title: "End-to-end support", text: "From planning through maintenance, we keep systems operating securely and reliably." },
                ].map((item) => (
                  <div key={item.title} className="feature-card" style={{ gridTemplateColumns: "1fr", padding: "1rem", borderRadius: "1.5rem" }}>
                    <p style={{ fontWeight: 600, color: "var(--slate-900)" }}>{item.title}</p>
                    <p className="feature-description" style={{ fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-gap section-bg-soft">
          <div className="text-center">
            <p className="section-label">Performance & Trust</p>
            <h2 className="section-title">Company Statistics</h2>
          </div>
          <div className="grid cols-4 mt-12">
            {STATS.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-gap">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label">Proven Track Record</p>
            <h2 className="section-title">Performance Metrics That Build Trust</h2>
            <p className="section-subtitle mt-4">Over two decades of consistent delivery and client satisfaction</p>
          </div>
          <div className="grid cols-5">
            {METRICS.map((metric, i) => (
              <Reveal key={metric.label} className="metric-card" delay={`${(i + 1) * 0.1}s`}>
                <div className="metric-icon-wrapper">
                  <i className={`fa-solid ${metric.icon}`} aria-hidden="true"></i>
                </div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <p className="metric-description">{metric.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-gap section-bg-soft">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label">Core Capabilities</p>
            <h2 className="section-title">Comprehensive Technology Solutions</h2>
            <p className="section-subtitle mt-4">Enterprise-grade expertise across infrastructure, security, and networking</p>
          </div>
          <div className="grid cols-3">
            {TECH.map((tech, i) => (
              <Reveal key={tech.title} className="tech-card" delay={`${(i + 1) * 0.1}s`}>
                <div className="tech-icon-box">
                  <i className={`fa-solid ${tech.icon}`} aria-hidden="true"></i>
                </div>
                <h3 className="tech-card-title">{tech.title}</h3>
                <p className="tech-card-description">{tech.description}</p>
                <div className="tech-features">
                  {tech.tags.map((tag) => (
                    <span className="tech-feature" key={tag}>{tag}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-gap section-bg-gradient" style={{ padding: "4rem 2rem" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="section-label" style={{ color: "rgba(255,255,255,0.8)" }}>Our Competitive Advantage</p>
              <h2 style={{ color: "white", fontSize: "2.25rem" }}>Why Choose Golden Magic Electronics</h2>
            </div>
            <div className="grid cols-2">
              {ADVANTAGES.map((item) => (
                <div className="advantage-item" key={item.title}>
                  <div className="advantage-icon">
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3 className="advantage-title">{item.title}</h3>
                  <p className="advantage-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-gap">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="section-label">Our Approach</p>
            <h2 className="section-title">Building partnerships that deliver results</h2>
          </div>
          <div className="approach-flow">
            {APPROACH.map((step) => (
              <div className={`approach-block${step.reverse ? " approach-block-right" : ""}`} key={step.title}>
                <div className="approach-visual">
                  <div className="approach-icon-box">
                    <i className={`fa-solid ${step.icon}`} aria-hidden="true"></i>
                  </div>
                </div>
                <div className="approach-content">
                  <h3 className="approach-title">{step.title}</h3>
                  <p className="approach-description">{step.description}</p>
                  <ul className="approach-points">
                    {step.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-gap section-bg-soft">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="section-label">Trust & Expertise</p>
            <h2 className="section-title">Why Clients Trust GME</h2>
          </div>
          <div className="trust-credibility-strip">
            {TRUST_POINTS.map((point) => (
              <div className="trust-item" key={point.title}>
                <div className="trust-icon-circle">
                  <i className={`fa-solid ${point.icon}`} aria-hidden="true"></i>
                </div>
                <div className="trust-content">
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-gap text-center" style={{ background: "white", borderRadius: "2rem", border: "1px solid var(--slate-200)", padding: "4rem 2rem" }}>
          <div className="max-w-3xl mx-auto">
            <div style={{ display: "inline-flex", height: "4rem", width: "4rem", alignItems: "center", justifyContent: "center", borderRadius: "9999px", background: "rgba(24,72,154,0.1)", color: "var(--color-blue)", marginBottom: "1.5rem" }}>
              <i className="fa-solid fa-handshake-angle" aria-hidden="true"></i>
            </div>
            <h2 style={{ fontSize: "2.5rem" }}>Let's Build the Future of Your IT Infrastructure</h2>
            <p className="mt-4" style={{ fontSize: "1.1rem", color: "var(--slate-600)", lineHeight: 1.8 }}>
              Partner with a team that has delivered excellence since 2005. Whether expanding your office or
              upgrading enterprise security, our experts are here to design a custom blueprint for your success.
            </p>
            <div className="button-row mt-8" style={{ justifyContent: "center" }}>
              <Button to="/contact" variant="primary" icon="fa-paper-plane">Start Your Project</Button>
              <Button href="tel:+971557557786" variant="outline" icon="fa-phone">Call +971 55 755 7786</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
