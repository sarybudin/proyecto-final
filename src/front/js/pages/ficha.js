import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/ficha.css";
import { DisplayImage } from "../component/uploadimg";

export const Ficha = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getFicha(params?.idPaciente);
  }, []);

  return (
    <div className="container total">
      <div className="container padre">
        <div className="row ficha d-flex justify-content-around">
          <div className="foto foto col-12 col-sm-12 col-md-3 text-center">
            {/*  <img
            src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20"
            className="rounded-circle"
          /> */}
            <DisplayImage />
            <pre>
              <strong>
                {store.ficha?.nombre || "Información no ingresada"}
              </strong>
              <br></br>
              {store.editarFicha ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={(e) => actions.guardarFicha()}
                  >
                    <i className="fa fa-check text-succes" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(e) => actions.cancelarFicha()}
                  >
                    <i className="fa fa-ban text-danger" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => actions.editarFicha()}
                >
                  <i className="fa fa-pen text-succes" />
                </button>
              )}
            </pre>
          </div>
          <div className="informacion foto foto col-12 col-sm-12 col-md-8">
            <div className="titulo">
              <strong>Ficha del Paciente</strong>
            </div>
            {store.editarFicha ? (
              <div className="cuerpo">
                <pre>
                  <strong>Telefono</strong> :
                  <input
                    type="text"
                    name="edit_telefono"
                    value={store.ficha?.telefono || ""}
                    onChange={(e) => {
                      actions.editDataFicha("telefono", e.target.value);
                    }}
                  />
                </pre>
                <pre>
                  <strong>Fecha Nacimiento</strong> :
                  <input
                    type="text"
                    name="edit_fecha_nacimiento"
                    value={store.ficha?.fecha_nacimiento || ""}
                    onChange={(e) => {
                      actions.editDataFicha("fecha_nacimiento", e.target.value);
                    }}
                  />
                </pre>
                <pre>
                  <strong>Email</strong> :
                  <input
                    type="text"
                    name="edit_email"
                    value={store.ficha?.email || ""}
                    onChange={(e) => {
                      actions.editDataFicha("email", e.target.value);
                    }}
                  />
                </pre>
                <pre>
                  <strong>Direccion</strong> :
                  <input
                    type="text"
                    name="edit_direccion"
                    value={store.ficha?.direccion || ""}
                    onChange={(e) => {
                      actions.editDataFicha("direccion", e.target.value);
                    }}
                  />
                </pre>
                <pre>
                  <strong>Diagnóstico</strong> :
                  <input
                    type="text"
                    name="edit_diagnostico"
                    value={store.ficha?.diagnostico || ""}
                    onChange={(e) => {
                      actions.editDataFicha("diagnostico", e.target.value);
                    }}
                  />
                </pre>
                <pre>
                  <strong>Estado Civil </strong> :
                  <input
                    type="text"
                    name="edit_estado_civil"
                    value={store.ficha?.estado_civil || ""}
                    onChange={(e) => {
                      actions.editDataFicha("estado_civil", e.target.value);
                    }}
                  />{" "}
                </pre>
                <pre>
                  <strong>Nro Hijos</strong> :
                  <input
                    type="text"
                    name="edit_nro_hijos"
                    value={store.ficha?.nro_hijos || ""}
                    onChange={(e) => {
                      actions.editDataFicha("nro_hijos", e.target.value);
                    }}
                  />
                </pre>
                <pre>
                  <strong>Nacionalidad </strong> :
                  <input
                    type="text"
                    name="edit_nacionalidad"
                    value={store.ficha?.nacionalidad || ""}
                    onChange={(e) => {
                      actions.editDataFicha("nacionalidad", e.target.value);
                    }}
                  />
                </pre>
                <pre>
                  <strong>Nombre Usuario</strong> :
                  <input
                    type="text"
                    name="edit_username"
                    value={store.ficha?.username || ""}
                    onChange={(e) => {
                      actions.editDataFicha("username", e.target.value);
                    }}
                  />
                </pre>
              </div>
            ) : (
              <div className="cuerpo">
                <pre>
                  <strong>Psicologo</strong> :{" "}
                  <label key={11}>
                    {store.ficha?.nombrePsicologo || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Telefono</strong> :{" "}
                  <label key={12}>
                    {store.ficha?.telefono || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Fecha Nacimiento</strong> :{" "}
                  <label key={13}>
                    {store.ficha?.fecha_nacimiento ||
                      "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Email</strong> :{" "}
                  <label key={15}>
                    {store.ficha?.email || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Direccion</strong> :{" "}
                  <label key={16}>
                    {store.ficha?.direccion || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Diagnóstico</strong> :{" "}
                  <label key={17}>
                    {store.ficha?.diagnostico || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Estado Civil </strong> :{" "}
                  <label key={18}>
                    {store.ficha?.estado_civil || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Nro Hijos</strong> :{" "}
                  <label key={19}>
                    {store.ficha?.nro_hijos || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Nacionalidad </strong> :{" "}
                  <label key={110}>
                    {store.ficha?.nacionalidad || "Información no ingresada"}
                  </label>
                </pre>
                <pre>
                  <strong>Nombre Usuario</strong> :{" "}
                  <label key={111}>
                    {store.ficha?.username || "Información no ingresada"}
                  </label>
                </pre>
              </div>
            )}
          </div>
        </div>
        <div className="todo row">
          <div className="lista">
            <div className="titulo">
              <strong>Anotaciones</strong>
            </div>
            <div className="body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Diagnóstico"
                  onChange={(e) => {
                    store.anotacion = e.target.value;
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={(e) =>
                    actions.addHistorico(store.anotacion, store.ficha?.id)
                  }
                >
                  Guardar
                </button>
              </div>
              <div>
                {store.anotaciones.map((value, key) => (
                  <div key={key}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-10">
                        {value.anotacion}
                      </div>
                      <div className="col-12 col-sm-12 col-md-2 text-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={(e) =>
                            actions.eliminarHistorial(value.id, store.ficha?.id)
                          }
                        >
                          <i className="fa fa-trash text-danger" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
