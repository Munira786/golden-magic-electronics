import Seo from "../components/Seo.jsx";

const POSTS = [
  { title: "Preparing Server Rooms for Summer", text: "A short guide to thermal audits and preventive measures for reliable operation." },
  { title: "Choosing CCTV for Retail", text: "Key considerations when specifying surveillance systems for stores." },
];

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog — Golden Magic Electronics"
        description="Blog — Golden Magic Electronics - Enterprise technology solutions in the UAE."
      />
      <div className="page-content simple-page">
        <h1>News & Articles</h1>
        <p>Insights on networking, security and business IT best practices.</p>

        <section className="simple-grid mt-8">
          {POSTS.map((post) => (
            <article className="simple-card" key={post.title}>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
