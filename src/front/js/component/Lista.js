import React, { useContext, useEffect, useState, Fragment } from "react";
import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container } from 'reactstrap';
import "../../styles/doctor.css";
import { useHistory } from "react-router-dom";

const Lista = () => {
    const history = useHistory();
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.lista_pacientes()

    }, [])
    return (
        <>
            <Container className="doctor">
                <div className="lista">
                    <h2>LISTA DE PACIENTES</h2>
                </div>
                <Table>

                    <thead>
                        <tr>
                            <th>
                                Nombre Paciente
                            </th>
                            <th>
                                Diagnóstico
                            </th>
                            <th>
                                Ficha
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.listaPacientes.map((paciente, key) => (
                                <tr>
                                    <td key={key}> {paciente.nombre} </td>
                                    <td> {paciente.diagnostico}</td>
                                    <td><Button color="primary" onClick={
                                        ()=>{
                                            history.push("/ficha/"+paciente.id);
                                        }
                                    }>Ver Ficha</Button></td>
                                </tr>
                            ))}
                    </tbody>
                </Table>

            </Container>
        </>
    );
}

export default Lista;