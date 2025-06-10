import { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { getOwner } from "./api/task.api";
const Owner = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      const [success, data] = await getOwner();
      if (success) {
        setOwners(data);
      } else {
        console.error("Error fetching tasks:", data);
      }
    };

    fetchOwners();
  }, []);

  return (
    <Container>
      <h1 className="text-center">Owners</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.id}>
              <td>{owner.id}</td>
              <td>{owner.owner_name}</td>
              <td>{owner.owner_email}</td>
              <td>{owner.owner_phone}</td>
              <td>
                <Button>Editar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Owner;
