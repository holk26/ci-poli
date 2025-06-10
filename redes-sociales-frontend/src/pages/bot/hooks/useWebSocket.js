// src/hooks/useWebSocket.js
import { useEffect, useRef } from "react";
import useBotStore from "../../../store/botStore";
import config from "../../../config";

const useWebSocket = () => {
  const ws = useRef(null);
  const setRobots = useBotStore((state) => state.setRobots);
  const updateRobot = useBotStore((state) => state.updateRobot);
  const removeRobot = useBotStore((state) => state.removeRobot);
  const setIsConnected = useBotStore((state) => state.setIsConnected);
  const setError = useBotStore((state) => state.setError);

  useEffect(() => {
    ws.current = new WebSocket(`${config.webSocket}updates/`);

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "botUpdate") {
        updateRobot(message.client_id, message.data);
      } else if (message.type === "botDisconnect") {
        removeRobot(message.client_id);
      } else if (message.type === "botsList") {
        const bots = message.data.reduce((acc, bot) => {
          acc[bot.client_id] = bot;
          return acc;
        }, {});
        setRobots(bots);
      }
    };

    ws.current.onerror = (event) => {
      setIsConnected(false);
      setError(`Error de conexión con el WebSocket. ${event}`);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      setError("La conexión con el WebSocket se cerró inesperadamente.");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [setRobots, updateRobot, removeRobot, setIsConnected, setError]);

  const sendToggleCommand = (botId, running) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const command = ws ? (!running).toString() : "";
      if (ws.current)
        ws.current.send(JSON.stringify({ bot_id: botId, command }));
    }
  };

  return { sendToggleCommand };
};

export default useWebSocket;
