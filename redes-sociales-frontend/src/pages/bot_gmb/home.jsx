import { useState } from "react";
import PreguntaRespuestaForm from "./formulario";
import { Container, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import config from "../../config";
const HomeBotGMB = () => {
  const [preguntasRespuestas, setPreguntasRespuestas] = useState([]);
  const [respuestaSolicitud, setRespuestaSolicitud] = useState(null);

  const agregarPreguntaRespuesta = (nuevaPreguntaRespuesta) => {
    setPreguntasRespuestas([...preguntasRespuestas, nuevaPreguntaRespuesta]);
  };

  const enviarDatosAlServidor = async () => {
    try {
      if (preguntasRespuestas.length === 0) {
        alert("Error: No se pueden enviar preguntasRespuestas vacías");
        return;
      }
      const url = `${config.apiUrl}v2/gmb/training/`;
      //const url = "http://127.0.0.1:8000/api/v2/bot/gmb/";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const data = {
        data: preguntasRespuestas,
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setRespuestaSolicitud(jsonResponse);
        setPreguntasRespuestas([]);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Layout>
      <Container className="mt-5">
        <div className="App">
          <h1>Guardar Preguntas y Respuestas</h1>
          <PreguntaRespuestaForm onGuardar={agregarPreguntaRespuesta} />
          <Button
            className="mt-5"
            variant="primary"
            onClick={enviarDatosAlServidor}
          >
            Enviar Datos al Servidor
          </Button>
          {respuestaSolicitud && (
            <div>
              <h2>Respuesta del Servidor:</h2>
              <pre>{JSON.stringify(respuestaSolicitud, null, 2)}</pre>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default HomeBotGMB;
