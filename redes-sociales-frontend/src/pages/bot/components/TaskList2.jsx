import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { MaterialReactTable } from "material-react-table";
import { Tooltip } from "@mui/material";
import { Modal, Button } from "react-bootstrap";
const TaskList = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si la modal está abierta
  const [selectedComment, setSelectedComment] = useState(null); // Estado para almacenar el comentario seleccionado

  const openModal = (comment) => {
    try {
      const commentObj = JSON.parse(comment); // Intenta analizar la cadena JSON
      console.log(comment);
      setSelectedComment(commentObj);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al analizar el JSON:", error);
      // Puedes manejar el error aquí si la cadena no es un JSON válido
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getRowStyle = (row) => {
    const status = row.original.status_process;
    switch (status) {
      case "ERR":
        return { style: { backgroundColor: "red", color: "white" } };
      case "EP":
        return { style: { backgroundColor: "blue", color: "white" } };
      case "OK":
        return { style: { backgroundColor: "green", color: "white" } };
      case "SP":
      default:
        return {}; // Sin color para 'SP' y cualquier otro valor
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Pendiente..."; // Retorna string vacío si no hay fecha

    try {
      const date = new Date(dateString);
      if (isNaN(date)) return ""; // Verifica si la fecha no es válida

      const formattedDate = date.toLocaleString("default", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return formattedDate;
    } catch (error) {
      return ""; // Retorna string vacío si ocurre un error
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "platform_name",
        header: "Platform",
        filterFn: "fuzzy",
      },
      {
        accessorKey: "account_name",
        header: "Account Name",
        filterFn: "fuzzy",
      },
      {
        accessorKey: "task_name",
        header: "Task Name",
        filterFn: "fuzzy",
        minWidth: 10, // mínimo en píxeles
        maxWidth: 2, // máximo en píxeles
      },
      {
        accessorKey: "task_description",
        header: "Description",
        filterFn: "fuzzy",
        Cell: ({ cell }) => {
          const text = cell.getValue();
          const preview =
            text.length > 10 ? `${text.substring(0, 50)}...` : text;

          return (
            <Tooltip title={text}>
              <span>{preview}</span>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "bot_executor",
        header: "Bot Executor",
        filterFn: "fuzzy",
      },
      {
        accessorKey: "custom_task",
        header: "Tarea personalizada",
        filterFn: "fuzzy",
        Cell: ({ cell }) => {
          const text = cell.getValue();
          let textMensaje = "";
          let displayText;
          if (text && Object.keys(text).length !== 0) {
            textMensaje = `Publicacion: ${text.post} tipo tarea ${
              text.type
            } y links imagenes ${text?.links_image || "Sin imagen"}`;
            displayText = "Tarea personalizada";
          } else {
            // Si el objeto text está vacío
            displayText = "Sin tarea personalizada";
          }
          return (
            <Tooltip title={textMensaje}>
              <span>{displayText}</span>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "comment",
        header: "Comment",
        filterFn: "fuzzy",
        Cell: ({ cell }) => {
          const commentObj = cell.getValue();
          const commentText = JSON.stringify(commentObj, null, 2); // Convierte el objeto JSON a una cadena legible
          const preview =
            commentText.length > 10
              ? `${commentText.substring(0, 50)}`
              : commentText;

          return (
            <Tooltip title={commentText}>
              <span
                style={{ cursor: "pointer" }} // Cambia el cursor al hacer clic
                onClick={() => openModal(commentObj)} // Abre la modal al hacer clic
              >
                {commentObj?.status || commentObj?.porcentaje_exito || preview}
              </span>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "status_process",
        header: "Status",
        filterFn: "fuzzy",
        Cell: ({ cell }) => {
          const text = cell.getValue();
          let classes = "btn";

          switch (text) {
            case "ER":
              classes += " bg-danger text-white";
              break;
            case "EP":
              classes += " bg-warning text-white";
              break;
            case "OK":
              classes += " bg-success text-white";
              break;
            case "SP":
              classes += " bg-primary text-white";
              break;
            default:
              classes += " bg-secondary text-white";
              break;
          }

          return (
            <span size="sm" className={classes}>
              {text}
            </span>
          );
        },
        cell: PropTypes.shape({
          getValue: PropTypes.func.isRequired,
        }),
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
        filterFn: "fuzzy",
        Cell: ({ cell }) => formatDate(cell.getValue()),
      },
      {
        accessorKey: "end_date",
        header: "End Date",
        filterFn: "fuzzy",
        Cell: ({ cell }) => formatDate(cell.getValue()),
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tasks}
        getRowProps={getRowStyle}
        enableFilters
        enableGlobalFilter
        enableColumnFilters
        enableColumnResizing
      />
      {/* Modal para mostrar detalles del comentario */}
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          {selectedComment?.porcentaje_exito && (
            <h3>Porcentaje de Éxito: {selectedComment.porcentaje_exito}</h3>
          )}
        </Modal.Header>
        <Modal.Body>
          {selectedComment?.detalle && (
            <div>
              <h4>Detalle:</h4>
              <ul>
                {selectedComment.detalle.map((item, index) => (
                  <li key={index}>
                    <strong>
                      {item.funcion.charAt(0).toUpperCase() +
                        item.funcion.slice(1)}
                      :
                    </strong>{" "}
                    {item?.message || <u>{item?.error_message}</u>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TaskList;
