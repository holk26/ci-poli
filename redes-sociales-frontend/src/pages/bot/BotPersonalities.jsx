import { Container, Table, Button } from "react-bootstrap";
import { getPersonalityBots } from "./api/task.api";
import { useEffect, useState } from "react";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const BotPersonalities = () => {
  const [personality, setPersonality] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      const [success, data] = await getPersonalityBots();
      if (success) {
        setPersonality(data);
      } else {
        console.error("Error fetching redes:", data);
      }
    };

    fetchOwners();
  }, []);

  return (
    <Container>
      <h1>Crea y edita personalidades de bots</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Biografia</th>
            <th colSpan={2}>Accion</th>
          </tr>
        </thead>
        <tbody>
          {personality.map((bot) => (
            <tr key={bot.id}>
              <td>{bot.id}</td>
              <td>{bot.name}</td>
              <td>{bot.bio}</td>
              <td>
                <FaEdit />
              </td>
              <td>
                <IoChatboxEllipsesSharp />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BotPersonalities;
