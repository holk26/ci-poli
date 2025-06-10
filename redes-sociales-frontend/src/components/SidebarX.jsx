import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { SiDeno } from "react-icons/si";
import { FaUserFriends, FaTasks, FaRobot } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { BiSolidBot } from "react-icons/bi";
import { MdImage, MdOutlinePersonSearch } from "react-icons/md";
import { BiSolidTimer } from "react-icons/bi";
import { TbSocial } from "react-icons/tb";

// eslint-disable-next-line react/prop-types
const SidebarX = ({ open }) => {
  return (
    <Sidebar
      style={{ height: "100vh" }}
      breakPoint="sm"
      collapsed={open}
      backgroundColor="#f8f9fa"
    >
      <Menu>
        <MenuItem
          icon={<FaTasks />}
          component={<Link to="/dashboard/bot-redes" />}
        >
          Tareas
        </MenuItem>
        <SubMenu icon={<TbSocial />} label="Gestion">
          <MenuItem
            icon={<SiDeno />}
            component={<Link to="/dashboard/bot-redes/crear-cuenta" />}
          >
            Agregar cuentas
          </MenuItem>
          <MenuItem
            icon={<MdOutlinePersonSearch />}
            component={<Link to="/dashboard/bot-redes/owner" />}
          >
            Gestion propietarios
          </MenuItem>
          <MenuItem
            icon={<TbSocial />}
            component={<Link to="/dashboard/bot-redes/crear-red-social" />}
          >
            Crear red social
          </MenuItem>
          {/* <MenuItem
            icon={<MdAddTask />}
            component={<Link to="/dashboard/bot-redes/crear-tarea" />}
          >
            Crear tipo de tarea
          </MenuItem> */}
          <MenuItem
            icon={<FaRobot />}
            component={<Link to="/dashboard/bot-redes/bot-Personalities" />}
          >
            Bot Personalities
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<BiSolidBot />}
          component={<Link to="/dashboard/bot-redes/bots-online" />}
        >
          Bots online
        </MenuItem>
        <MenuItem
          icon={<FaUserFriends />}
          component={<Link to="/dashboard/bot-redes/usuarios" />}
        >
          Usuarios
        </MenuItem>
        <MenuItem
          icon={<ImStatsDots />}
          component={<Link to="/dashboard/bot-redes/statistic" />}
        >
          Estadisticas
        </MenuItem>
        <MenuItem
          icon={<BiSolidTimer />}
          component={<Link to="/dashboard/bot-redes/realtime" />}
        >
          Real Time
        </MenuItem>
        <MenuItem
          icon={<MdImage />}
          component={<Link to="/dashboard/bot-redes/gallery" />}
        >
         Gallery image
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarX;
