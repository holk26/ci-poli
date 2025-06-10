// config.js
// Producción - Configuración de la URL de la API y WebSocket a través de variables de entorno
// config.js
const config = {
  apiUrl: import.meta.env.VITE_APP_API_URL || "http://127.0.0.1:8000/api/",
  webSocket: import.meta.env.VITE_APP_SOCKET || "ws://10.0.0.90:8001/",
  enpointReny:
    import.meta.env.VITE_RENY_IMG || "https://aztecaimagenes.online/",
};

export default config;
