import Layout from "./components/Layout";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function App() {
  return (
    <Layout>
      <Container className="mt-5">
        <Card className="shadow" style={{ width: "11rem" }}>
          <Card.Img variant="top" src="/flavicon.png" />
          <Card.Body>
            <Card.Title>Bot redes sociales</Card.Title>
            <Card.Text>Automatiza tus redes sociales</Card.Text>
            <Link to="/bot-redes/"><Button variant="primary">Empezar</Button></Link>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

export default App;
