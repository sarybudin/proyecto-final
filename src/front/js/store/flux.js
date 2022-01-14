const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      graficoTresMeses: [],
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
            //setStore({ fetchResult: result });
            if (result == "Usuario no existe") {
              alert(result);
            } else {
              sessionStorage.setItem("token", result.token);
              console.log("Sesión iniciada");
              history.push("/graficos");
            }
          })
          .catch((error) => console.log("error", error));
      },
      checkToken: (history) => {
        let currentToken = sessionStorage.getItem("token");
        console.log(currentToken);
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MjExNjc1MywianRpIjoiZDZkN2FlZjQtMGU3NS00MmM2LThiZDktZTI0MTZiZTY3YzhlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InBzaWNvbG9nb0BnbWFpbC5jb20iLCJuYmYiOjE2NDIxMTY3NTMsImV4cCI6MTY0MjExNjgxM30.IXLVFyDKLGrWShOjn86PRmP1poEu_YWv-7O3pXW78rY"
        );

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          "https://3001-rose-haddock-94adoe3x.ws-us27.gitpod.io/api/private",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            result = JSON.parse(result);
            if (result.msg != "Logged In") {
              history.push("/");
            }
          })
          .catch((error) => console.log("error", error));
      },
      obtenerDatosGraficos: async () => {
        try {
          let response = await fetch(
            process.env.BACKEND_URL + "/api/getDataGrafico",
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
                  final[nombre][0][0] = dataRes.nrorespuesta;
                else if (dataRes.mes == mes2)
                  final[nombre][0][1] = dataRes.nrorespuesta;
                else if (dataRes.mes == mes3)
                  final[nombre][0][2] = dataRes.nrorespuesta;
              } else if (dataRes.respuesta == "\ud83d\ude10") {
                // :|

                if (dataRes.mes == mes1)
                  final[nombre][1][0] = dataRes.nrorespuesta;
                else if (dataRes.mes == mes2)
                  final[nombre][1][1] = dataRes.nrorespuesta;
                else if (dataRes.mes == mes3)
                  final[nombre][1][2] = dataRes.nrorespuesta;
              } else if (dataRes.respuesta == "\ud83d\ude1e") {
                // :(

                if (dataRes.mes == mes1)
                  final[nombre][2][0] = dataRes.nrorespuesta;
                else if (dataRes.mes == mes2)
                  final[nombre][2][1] = dataRes.nrorespuesta;
                else if (dataRes.mes == mes3)
                  final[nombre][2][2] = dataRes.nrorespuesta;
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
    },
  };
};

export default getState;
