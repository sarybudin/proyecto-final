import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../../styles/sessioncard.css";
import { Card, CardBody, CardText, Button, Input } from "reactstrap";
import { NewUserModal } from "./newusermodal";
import { useState } from "react/cjs/react.development";

export const SessionCard = (props) => {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  return (
    <Card className="session-body">
      <CardBody className="d-flex align-items-center flex-column">
        <Input
          className="loginInput"
          id="userEmail"
          name="email"
          placeholder="Correo electrónico"
          type="email"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <Input
          className="loginInput"
          id="userPassword"
          name="password"
          placeholder="Contraseña"
          type="password"
          onChange={(e) => setClave(e.target.value)}
        />
        <Button id="loginButton" onClick={() => alert(clave, correo)}>
          {props.loginButton}
        </Button>
        <CardText>
          <a href="" id="forgot">
            ¿Olvidaste tu contraseña?
          </a>
        </CardText>
        <hr></hr>
        <NewUserModal />
      </CardBody>
    </Card>
  );
};

SessionCard.propTypes = {
  loginButton: PropTypes.string,
  createButton: PropTypes.string,
};
