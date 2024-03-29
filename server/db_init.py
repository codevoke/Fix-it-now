from passlib.hash import pbkdf2_sha256
from models import *

def initialize_database():
    db.create_all()
    
    if not UserModel.query.filter_by(login='admin').first():
        admin = UserModel(
            username="admin",
            login="admin",
            password=pbkdf2_sha256.hash("admin"),
            role=UserRole.ADMIN
        )
        db.session.add(admin)
        db.session.commit()
        
    if not UserModel.query.filter_by(login='teacher').first():
        teacher = UserModel(
            username="teacher",
            login="teacher",
            password=pbkdf2_sha256.hash("teacher")
        )
        db.session.add(teacher)
        db.session.commit()

    if not UserModel.query.filter_by(login='worker').first():
        worker = UserModel(
            username="worker",
            login="worker",
            password=pbkdf2_sha256.hash("worker")
        )
        db.session.add(worker)
        db.session.commit()