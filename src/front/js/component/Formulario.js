import propTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Form } from "reactstrap";


const Formulario = (props) => {

    const [paciente, setPaciente] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        telefono: '',
        username: '',
        diagnostico: ''
    })

    const handleInputChange = (e) => {
        setPaciente({
            ...paciente,
            [e.target.name]: e.target.value
        })

    }

    const crearPaciente = (e) => {
        e.preventDefault();
    }

    return (
        <Fragment>
            <h1>Ingreso Pacientes</h1>
            <form onSubmit={crearPaciente}>
                <div className="">
                    <input
                        placeholder="Nombres"
                        className="form-control"
                        type="text"
                        name="nombre"
                        onChange={handleInputChange} />
                    <input
                        placeholder="Apellidos"
                        padx="10"
                        className="form-control"
                        type="text"
                        name="apellido"
                        onChange={handleInputChange} />
                    <input
                        placeholder="Direccion"
                        className="form-control"
                        name="direccion"
                        onChange={handleInputChange} />
                    <input
                        placeholder="e-mail"
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={handleInputChange} />
                    <input
                        placeholder="Teléfono"
                        className="form-control"
                        type="number"
                        name="telefono"
                        onChange={handleInputChange} />
                    <input
                        placeholder="Telegram"
                        className="form-control"
                        type="text"
                        name="username"
                        onChange={handleInputChange} />
                    <input
                        placeholder="Diagnóstico"
                        className="form-control"
                        type="text"
                        name="diagnostico"
                        onChange={handleInputChange} />
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <br />
                    <button className="btn btn-primary" type="submit">Crear</button>
                </div>

            </form>
        </Fragment>
    );
}
Form.propTypes = {
    setPaciente: propTypes.any
}

export default Formulario;