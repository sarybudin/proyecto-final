"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,Psicologo, Paciente, Bot, Historial
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime

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

@api.route('/crearPaciente', methods=['POST'])
def newPacient():
    body = request.get_json()
    exists = db.session.query(Paciente).filter_by(username=body["telegramUser"]).first() is not None
    if exists == True:
        response_body = {
            "message": "El paciente ya existe"
        }
    elif exists == False:
        nombre = body["Nombre"]
        telefono = body["Telefono"]
        direccion = body["Direccion"]
        email = body["Correo"]
        telegramUser = body["telegramUser"]
        psicologo = body["Psicologo"]
        newPaciente = Paciente(
        psicologo_id = psicologo,
        nombre = nombre,
        telefono = telefono,
        direccion = direccion,
        email = email,
        username = telegramUser
        )
        db.session.add(newPaciente)
        db.session.commit()
        return "Paciente creado", 200

@api.route('/login', methods=["POST"])
def login():
    if request.method == "POST":
        body = request.get_json()
        userExists = Psicologo.query.filter_by(email=body["Email"]).first()
        
        if userExists:
            if userExists.password == body["Password"]:
                time = datetime.timedelta(minutes=20)
                userId = userExists.id
                nombre = userExists.nombre
                access_token = create_access_token(identity=body["Email"], expires_delta=time)
                response = {
                    "email": body["Email"], "token":access_token, "expires_in": time.total_seconds(), "status": "ok", "user_id": userId, "nombre": nombre
                        }
                return jsonify(response), 200
            else:
                return jsonify("Usuario o contraseña errada")
        else:
            return jsonify("Usuario no existe"), 200


@api.route('/private', methods=["GET"])
@jwt_required()
def private():
    if request.method == "GET":
        token = get_jwt_identity()
        return "Logged In", 200
            

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

@api.route('/pacientes', methods=['GET'])

def get_pacientes() :
    all_people = Paciente.query.all()
    all_people = list(map(lambda x: x.serialize(), all_people))

    return jsonify(all_people)

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

@api.route('/addHistorico', methods=['POST'])
def addHistorico():
    body = request.get_json()

    newHistorial = Historial(
        anotacion = body['anotacion'],
        paciente_id = body['paciente_id'],
    )
    db.session.add(newHistorial)
    db.session.commit()

    historico= Historial.query.filter(Historial.paciente_id == body['paciente_id']).all()
    historico=list(map(lambda x: x.serialize(),historico))

    return jsonify(historico), 200

@api.route('/eliminarHistorial/<int:id>/<int:paciente_id>', methods=['DELETE'])
def eliminarHistorial(id, paciente_id):
    db.session.query(Historial).\
    filter(Historial.id == id).\
    delete(synchronize_session=False)
    db.session.commit()
    
    historico= Historial.query.filter(Historial.paciente_id == paciente_id).all()
    historico=list(map(lambda x: x.serialize(),historico))

    return jsonify(historico), 200
