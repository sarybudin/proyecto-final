import Formulario from "./Formulario";
import React, { useContext, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../store/appContext'

function Modals() {
    const { store, actions } = useContext(Context);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [paciente, setPaciente] = useState('');


    return (
        <>

            <Button variant="primary" onClick={handleShow}>
                Crear
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ingreso de Pacientes</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formulario setPaciente={setPaciente}></Formulario>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => {
                            actions.exampleFunction(nombre, apellido)
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