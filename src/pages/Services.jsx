import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";
import Reveal from "../components/Reveal.jsx";

const DELIVERY_STEPS = [
  { title: "Consultation & Discovery", text: "Deep dive into your business requirements, identifying bottlenecks and areas for technological improvement." },
  { title: "Site Assessment", text: "Comprehensive technical survey of your premises to evaluate infrastructure readiness and constraints." },
  { title: "Solution Design", text: "Creation of scalable, tailored technology architecture plans and project blueprints for your approval." },
  { title: "Deployment", text: "Professional implementation by our certified engineers ensuring minimal disruption to operations." },
  { title: "Testing & QA", text: "Rigorous quality assurance, load testing, and system validation before final handover." },
  { title: "Ongoing Support", text: "Continuous monitoring, preventive maintenance, and priority support SLAs for peace of mind." },
];

const ECOSYSTEM = [
  { icon: "fa-network-wired", title: "Networking", items: ["Cisco", "MikroTik", "Ubiquiti", "Fortinet"] },
  { icon: "fa-camera", title: "Surveillance", items: ["Hikvision", "Dahua", "Access Control", "NVR/DVR Systems"] },
  { icon: "fa-code-branch", title: "Cabling", items: ["Cat6/Cat6A", "Fiber Optic", "Data Racks", "Patch Management"] },
  { icon: "fa-server", title: "Servers", items: ["Dell/HP Servers", "VMware", "Hyper-V", "Backup Solutions"] },
];

