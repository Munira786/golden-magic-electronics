import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Golden Magic Electronics"
        description="The page you are looking for does not exist."
        noindex
      />
      <div className="page-content simple-page not-found">
        <p className="section-label">Error 404</p>
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
        <div className="button-row mt-8">
          <Button to="/" variant="primary" icon="fa-house">Back to Home</Button>
          <Button to="/contact" variant="outline" icon="fa-envelope">Contact Us</Button>
        </div>
      </div>
    </>
  );
}
