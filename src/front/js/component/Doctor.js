import React, { useState } from "react";
import Formulario from "./Formulario";
import Lista from "./Lista"
import Modals from "./Modals";


//const creaPaciente = () => {

//    return (
//        <Formulario/>       
//    )
//}

const Doctor = () => {

    const handleShow = () => setShow(true)

    return (

        <div className="container">
            <h1>
                AniBot le da la bienvenida Dr. {"doct_name"}
            </h1>
            <p>
                Por favor seleccione un paciente de la lista, o bien proceda con la creacion de él(la):
            </p>
            <br></br>
            <div className="d-grid gap-2">
                <Modals />

                <button
                    className="btn btn-primary"
                    type="button"
                //                onClick={buscarPaciente}
                >
                    Buscar
                </button>
            </div>
            <div>
                {/* <Lista /> */}
            </div>
        </div>
    )
}



export default Doctor;