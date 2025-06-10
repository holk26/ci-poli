import {
  Container,
  Modal,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { obtenerImagen, deleteImage } from "./api/task.api";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const GalleryImage = () => {
  const [urlImages, setUrlImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const sendAnalityImg = async (query) => {
    const [success, data] = await obtenerImagen(query);
    if (success) {
      // Asegurarse de que data sea un array
      if (Array.isArray(data)) {
        setUrlImages(data);
      } else {
        console.error("La respuesta no es un array de URL de imágenes.");
      }
    } else {
      console.error("Error imagen:");
    }
  };

  const deleteImg = async (url) => {
    const [success, data] = await deleteImage(url);
    if (success) {
      console.log(data);
      setShowModal(false);
      sendAnalityImg(" ");
    } else {
      console.error("Error imagen:");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    sendAnalityImg(searchQuery);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    sendAnalityImg(" ");
  }, []);
  const handleImageClick = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Form onSubmit={handleSearch}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Buscar imagen"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="outline-secondary"
                id="button-addon2"
              >
                Buscar {urlImages.length}
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        {urlImages?.map((url, index) => (
          <Col md={3} key={index}>
            <div className="mb-3">
              <LazyLoadImage
                src={url}
                alt={`Imagen ${index}`}
                effect="blur"
                onClick={() => handleImageClick(url)}
                className="img-fluid"
              />
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          {selectedImage && (
            <img src={selectedImage} alt="Ampliada" className="img-fluid" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteImg(selectedImage)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GalleryImage;
