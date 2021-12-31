"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,Psicologo, Paciente, Bot
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
    if body != None:
        respuesta = body["respuesta"]
        paciente_id = paciente.id
        fecha = body["fecha"]
        newBot = Bot(
        respuesta = respuesta,
        paciente_id = paciente_id,
        fecha = fecha,
        )
        db.session.add(newBot)
        db.session.commit()
        return "Información agregada a Base de Datos", 200
    else:
        return "Debes enviar información"
