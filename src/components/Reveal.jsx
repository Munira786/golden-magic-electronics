import useReveal from "../hooks/useReveal.js";

export default function Reveal({ as: Tag = "div", className = "", delay, children, ...rest }) {
  const [ref, visible] = useReveal();
  const style = delay ? { "--delay": delay, ...rest.style } : rest.style;

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
