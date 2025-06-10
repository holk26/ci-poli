import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const PreguntaRespuestaForm = ({ onGuardar }) => {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const handleGuardar = () => {
    // Validar que ambos campos estén completos
    if (pregunta.trim() === "" || respuesta.trim() === "") {
      alert("Por favor, complete ambos campos.");
      return;
    }

    // Crear un objeto con la pregunta y la respuesta
    const nuevaPreguntaRespuesta = {
      pregunta,
      respuesta,
    };

    // Llamar a la función de devolución de llamada para guardar el objeto en un array
    onGuardar(nuevaPreguntaRespuesta);

    // Limpiar los campos después de guardar
    setPregunta("");
    setRespuesta("");
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Pregunta</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribe la pregunta"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Respuesta</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribe la respuesta"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-2" variant="primary" onClick={handleGuardar}>
        Guardar
      </Button>
    </Form>
  );
};

export default PreguntaRespuestaForm;
