import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login, error } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Activar el cargador
    await login(username, password);
    setIsLoading(false); // Desactivar el cargador
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  return (
    <motion.div
      className="login-container d-flex justify-content-center align-items-center vh-100 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading && <Loading overlay={true} />}{" "}
      {/* Muestra el componente Loading cuando isLoading es true */}
      <motion.div
        className="col-md-4 shadow-lg p-4 rounded"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
          boxShadow: "0px 0px 8px rgb(255,255,255)",
        }}
      >
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </motion.button>
        </form>
        {error && <h3>Error: {error}</h3>}
      </motion.div>
    </motion.div>
  );
};

export default Login;
