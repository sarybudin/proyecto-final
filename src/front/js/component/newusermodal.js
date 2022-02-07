import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form"
import { Context } from "../store/appContext";
import "../../styles/newusermodal.css";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormGroup } from "reactstrap";

export const NewUserModal = () => {
  //useEffect(() => validacion())
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { nombre: "", correo: "", contraseña: "", telefono: "", direccion: "" } });
  const { store, actions } = useContext(Context);
  /*const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");*/
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  console.log(errors)

  return (
    <div>
      <Button onClick={toggle} className="btn btn-lg" id="newUserButton">
        Crear Usuario
      </Button>
      <Modal isOpen={modal} centered scrollable size="md">
        <form onSubmit={handleSubmit((data) => { actions.crearUsuario(data) })}>
          <ModalHeader toggle={toggle}>Registro de Usuario</ModalHeader>
          <ModalBody className="row d-flex justify-content-center">
            <div className="col-3 d-flex flex-column">
              <Label for="nombre">Nombre</Label>
              <Label for="correo">Correo</Label>
              <Label for="password1">Contraseña</Label>
              <Label for="telefono">Teléfono</Label>
              <Label for="direcion">Dirección</Label>
            </div>
            <div className="col-9 d-flex flex-column">
              <input
                id="nombre"
                {...register("nombre", { required: "Campo obligatorio" })}
                placeholder="Nombre Completo"
                type="text"
              />
              <span className="errorText">{errors.nombre?.message}</span>
              <input
                id="correo"
                {...register("correo", { required: "Campo obligatorio" })}
                placeholder="correo@email.com"
                type="email"
              />
              <span className="errorText">{errors.correo?.message}</span>
              <input
                id="password1"
                {...register("password1", { required: "Campo obligatorio", minLength: { value: 6, message: "Debe tener mínimo 6 caracteres" } })}
                placeholder="Contraseña"
                type="password"
              />
              <span className="errorText">{errors.password1?.message}</span>
              <input
                id="telefono"
                {...register("telefono", { required: "Campo obligatorio", minLength: { value: 9, message: "Debe tener 9 caracteres" } })}
                placeholder="Teléfono"
                type="tel"
              />
              <span className="errorText">{errors.telefono?.message}</span>
              <input
                id="direccion"
                {...register("direccion")}
                placeholder="Dirección Comercial"
                type="text"
              />
              <span className="errorText">{errors.direccion?.message}</span>
            </div>

          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onSubmit={handleSubmit((data) => { actions.crearUsuario(data) })}
            >
              Crear Usuario
            </Button>
            <Button onClick={toggle} className="btn-danger">
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};
