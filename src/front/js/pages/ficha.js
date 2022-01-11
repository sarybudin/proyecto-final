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
    <div className="container padre">
      <div className="row ficha d-flex justify-content-around">
        <div className="foto foto col-12 col-sm-3 text-center">
         {/*  <img
            src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20"
            className="rounded-circle"
          /> */}
          <DisplayImage/>
        </div>
        <div className="informacion foto foto col-12 col-sm-8">
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
              {store.ficha?.fecha_nacimiento || "Información no ingresada"}
            </label>
          </pre>
          <pre>
            <strong>Nombre</strong> :{" "}
            <label key={14}>
              {store.ficha?.nombre || "Información no ingresada"}
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
      </div>
      <div className="row lista">todo list</div>
    </div>
  );
};
