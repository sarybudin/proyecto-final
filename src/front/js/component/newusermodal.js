import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form"
import { Context } from "../store/appContext";
import "../../styles/newusermodal.css";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormGroup } from "reactstrap";

export const NewUserModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { nombre: "", correo: "", contraseña: "", telefono: "", direccion: "" } });
  const { store, actions } = useContext(Context);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle} className="btn btn-lg" id="newUserButton">
        Crear Usuario
      </Button>
      <Modal isOpen={modal} centered scrollable size="md">
        <form onSubmit={handleSubmit((data) => { actions.crearUsuario(data) })}>
          <ModalHeader toggle={toggle}>Registro de Usuario</ModalHeader>
          <ModalBody className="container">
            <div className="row">
              <Label for="nombre" className="col-3">Nombre</Label>
              <div className="col-9 d-flex flex-column">
                <input
                  id="nombre"
                  {...register("nombre", { required: "Campo obligatorio" })}
                  placeholder="Nombre Completo"
                  type="text"
                  className="form-control"
                />
                <p className="errorText">{errors.nombre?.message}</p>
              </div>
            </div>
            <div className="row">
              <Label for="correo" className="col-3">Correo</Label>
              <div className="col-9 d-flex flex-column">
                <input
                  id="correo"
                  {...register("correo", { required: "Campo obligatorio" })}
                  placeholder="correo@email.com"
                  type="email"
                  className="form-control"
                />
                <p className="errorText">{errors.correo?.message}</p>
              </div>
            </div>
            <div className="row">
              <Label for="clave" className="col-3">Contraseña</Label>
              <div className="col-9 d-flex flex-column">
                <input
                  id="clave"
                  {...register("clave", { required: "Campo obligatorio", minLength: { value: 6, message: "Debe tener mínimo 6 caracteres" } })}
                  placeholder="Contraseña"
                  type="password"
                  className="form-control"
                />
                <p className="errorText">{errors.clave?.message}</p>
              </div>
            </div>
            <div className="row">
              <Label for="telefono" className="col-3">Teléfono</Label>
              <div className="col-9 d-flex flex-column">
                <input
                  id="telefono"
                  {...register("telefono", { required: "Campo obligatorio", minLength: { value: 9, message: "Debe tener 9 caracteres" } })}
                  placeholder="Teléfono"
                  type="tel"
                  className="form-control"
                />
                <p className="errorText">{errors.telefono?.message}</p>
              </div>
            </div>
            <div className="row">
              <Label for="direcion" className="col-3">Dirección</Label>
              <div className="col-9 d-flex flex-column">
                <input
                  id="direccion"
                  {...register("direccion")}
                  placeholder="Dirección Comercial"
                  type="text"
                  className="form-control"
                />
                <p className="errorText">{errors.direccion?.message}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onSubmit={() => {

                handleSubmit((data) => { actions.crearUsuario(data) });
                toggle()
              }}
            >
              Crear Usuario
            </Button>
            <Button onClick={toggle} className="btn-secondary">
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};
