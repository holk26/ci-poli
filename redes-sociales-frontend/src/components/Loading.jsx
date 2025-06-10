import { PropagateLoader } from "react-spinners";

const Loading = ({ overlay = false }) => {
  const loaderStyle = overlay
    ? {
        position: "fixed", // o 'absolute' según tu necesidad
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f9fa", // fondo semitransparente
        zIndex: 9999, // asegúrate de que sea más alto que otros elementos
      }
    : {
        height: "100vh",
        backgroundColor: "#f8f9fa",
      };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={loaderStyle}
    >
      <div>
        <img src={"/azteca.png"} alt="azteca" />
        <PropagateLoader className="primary text-center" size={40} />
      </div>
    </div>
  );
};

export default Loading;
