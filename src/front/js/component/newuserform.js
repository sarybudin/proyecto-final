import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../../styles/newuserform.css";
import { Button, Input, Form, Label, FormGroup, FormText } from "reactstrap";

export const NewUserForm = () => {
  return (
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Nombre Completo"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="email@email.com"
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="passowrd1">Password</Label>
        <Input
          id="password1"
          name="password1"
          placeholder="Contraseña"
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="password2"
          name="password2"
          placeholder="Contraseña"
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input id="phone" name="phone" placeholder="Teléfono" type="tel" />
      </FormGroup>
      <FormGroup>
        <Label for="direction">Direction</Label>
        <Input
          id="direction"
          name="direction"
          placeholder="Dirección Comercial"
          type="text"
        />
      </FormGroup>
    </Form>
  );
};
