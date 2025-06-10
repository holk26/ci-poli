// src/store/botStore.js
import create from "zustand";

const useBotStore = create((set) => ({
  robots: {},
  isConnected: false,
  error: "",

  setRobots: (newRobots) => set({ robots: newRobots }),
  updateRobot: (clientId, data) =>
    set((state) => ({
      robots: {
        ...state.robots,
        [clientId]: data,
      },
    })),
  removeRobot: (clientId) =>
    set((state) => {
      const updatedRobots = { ...state.robots };
      delete updatedRobots[clientId];
      return { robots: updatedRobots };
    }),
  setIsConnected: (status) => set({ isConnected: status }),
  setError: (newError) => set({ error: newError }),
}));

export default useBotStore;
