// src/components/ListBots.js
import { Container, Row, Col } from "react-bootstrap";
import BotCard from "./components/BotCard";
import useBotStore from "../../store/botStore";
import useWebSocket from "./hooks/useWebSocket";

const Realtime = () => {
  const { sendToggleCommand } = useWebSocket();
  const { robots, isConnected } = useBotStore();

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
              onToggle={(running) => sendToggleCommand(botId, running)}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Realtime;
