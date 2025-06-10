import { Col, Card, Button } from "react-bootstrap";
import { FaPause, FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";

const BotCard = ({ bot, onToggle }) => {
  return (
    <Col md={6} key={bot.client_id}>
      <Card className="mb-4 shadow rounded">
        <Card.Body>
          <Card.Title>{bot.bot_name}</Card.Title>
          <ul>
            <li>
              Bot:{" "}
              <span className={`text-${bot.running ? "success" : "danger"}`}>
                {bot.running ? "Activo" : "Inactivo"}
              </span>
            </li>
            <li>Estado: {bot.status}</li>
          </ul>
          <Button
            variant={bot.running ? "secondary" : "primary"}
            onClick={() => onToggle(bot.client_id, bot.running)}
          >
            {bot.running ? (
              <>
                <FaPause /> Pausar
              </>
            ) : (
              <>
                <FaPlay /> Reanudar
              </>
            )}
          </Button>
          <div className="mt-3">
            <p>Logs:</p>
            <ul>
              {bot.logs?.map((log, logIndex) => (
                <li key={logIndex}>{log}</li>
              ))}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

BotCard.propTypes = {
  bot: PropTypes.shape({
    client_id: PropTypes.string.isRequired,
    bot_name: PropTypes.string.isRequired,
    running: PropTypes.bool,
    status: PropTypes.string.isRequired,
    logs: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default BotCard;
