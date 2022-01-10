import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { HorizontalCard } from "../component/horizontalcard";
import { SessionCard } from "../component/sessioncard";
import { NewUserModal } from "../component/newusermodal";
import "../../styles/newhome.css";
import card1 from "../../img/card1.jpg";
import card2 from "../../img/card2.jpg";
import card3 from "../../img/card3.jpg";

export const NewHome = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid mt-3 mb-5 text-center">
      <div className="mb-5" id="title">
        <span>Áni</span>
        <span id="bot">bot</span>
      </div>
      <div className="container-fluid row d-flex justify-content-around">
        <div className="d-flex col-5 align-items-center flex-column">
          <HorizontalCard
            title="¿Cómo se siente hoy?"
            text="Recibe a diario el estado de ánimo de tus pacientes"
            image={card1}
          />
          <HorizontalCard
            title="Complementa tu Análisis"
            text="Suma métricas y gráficas de simple interpretación a tus diagnósticos"
            image={card2}
          />
          <HorizontalCard
            title="Lo que se viene"
            text="Establece relaciones entre palabras clave y estados de ánimo"
            image={card3}
          />
        </div>
        <div className="d-flex col-4 align-items-center">
          <SessionCard
            text="Aquí va el formulario de usuario y contraseña"
            loginButton="Iniciar Sesión"
            createButton="Crear nuevo usuario"
          />
        </div>
      </div>
    </div>
  );
};
