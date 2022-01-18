import React, { useState } from "react";
import Formulario from "./Formulario";
import Lista from "./Lista"
import Modals from "./Modals";
import "../../styles/doctor.css"
import { Button } from "reactstrap";

const Doctor = () => {

   const handleShow = () => setShow(true)

    return (
        <div className="doctor">
            <div className="doctor">
                <h1>
                    AniBot le da la bienvenida Dr. {"doct_name"}
                </h1>
                <p>
                    Por favor seleccione un paciente de la lista, o bien proceda con la creacion de él(la):
                </p>
                <br></br>
                <div className="d-grid gap-2">
                    <Modals />
                </div>
                <br></br>
                <br></br>
                <Lista />
            </div>
            <div className="botones">
                
                <Button color="danger">
                    Cerrar Sesion
                </Button>
            </div>
        </div>
    )
}
//la funcion del botoon "crear", se encuentra en el componente modal, ver como corregir


export default Doctor;