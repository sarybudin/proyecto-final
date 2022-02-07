import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { HorizontalCard } from "../component/horizontalcard";
import { SessionCard } from "../component/sessioncard";
import "../../styles/home.css";
import card1 from "../../img/card1.jpg";
import card2 from "../../img/card2.jpg";
import card3 from "../../img/card3.jpg";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-md mt-3 mb-3">
      <div className="d-flex row justify-content-between">
        <div className="d-flex col-md-6 flex-column text-center">
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

        <div className="d-flex col-xs-12 col-md-5 pull-left align-items-center justify-content-center">
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
