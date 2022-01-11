from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class Psicologo(db.Model):
    __tablename__ = 'psicologo'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(12), unique=True, nullable=False)
    direccion_comercial = db.Column(db.String(120), unique=True, nullable=False)
    paciente = db.relationship("Paciente", back_populates="psicologo")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "direccion_comercial": self.direccion_comercial,
        }

class Paciente(db.Model):
    __tablename__ = 'paciente'
    id = db.Column(db.Integer, primary_key=True)
    telefono = db.Column(db.String(12), unique=True, nullable=False)
    psicologo_id = db.Column(db.Integer,db.ForeignKey('psicologo.id'))
    fecha_nacimiento = db.Column(db.Date, nullable=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    direccion = db.Column(db.String(120), nullable=True)
    diagnóstico = db.Column(db.String(120), nullable=True)
    estado_civil = db.Column(db.String(120), nullable=True)
    nro_hijos = db.Column(db.Integer, nullable=True)
    nacionalidad = db.Column(db.String(120), nullable=True)
    username = db.Column(db.String(120), nullable=True)

    psicologo = db.relationship("Psicologo", back_populates="paciente")
    bot = db.relationship("Bot", back_populates="paciente", uselist=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "telefono": self.telefono,
            "psicologo_id": self.psicologo_id,
            "fecha_nacimiento": self.fecha_nacimiento,
            "nombre": self.nombre,
            "email": self.email,
            "direccion": self.direccion,
            "diagnostico": self.diagnóstico,
            "estado_civil": self.estado_civil,
            "nro_hijos": self.nro_hijos,
            "nacionalidad": self.nacionalidad,
            "username": self.username,
            "nombrePsicologo": self.psicologo.nombre
        }
    def serializeAll(self):
        return {
            "nombre": self.nombre,
            "username": self.username,
            "bot" : list(map(lambda x: x.serialize(),self.bot)),
        }


class Bot(db.Model):
    __tablename__ = 'bot'
    id = db.Column(db.Integer, primary_key=True)
    respuesta = db.Column(db.String(120), unique=False, nullable=False)
    paciente_id = db.Column(db.Integer,db.ForeignKey('paciente.id'))
    fecha = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    paciente = db.relationship("Paciente", back_populates="bot")

    def serialize(self):
        return {
            "id": self.id,
            "respuesta": self.respuesta,
            "paciente_id": self.paciente_id,
            "fecha": self.fecha,
        }
    
    def serializeAll(self):
        return {
            "id": self.id,
            "respuesta": self.respuesta,
            "paciente_id": self.paciente_id,
            "fecha": self.fecha,
            "paciente" : self.paciente.serialize(),
        }
    


