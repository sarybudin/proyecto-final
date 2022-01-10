import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../../styles/sessioncard.css";
import { Card, CardBody, CardText, Button, Input } from "reactstrap";
import { NewUserModal } from "./newusermodal";

export const SessionCard = (props) => {
  return (
    <Card className="session-body">
      <CardBody className="d-flex align-items-center flex-column">
        <Input
          className="loginInput"
          id="userEmail"
          name="email"
          placeholder="Correo electrónico"
          type="email"
        />
        <Input
          className="loginInput"
          id="userPassword"
          name="password"
          placeholder="Contraseña"
          type="password"
        />
        <Button id="loginButton">{props.loginButton}</Button>
        <CardText>
          <a href="">¿Olvidaste tu contraseña?</a>
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
