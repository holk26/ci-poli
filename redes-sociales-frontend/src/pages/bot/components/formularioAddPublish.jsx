// FormularioAddPublish.jsx
import PropTypes from "prop-types"; // Importar PropTypes
import { Form, Row, Col, Card, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { uploadFileImge } from "../api/task.api";
import { useState, useEffect } from "react";
import { TbBrandOpenai } from "react-icons/tb";
import { analyzeImage } from "../api/task.api";
const FormularioAddPublish = ({ name = "", setFormato, setIsValidate }) => {
  const [uploading, setUploading] = useState(false);
  const [urlImge, setUrlImge] = useState([]);
  const [textPublic, setTextPublic] = useState("");
  const [publicationOption, setPublicationOption] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSwitchChange = (event) => {
    setIsFormVisible(event.target.checked);
    validateInputs();
    if (isFormVisible) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  };

  const handleTextareaChange = (event) => {
    setTextPublic(event.target.value);
    setFormato((prevFormato) => ({
      ...prevFormato,
      post: event.target.value,
    }));
  };

  const handleRadioChange = (e) => {
    setPublicationOption(e.target.id);
    console.log(e.target.id);
    setFormato((prevFormato) => ({
      ...prevFormato,
      type: e.target.id,
    }));
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const filePaths = [];
    if (!files.length) return;

    // Convertir FileList en un array de rutas temporales (esto dependerá de tu entorno de ejecución)
    for (let i = 0; i < files.length; i++) {
      filePaths.push(files[i]);
    }

    setUploading(true);
    try {
      const response = await uploadFileImge(filePaths);
      console.warn("Probando.....", response.data.imagesUrls);
      setUrlImge(response.data.imagesUrls);
      setFormato((prevFormato) => ({
        ...prevFormato,
        links_image: response.data.imagesUrls,
      }));
      // Aquí podrías actualizar el estado para indicar que la carga fue exitosa
    } catch (error) {
      console.error("Error al cargar archivos:", error);
      // Manejar el error aquí
    }
    setUploading(false);
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  const sendAnalityImg = async (url) => {
    const prompt = "Genera un mensaje para una publicación en mi muro";
    const [success, data] = await analyzeImage(url, prompt);
    if (success) {
      if (data.status) {
        setTextPublic(data.response);
        setFormato((prevFormato) => ({
          ...prevFormato,
          post: data.response,
        }));
      }
      console.log("Análisis de imagen exitoso:", data);
    } else {
      console.error("Error al analizar la imagen:", data);
    }
  };

  const validateInputs = () => {
    if (isFormVisible) {
      let isValid = textPublic.trim() !== "" && publicationOption.trim() !== "";
      isValid = !isValid;
      setIsValidate(isValid);
    } else {
      console.log("sin validar");
      setIsValidate(false);
    }
  };

  useEffect(() => {
    validateInputs();
  }, [textPublic, urlImge, publicationOption]);

  useEffect(() => {
    return () => {
      setFormato({});
      setIsValidate(false);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-4">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Publicación personalizada"
            onChange={handleSwitchChange}
          />
        </motion.h3>
        {isFormVisible && (
          <Form className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Form.Group controlId="texto">
                <Form.Control
                  placeholder="Texto de la publicacion"
                  onChange={handleTextareaChange}
                  value={textPublic}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3 mt-2">
                <Form.Label>Cargar imagen</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Opciones de Publicación:</Form.Label>
                <Form.Check
                  label="Ambas"
                  name="group1"
                  type="radio"
                  id="all"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  label="Muro"
                  name="group1"
                  onChange={handleRadioChange}
                  type="radio"
                  id="muro"
                />
                <Form.Check
                  label="Page"
                  name="group1"
                  onChange={handleRadioChange}
                  type="radio"
                  id="page"
                />
              </Form.Group>
              <hr />
              <h4 className="mt-4">Info</h4>

              <Row className="justify-content-center">
                {urlImge.map((url, index) => (
                  <Col xs={6} md={4} key={index} className="mt-3">
                    <Card className="h-100">
                      <div
                        className="overflow-hidden"
                        style={{ height: "210px" }}
                      >
                        <Card.Img
                          variant="top"
                          src={url}
                          alt={`Imagen ${index}`}
                          className="img-fluid"
                          onClick={() => handleImageClick(url)}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title>
                          Publicación{" "}
                          <TbBrandOpenai
                            className="bi-hand-index"
                            onClick={() => sendAnalityImg(url)}
                            style={{ cursor: "pointer" }}
                          />
                        </Card.Title>
                        <Card.Text>{textPublic || ""}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </Form>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          {selectedImage && (
            <img src={selectedImage} alt="Ampliada" className="img-fluid" />
          )}
        </Modal.Body>
      </Modal>
    </motion.div>
  );
};

// Agregar las validaciones de PropTypes
FormularioAddPublish.propTypes = {
  name: PropTypes.string, // Propiedad 'name' como cadena opcional
  //setFormato: PropTypes.func, // Propiedad 'onUploadSuccess' como función opcional
};

export default FormularioAddPublish;
