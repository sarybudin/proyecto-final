import Formulario from "./Formulario";
import React, { useContext, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../store/appContext'

function Modals() {
    const { store, actions } = useContext(Context);

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
                            console.log(paciente)
                            handleClose()
                        }
                        }>
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default Modals;