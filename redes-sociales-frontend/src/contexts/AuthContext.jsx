// Archivo: src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../config";
export const AuthContext = createContext();
import { jwtDecode } from "jwt-decode";

//Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/jwt-decode.js?v=db620407' does not provide an export named 'default' (at AuthContext.jsx:6:8)
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const getDatosUser = (access) => {
    const decoded = jwtDecode(access); // Decodificar el token JWT
    setUser({
      id: decoded.user_id,
      username: decoded.username,
      email: decoded.email,
    }); // Establecer los datos del usuario
  };
  const checkAuthentication = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        `${config.apiUrl}token/refresh/`,
        {
          refresh: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { access } = response.data;
        getDatosUser(access);
        // Almacenar el nuevo access token
        localStorage.setItem("accessToken", access);
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        console.error("Unauthorized: User is not authenticated");
        setIsAuthenticated(false);
      } else {
        console.error("Failed to check authentication:", response.statusText);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}token/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        getDatosUser(access);
        setError(null);
        setIsAuthenticated(true);
      } else {
        console.error("Failed to login:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Varifica usuario o contraseña");
    }
  };

  const register = async (username, password, password2) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}token/refresh/register/`,
        {
          username,
          password,
          password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Asumiendo que 200 o 201 es una respuesta exitosa
        checkAuthentication(); // Verifica la autenticación después de registrarse exitosamente
      } else {
        console.error("Failed to register:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = async () => {
    console.log("Logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    try {
      const response = await axios.post(
        `${config.apiUrl}token/logout/`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        console.error("Failed to logout:", response.statusText);
        return;
      }

      // Elimina los tokens del localStorage

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
