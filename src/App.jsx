import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";

import NotFound from "./pages/NotFound.jsx";
import { ROUTES } from "./routes.js";

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
          {ROUTES.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsentBanner />
    </>
  );
}
