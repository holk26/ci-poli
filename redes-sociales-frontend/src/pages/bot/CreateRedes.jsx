import { Col, Container, Row, Button, Modal, Table } from "react-bootstrap";
import PlatformForm from "./formularios/PlatformForm";
import { getPlatform } from "./api/task.api";
import { useState, useEffect } from "react";
const CreateRedes = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [redes, setRedes] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      const [success, data] = await getPlatform();
      if (success) {
        setRedes(data);
      } else {
        console.error("Error fetching redes:", data);
      }
    };

    fetchOwners();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Redes sociales</h1>
        </Col>
        <Col>
          <Button onClick={handleShow}>Crear red social</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Url</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {redes.map((rede) => (
                <tr key={rede.id}>
                  <td>{rede.id}</td>
                  <td>{rede.platform_name}</td>
                  <td>{rede.platform_api_url}</td>
                  <td>
                    <Button>Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Plataformas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PlatformForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateRedes;
