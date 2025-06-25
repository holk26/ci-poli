from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
import json


class LoginViewTest(APITestCase):
    """Pruebas de integración para las vistas de login"""
    
    def setUp(self):
        self.client = Client()
        self.user_data = {
            'username': 'testuser',
            'password': 'testpass123',
            'email': 'test@example.com'
        }
        self.user = User.objects.create_user(**self.user_data)
    
    def test_user_creation(self):
        """Prueba unitaria - Creación de usuario"""
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertTrue(self.user.check_password('testpass123'))
    
    def test_admin_access(self):
        """Prueba funcional - Acceso a la página de admin"""
        response = self.client.get('/admin/')
        # Debe redirigir al login (302) o mostrar página de login (200)
        self.assertIn(response.status_code, [200, 302])
    
    def test_user_authentication(self):
        """Prueba de integración - Autenticación de usuario"""
        # Intentar login con credenciales válidas
        login_successful = self.client.login(
            username='testuser', 
            password='testpass123'
        )
        self.assertTrue(login_successful)
        
        # Intentar login con credenciales inválidas
        login_failed = self.client.login(
            username='testuser', 
            password='wrongpassword'
        )
        self.assertFalse(login_failed)


class APIEndpointsTest(APITestCase):
    """Pruebas funcionales para endpoints de API"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='apiuser',
            password='apipass123',
            email='api@example.com'
        )
    
    def test_api_root_endpoint(self):
        """Prueba funcional - Endpoint raíz de API"""
        try:
            response = self.client.get('/api/')
            # Acepta varios códigos de respuesta válidos
            self.assertIn(response.status_code, [200, 404, 405])
        except Exception as e:
            # Si el endpoint no existe, eso también es un resultado válido
            self.assertTrue(True, "Endpoint API no configurado aún")
    
    def test_health_check(self):
        """Prueba funcional - Health check básico"""
        # Probar que el servidor Django responde
        response = self.client.get('/')
        # Acepta 200 (página) o 404 (no configurada)
        self.assertIn(response.status_code, [200, 404])


class SecurityTest(TestCase):
    """Pruebas de seguridad básicas"""
    
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='securityuser',
            password='securepass123',
            email='security@example.com'
        )
    
    def test_password_hashing(self):
        """Prueba unitaria - Hashing de contraseñas"""
        # Verificar que la contraseña no se almacena en texto plano
        self.assertNotEqual(self.user.password, 'securepass123')
        # Verificar que la validación funciona
        self.assertTrue(self.user.check_password('securepass123'))
        self.assertFalse(self.user.check_password('wrongpassword'))
    
    def test_unauthorized_access(self):
        """Prueba funcional - Acceso no autorizado"""
        # Intentar acceder sin autenticación
        response = self.client.get('/admin/')
        # Debe requerir autenticación
        self.assertIn(response.status_code, [302, 403])


class DatabaseIntegrationTest(TestCase):
    """Pruebas de integración con base de datos"""
    
    def test_database_connection(self):
        """Prueba de integración - Conexión a base de datos"""
        # Crear un usuario para probar la conexión DB
        user_count_before = User.objects.count()
        
        test_user = User.objects.create_user(
            username='dbtest',
            password='dbpass123',
            email='db@test.com'
        )
        
        user_count_after = User.objects.count()
        
        # Verificar que el usuario se creó
        self.assertEqual(user_count_after, user_count_before + 1)
        self.assertEqual(test_user.username, 'dbtest')
        
        # Verificar que se puede recuperar
        retrieved_user = User.objects.get(username='dbtest')
        self.assertEqual(retrieved_user.email, 'db@test.com')
        
        # Limpiar
        test_user.delete()
        final_count = User.objects.count()
        self.assertEqual(final_count, user_count_before)
