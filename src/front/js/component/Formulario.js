import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Label } from "reactstrap"
import "../../styles/formulario.css"
import { useForm } from "react-hook-form"
import { ModalFooter, Button } from "reactstrap";
import { Context } from "../store/appContext";


const Formulario = (props) => {
    useEffect(() => {
        //console.log(props.paciente, 'TOY DENTRO DEL FORM')
    }, [props.paciente])
    /*const handleInputChange = (e) => {
        props.setPaciente({
            ...props.paciente,
            [e.target.name]: e.target.value
        })
        //e.preventDefault();
    }*/
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { nombre: "", correo: "", username: "", telefono: "", direccion: "" } });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { store, actions } = useContext(Context);


    return (
        <div>
            <form onSubmit={handleSubmit((data) => { actions.crearPaciente(data) })}>
                <div>
                    <div className="row">
                        <Label for="nombre" className="col-3">Nombre</Label>
                        <div className="col-9 d-flex flex-column">
                            <input
                                id="nombre"
                                {...register("nombre", { required: "Campo obligatorio" })}
                                placeholder="Nombre Completo"
                                type="text"
                                className="form-control"
                                name="nombre"
                            //////onChange={handleInputChange}
                            />
                            <p className="errorText">{errors.nombre?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <Label for="direcion" className="col-3">Dirección</Label>
                        <div className="col-9 d-flex flex-column">
                            <input
                                id="direccion"
                                {...register("direccion")}
                                placeholder="Dirección"
                                type="text"
                                className="form-control"
                                name="direccion"
                            ////onChange={handleInputChange}
                            />
                            <p className="errorText">{errors.direccion?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <Label for="correo" className="col-3">Correo</Label>
                        <div className="col-9 d-flex flex-column">
                            <input
                                id="correo"
                                {...register("correo", { required: "Campo obligatorio" })}
                                placeholder="correo@gmail.com"
                                type="email"
                                className="form-control"
                                name="correo"
                            ////onChange={handleInputChange}
                            />
                            <p className="errorText">{errors.correo?.message}</p>
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
                                name="telefono"
                            ////onChange={handleInputChange}
                            />
                            <p className="errorText">{errors.telefono?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <Label for="username" className="col-3">Usuario de Telegram</Label>
                        <div className="col-9 d-flex flex-column">
                            <input
                                id="username"
                                {...register("username", { required: "Campo obligatorio" })}
                                placeholder="Usuario"
                                className="form-control"
                                type="text"
                                name="username"
                            ////onChange={handleInputChange}
                            />
                            <p className="errorText">{errors.username?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <Label for="diagnostico" className="col-3">Diagnóstico</Label>
                        <div className="col-9 d-flex flex-column">
                            <input
                                id="diagnostico"
                                {...register("diagnostico")}
                                placeholder="Diagnóstico"
                                className="form-control"
                                type="text"
                                name="diagnostico"
                            ////onChange={handleInputChange}
                            />
                            <p className="errorText">{errors.clave?.message}</p>
                        </div>
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="primary"
                        onSubmit={handleSubmit((data) => { actions.crearPaciente(data) })}>
                        Crear Paciente
                    </Button>
                </ModalFooter>
            </form>
        </div >
    );
}
Formulario.propTypes = {
    setPaciente: PropTypes.any,
    paciente: PropTypes.any
};
export default Formulario;