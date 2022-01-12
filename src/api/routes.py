"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,Psicologo, Paciente, Bot
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/newUser', methods=['POST'])
def newUser():
    body = request.get_json()
    exists = db.session.query(Psicologo).filter_by(nombre=body["Nombre"]).first() is not None
    if exists == True:
        response_body = {
            "message": "El usuario ya existe"
        }
    elif exists == False:
        nombre = body["Nombre"]
        telefono = body["Telefono"]
        direccion = body["Direccion"]
        email = body["Correo"]
        password = body["Password"]
        newPsicologo = Psicologo(
        nombre = nombre,
        telefono = telefono,
        direccion_comercial = direccion,
        email = email,
        password = password
        )
        db.session.add(newPsicologo)
        db.session.commit()
        return "Psicologo creado", 200

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
    if body != None:
        respuesta = body["respuesta"]
        paciente_id = paciente.id
        fecha = body["fecha"]
        comentario = body["comentario"]
        newBot = Bot(
        respuesta = respuesta,
        paciente_id = paciente_id,
        fecha = fecha,
        comentario = comentario
        )
        db.session.add(newBot)
        db.session.commit()
        return "Información agregada a Base de Datos", 200
    else:
        return "Debes enviar información"

    newBot = Bot(
        respuesta = body['respuesta'],
        paciente_id = paciente.id,
        fecha = body['fecha'],
    )
    db.session.add(newBot)
    db.session.commit()
    return "OK", 200

@api.route('/getDataGrafico', methods=['GET'])
def getdatagrafico():
    result = Paciente.query.\
            with_entities(Paciente.nombre, Bot.respuesta, db.func.count(Bot.respuesta), db.extract('year', Bot.fecha), db.extract('month', Bot.fecha)).\
            join(Bot, Paciente.id == Bot.paciente_id).\
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
