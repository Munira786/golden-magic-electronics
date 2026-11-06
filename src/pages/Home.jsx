import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";
import Reveal from "../components/Reveal.jsx";

const PARTNERS = [
  { name: "Hikvision", logo: "/hikvision-clean.png" },
  { name: "Dahua", logo: "/dahua-clean.png" },
  { name: "Lenovo", logo: "/lenovo-clean.png" },
  { name: "Ruijie", logo: "/rujie-clean.png" },
];

const INDUSTRIES = [
  { icon: "fa-building", name: "Corporate Offices", description: "Reliable IT infrastructure, networking, and workplace technology solutions." },
  { icon: "fa-store", name: "Retail Stores", description: "CCTV, connectivity, and security solutions for retail operations." },
  { icon: "fa-warehouse", name: "Warehouses & Logistics", description: "Network infrastructure, surveillance systems, and operational connectivity." },
  { icon: "fa-utensils", name: "Hospitality", description: "Technology and security solutions for hotels, restaurants, and guest facilities." },
  { icon: "fa-hospital", name: "Healthcare Facilities", description: "Reliable networking and monitoring solutions for clinics and healthcare environments." },
  { icon: "fa-graduation-cap", name: "Educational Institutions", description: "Secure technology infrastructure for schools, colleges, and training centers." },
];

const SERVICES = [
  { icon: "fa-computer", title: "Network Office IT Setup", description: "Reliable IT infrastructure solutions for modern businesses.", includes: ["LAN & WiFi Setup", "Router Configuration", "Workstation Deployment", "Network Security"], anchor: "network-office-it-setup" },
  { icon: "fa-video", title: "CCTV Installation", description: "Professional surveillance systems for complete business security.", includes: ["IP & HD Cameras", "NVR/DVR Systems", "Remote Monitoring", "AMC Support"], anchor: "cctv-installation" },
  { icon: "fa-screwdriver-wrench", title: "IT Annual Maintenance", description: "Proactive maintenance to keep your systems running smoothly.", includes: ["Preventive Maintenance", "Software Updates", "Hardware Support", "Priority Assistance"], anchor: "it-annual-maintenance" },
  { icon: "fa-server", title: "Server Virtualization", description: "Optimize performance and reduce infrastructure costs.", includes: ["VMware Solutions", "Hyper-V Deployment", "Resource Optimization", "Backup & Recovery"], anchor: "server-virtualization" },
  { icon: "fa-network-wired", title: "Structured Cabling", description: "Organized cabling systems for reliable connectivity.", includes: ["Cat6 & Cat6A Cabling", "Fiber Optic Solutions", "Patch Panel Setup", "Network Testing"], anchor: "structured-cabling" },
  { icon: "fa-phone-volume", title: "Telephone Solutions", description: "Modern communication systems for growing businesses.", includes: ["IP PBX Systems", "VoIP Solutions", "Call Management", "Remote Extensions"], anchor: "telephone-solutions" },
  { icon: "fa-lightbulb", title: "Technology Consultation", description: "Expert guidance for selecting the right technology solutions.", includes: ["Product Recommendations", "Solution Planning", "Vendor Coordination", "Technical Consultation"], anchor: "technology-consultation" },
  { icon: "fa-laptop", title: "IT Hardware Services", description: "Supply, installation, and support for essential IT equipment.", includes: ["Desktop & Laptop Setup", "Server Installation", "Network Equipment", "Hardware Troubleshooting"], anchor: "it-hardware-services" },
];

const WHY_CHOOSE = [
  { icon: "fa-shield-halved", title: "Trusted Solutions", description: "Secure, repeatable technology services engineered for long-term operational stability." },
  { icon: "fa-cogs", title: "Technical Expertise", description: "Certified professionals with hands-on experience across infrastructure, surveillance and networking." },
  { icon: "fa-headset", title: "Dedicated Support", description: "Responsive support and follow-through designed to keep your business running without interruption." },
  { icon: "fa-award", title: "Quality Assurance", description: "Rigorous quality standards and premium product sourcing for dependable results." },
];

