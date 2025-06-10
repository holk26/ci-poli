import { useState, useEffect } from "react";
import {
  Button,
  Form,
  InputGroup,
  Badge,
  Stack,
  Col,
  Row,
} from "react-bootstrap";

// eslint-disable-next-line react/prop-types
function SocialMediaForm({ initialData, setidAccount }) {
  const [formData, setFormData] = useState(
    initialData || {
      nombre_de_campana: "",
      nombre_del_Perfil: "",
      telefono_campana: "",
      usuario_cuenta: "",
      password: "",
      campana_que_pertenece: "",
      sexo_M_F: "",
      preferred_language: "",
      temas_sobre_los_que_publica: "",
      personalidad: "",
      tipos_de_grupos: "",
      proxy: "",
      ejecuto: "",
    }
  );

  const [grupo, setGrupo] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleAddGroup = (event) => {
    if (event.type === "click") {
      // Dividir el texto del input por comas, eliminar espacios en blanco y filtrar elementos vacíos
      const newGroups = grupo
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
      if (newGroups.length > 0) {
        // Verificar si hay grupos nuevos después de dividir y filtrar
        // Concatenar los nuevos grupos con los grupos existentes
        const updatedGroups = [...groups, ...newGroups];
        setGroups(updatedGroups);
        setFormData({
          ...formData,
          tipos_de_grupos: updatedGroups,
        });
      }
      setGrupo("");
    }
  };

  const handleRemoveGroup = (index) => {
    const newGroups = groups.slice();
    newGroups.splice(index, 1);
    setGroups(newGroups);
    setFormData({
      ...formData,
      tipos_de_grupos: newGroups,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Verificar que tipos_de_grupos no esté vacío
    if (groups.length === 0) {
      alert("Debe ingresar al menos un grupo antes de enviar el formulario.");
      return; // Detener el envío del formulario si no hay grupos
    }
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Nombre de Campaña</Form.Label>
          <Form.Control
            type="text"
            name="nombre_de_campana"
            value={formData.nombre_de_campana}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Nombre del Perfil</Form.Label>
          <Form.Control
            type="text"
            name="nombre_del_Perfil"
            value={formData.nombre_del_Perfil}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Teléfono de Campaña</Form.Label>
          <Form.Control
            type="tel"
            name="telefono_campana"
            value={formData.telefono_campana}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Usuario Cuenta</Form.Label>
          <Form.Control
            type="text"
            name="usuario_cuenta"
            value={formData.usuario_cuenta}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Campaña que Pertenece</Form.Label>
          <Form.Control
            type="text"
            name="campana_que_pertenece"
            value={formData.campana_que_pertenece}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Sexo</Form.Label>
          <Form.Select
            name="sexo_M_F"
            value={formData.sexo_M_F}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Idioma Preferido</Form.Label>
          <Form.Control
            type="text"
            name="preferred_language"
            value={formData.preferred_language}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Temas sobre los que Publica</Form.Label>
          <Form.Control
            type="text"
            name="temas_sobre_los_que_publica"
            value={formData.temas_sobre_los_que_publica}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Personalidad</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            name="personalidad"
            value={formData.personalidad}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="tipos_de_grupos"
            onChange={(event) => setGrupo(event.target.value)}
            value={grupo}
            placeholder="Ingrese el nombre del grupo"
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
          {groups.map((group, index) => (
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

        {/*<Form.Group as={Col} className="mb-3">
          <Form.Label>Proxy (JSON)</Form.Label>
          <Form.Control
            type="text"
            name="proxy"
            value={formData.proxy}
            onChange={handleInputChange}
            required
          />
        </Form.Group>*/}

        <Button variant="primary" type="submit" className="mt-3">
          Enviar
        </Button>
      </Row>
    </Form>
  );
}

export default SocialMediaForm;
