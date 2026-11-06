import { useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";
import Reveal from "../components/Reveal.jsx";

const SUPPORT_TIMELINE = [
  { icon: "fa-headset", title: "Technical Support", text: "Rapid troubleshooting and assistance for networking, server, and CCTV issues. Available remotely and on-site." },
  { icon: "fa-clipboard-check", title: "Project Consultations", text: "Expert recommendations, site surveys, and structured planning before implementation to ensure flawless execution." },
  { icon: "fa-screwdriver-wrench", title: "Maintenance Services", text: "Preventive and corrective maintenance (AMCs) to extend the lifespan of your IT infrastructure and surveillance systems." },
  { icon: "fa-truck-fast", title: "Emergency Assistance", text: "Priority support for critical infrastructure failures to restore your business operations immediately." },
];

const FAQS = [
  { q: "How can I request a quotation?", a: "You can request a quotation by filling out the form on this page, sending us an email at gme786@gmail.com, or directly messaging us on WhatsApp with your project requirements." },
  { q: "Do you provide UAE-wide support?", a: "Yes, while our head office is in Dubai, we provide installation and on-site support services across all Emirates including Abu Dhabi, Sharjah, and Ajman." },
  { q: "Do you offer Annual Maintenance Contracts (AMC)?", a: "Absolutely. We offer comprehensive AMCs for IT infrastructure, CCTV systems, servers, and telephony to ensure continuous operation and preventive care." },
  { q: "Can I request a site survey?", a: "Yes, we provide professional site surveys to accurately assess your networking, cabling, or surveillance requirements before delivering a finalized proposal." },
  { q: "How quickly can support requests be handled?", a: "We prioritize urgent infrastructure issues. Depending on your SLA or AMC contract, emergency response can be immediate remotely, or within a few hours for on-site visits in Dubai." },
  { q: "Do you provide remote technical support?", a: "Yes, for server, network configuration, and software-related issues, our team can provide secure remote technical support to resolve problems instantly." },
];

const SERVICE_OPTIONS = ["CCTV Installation", "Network Setup", "Structured Cabling", "Server Solutions", "IT Maintenance", "Technology Consultation", "Other"];

export default function Contact() {
  const location = useLocation();
  const prefillInterest = location.state?.interest || "";
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: prefillInterest ? `I'm interested in: ${prefillInterest}` : "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("gme-last-quote", JSON.stringify(form));
    setSubmitted(true);
    setForm({ name: "", company: "", email: "", phone: "", service: "", location: "", message: "" });
  }

  return (
    <>
      <Seo
        title="Contact — Golden Magic Electronics"
        description="Contact — Golden Magic Electronics - Enterprise technology solutions in the UAE."
      />

      <section className="contact-hero">
        <div className="contact-hero-content">
          <div>
            <span className="hero-label">Contact & Support</span>
            <h1 className="hero-title">Reach Out to the Golden Magic Electronics Team</h1>
            <p className="hero-desc">
              Request quotations, technical support, maintenance services, CCTV consultations, networking solutions,
              structured cabling projects, and enterprise IT assistance across Dubai and the UAE.
            </p>
            <div className="hero-badges">
              <span className="hero-badge"><i className="fa-solid fa-check" aria-hidden="true"></i> 20+ Years Experience</span>
              <span className="hero-badge"><i className="fa-solid fa-check" aria-hidden="true"></i> UAE-Wide Support</span>
              <span className="hero-badge"><i className="fa-solid fa-check" aria-hidden="true"></i> 24/7 Technical Assistance</span>
            </div>
            <div className="button-row">
              <a href="#quoteForm" className="btn btn-primary">Request a Quote</a>
              <Button href="tel:+971557557786" variant="ghost">Call Now</Button>
            </div>
          </div>
          <Reveal className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
              alt="IT Support Team"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="contact-hub">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Connect With Our Specialists</h2>
            <p className="section-subtitle">Choose the most convenient way to reach us for your IT and electronics requirements.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon"><i className="fa-solid fa-phone" aria-hidden="true"></i></div>
              <h3 className="contact-title">Phone Support</h3>
              <p className="contact-detail">+971 55 755 7786</p>
              <p className="contact-sub">Direct access to our technical team.</p>
              <a href="tel:+971557557786" className="contact-action">Call Now <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><i className="fa-solid fa-envelope" aria-hidden="true"></i></div>
              <h3 className="contact-title">Email Support</h3>
              <p className="contact-detail">gme786@gmail.com</p>
              <p className="contact-sub">Detailed project inquiries & quotes.</p>
              <a href="mailto:gme786@gmail.com" className="contact-action">Email Us <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
            </div>

            <div className="contact-card whatsapp-card">
              <div className="contact-icon"><i className="fa-brands fa-whatsapp" aria-hidden="true"></i></div>
              <h3 className="contact-title">WhatsApp Business</h3>
              <p className="contact-detail">+971 55 755 7786</p>
              <p className="contact-sub">Quick response for quotations and support.</p>
              <a href="https://wa.me/971557557786" target="_blank" rel="noreferrer" className="contact-action" style={{ color: "#059669" }}>
                Message Us <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><i className="fa-solid fa-clock" aria-hidden="true"></i></div>
              <h3 className="contact-title">Business Hours</h3>
              <p className="contact-detail">Mon – Sat</p>
              <p className="contact-sub">9:00 AM – 7:00 PM</p>
              <div className="contact-action" style={{ color: "var(--slate-500)" }}>Dubai Time (GST)</div>
            </div>
          </div>
        </div>
      </section>

      <section id="quoteForm" className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2 className="section-title">Tell Us About Your Project</h2>
              <p className="section-subtitle">
                Provide details about your requirements, and our technical team will get back to you with a
                tailored solution.
              </p>
            </div>

            {submitted && (
              <div className="form-success">
                <i className="fa-solid fa-check-circle" aria-hidden="true" style={{ marginRight: "0.5rem" }}></i>
                Thank you! Your request has been sent. We will contact you shortly.
              </div>
            )}

            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name *</label>
                <input id="name" name="name" type="text" required className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="company">Company Name</label>
                <input id="company" name="company" type="text" className="form-input" placeholder="Your Company LLC" value={form.company} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email" required className="form-input" placeholder="john@company.com" value={form.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input id="phone" name="phone" type="tel" required className="form-input" placeholder="+971 50 000 0000" value={form.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="service">Service Required</label>
                <select id="service" name="service" className="form-input" value={form.service} onChange={handleChange}>
                  <option value="" disabled>Select a Service</option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location">Project Location</label>
                <input id="location" name="location" type="text" className="form-input" placeholder="e.g., Deira, Dubai" value={form.location} onChange={handleChange} />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="form-input"
                  placeholder="Please describe your requirements or the issue you are facing..."
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-group full-width">
                <button type="submit" className="form-submit">Send Request</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <iframe
            className="map-embed"
            title="Golden Magic Electronics location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14434.614660352528!2d55.3059881643444!3d25.271923145890884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43477d6118b7%3A0x8670a53b2693fa95!2sDeira%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1714421102927!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <Reveal className="coverage-panel">
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Visit Our Dubai Office</h2>
            <p style={{ fontWeight: 600, color: "var(--slate-700)", marginBottom: "0.25rem" }}>Golden Magic Electronics</p>
            <p style={{ color: "var(--slate-600)" }}>Shop No. 6, Behind ALTAJ Studio<br />Deira, Dubai, UAE</p>
            <div className="mt-6">
              <Button href="https://maps.google.com" variant="primary" icon="fa-map-location-dot">
                Get Directions
              </Button>
            </div>
          </div>

          <div className="divider-col">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Service Coverage</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--slate-600)", marginBottom: "1rem" }}>
              On-site support available throughout the UAE:
            </p>
            <div className="coverage-list">
              {["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"].map((city) => (
                <span className="coverage-item" key={city}>{city}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="support-section">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="section-title">Fast and Reliable Support</h2>
            <p className="section-subtitle">
              Our commitment to ensuring your business operations run smoothly with minimal downtime.
            </p>
          </div>

          <div className="support-timeline">
            {SUPPORT_TIMELINE.map((item) => (
              <div className="support-timeline-item" key={item.title}>
                <div className="support-timeline-icon">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                </div>
                <div className="support-timeline-content">
                  <h3 className="support-timeline-title">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Common queries regarding our services and support.</p>
          </div>

          <div className="faq-grid">
            {FAQS.map((faq) => (
              <div className="faq-item" key={faq.q}>
                <h3 className="faq-q"><i className="fa-solid fa-circle-question" aria-hidden="true"></i> {faq.q}</h3>
                <p className="faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap" style={{ paddingTop: "0" }}>
        <div className="container">
          <div className="cta-whatsapp">
            <div className="cta-whatsapp-glow"></div>
            <div className="cta-whatsapp-content">
              <div className="cta-whatsapp-icon">
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </div>
              <h2>Need an Immediate Response?</h2>
              <p>Skip the form and reach out directly via WhatsApp for urgent technical support or rapid project estimations.</p>
              <div className="button-row" style={{ justifyContent: "center" }}>
                <a href="https://wa.me/971557557786" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ background: "var(--color-green)" }}>
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Chat on WhatsApp
                </a>
                <a href="#quoteForm" className="btn btn-ghost">
                  <i className="fa-solid fa-arrow-up" aria-hidden="true"></i> Return to Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
