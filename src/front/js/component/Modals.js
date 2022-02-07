import Formulario from "./Formulario";
import React, { useContext, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form"
import { Context } from '../store/appContext'

function Modals() {
    const { store, actions } = useContext(Context);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [paciente, setPaciente] = useState({
        nombre: '',
        direccion: '',
        email: '',
        telefono: '',
        username: '',
        diagnostico: ''
    })
    const [validado, setValidado] = useState(false)
    const validacion = () => {
        if (paciente.nombre != "" && paciente.email != "" && paciente.direccion != "" && paciente.telefono != "" && paciente.username != "") {
            setValidado(true)
            console.log(validado)
        }
        else {
            alert("El único campo opcional es Diagnóstico")
        }
    }


    return (
        <>
            <div className="elboton d-flex justify-content-center mt-5">
                <Button id="crearPaciente" onClick={() => handleShow(setShow(true))}>
                    Crear Paciente
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ingreso de Pacientes</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formulario setPaciente={setPaciente} paciente={paciente}></Formulario>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary"
                        onClick={() => {
                            //                            actions.exampleFunction(paciente.nombre)
                            validacion()
                            if (validado == true) {
                                actions.crearPaciente(paciente)
                                handleClose()
                            }
                        }
                        }>
                        Crear Paciente
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default Modals;