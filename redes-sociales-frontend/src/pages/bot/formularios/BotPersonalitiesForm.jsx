import { useState } from "react";
import config from "../../../config";
import { GrMagic } from "react-icons/gr";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";

function BotPersonalitiesForm({ setIdPersonalidad }) {
  const magicWandAnimation = {
    scale: [1, 1.1, 1, 1.1, 1], // Cambia la escala para simular el movimiento
    rotate: [0, 10, -10, 10, 0], // Rota ligeramente para dar la sensación de agitación
    transition: {
      duration: 2, // Duración total de la animación
      ease: "easeInOut", // Tipo de "ease" para suavizar la animación
      repeat: Infinity, // Repetir la animación infinitamente
    },
  };
  const [isFetching, setIsFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    description: "",
    language: "",
  });
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const suspenseAnimation = {
    scale: [1, 1.02, 1, 1.02, 1], // Una sutil animación de escala
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  const handleModalSubmit = async () => {
    // Lógica para enviar la petición HTTP
    setIsFetching(true);
    handleModalClose();
    //has que la modal se agite mietras hace la solicitud
    const url = `${config.apiUrl}openai/text/?prompt=${encodeURIComponent(
      modalFormData.description
    )}&language=${encodeURIComponent(modalFormData.language)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setFormData(data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    language: "ESPAÑOL",
    communication_style: "",
    values: "",
    preferences: "",
    dislikes: "",
    example_responses: "",
    special_knowledge: "",
    cultural_references: "",
    phraseology: "",
    past_interactions: "",
    emotional_reactions: "",
    objectives: "",
    behavioral_tendencies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function wrapLetters(text) {
    return text.split("").map((letter, index) => (
      <motion.span
        key={index}
        style={{ display: "inline-block" }}
        animate={isFetching ? letterAnimation(index) : {}}
      >
        {letter}
      </motion.span>
    ));
  }

  const letterAnimation = (index) => ({
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 0.5,
      // Usa una función seno para el retraso y ajusta los valores según sea necesario
      delay: Math.sin(index * 0.3) * 0.5 + 0.5,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.apiUrl}bot_personalities/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setIdPersonalidad(data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      alert("Error submitting data.");
    }
  };

  return (
    <div className="container mt-5">
      {/* quiero animar todo el compónente */}
      <Row className="align-items-center">
        <Col xs="auto">
          <motion.h2>{wrapLetters("Bot Personalities Form")}</motion.h2>
        </Col>
        <Col xs="auto">
          <motion.div
            animate={magicWandAnimation}
            style={{ display: "inline-block" }}
            onClick={handleModalShow}
          >
            <GrMagic size={24} color="blue" />
          </motion.div>
        </Col>
      </Row>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="El nombre de la personalidad del bot."
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            className="form-control"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Una breve descripción o biografía de la personalidad del bot. Escribe en primera persona"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Escribe la ubicacion del bot"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Language</label>
          <select
            className="form-control"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="ESPAÑOL">Español</option>
            <option value="ENGLISH">English</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Communication Style</label>
          <input
            list="communication_style"
            datalist="communication_style"
            id="communication_style"
            className="form-control"
            name="communication_style"
            value={formData.communication_style}
            onChange={handleChange}
            placeholder="Formal, Informal, Serio, Sarcastico, cariñoso"
          />
          <datalist id="communication_style">
            <option value="Formal"></option>
            <option value="Informal"></option>
            <option value="Serio"></option>
            <option value="Sarcastico"></option>
            <option value="diverido"></option>
            <option value="cariñoso"></option>
          </datalist>
        </div>

        <div className="mb-3">
          <label className="form-label">Values</label>
          <input
            type="text"
            className="form-control"
            name="values"
            value={formData.values}
            onChange={handleChange}
            placeholder="Los valores centrales que la personalidad del bot debe reflejar"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preferences</label>
          <input
            type="text"
            className="form-control"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Las preferencias de la personalidad del bot"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dislikes</label>
          <input
            type="text"
            className="form-control"
            name="dislikes"
            value={formData.dislikes}
            onChange={handleChange}
            placeholder="Las aversiones de la personalidad del bot."
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Example Responses</label>
          <input
            type="text"
            className="form-control"
            name="example_responses"
            value={formData.example_responses}
            onChange={handleChange}
            placeholder="Ejemplos de cómo debería responder el bot a ciertas situaciones o preguntas"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Special Knowledge</label>
          <input
            type="text"
            className="form-control"
            name="special_knowledge"
            value={formData.special_knowledge}
            onChange={handleChange}
            placeholder="Cualquier conocimiento o habilidad especial que la personalidad del bot posea"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cultural References</label>
          <input
            type="text"
            className="form-control"
            name="cultural_references"
            value={formData.cultural_references}
            onChange={handleChange}
            placeholder="Referencias culturales específicas que la personalidad del bot debe entender o utilizar."
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phraseology</label>
          <input
            type="text"
            className="form-control"
            name="phraseology"
            value={formData.phraseology}
            onChange={handleChange}
            placeholder="Frases o modismos típicos que la personalidad del bot podría usar."
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Past Interactions</label>
          <input
            type="text"
            className="form-control"
            name="past_interactions"
            value={formData.past_interactions}
            onChange={handleChange}
            placeholder="Datos sobre interacciones pasadas que el bot ha tenido y cómo respondió en esos casos."
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Emotional Reactions</label>
          <input
            type="text"
            className="form-control"
            name="emotional_reactions"
            value={formData.emotional_reactions}
            onChange={handleChange}
            required
            placeholder="Cómo debería reaccionar el bot emocionalmente ante diferentes tipos de estímulos o situaciones."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Objectives</label>
          <input
            type="text"
            className="form-control"
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
            required
            placeholder="Los objetivos que la personalidad del bot está tratando de alcanzar en sus interacciones."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Behavioral Tendencies</label>
          <input
            type="text"
            className="form-control"
            name="behavioral_tendencies"
            value={formData.behavioral_tendencies}
            onChange={handleChange}
            placeholder="Cualquier tendencia comportamental notable que quieras que la personalidad del bot exhiba."
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Descripción y Lenguaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={modalFormData.description}
                onChange={handleModalChange}
                placeholder="Ingrese descripción"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lenguaje</Form.Label>
              <Form.Control
                type="text"
                name="language"
                value={modalFormData.language}
                onChange={handleModalChange}
                placeholder="Ingrese lenguaje"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
// BotPersonalitiesForm.defaultProps = {
//   initialProfile: {
//     // ... ejemplo de datos de perfil
//   },
// };
export default BotPersonalitiesForm;
