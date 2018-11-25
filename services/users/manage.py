# services/users/manage.py
import unittest

from flask.cli import FlaskGroup

from project import create_app, db
from project.api.models import User

app = create_app()
cli = FlaskGroup(create_app=create_app)

# nuevo
@cli.command()
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command()
def test():
    """Ejecución de pruebas sin cobertura de código"""
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

@cli.command()
def seed_db():
    """sembrando la base de datos"""
    db.session.add(User(username='Jesus', email="jesusabanto@upeu.edu.pe", address="Alameda", phone="Dos", age="age"))
    db.session.add(User(username='Marcos', email="examensoftware@upeu.edu.pe", address="Huachipa", phone="cuatro", age="as"))
    db.session.commit()

if __name__ == "__main__":
    cli()