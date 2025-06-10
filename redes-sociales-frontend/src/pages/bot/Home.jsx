import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { LuRefreshCw } from "react-icons/lu";
import styles from "./css/Home.module.css";
import TaskList from "./components/TaskList2";
import ModalAddTask from "./components/ModalAddTask";
import { getViewTasks } from "./api/task.api";
const Home = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const [isLoading, setIsLoading] = useState(true);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    console.log("descargando data");
    const [success, data] = await getViewTasks(fecha);
    if (success) {
      setTasks(data);
    } else {
      console.error("Error fetching tasks:", data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <h1>Tareas</h1>
            </Col>

            <Col className="d-flex justify-content-end ">
              <input
                type="date"
                id=""
                onChange={(e) => setFecha(e.target.value)}
                className="form-control"
                defaultValue={fecha}
              />
              <div
                className={isLoading ? styles.spin : ""}
                style={{ display: "inline-block" }}
              >
                <LuRefreshCw
                  className="m-2"
                  color="black"
                  size={40}
                  onClick={fetchTasks}
                  alt="Recargar tareas"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <BiAddToQueue
                className="m-2"
                color="black"
                size={40}
                onClick={handleShow}
                alt="Agregar tarea"
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <TaskList tasks={tasks} />
        </Col>
      </Row>
      <ModalAddTask
        showModal={showModal}
        handleClose={handleClose}
        fetchTasks={fetchTasks}
      />
    </Container>
  );
};

export default Home;
