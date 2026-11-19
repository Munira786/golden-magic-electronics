import useReveal from "../hooks/useReveal.js";

export default function Reveal({ as: Tag = "div", className = "", delay, style, children, ...rest }) {
  const [ref, visible] = useReveal();
  // --delay staggers the reveal animation (css/base/utilities.css). `style` is pulled out of the rest
  // props so a caller's style is merged with it instead of overwriting it.
  const mergedStyle = delay ? { ...style, "--delay": delay } : style;

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
