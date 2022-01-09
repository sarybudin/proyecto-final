import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../../styles/sessioncard.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
  CardText,
  Button,
  Input,
} from "reactstrap";

export const SessionCard = (props) => {
  return (
    <Card className="session-body">
      <CardBody>
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
        <Button>{props.button}</Button>
        <CardText>
          <a href="">¿Olvidaste tu contraseña?</a>
        </CardText>
      </CardBody>
    </Card>
  );
};

SessionCard.propTypes = {
  button: PropTypes.string,
};
