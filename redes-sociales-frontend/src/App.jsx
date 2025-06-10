import AuthProvider from "./contexts/AuthContext";
import Router from "./routes";
import useWebSocket from "./pages/bot/hooks/useWebSocket";

const App = () => {
  useWebSocket();
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
