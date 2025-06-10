// Archivo: src/routes/botRoutes.js
import Home from "../Home";
import CreateAccount from "../CreateAccount";
import AddUser from "../AddUser";
import TableUser from "../TableUser";
import Statistic from "../Statistic";
import Realtime from "../Realtime";
import ListBots from "../ListBots";
import { Route } from "react-router-dom";
import CreateRedes from "../CreateRedes";
import Owner from "../Owner";
import BotPersonalities from "../BotPersonalities";
import CreateTask from "../CreateTask";
import GalleryImage from "../GalleryImage";

const botRoutes = [
  <Route key="home" path="" element={<Home />} />,
  <Route
    key="create-account"
    path="crear-cuenta"
    element={<CreateAccount />}
  />,
  <Route key="add-user" path="add-user" element={<AddUser />} />,
  <Route key="table-user" path="table-user" element={<TableUser />} />,
  <Route key="statistic" path="statistic" element={<Statistic />} />,
  <Route key="realtime" path="realtime" element={<Realtime />} />,
  <Route key="list-bot" path="bots-online" element={<ListBots />} />,
  <Route
    key="crear-red-social"
    path="crear-red-social"
    element={<CreateRedes />}
  />,
  <Route key="crear-tarea" path="crear-tarea" element={<CreateTask />} />,
  <Route key="owner" path="owner" element={<Owner />} />,
  <Route
    key="bot-Personalities"
    path="bot-Personalities"
    element={<BotPersonalities />}
  />,
  <Route key="gallery-image" path="gallery" element={<GalleryImage />} />,
  <Route key="404" path="*" element={<h1>Ops...</h1>} />,
];

export default botRoutes;
