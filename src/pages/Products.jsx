import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const WHATSAPP_NUMBER = "971557557786";

const PRODUCTS = [
  { id: "prd-laptop", name: "Business Laptop", description: "Reliable laptop for office productivity, administration, and sales teams.", price: 2899, icon: "fa-laptop" },
  { id: "prd-camera", name: "CCTV Camera", description: "HD security camera for office, retail, warehouse, and entrance monitoring.", price: 349, icon: "fa-camera" },
  { id: "prd-switch", name: "24-Port Network Switch", description: "Managed gigabit switch for stable business networking and expansion.", price: 1299, icon: "fa-ethernet" },
  { id: "prd-cabling", name: "Structured Cabling Kit", description: "Patch panel, cable roll, connectors, and accessories for office fit-outs.", price: 899, icon: "fa-plug-circle-bolt" },
  { id: "prd-phone", name: "IP Phone", description: "Professional desk phone for reception, admin, and business communication.", price: 425, icon: "fa-phone" },
  { id: "prd-nvr", name: "CCTV Recorder NVR", description: "Network video recorder for secure surveillance archiving and playback.", price: 999, icon: "fa-hard-drive" },
];

function formatAED(value) {
  return `AED ${value.toLocaleString()}`;
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const whatsappText = encodeURIComponent(`Hello, I'd like a quotation for: ${product.name}`);

  function handleRequestQuote() {
    // The hash makes ScrollToTop jump straight to the form; state pre-fills it with this product.
    navigate({ pathname: "/contact", hash: "#quoteForm" }, { state: { interest: product.name } });
  }

  return (
    <article className="product-card">
      <div className="product-icon-container">
        <i className={`fa-solid ${product.icon}`} aria-hidden="true"></i>
      </div>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-tags">
        <span className="product-tag">🇦🇪 Local Delivery</span>
        <span className="product-tag">Halal / Shariah Compliant</span>
      </div>
      <p className="product-price">{formatAED(product.price)}</p>
      <p className="product-vat">Inclusive of VAT</p>
      <div className="product-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={handleRequestQuote}>
          Request Quote
        </button>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline btn-sm"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
        </a>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <>
      <Seo
        title="Products — Golden Magic Electronics"
        description="Products — Golden Magic Electronics - Enterprise technology solutions in the UAE."
      />

      <div className="page-content">
        <header className="mb-10">
          <p className="section-label">Product Portfolio</p>
          <h1 className="section-title" style={{ textAlign: "left", margin: "0 0 0.75rem" }}>
            High-quality electronics and networking equipment
          </h1>
          <p className="section-subtitle" style={{ textAlign: "left", margin: 0 }}>
            Browse our carefully selected technology products designed for office, retail, and commercial
            environments across the UAE.
          </p>
        </header>

        <section className="products-grid" aria-label="Products">
          {PRODUCTS.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
      </div>
    </>
  );
}
