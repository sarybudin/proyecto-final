import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import "../../styles/doctor.css"

const Formulario = (props) => {
    useEffect(() => {
        console.log(props.paciente, 'TOY DENTRO DEL FORM')
    }, [props.paciente])
    const handleInputChange = (e) => {
        props.setPaciente({
            ...props.paciente,
            [e.target.name]: e.target.value
        })
        //e.preventDefault();
    }
    return (
        <Fragment>
            <h1>Ingreso Pacientes</h1>
            <form >
                <div className="doctor">
                    <input
                        placeholder="Nombre Completo"
                        className="form-control"
                        type="text"
                        name="nombre"
                        onChange={handleInputChange}
                    />
                    <input
                        placeholder="Direccion"
                        className="form-control"
                        name="direccion"
                        onChange={handleInputChange}
                    />
                    <input
                        placeholder="e-mail"
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                    />
                    <input
                        placeholder="Teléfono"
                        className="form-control"
                        type="number"
                        name="telefono"
                        onChange={handleInputChange}
                    />
                    <input
                        placeholder="Telegram"
                        className="form-control"
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                    />
                    <input
                        placeholder="Diagnóstico"
                        className="form-control"
                        type="text"
                        name="diagnostico"
                        onChange={handleInputChange}
                    />
                </div>
            </form>
        </Fragment>
    );
}
Formulario.propTypes = {
    setPaciente: PropTypes.any,
    paciente: PropTypes.any
};
export default Formulario;