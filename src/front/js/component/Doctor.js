import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Formulario from "./Formulario";
import { Context } from "../store/appContext";
import Lista from "./Lista"
import Modals from "./Modals";
import "../../styles/doctor.css"
import { Button } from "reactstrap";

const Doctor = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory()
    const handleShow = () => setShow(true)

    return (
        <div className="container-full">
            <div className="row d-flex mb-2">
                <div className="col-10">
                    <h2 id="registroTitle">
                        AniBot le da la bienvenida, Dr. {"doct_name"}

                    </h2>
                </div>
                <div className="col-2">
                    <Button id="logOut"
                        onClick={() => { actions.cerrarSesion(history) }}>
                        Cerrar Sesion
                    </Button>
                </div>
            </div>
            <div className="row mb-2">
                <p id="textAction">
                    Por favor seleccione un paciente de la lista, o bien proceda con la creacion de él(la):
                </p>
            </div>
            <div className="row">
                <Lista />
                <Modals />
            </div>
        </div >
    )
}
//la funcion del botoon "crear", se encuentra en el componente modal, ver como corregir


export default Doctor;