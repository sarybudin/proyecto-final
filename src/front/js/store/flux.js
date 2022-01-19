const getState = ({ getStore, getActions, setStore }) => {
  const urlApi = process.env.BACKEND_URL + "/api/";
  return {
    store: {
      graficoTresMeses: [],
      logged: false,
      ficha: false,
      editarFicha: false,
      todo: ["casa", "hola"],
      listaPacientes: [],
      anotaciones: [],
      anotacion: "",
    },
    actions: {
      crearUsuario: (nombre, correo, clave, telefono, direccion) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          Nombre: nombre,
          Telefono: telefono,
          Direccion: direccion,
          Correo: correo,
          Password: clave,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/api/newUser", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      },
      iniciarSesion: (correo, clave, history) => {
        const store = getStore();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          Email: correo,
          Password: clave,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result == "Usuario no existe") {
              alert(result);
            } else {
              sessionStorage.setItem("token", result.token);
              console.log("Sesión iniciada");
              history.push("/registros");
              setStore({ logged: true });
            }
          })
          .catch((error) => console.log("error", error));
      },
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
        console.log(store.anotaciones)
        store.anotaciones.push(anotaciones);
        setStore({ anotaciones: [...store.anotaciones] });
      },
      getFicha: async (idPaciente) => {
        const store = getStore();
        console.log(store.logged);
        if (store.logged == true) {
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
            let responseHP = await fetch(
              urlApi + "historial/paciente/" + (idPaciente ? idPaciente : 0),
              {
                method: "GET",
                redirect: "follow",
              }
            ).then((response) => response.json());

            setStore({ anotaciones: responseHP });
          } catch (error) {
            /*setStore({ ficha: false });*/
          }
        }
      },
      obtenerDatosGraficos: async (idPaciente) => {
        try {
          let response = await fetch(
            urlApi + "getDataGrafico/" + (idPaciente ? idPaciente : 0),
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
          const store = getStore();
          if (store.logged == true) {
            setStore({ graficoTresMeses: finalBar });
          }
        } catch (error) {
          console.log(error);
          setStore({ graficoTresMeses: [] });
        }
      },
      checkToken: (history) => {
        console.log("Se ejecutó el chequeo de token");
        const store = getStore();
        let currentToken = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + currentToken);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/api/private", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            if (result != "Logged In") {
              sessionStorage.removeItem("token");
              setStore({ logged: false });
              alert("Debe iniciar sesión.");
              history.push("/");
            }
            if (result == "Logged In") {
              setStore({ logged: true });
              console.log(store.logged);
            }
          })
          .catch((error) => console.log("error", error));
      },

      lista_pacientes: () => {
        //        const acciones = getActions()
        //        console.log(acciones.saludo())
        fetch(process.env.BACKEND_URL + "/api/pacientes")
          .then(response => response.json())
          .then(result => {
            console.log(result)
            setStore({ listaPacientes: result })
          })
          .catch(error => console.log('error', error));
        console.log(getStore())
      },
      cerrarSesion: (history) => {
        const store = getStore()
        sessionStorage.removeItem("token");
        setStore({ logged: false });
        alert("Hasta luego");
        history.push("/");
      }
    },
  };
};

export default getState;
