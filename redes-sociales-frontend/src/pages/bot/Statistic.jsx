import { Table, Container } from "react-bootstrap";

function Statistic() {
  // Define el estado para almacenar los datos y el error

  // Usa useEffect para obtener los datos cuando el componente se monte
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Obtiene una lista paginada de registros
  //       const resultList = await pb
  //         .collection("view_estadisticas")
  //         .getList(1, 50);
  //       // Almacena los datos en el estado
  //       setData(resultList.items);
  //     } catch (error) {
  //       console.error("Hubo un error al obtener los datos:", error);
  //       setError(error.toString());
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Container>
      <h2 className="mt-3 mb-5 text-center">Informe de procesos</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Maquina</th>
            <th>Red social</th>
            <th>Nombre de Campaña</th>
            <th>Proceso</th>
            <th>Respuesta</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
}

export default Statistic;
