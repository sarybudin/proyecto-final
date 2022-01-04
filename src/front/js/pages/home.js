import React, { useContext } from "react";
import { Context } from "../store/appContext";
import card1 from "../../img/card1.jpg";
import card2 from "../../img/card2.jpg";
import card3 from "../../img/card3.jpg";
import "../../styles/home.css";
import { HomeCard } from "../component/card";
import { Button } from "reactstrap";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid mt-3 text-center">
      <div className="row text-center" id="title">
        <span>Áni</span>
        <span id="bot">bot</span>
      </div>
      <div className="row mt-4 mb-5 d-flex justify-content-around" id="myrow">
        <HomeCard
          title="¿Cómo se siente hoy?"
          text="Recibe a diario el estado de ánimo de tus pacientes"
          image={card1}
        />

        <HomeCard
          title="Complementa tu Análisis"
          text="Suma métricas y gráficas de simple interpretación a tus diagnósticos"
          image={card2}
        />

        <HomeCard
          title="Lo que se viene"
          text="Establece relaciones entre palabras clave y estados de ánimo"
          image={card3}
        />
      </div>
      <div>
        <Button className="mb-5" size="lg" id="button">
          Continuar
        </Button>
      </div>
    </div>
  );
};
