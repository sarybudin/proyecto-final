import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { NewUserForm } from "./newuserform";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export const NewUserModal = () => {
  //useEffect(() => validacion())
  const { store, actions } = useContext(Context);
  const [validado, setValidado] = useState(false)
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const validacion = () => {
    if (nombre != "" && correo != "" && clave != "" && telefono != "" && direccion != "") {
      setValidado(true)
      console.log(validado)
    }
    else {
      alert("Todos los campos son obligatorios")
    }
  }

  return (
    <div>
      <Button onClick={toggle} className="btn btn-lg" id="newUserButton">
        Crear Usuario
      </Button>
      <Modal isOpen={modal} centered scrollable size="md">
        <ModalHeader toggle={toggle}>Registro de Usuario</ModalHeader>
        <ModalBody>
          <NewUserForm
            setNombre={setNombre}
            setCorreo={setCorreo}
            setClave={setClave}
            setTelefono={setTelefono}
            setDireccion={setDireccion}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              validacion()
              if (validado == true) {
                toggle();
                actions.crearUsuario(nombre, correo, clave, telefono, direccion);
              }
            }}
          >
            Crear Usuario
          </Button>
          <Button onClick={toggle} className="btn-danger">
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
