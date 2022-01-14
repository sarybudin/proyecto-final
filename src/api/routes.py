"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,Psicologo, Paciente, Bot, Historial
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/bot', methods=['GET'])
def bot():
    bots= Bot.query.all()
    bots=list(map(lambda x: x.serialize(),bots))

    return jsonify(bots), 200

@api.route('/botAll', methods=['GET'])
def botAll():
    bots= Bot.query.all()
    bots=list(map(lambda x: x.serializeAll(),bots))

    return jsonify(bots), 200

@api.route('/bot', methods=['POST'])
def addbot():
    body = request.get_json()
    # SELECT * FROM PACIENTE WHERE username = body['username']
    paciente = Paciente.query.\
    filter(Paciente.username.like(body['username'])).\
    one()

    newBot = Bot(
        respuesta = body['respuesta'],
        paciente_id = paciente.id,
        fecha = body['fecha'],
    )
    db.session.add(newBot)
    db.session.commit()
    return "OK", 200

@api.route('/getDataGrafico/<int:idPaciente>', methods=['GET'])
def getdatagrafico(idPaciente):
    if idPaciente == 0:
        result = Paciente.query.\
                with_entities(Paciente.nombre, Bot.respuesta, db.func.count(Bot.respuesta), db.extract('year', Bot.fecha), db.extract('month', Bot.fecha)).\
                join(Bot, Paciente.id == Bot.paciente_id).\
                filter(Bot.fecha >= db.text('current_date - interval \'3 month\'')).\
                group_by(Paciente.id, Bot.respuesta, Bot.fecha).\
                order_by(db.asc(Bot.fecha)).\
                all()
    else:
        result = Paciente.query.\
                with_entities(Paciente.nombre, Bot.respuesta, db.func.count(Bot.respuesta), db.extract('year', Bot.fecha), db.extract('month', Bot.fecha)).\
                join(Bot, Paciente.id == Bot.paciente_id).\
                filter(Paciente.id == idPaciente).\
                filter(Bot.fecha >= db.text('current_date - interval \'3 month\'')).\
                group_by(Paciente.id, Bot.respuesta, Bot.fecha).\
                order_by(db.asc(Bot.fecha)).\
                all()
    result=list(map(lambda x: {
        "nombre": list(x)[0],
        "respuesta": list(x)[1],
        "nrorespuesta": list(x)[2],
        "anno": int(list(x)[3]),
        "mes": int(list(x)[4])
    },result))
    
    return jsonify(result), 200

@api.route('/paciente/<int:idPaciente>', methods=['GET'])
def getPaciente(idPaciente):
    paciente= Paciente.query.get(idPaciente)
    if paciente == None:
        return {}
    else:
        return jsonify(paciente.serialize()), 200

@api.route('/guardarFicha', methods=['POST'])
def guardarFicha():
    body = request.get_json()
    
    stmt = Paciente.query.\
        filter(Paciente.id==body['id']).\
        first()
    
    print("=========")
    print(stmt)

    stmt.telefono = body['telefono'],
    stmt.fecha_nacimiento = body['fecha_nacimiento'],
    stmt.email = body['email'],
    stmt.direccion = body['direccion'],
    stmt.diagnóstico = body['diagnostico'],
    stmt.estado_civil = body['estado_civil'],
    stmt.nro_hijos = body['nro_hijos'],
    stmt.nacionalidad = body['nacionalidad'],
    stmt.username = body['username']

    db.session.commit()
    return "OK", 200

@api.route('/historial/paciente/<int:idPaciente>', methods=['GET'])
def getHistorialPaciente(idPaciente):
    paciente= Historial.query.filter(Historial.paciente_id == idPaciente).all()
    paciente=list(map(lambda x: x.serialize(),paciente))

    return jsonify(paciente), 200