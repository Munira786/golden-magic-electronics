export default function Card({ icon, title, description, children, className = "", variant = "service" }) {
  return (
    <article className={`${variant}-card${className ? ` ${className}` : ""}`}>
      {icon && (
        <div className={`${variant}-icon-container`}>
          <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
        </div>
      )}
      {title && <h3 className={`${variant}-title`}>{title}</h3>}
      {description && <p className={`${variant}-description`}>{description}</p>}
      {children}
    </article>
  );
}
