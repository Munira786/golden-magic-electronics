import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";

const ROLES = [
  { title: "Field Service Technician", text: "Experienced with CCTV, networking and on-site installations. UAE-based. Competitive salary and benefits." },
  { title: "Sales & Account Manager", text: "B2B experience preferred; responsible for client relationships across UAE markets." },
];

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers — Golden Magic Electronics"
        description="Careers — Golden Magic Electronics - Enterprise technology solutions in the UAE."
      />
      <div className="page-content simple-page">
        <h1>Careers</h1>
        <p>We're growing — see open roles and apply to join the team.</p>

        <section className="simple-card-list mt-8">
          {ROLES.map((role) => (
            <article className="simple-card" key={role.title}>
              <h2>{role.title}</h2>
              <p>{role.text}</p>
              <Button to="/contact" variant="primary">Apply / Enquire</Button>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
