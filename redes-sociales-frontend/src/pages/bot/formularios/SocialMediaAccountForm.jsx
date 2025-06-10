import { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  InputGroup,
  Stack,
  Badge,
  Col,
} from "react-bootstrap";
import config from "../../../config";
const SocialMediaAccountForm = ({
  idOwner,
  idPersonalidad,
  setidOwner,
  setIdPersonalidad,
}) => {
  console.log(idPersonalidad);
  const [formData, setFormData] = useState({
    other_credentials: { User: "", password: "" },
    group: [], // Cambiado a un arreglo para almacenar los grupos
    account_name: "",
    access_token: "",
    access_secret: "",
    bot_personality: idPersonalidad?.id,
    owner: idOwner?.id,
  });

  const [grupo, setGrupo] = useState(""); // Estado para el nuevo grupo
  const [groupsX, setGroups] = useState([]); // Estado para la lista de grupos

  const handleCredentialsChange = (e) => {
    setFormData({
      ...formData,
      other_credentials: {
        ...formData.other_credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveGroup = (index) => {
    const updatedGroups = [...groupsX];
    updatedGroups.splice(index, 1);
    setGroups(updatedGroups);
    setFormData({
      ...formData,
      group: updatedGroups,
    });
  };

  const handleAddGroup = () => {
    if (grupo.trim() !== "") {
      const grupoArray = grupo.split(",").map((item) => item.trim()); // Separar grupos por comas y quitar espacios
      setGroups([...groupsX, ...grupoArray]); // Agregar los nuevos grupos a la lista
      setFormData({
        ...formData,
        group: [...formData.group, ...grupoArray], // Agregar los nuevos grupos a los datos del formulario
      });
      setGrupo(""); // Limpiar el campo de entrada de grupo
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);
    const url = `${config.apiUrl}social_media_accounts/`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      // Limpieza de localStorage después del envío exitoso
      localStorage.removeItem("idPersonalidad");
      localStorage.removeItem("idOwner");
      setidOwner(null);
      setIdPersonalidad(null);
      // Limpiar los formularios
      setFormData({
        other_credentials: { User: "", password: "" },
        group: [],
        account_name: "",
        access_token: "",
        access_secret: "",
        bot_personality: "", // o el valor por defecto que desees
        owner: "", // o el valor por defecto que desees
      });
      setGrupo("");
      setGroups([]);
      setIsSubmitting(false);
      alert("datos enviados");
      // Handle the response here, maybe clear form or show success message
    } catch (error) {
      console.error("Error posting data", error);
      setIsSubmitting(false);
      // Handle errors here, maybe show error message
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="accountName">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="accessToken">
              {/* <Form.Label>Access Token</Form.Label> */}
              <Form.Control
                type="text"
                name="access_token"
                value={formData.access_token}
                onChange={handleChange}
                hidden
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="accessSecret">
              {/* <Form.Label>Access Secret</Form.Label> */}
              <Form.Control
                type="text"
                name="access_secret"
                value={formData.access_secret}
                onChange={handleChange}
                hidden
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="userCredentials">
              <Form.Label>User Credentials</Form.Label>
              <Form.Control
                type="text"
                name="User"
                placeholder="User"
                value={formData.other_credentials.User}
                onChange={handleCredentialsChange}
              />
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.other_credentials.password}
                onChange={handleCredentialsChange}
                className="mt-2"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              name="tipos_de_grupos"
              onChange={(event) => setGrupo(event.target.value)}
              value={grupo}
              placeholder="Ingrese el nombre del grupo para unirse separado por comas"
              aria-label="Nombre del grupo"
              aria-describedby="button-addon2"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleAddGroup}
            >
              Agregar Grupo
            </Button>
          </InputGroup>
          <Stack direction="horizontal" gap={2}>
            {groupsX.map((group, index) => (
              <Badge
                pill
                bg="primary"
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                {group}
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleRemoveGroup(index)}
                >
                  X
                </Button>
              </Badge>
            ))}
          </Stack>
        </Row>

        <Form.Group className="mb-3" controlId="botPersonality">
          <Form.Control
            type="number"
            name="bot_personality"
            value={formData.bot_personality}
            onChange={handleChange}
            required
            hidden
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="owner">
          <Form.Control
            type="number"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            hidden
            required
          />
        </Form.Group>

        <Button
          disabled={isSubmitting}
          className="m-0 mx-auto d-block"
          variant="primary"
          type="submit"
        >
          {isSubmitting ? "Enviando..." : "Crear Cuenta"}
        </Button>
      </Form>
    </Container>
  );
};

export default SocialMediaAccountForm;
