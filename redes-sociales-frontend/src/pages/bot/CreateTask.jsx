import { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import config from "../../config";
const CreateTask = () => {
  const [formData, setFormData] = useState({
    task_name: "",
    creator: "",
    descripcion: "",
    platform: null,
  });

  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}social_media_platforms/`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        setPlatforms(response.data);
      } catch (error) {
        console.error("Error fetching platforms", error);
        // Handle errors here, maybe show an error message
      }
    };

    fetchPlatforms();
  }, []);

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setFormData({
      ...formData,
      platform: platform.id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${config.apiUrl}task_types/`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      // Handle the response here, maybe clear form or show success message
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here, maybe show error message
    }
  };

  return (
    <Container>
      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="task_name"
                value={formData.task_name}
                onChange={(e) =>
                  setFormData({ ...formData, task_name: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="creator">
              <Form.Label>Creator</Form.Label>
              <Form.Control
                type="text"
                name="creator"
                value={formData.creator}
                onChange={(e) =>
                  setFormData({ ...formData, creator: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="creator">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="platform">
              <Form.Label>Platform</Form.Label>
              <DropdownButton
                id="platform-dropdown"
                title={
                  selectedPlatform
                    ? selectedPlatform.platform_name
                    : "Select a Platform"
                }
              >
                {platforms.map((platform) => (
                  <Dropdown.Item
                    key={platform.id}
                    onClick={() => handlePlatformSelect(platform)}
                  >
                    {platform.platform_name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTask;
