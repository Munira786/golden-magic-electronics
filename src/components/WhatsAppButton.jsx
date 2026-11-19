import { CONTACT } from "../config/site.js";

const GREETING = encodeURIComponent("Hello Golden Magic Electronics, I'd like to ask about your services.");

// Floating WhatsApp shortcut, shown on every page. WhatsApp is the main way UAE customers get in touch.
export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${CONTACT.whatsapp}?text=${GREETING}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
    </a>
  );
}
