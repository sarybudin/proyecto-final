const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      graficoTresMeses: [],
      ficha: undefined,
      editarFicha: false,
      anotaciones: [],
      anotacion: "",
    },
    actions: {
      eliminarHistorial: async (id, paciente_id) => {
        try {
          let response = await fetch(
            process.env.BACKEND_URL +
              "/api/eliminarHistorial/" +
              (id ? id : 0) +
              "/" +
              (paciente_id ? paciente_id : 0),
            {
              method: "DELETE",
              redirect: "follow",
            }
          ).then((response) => response.json());
          setStore({ anotaciones: response });
        } catch (error) {
          console.log(error);
          setStore({ anotaciones: [] });
        }
      },
      addHistorico: async (anotacion, paciente_id) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          let result = await fetch(
            process.env.BACKEND_URL + "/api/addHistorico",
            {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify({ anotacion, paciente_id }),
              redirect: "follow",
            }
          ).then((response) => response.json());
          console.log(result);
          setStore({ anotaciones: result });
        } catch (error) {
          console.log(error);
          setStore({ anotaciones: [] });
        }
      },
      editDataFicha: (dato, valor) => {
        const store = getStore();
        store.ficha[dato] = valor;
        setStore({ ficha: { ...store.ficha } });
      },
      editarFicha: async () => {
        setStore({ editarFicha: true });
      },
      cancelarFicha: async () => {
        setStore({ editarFicha: false });
      },
      guardarFicha: async () => {
        const store = getStore();
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          let result = await fetch(
            process.env.BACKEND_URL + "/api/guardarFicha",
            {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify(store.ficha),
              redirect: "follow",
            }
          ).then((response) => response.json());
          console.log(result);
          setStore({ editarFicha: false });
        } catch (error) {
          console.log(error);
          setStore({ editarFicha: false });
        }
      },
      addtodo: async (anotaciones) => {
        const store = getStore();
        store.anotaciones.push(anotaciones);
        setStore({ anotaciones: [...store.anotaciones] });
      },
      getFicha: async (idPaciente) => {
        try {
          let response = await fetch(
            process.env.BACKEND_URL +
              "/api/paciente/" +
              (idPaciente ? idPaciente : 0),
            {
              method: "GET",
              redirect: "follow",
            }
          ).then((response) => response.json());

          setStore({ ficha: response });

          const responseHP = await fetch(
            process.env.BACKEND_URL +
              "/api/historial/paciente/" +
              (idPaciente ? idPaciente : 0),
            {
              method: "GET",
              redirect: "follow",
            }
          ).then((response) => response.json());

          setStore({ anotaciones: responseHP });
        } catch (error) {
          setStore({ ficha: undefined });
        }
      },
      obtenerDatosGraficos: async (idPaciente) => {
        try {
          let response = await fetch(
            process.env.BACKEND_URL +
              "/api/getDataGrafico/" +
              (idPaciente ? idPaciente : 0),
            {
              method: "GET",
              redirect: "follow",
            }
          ).then((response) => response.json());
          // estructurar datos
          let result = response.reduce(
            (h, obj) =>
              Object.assign(h, {
                [obj.nombre]: (h[obj.nombre] || []).concat(obj),
              }),
            {}
          );

          let final = {};
          let mesActual = new Date().getMonth() + 1;
          for (let nombre in result) {
            result[nombre].forEach((dataRes) => {
              // asignar meses
              let mes1 = mesActual == 1 ? 11 : mesActual - 2;
              let mes2 = mesActual == 1 ? 12 : mesActual - 1;
              let mes3 = mesActual;

              if (final[nombre] == undefined)
                final[nombre] = [
                  [0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0],
                ];
              if (dataRes.respuesta == "\ud83d\ude03") {
                // :)

                if (dataRes.mes == mes1)
                  final[nombre][0][0] += dataRes.nrorespuesta;
                else if (dataRes.mes == mes2)
                  final[nombre][0][1] += dataRes.nrorespuesta;
                else if (dataRes.mes == mes3)
                  final[nombre][0][2] += dataRes.nrorespuesta;
              } else if (dataRes.respuesta == "\ud83d\ude10") {
                // :|

                if (dataRes.mes == mes1)
                  final[nombre][1][0] += dataRes.nrorespuesta;
                else if (dataRes.mes == mes2)
                  final[nombre][1][1] += dataRes.nrorespuesta;
                else if (dataRes.mes == mes3)
                  final[nombre][1][2] += dataRes.nrorespuesta;
              } else if (dataRes.respuesta == "\ud83d\ude1e") {
                // :(

                if (dataRes.mes == mes1)
                  final[nombre][2][0] += dataRes.nrorespuesta;
                else if (dataRes.mes == mes2)
                  final[nombre][2][1] += dataRes.nrorespuesta;
                else if (dataRes.mes == mes3)
                  final[nombre][2][2] += dataRes.nrorespuesta;
              }
            });
          }
          let finalBar = Object.keys(final).map((value) => {
            const alegre =
              final[value][0][0] + final[value][0][1] + final[value][0][2];
            const regular =
              final[value][1][0] + final[value][1][1] + final[value][1][2];
            const triste =
              final[value][2][0] + final[value][2][1] + final[value][2][2];
            const sumaTotal = alegre + regular + triste;
            return {
              nombre: value,
              data: final[value],
              dataPie: [
                (alegre * 100) / sumaTotal,
                (regular * 100) / sumaTotal,
                (triste * 100) / sumaTotal,
              ],
            };
          });

          setStore({ graficoTresMeses: finalBar });
        } catch (error) {
          console.log(error);
          setStore({ graficoTresMeses: [] });
        }
      },
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
