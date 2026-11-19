import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Products from "./pages/Products.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import Careers from "./pages/Careers.jsx";
import Privacy from "./pages/Privacy.jsx";
import NotFound from "./pages/NotFound.jsx";

function skipToMain(event) {
  event.preventDefault();
  const main = document.getElementById("main");
  main?.focus({ preventScroll: true });
  main?.scrollIntoView();
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      {/* First focusable element: lets keyboard users jump past the navigation. Handled in JS so the
          URL does not change to /#main. */}
      <a href="#main" className="skip-link" onClick={skipToMain}>
        Skip to main content
      </a>
      <Navbar />
      {/* tabIndex -1: focusable from code (skip link, route changes) but not part of the Tab order. */}
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsentBanner />
    </>
  );
}
