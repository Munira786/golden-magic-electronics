// Every page of the site. Used by App.jsx to set up routing AND by scripts/prerender.js to decide
// which HTML files to generate, so the two can never disagree. Add new pages here.
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Products from "./pages/Products.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import Careers from "./pages/Careers.jsx";
import Privacy from "./pages/Privacy.jsx";

export const ROUTES = [
  { path: "/", Component: Home },
  { path: "/about", Component: About },
  { path: "/services", Component: Services },
  { path: "/products", Component: Products },
  { path: "/contact", Component: Contact },
  { path: "/blog", Component: Blog },
  { path: "/careers", Component: Careers },
  { path: "/privacy", Component: Privacy },
];
