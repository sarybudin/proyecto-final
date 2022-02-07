import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/graficos.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";

export const getLabels = () => {
  let fecha = new Date();
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let labels = [];
  let mes = fecha.getMonth();
  for (let i = 0; i < 3; i++) {
    labels.push(meses[mes]);
    mes = mes == 0 ? 11 : mes - 1;
  }
  return labels.reverse();
};

export const Graficos = () => {
  const { store, actions } = useContext(Context);
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    actions.checkToken(history);
    //actions.obtenerDatosGraficos(params?.idPaciente);
    setTimeout(() => {
      actions.obtenerDatosGraficos(params?.idPaciente);
    }, 500);
    setInterval(() => {
      actions.checkToken(history);
    }, 60000);
  }, []);

  // Bar
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Emociones 3 últimos meses",
      },
    },
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  //Pie
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="text-center mt-1">
      {store.graficoTresMeses.map((valor, key) => (
        <div className="cardgrafico">
          <div className="title d-flex justify-content-between" key={key}>
            <label>
              <span id="paciente">{valor.nombre}</span>
            </label>
            <Link to={`/ficha/${params.idPaciente}`}>
              <button>Ficha</button>
            </Link>
          </div>
          <div className="body">
            <div className="container-lg row d-flex">
              <Bar
                options={optionsBar}
                data={{
                  labels: getLabels(),
                  datasets: [
                    {
                      label: "😃: Alegre",
                      data: valor.data[0],
                      backgroundColor: "#FFFF70",
                    },
                    {
                      label: "😐: Regular",
                      data: valor.data[1],
                      backgroundColor: "#CBF3F0",
                    },
                    {
                      label: "😞: Triste",
                      data: valor.data[2],
                      backgroundColor: "#FF9F1C",
                    },
                  ],
                }}
              />
            </div>
            <div>
              <Pie
                className="img-fluid"
                data={{
                  labels: ["😃: Alegre", "😐: Regular", "😞: Triste"],
                  datasets: [
                    {
                      label: "# of Votes",
                      data: valor.dataPie,
                      backgroundColor: ["#FFFF70", "#CBF3F0", "#FF9F1C"],
                      borderColor: ["#FFFF70", "#CBF3F0", "#FF9F1C"],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="details row">
            <ul>
              <li>😃: Alegre</li>
              <li>😐: Regular</li>
              <li>😞: Triste</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
