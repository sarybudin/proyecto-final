import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import { NewUserForm } from "./newuserform";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export const NewUserModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button onClick={toggle} id="loginButton">
        Crear Usuario
      </Button>
      <Modal isOpen={modal} centered scrollable size="md">
        <ModalHeader toggle={toggle}>Registrar Nuevo Usuario</ModalHeader>
        <ModalBody>
          <NewUserForm />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Crear Usuario
          </Button>{" "}
          <Button onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
