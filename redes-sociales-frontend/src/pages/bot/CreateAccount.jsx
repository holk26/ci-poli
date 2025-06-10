import { Button, Col, Container, Row } from "react-bootstrap";
import SocialMediaAccountForm from "./formularios/SocialMediaAccountForm";
import BotPersonalitiesForm from "./formularios/BotPersonalitiesForm";
import OwnerForm from "./formularios/OwnerForm";
import FilaAccount from "./components/FilaAccount";
import { useState, useEffect } from "react";

const CreateAccount = () => {
  const [okPersonalidad, setOkPersonalidad] = useState(false);
  const [idPersonalidad, setIdPersonalidad] = useState(null);

  const [okOwner, setOkOwner] = useState(false);
  const [idOwner, setidOwner] = useState(null);

  const [okAccount, setOkAccount] = useState(false);
  const [idAccount, setidAccount] = useState(null);

  // Efecto para inicializar estados desde el localStorage
  useEffect(() => {
    const storedIdPersonalidad = localStorage.getItem("idPersonalidad");
    const storedIdOwner = localStorage.getItem("idOwner");

    if (storedIdPersonalidad) {
      setIdPersonalidad(JSON.parse(storedIdPersonalidad));
      setOkPersonalidad(true);
    }

    if (storedIdOwner) {
      setidOwner(JSON.parse(storedIdOwner));
      setOkOwner(true);
    }
  }, []);
  useEffect(() => {
    if (idPersonalidad !== null) {
      localStorage.setItem("idPersonalidad", JSON.stringify(idPersonalidad));
      setOkPersonalidad(true);
    } else {
      setOkPersonalidad(false);
    }

    if (idOwner !== null) {
      localStorage.setItem("idOwner", JSON.stringify(idOwner));
      setOkOwner(true);
    } else {
      setOkOwner(false);
    }
  }, [idPersonalidad, idOwner]);

  const handleDataFromPersonalidad = (data) => {
    setOkPersonalidad(data);
  };
  const handleDataFromOwner = (data) => {
    setOkOwner(data);
  };

  const Validador = () => {
    if (okPersonalidad && okOwner) {
      console("ok todo");
    }
  };

  return (
    <Container>
      <h1 className="text-center mb-4">Create Account</h1>
      <Col>
        <FilaAccount
          ok={okPersonalidad}
          title="Crea la personalidad"
          onDataFromchildren={handleDataFromPersonalidad}
          data={idPersonalidad?.name}
        >
          <BotPersonalitiesForm setIdPersonalidad={setIdPersonalidad} />
        </FilaAccount>

        <FilaAccount
          ok={okOwner}
          title="Dueño de la cuenta"
          onDataFromchildren={handleDataFromOwner}
          data={idOwner?.owner_name}
        >
          <OwnerForm setidOwner={setidOwner} />
        </FilaAccount>

        {okPersonalidad && okOwner && (
          //quiero hacer eso
          <SocialMediaAccountForm
            idPersonalidad={idPersonalidad} //quiero que idPersonalidad se guarde en el local storage diferente a null
            idOwner={idOwner} //quiero que idOwner se guarde en el local storage cuando se diferente a null
            setIdPersonalidad={setIdPersonalidad}
            setidOwner={setidOwner}
          />
        )}
        {/* <FilaAccount
          ok={idAccount}
          title="Datos de la cuenta"
          onDataFromchildren={handleDataFromOwner}
          data={idAccount?.error}
        ></FilaAccount> */}
      </Col>
    </Container>
  );
};

export default CreateAccount;
