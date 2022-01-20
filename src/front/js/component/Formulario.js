import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import "../../styles/formulario.css"

const Formulario = (props) => {
    useEffect(() => {
        //console.log(props.paciente, 'TOY DENTRO DEL FORM')
    }, [props.paciente])
    const handleInputChange = (e) => {
        props.setPaciente({
            ...props.paciente,
            [e.target.name]: e.target.value
        })
        //e.preventDefault();
    }

    return (
        <form className="d-flex flex-column justify-content-center">
            <div>
                <input
                    placeholder="Nombre Completo"
                    className="form-control"
                    type="text"
                    name="nombre"
                    onChange={handleInputChange}
                />
                <input
                    placeholder="Dirección"
                    className="form-control"
                    name="direccion"
                    onChange={handleInputChange}
                />
                <input
                    placeholder="Correo Electrónico"
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
                    placeholder="Usuario de Telegram"
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
    );
}
Formulario.propTypes = {
    setPaciente: PropTypes.any,
    paciente: PropTypes.any
};
export default Formulario;