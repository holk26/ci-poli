import Layout from "../../components/Layout";
import SidebarX from "../../components/SidebarX";
import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";

const LayoutHome = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Row className="g-0">
        <Col sm="auto" className="shadow bg-white">
          <SidebarX open={collapsed} />
        </Col>
        <Col style={{ overflowY: "hidden" }}>
          <RiMenu2Fill
            className="m-2 cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          />
          <AnimatePresence>
            <Outlet />
          </AnimatePresence>
        </Col>
      </Row>
    </Layout>
  );
};

export default LayoutHome;
