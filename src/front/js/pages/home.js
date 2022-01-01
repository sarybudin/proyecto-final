import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { HomeCard } from "../component/card";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid mt-5">
      <div className="row text-center">
        <h2>ÁniBot</h2>
      </div>
      <div className="row mt-5 d-flex justify-content-around" id="myrow">
        <HomeCard
          title="¿Cómo se siente hoy?"
          text="Recibe a diario el estado de ánimo de tus pacientes"
        />

        <HomeCard
          title="Complementa tu Análisis"
          text="Suma métricas y gráficas de simple interpretación a tus diagnósticos"
        />

        <HomeCard
          title="Lo que se viene"
          text="Establece relaciones entre palabras clave y estados de ánimo"
        />
      </div>
    </div>
  );
};
