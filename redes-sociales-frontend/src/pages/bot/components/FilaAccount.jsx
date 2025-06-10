import { Row, Col, Container } from "react-bootstrap";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoMdCreate } from "react-icons/io";
const FilaAccount = ({ title, children, ok, data }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (ok) {
      handleClose();
    }
  }, [ok]);

  return (
    <Container>
      <Row className="shadow p-3 mb-3 bg-white rounded justify-content-between">
        <Col>
          {data ? title + ": " + data : title}
          {!ok && <IoMdCreate onClick={handleShow} />}
        </Col>
        <Col xs="auto">
          {ok ? (
            <AiOutlineCheckCircle size={24} color="green" />
          ) : (
            <AiOutlineCloseCircle size={24} color="red" />
          )}
        </Col>
        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

export default FilaAccount;
