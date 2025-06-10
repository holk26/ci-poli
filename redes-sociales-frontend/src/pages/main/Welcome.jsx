import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function Welcome() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="shadow" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="text-center">Bienvenido</Card.Title>
          <Link className="btn btn-primary d-block mt-3" to="/login">
            Iniciar sesión
          </Link>
          <Link className="btn btn-secondary d-block mt-3" to="/register">
            Registrarse
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Welcome;
