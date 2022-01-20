import React, { useEffect, useState, useContext } from "react";
import Doctor from "../component/Doctor";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
//import Modals from "../component/Modals";
//import Formulario from "../component/Formulario";
//import Doctor from "../component/Doctor";

const Registros = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();
    useEffect(() => {
        actions.checkToken(history);
        setInterval(() => {
            actions.checkToken(history);
        }, 60000);
    }, [])

    return (
        <div className="container mt-2">
            <div>
                <Doctor />
            </div>
        </div>
    );
}

export default Registros;