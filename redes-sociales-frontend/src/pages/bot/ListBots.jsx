import { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

import config from "../../config";
import BotCard from "./components/BotCard";
const ListBots = () => {
  const [robots, setRobots] = useState({});
  const [ws, setWs] = useState(null);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const retryInterval = useRef(null);

  const sendToggleCommand = (botId, running) => {
    const command = ws ? (!running).toString() : "";
    if (ws) ws.send(JSON.stringify({ bot_id: botId, command }));
  };

  const connectWebSocket = () => {
    const socket = new WebSocket(`${config.webSocket}updates/`);
    setWs(socket);

    socket.onopen = () => {
      setIsConnected(true);
      if (retryInterval.current) {
        clearInterval(retryInterval.current);
        retryInterval.current = null;
      }
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "botUpdate") {
        const { client_id, data } = message;
        setRobots((prevRobots) => ({
          ...prevRobots,
          [client_id]: data,
        }));
      } else if (message.type === "botDisconnect") {
        const { client_id } = message;
        setRobots((prevRobots) => {
          const updatedRobots = { ...prevRobots };
          delete updatedRobots[client_id];
          return updatedRobots;
        });
      } else if (message.type === "botsList") {
        // Añadido para manejar la lista de bots
        const bots = message.data.reduce((acc, bot) => {
          acc[bot.client_id] = bot;
          return acc;
        }, {});
        setRobots(bots);
      }
    };

    socket.onerror = (event) => {
      setIsConnected(false);
      setError(`Error de conexión con el WebSocket. ${event}`);
    };

    socket.onclose = (event) => {
      setIsConnected(false);
      if (!event.wasClean) {
        setError("La conexión con el WebSocket se cerró inesperadamente.");
      }
      if (!retryInterval.current) {
        retryInterval.current = setInterval(() => {
          console.log("Intentando reconectar...");
          connectWebSocket();
        }, 5000);
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
      if (retryInterval.current) {
        clearInterval(retryInterval.current);
      }
    };
  }, []);

  return (
    <Container className="p-8">
      <Row className="justify-content-between align-items-center mb-6">
        <Col md="auto" className="mb-4">
          <h2 className="">Bot Control Dashboard</h2>
        </Col>
        <Col md="auto">
          <div className="text-lg">
            <span className="font-semibold">Socket Status: </span>
            <span className={`text-${isConnected ? "success" : "danger"}`}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </Col>
      </Row>

      {Object.keys(robots).length === 0 ? (
        <Row>
          <Col className="text-center">
            <p>No hay bots conectados.</p>
          </Col>
        </Row>
      ) : (
        <Row>
          {Object.keys(robots).map((botId) => (
            <BotCard
              key={botId}
              bot={robots[botId]}
              onToggle={sendToggleCommand}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ListBots;
