import PropTypes from "prop-types";

function Button({ title = "Default Title", type = "white" }) {
  return <button style={{ backgroundColor: type, border: "none", padding: ".5rem 1rem", color: type === "black" ? "white" : "black" }}>{title}</button>;
}

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
