import Layout from "../../components/Layout";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Layout>
      <Container>
        <h1 className="display-4">Bienvenido</h1>
        <p>
          El bot de redes sociales juega un papel esencial en la gestión de
          perfiles en diversas plataformas, centrándose en un proceso
          fundamental: la maduración de perfiles. Este proceso implica la
          implementación de estrategias estratégicas para desarrollar
          gradualmente las cuentas en redes sociales, con el objetivo de
          aumentar su relevancia y autenticidad.
        </p>
      </Container>
    </Layout>
  );
};

export default Home;
