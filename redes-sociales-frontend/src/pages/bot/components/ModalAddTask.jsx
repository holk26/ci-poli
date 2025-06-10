// ModalAddTask.jsx
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import FormularioAddPublish from "./formularioAddPublish";

import {
  getViewPlataforma,
  getSocialMediaPlatforms,
  createTasksForAllAccounts,
  getSocialMediaAccount,
} from "../api/task.api";

const ModalAddTask = ({ showModal, handleClose, fetchTasks }) => {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState("");
  const [taskTypes, setTaskTypes] = useState([]);
  const [selectedTaskTypeId, setSelectedTaskTypeId] = useState("");
  const [selectAccount, setSelectAccount] = useState([]);
  const [selectAccountId, setSelectAccountId] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);

  const [formato, setFormato] = useState({});

  const fetchGetSocialMediaAccount = async () => {
    const [success, data] = await getSocialMediaAccount();
    console.info(data);
    if (success) {
      setSelectAccount(data);
    } else {
      // Manejo del error, posiblemente actualizar el estado para mostrar un mensaje al usuario
    }
  };
  const handlePlatformChange = async (event) => {
    const platformId = event.target.value;
    setSelectedPlatformId(platformId);
    const [success, data] = await getViewPlataforma(platformId);
    if (success) {
      setTaskTypes(data);
    } else {
      console.error("Error fetching tasks:", data);
    }
  };

  const handleTaskTypeChange = (event) => {
    setSelectedTaskTypeId(event.target.value);
  };

  const handleSelectAccount = (event) => {
    setSelectAccountId(event.target.value);
  };

  const handleClick = async () => {
    if (!selectedTaskTypeId) {
      alert("Please select a task type.");
      return;
    }

    let social_media_account_id = "";
    if (selectAccountId !== "all") {
      social_media_account_id = "?social_media_account_id=" + selectAccountId;
    } else {
      social_media_account_id = "";
      setFormato({});
      console.warn("formateo vacio");
    }

    setIsLoading(true);
    // setFormato({
    //   type: "page, muro, all",
    //   post: "mensaje del post",
    //   links_image: [
    //     "http://localhost:5173/azteca.png",
    //     "http://localhost:5173/azteca.png",
    //   ],
    // });
    console.info("Validador ", isValidate);
    if (isValidate) {
      alert("Valida formularios");
      return;
    }
    console.warn("Datos a enviar ", formato);
    const [success, data] = await createTasksForAllAccounts(
      selectedTaskTypeId,
      social_media_account_id,
      formato
    );

    setIsLoading(false);

    if (success) {
      console.info(data);
      handleClose(); // Cerrar la modal después de una operación exitosa
      fetchTasks(); // Actualizar las tareas después de crear una nueva
      setFormato({});
    } else {
      console.error("Error fetching tasks:", data);
    }
  };

  const fetchPlatforms = async () => {
    const [success, data] = await getSocialMediaPlatforms();
    if (success) {
      setPlatforms(data);
    } else {
      // Manejo del error, posiblemente actualizar el estado para mostrar un mensaje al usuario
    }
  };

  useEffect(() => {
    console.log("El estado cambio", isValidate);
  }, [isValidate]);

  useEffect(() => {
    fetchTasks();
    fetchPlatforms();
    fetchGetSocialMediaAccount();
  }, []);

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Tareas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPlatform">
            <Form.Label>Red social</Form.Label>
            <Form.Select
              aria-label="Selecciona red social"
              onChange={handlePlatformChange}
              value={selectedPlatformId}
            >
              <option value="">Seleccione una red social</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.platform_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formTaskType">
            <Form.Label>Tipo de tarea</Form.Label>
            <Form.Select
              aria-label="Selecciona tipo de tarea"
              onChange={handleTaskTypeChange}
              value={selectedTaskTypeId}
            >
              <option value="">Seleccione el tipo de tarea</option>
              {taskTypes.map((taskType) => (
                <option key={taskType.id} value={taskType.id}>
                  {taskType.task_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <Form.Group controlId="formTaskType">
              <Form.Label>Seleccione cuentas</Form.Label>
              <Form.Select
                aria-label="Selecciona tipo de tarea"
                onChange={handleSelectAccount}
                value={selectAccountId}
              >
                <option value="all">Asignar a todas las cuentas</option>
                {selectAccount.map((Account) => (
                  <option key={Account.id} value={Account.id}>
                    {Account.account_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </motion.div>
        </Form>
        {selectAccountId !== "all" && (
          <FormularioAddPublish
            setFormato={setFormato}
            setIsValidate={setIsValidate}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddTask;
