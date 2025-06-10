import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import config from "../../../config";
const PlatformForm = () => {
  const [formData, setFormData] = useState({
    platform_name: "",
    platform_api_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Utiliza axios para enviar una solicitud POST
      const response = await axios.post(
        `${config.apiUrl}social_media_platforms/`,
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
      alert(`Error submitting data: ${error.message}`);
    }
  };

  return (
    <Container>
      <h2 className="mt-5">Platform Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="platform_name">
          <Form.Label>Platform Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Platform Name"
            name="platform_name"
            value={formData.platform_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="platform_api_url">
          <Form.Label>Platform API URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter Platform API URL"
            name="platform_api_url"
            value={formData.platform_api_url}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PlatformForm;
