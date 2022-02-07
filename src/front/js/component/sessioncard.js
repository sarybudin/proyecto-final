import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/sessioncard.css";
import { Card, CardBody, CardText, Button, Input, Form, FormGroup } from "reactstrap";
import { NewUserModal } from "./newusermodal";

export const SessionCard = (props) => {
  useEffect(() => validacion())
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [validado, setValidado] = useState(false)
  const validacion = () => {
    if (correo != "" && clave != "") {
      setValidado(true)
      console.log(validado)
    }
  }
  return (
    <Card className="session-body">
      <CardBody className="d-flex align-items-center flex-column">
        <Input
          className="loginInput mb-2"
          id="userEmail"
          name="email"
          placeholder="Correo electrónico"
          type="email"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <Input
          className="loginInput mb-3"
          id="userPassword"
          name="password"
          placeholder="Contraseña"
          type="password"
          onChange={(e) => setClave(e.target.value)}
        />
        <Button
          className="btn btn-lg mb-2"
          id="loginButton"
          onClick={() => {
            actions.iniciarSesion(correo, clave, history);
          }}
        >
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