export default function Home() {
  return (
    <>
      <Seo
        title="IT Infrastructure, CCTV & Networking Solutions in Dubai | Golden Magic Electronics"
        description="Professional CCTV installation, networking, structured cabling, server virtualization, and IT support services across Dubai and the UAE."
      />

      <section className="home-hero" aria-label="Hero">
        <div className="home-hero-content">
          <div className="home-hero-left">
            <p className="home-hero-eyebrow">UAE IT, CCTV & Networking</p>
            <h1 className="home-hero-heading">IT Infrastructure, CCTV & Networking Solutions Across the UAE</h1>
            <p className="home-hero-sub">
              Helping businesses deploy secure networks, surveillance systems, structured cabling, server
              infrastructure, and managed IT support.
            </p>
            <div className="home-hero-trust">
              <span>✓ 20+ Years Experience</span>
              <span>✓ 500+ Projects Completed</span>
              <span>✓ 200+ Business Clients</span>
              <span>✓ 24/7 Technical Support</span>
            </div>
            <div className="home-hero-ctas">
              <Button to="/contact" variant="primary">Get Free Site Assessment</Button>
              <a href="#services" className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.45)" }}>
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-section">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="eyebrow">Trusted Across the UAE</p>
            <h2 className="section-title">Partner brands and certifications</h2>
            <p className="section-subtitle">
              Our clients and partners trust us for secure, enterprise-ready installations and operational support.
            </p>
          </div>
          <div className="grid cols-4">
            {PARTNERS.map((partner) => (
              <article className="partner-card" key={partner.name}>
                <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap section-bg-white">
        <div className="container">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title" style={{ marginTop: "0.75rem" }}>
              Industries We Support Across the UAE
            </h2>
            <p className="section-subtitle">
              We deliver CCTV installation, networking, structured cabling, IT infrastructure, and technology support
              solutions for organizations across multiple industries throughout the UAE.
            </p>
          </Reveal>

          <Reveal as="div" className="industries-grid">
            {INDUSTRIES.map((industry) => (
              <div className="industry-card" key={industry.name}>
                <div className="industry-icon">
                  <i className={`fa-solid ${industry.icon}`} aria-hidden="true"></i>
                </div>
                <h3 className="industry-name">{industry.name}</h3>
                <p className="industry-description">{industry.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="services" className="section-gap section-bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Comprehensive IT & Security Solutions</h2>
            <p className="section-subtitle">
              We provide CCTV installation, structured cabling, networking, server virtualization, IT maintenance,
              and technology support services for businesses across Dubai and the UAE.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <article className="service-card-premium" key={service.title}>
                <div className="service-icon-container">
                  <i className={`fa-solid ${service.icon}`} aria-hidden="true"></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div>
                  <p className="service-includes-label">Includes:</p>
                  <ul className="service-includes-list">
                    {service.includes.map((item) => (
                      <li key={item}>
                        <i className="fa-solid fa-check" aria-hidden="true"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={`/services#${service.anchor}`} className="btn btn-primary btn-sm" style={{ marginTop: "auto" }}>
                  Learn More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap section-bg-soft">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="eyebrow">Why Choose GME</p>
            <h2 className="section-title">Trusted solutions for modern enterprises</h2>
            <p className="section-subtitle">
              We deliver practical electronics, networking, and IT services with the reliability and discipline
              expected by Dubai businesses.
            </p>
          </div>
          <div className="grid cols-4">
            {WHY_CHOOSE.map((item) => (
              <article className="feature-card" key={item.title}>
                <div className="feature-icon">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                </div>
                <div className="feature-content">
                  <h3>{item.title}</h3>
                  <p className="feature-description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <div className="home-cta section-bg-gradient">
            <p className="eyebrow">Enterprise-grade technology, locally delivered</p>
            <h2>Accelerate your business with trusted local IT expertise.</h2>
            <p>
              From CCTV installations to network design and ongoing support, GME helps UAE businesses achieve
              resilient, secure technology operations.
            </p>
            <div className="button-row" style={{ justifyContent: "center" }}>
              <Button to="/contact" variant="outline">Request a Quote</Button>
              <Button to="/contact" variant="ghost">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
