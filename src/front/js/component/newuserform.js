import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/newuserform.css";
import { Input, Form, Label, FormGroup } from "reactstrap";

export const NewUserForm = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <Form>
      <FormGroup>
        <Label for="nombre">Nombre</Label>
        <Input
          id="nombre"
          name="nombre"
          placeholder="Nombre Completo"
          type="text"
          onChange={(e) => {
            props.setNombre(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="correo">Correo</Label>
        <Input
          id="correo"
          name="correo"
          placeholder="correo@email.com"
          type="email"
          onChange={(e) => {
            props.setCorreo(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password1">Contraseña</Label>
        <Input
          id="password1"
          name="password1"
          placeholder="Contraseña"
          type="password"
          onChange={(e) => {
            props.setClave(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="telefono">Teléfono</Label>
        <Input
          id="telefono"
          name="telefono"
          placeholder="Teléfono"
          type="tel"
          onChange={(e) => {
            props.setTelefono(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="direccion">Dirección</Label>
        <Input
          id="direccion"
          name="direccion"
          placeholder="Dirección Comercial"
          type="text"
          onChange={(e) => {
            props.setDireccion(e.target.value);
          }}
        />
      </FormGroup>
    </Form>
  );
};

NewUserForm.propTypes = {
  setNombre: PropTypes.any,
  setCorreo: PropTypes.any,
  setClave: PropTypes.any,
  setTelefono: PropTypes.any,
  setDireccion: PropTypes.any,
};