const PROJECTS = [
  {
    eyebrow: "Enterprise Deployment",
    title: "Corporate Office IT",
    text: "Complete office network infrastructure, high-speed WiFi systems, server deployment, workstation configuration, and security implementation.",
    points: ["Network architecture & design", "Wireless coverage planning", "Server infrastructure", "Backup & disaster recovery"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    reverse: true,
  },
  {
    eyebrow: "Security Systems",
    title: "CCTV & Surveillance",
    text: "Professional surveillance system deployment with HD/4K cameras, cloud recording, remote monitoring, and access control integration.",
    points: ["HD/4K camera deployment", "NVR/DVR installation", "Cloud storage integration", "Remote access setup"],
    image: "https://images.unsplash.com/photo-1549109926-58f039549485?q=80&w=1200&auto=format&fit=crop",
  },
  {
    eyebrow: "Infrastructure",
    title: "Structured Cabling",
    text: "Modern cabling infrastructure supporting high-speed connectivity, future expansions, and reliable long-term performance.",
    points: ["Cat6/Cat6A deployment", "Fiber optic installation", "Patch panel organization", "Cable testing & certification"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    reverse: true,
  },
  {
    eyebrow: "Virtualization",
    title: "Server Infrastructure",
    text: "Enterprise-grade server systems with virtualization, redundancy, and failover capabilities for business continuity.",
    points: ["Server deployment & configuration", "Virtualization setup (VMware/Hyper-V)", "Redundancy & failover", "Backup strategy implementation"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
  },
];

const SUPPORT = [
  { icon: "fa-wrench", title: "Preventive Maintenance", text: "Regular system checks, updates, and performance optimization to prevent issues before they occur." },
  { icon: "fa-phone", title: "Emergency Support", text: "24/7 technical assistance for critical issues with rapid response and resolution." },
  { icon: "fa-laptop", title: "Remote Assistance", text: "Quick remote access and troubleshooting for faster issue resolution without on-site visits." },
  { icon: "fa-user-check", title: "On-Site Support", text: "Professional technicians available for complex issues and hands-on system management." },
  { icon: "fa-heartbeat", title: "System Monitoring", text: "Continuous monitoring of infrastructure health, security, and performance metrics." },
  { icon: "fa-handshake", title: "AMC Contracts", text: "Flexible annual maintenance contracts with guaranteed service levels and support terms." },
];

const CITIES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Golden Magic Electronics"
        description="Services — Golden Magic Electronics - Enterprise technology solutions in the UAE."
      />

      <div className="page-content">
        <section className="page-hero services-hero" style={{ marginBottom: "2rem" }}>
          <div className="page-hero-grid with-visual">
            <div>
              <p className="section-label">Professional Services</p>
              <h1 className="page-hero-title">Technology Services Designed for UAE Businesses</h1>
              <p className="page-hero-text">
                From office IT deployments to CCTV, networking, structured cabling, virtualization, and ongoing
                maintenance, our team delivers reliable technology solutions tailored to modern business
                environments.
              </p>
              <div className="button-row mt-8">
                <Button to="/contact" variant="primary">Request Quote</Button>
                <Button to="/contact" variant="outline">Contact Us</Button>
              </div>
            </div>
            <div className="services-hero-panel">
              <div className="services-hero-panel-row">
                <i className="fa-solid fa-network-wired" aria-hidden="true"></i>
                <span>Networking Solutions</span>
              </div>
              <div className="services-hero-panel-row">
                <i className="fa-solid fa-camera" aria-hidden="true"></i>
                <span>CCTV Systems</span>
              </div>
              <div className="services-hero-panel-row">
                <i className="fa-solid fa-server" aria-hidden="true"></i>
                <span>Infrastructure</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-gap section-bg-soft section-rounded">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label">Delivery Process</p>
            <h2 className="section-title">How We Deliver Projects</h2>
            <p className="section-subtitle mt-4">A structured, professional approach to every technology implementation</p>
          </div>
          <div className="delivery-timeline">
            <div className="delivery-steps">
              {DELIVERY_STEPS.map((step, i) => (
                <div className="delivery-step" key={step.title}>
                  <div className="delivery-step-number">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="delivery-step-title">{step.title}</h3>
                    <p className="delivery-step-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-gap">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label">Vendor Expertise</p>
            <h2 className="section-title">Technology Ecosystem We Deploy</h2>
            <p className="section-subtitle mt-4">Enterprise-grade vendors and platforms across all infrastructure layers</p>
          </div>
          <div className="grid cols-4">
            {ECOSYSTEM.map((group) => (
              <Reveal className="tech-ecosystem-card" key={group.title}>
                <div className="ecosystem-icon-wrapper">
                  <i className={`fa-solid ${group.icon}`} aria-hidden="true"></i>
                </div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>{group.title}</h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ color: "var(--slate-700)" }}>
                      <span style={{ color: "var(--color-green)", fontWeight: 700, marginRight: "0.5rem" }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-gap section-bg-soft section-rounded">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label">Delivery Expertise</p>
            <h2 className="section-title">Project Capabilities</h2>
            <p className="section-subtitle mt-4">Types of solutions we design, implement, and support</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {PROJECTS.map((project) => (
              <div className={`project-block${project.reverse ? " reverse" : ""}`} key={project.title}>
                <div className="project-copy">
                  <p className="project-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                  <ul>
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-gap">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label">Support Services</p>
            <h2 className="section-title">Annual Maintenance & Support</h2>
            <p className="section-subtitle mt-4">Keeping your technology infrastructure secure, updated, and optimized</p>
          </div>
          <div className="grid cols-3">
            {SUPPORT.map((item) => (
              <div className="support-card" key={item.title}>
                <div className="support-icon">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-gap">
          <div className="coverage-panel-dark">
            <p className="coverage-eyebrow"><i className="fa-solid fa-globe" aria-hidden="true"></i> Nationwide Availability</p>
            <h2 style={{ color: "white", fontSize: "2.5rem" }}>Supporting Businesses Across the UAE</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.15rem" }}>On-site and remote support available throughout all Emirates</p>
            <div className="coverage-grid">
              {CITIES.map((city) => (
                <div className="coverage-city" key={city}>
                  <div className="coverage-city-icon">
                    <i className="fa-solid fa-map-pin" aria-hidden="true"></i>
                  </div>
                  <p>{city}</p>
                </div>
              ))}
              <div className="coverage-city complete">
                <div className="coverage-city-icon">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                </div>
                <p>100% Coverage</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-gap">
          <div className="cta-dark">
            <img
              className="cta-dark-bg"
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              alt="Tech Background"
              loading="lazy"
            />
            <div className="cta-dark-overlay"></div>
            <div className="cta-dark-content">
              <h2>Ready to Upgrade Your Technology Infrastructure?</h2>
              <p>
                Speak with our specialists about networking, CCTV systems, structured cabling, virtualization,
                maintenance contracts, and enterprise IT solutions.
              </p>
              <div className="button-row" style={{ justifyContent: "center" }}>
                <Button to="/contact" variant="primary" icon="fa-bolt" style={{ background: "var(--color-green)" }}>
                  Request a Quote
                </Button>
                <Button to="/contact" variant="ghost" icon="fa-calendar-check">Contact Our Team</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
