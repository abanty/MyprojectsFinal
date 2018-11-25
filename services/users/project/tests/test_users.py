# services/users/project/tests/test_users.py


import json
import unittest

from project.tests.base import BaseTestCase

from project import db
from project.api.models import User

def add_user(username, email, address, phone, age):
    user = User(username=username, email=email, address=address, phone=phone, age=age)
    db.session.add(user)
    db.session.commit()
    return user


class TestUserService(BaseTestCase):
    """Pruebas para el servicio Users. """

    def test_users(self):
        """comprobado que la ruta /ping funcione correctamente."""
        response = self.client.get('/users/ping')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn('pong!!!', data['mensaje'])
        self.assertIn('satisfactorio', data['estado'])

    def test_add_user(self):
        """Asegúrese de que se pueda agregar un nuevo usuario a la db."""
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'Jesus',
                    'email': 'jesusabanto@upeu.edu.pe',
                    'address': 'Alameda',
                    'phone': 'dos',
                    'age': 'veinte'
                }),
                content_type='application/json',
            )
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 201)
            self.assertIn('jesusabanto@upeu.edu.pe fue agregado', data['mensaje'])
            self.assertIn('satisfactorio', data['estado'])

    def test_add_user_invalid_json(self):
        """Asegurando de que se lance un error cuando el objeto JSON esta vacío."""
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({}),
                content_type='application/json',
            )
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertIn('Carga inválida', data['mensaje'])
            self.assertIn('falló', data['estado'])

    def test_add_user_invalid_json_keys(self):
        """
        Asegurando que se produce un error si el objeto JSON no tiene una clave de nombre de usuario.
        """
        with self.client:
            response = self.client.post(
                '/users',
                data=json.dumps({'email':'jesusabanto@upeu.edu.pe'}),
                content_type = 'application/json'
            )
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertIn('Carga inválida.', data['mensaje'])
            self.assertIn('falló', data['estado'])

    def test_add_user_duplicate_email(self):
        """Asegurando que se produce un error si el email ya existe."""
        with self.client:
            self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'Jesus',
                    'email': 'jesusabanto@upeu.edu.pe',
                    'address': 'Alameda',
                    'phone': 'dos',
                    'age': 'veinte'
                }),
                content_type='application/json',
            )
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'Jesus',
                    'email': 'jesusabanto@upeu.edu.pe',
                    'address': 'Alameda',
                    'phone': 'dos',
                    'age': 'veinte'
                }),
                content_type='application/json',
            )
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertIn(
                'Disculpe, ese email ya existe.', data['mensaje'])
            self.assertIn('falló', data['estado'])
    
    def test_single_user(self):
        """Asegurando de que el usuario individual se comporte correctamente."""
        #user = User(username='Jesus', email='jesusabanto@upeu.edu.pe', address='Alameda', phone='dos', age='age')
        #db.session.add(user)
        #db.session.commit()
        user = add_user('Jesus','jesusabanto@upeu.edu.pe','Alameda','dos','age')
        with self.client:
            response = self.client.get(f'/users/{user.id}')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 200)
            self.assertIn('Jesus', data['data']['username'])
            self.assertIn('jesusabanto@upeu.edu.pe', data['data']['email'])
            self.assertIn('Alameda', data['data']['address'])
            self.assertIn('dos', data['data']['phone'])
            self.assertIn('age', data['data']['age'])
            self.assertIn('satisfactorio', data['estado'])

    def test_all_users(self):
        """Asegurando obtener todos los usuarios correctamente."""
        add_user('Jesus','jesusabanto@upeu.edu.pe','Alameda','dos','age')
        add_user('Marcos','examensoftware@upeu.edu.pe','Huachipa','cuatro','as')
        with self.client:
            response = self.client.get('/users')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(data['data']['users']), 2)
            self.assertIn('Jesus', data['data']['users'][0]['username'])
            self.assertIn('jesusabanto@upeu.edu.pe', data['data']['users'][0]['email'])
            self.assertIn('Alameda', data['data']['users'][0]['address'])
            self.assertIn('dos', data['data']['users'][0]['phone'])
            self.assertIn('age', data['data']['users'][0]['age'])
            self.assertIn('Marcos', data['data']['users'][1]['username'])
            self.assertIn('examensoftware@upeu.edu.pe', data['data']['users'][1]['email'])
            self.assertIn('Huachipa', data['data']['users'][1]['address'])
            self.assertIn('cuatro', data['data']['users'][1]['phone'])
            self.assertIn('as', data['data']['users'][1]['age'])
            self.assertIn('satisfactorio', data['estado'])

    def test_single_user_no_id(self):
        """Asegúrese de que se arroje un error si no se proporciona una identificación."""
        with self.client:
            response = self.client.get('/users/blah')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 404)
            self.assertIn('Usuario no existe', data['mensaje'])
            self.assertIn('fallo', data['estado'])

    def test_single_user_incorrect_id(self):
        """Asegurando de que se arroje un error si la identificación no existe."""
        with self.client:
            response = self.client.get('/users/999')
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 404)
            self.assertIn('Usuario no existe', data['mensaje'])
            self.assertIn('fallo', data['estado'])

if __name__ == '__main__':
    unittest.main()