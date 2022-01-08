import React, {Fragment, useState} from "react";

const Formulario = () => {

    const [paciente, setPaciente] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        telefono: '',
        telegram: '',
        diagnostico: ''
    })

    const handleInputChange = (e) => {
        setPaciente({
            ...paciente,
            [e.target.name] : e.target.value
        })
      console.log(paciente)    
    }

    const crearPaciente = (e) => {
        e.preventDefault();
    }

    return (
        <Fragment>
            <h1>Ingreso Pacientes</h1>
            <form onSubmit={crearPaciente}> 
                <div className="">
                <input
                    placeholder="Nombres"
                    className="form-control"
                    type="text"
                    name="nombre"
                    onChange={handleInputChange} />
                <input
                    placeholder="Apellidos"
                    className="form-control"
                    type="text"
                    name="apellido"
                    onChange={handleInputChange} />
                <input
                    placeholder="Ingrese direccion"
                    className="form-control"
                    name="direccion"
                    onChange={handleInputChange} />
                <input
                    placeholder="e-mail"
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={handleInputChange} />
                <input
                    placeholder="telefono"
                    className="form-control"
                    type="number"
                    name="telefono"
                    onChange={handleInputChange} />
                <input
                    placeholder="Telegram"
                    className="form-control"
                    type="number"
                    name="telegram"
                    onChange={handleInputChange} />
                <input
                    placeholder="Diagnostico"
                    className="form-control"
                    type="text"
                    name="diagnostico"
                    onChange={handleInputChange} />
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <br></br>
                    <button class="btn btn-primary" type="submit">Crear</button>
                </div>
                
            </form>
        </Fragment>
    );

}

export default Formulario;