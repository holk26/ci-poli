import { Toast } from "react-bootstrap";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";

const ToastX = ({ show, title, tipo, messes, time }) => {
  return (
    <Toast
      className="d-inline-block m-1"
      bg={tipo}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
        <small>{time}</small>
      </Toast.Header>
      <Toast.Body className={tipo === "Dark" && "text-white"}>
        {messes}
      </Toast.Body>
    </Toast>
  );
};

ToastX.propTypes = {
  title: propTypes.string.isRequired,
  tipo: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]).isRequired,
  messes: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ToastX;
