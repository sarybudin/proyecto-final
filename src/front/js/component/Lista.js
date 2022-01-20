import React, { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container } from 'reactstrap';
import "../../styles/doctor.css";

const Lista = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    useEffect(() => {
        actions.lista_pacientes()
        console.log(store.listaPacientes)

    }, [])
    return (
        <>
            <div>

                <h3 id="listTitle">Lista de Pacientes</h3>

                <Table>

                    <thead>
                        <tr id="tableHead">
                            <th>
                                Nombre
                            </th>
                            <th>
                                Diagnóstico
                            </th>
                            <th>
                                Ficha
                            </th>
                            <th>
                                Estadísticas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.listaPacientes.map((paciente, key) => {
                                if (sessionStorage.getItem("id") == store.listaPacientes[key].psicologo_id) {
                                    return (<tr>
                                        <td key={key}> {paciente.nombre} </td>
                                        <td> {paciente.diagnostico}</td>
                                        <td><Link to={`/ficha/${store.listaPacientes[key].id}`}><Button id="verFicha">Ver Ficha</Button></Link></td>
                                        <td><Link to={`/graficos/${store.listaPacientes[key].id}`}><Button id="verEstadistica">Ver Estadísticas</Button></Link></td>
                                    </tr>)
                                }

                            })}
                    </tbody>
                </Table>

            </div>
        </>
    );
}

export default Lista;