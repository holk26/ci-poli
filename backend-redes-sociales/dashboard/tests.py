from django.test import TestCase
from django.contrib.auth.models import User
from dashboard.models.account_owner import AccountOwner
from dashboard.models.Bot_personality import BotPersonality
from dashboard.models.social_media_account import SocialMediaAccount


class AccountOwnerTest(TestCase):
    """Pruebas unitarias para el modelo AccountOwner"""
    
    def setUp(self):
        self.owner_data = {
            'owner_name': 'Test Owner',
            'owner_email': 'test@example.com',
            'owner_phone': '1234567890'
        }
    
    def test_create_account_owner(self):
        """Prueba la creación de un propietario de cuenta"""
        owner = AccountOwner.objects.create(**self.owner_data)
        self.assertEqual(owner.owner_name, 'Test Owner')
        self.assertEqual(owner.owner_email, 'test@example.com')
        self.assertTrue(isinstance(owner, AccountOwner))
    
    def test_account_owner_str_method(self):
        """Prueba el método __str__ del modelo"""
        owner = AccountOwner.objects.create(**self.owner_data)
        self.assertEqual(str(owner), 'Test Owner')


class BotPersonalityTest(TestCase):
    """Pruebas unitarias para el modelo BotPersonality"""
    
    def setUp(self):
        self.bot_data = {
            'name': 'Test Bot',
            'bio': 'Bot de prueba para testing',
            'language': 'ESPAÑOL',
            'communication_style': 'Formal y amigable'
        }
    
    def test_create_bot_personality(self):
        """Prueba la creación de una personalidad de bot"""
        bot = BotPersonality.objects.create(**self.bot_data)
        self.assertEqual(bot.name, 'Test Bot')
        self.assertEqual(bot.language, 'ESPAÑOL')
        self.assertTrue(isinstance(bot, BotPersonality))
    
    def test_bot_personality_default_language(self):
        """Prueba que el idioma por defecto sea español"""
        bot = BotPersonality.objects.create(name='Test Bot')
        self.assertEqual(bot.language, 'ESPAÑOL')


class SocialMediaAccountTest(TestCase):
    """Pruebas de integración para SocialMediaAccount"""
    
    def setUp(self):
        self.owner = AccountOwner.objects.create(
            owner_name='Test Owner',
            owner_email='test@example.com',
            owner_phone='1234567890'
        )
        self.bot_personality = BotPersonality.objects.create(
            name='Test Bot',
            bio='Bot de prueba'
        )
    
    def test_create_social_media_account(self):
        """Prueba la creación de una cuenta de red social"""
        account_data = {
            'account_name': 'test_account',
            'group': {'category': 'test'},
            'owner': self.owner,
            'bot_personality': self.bot_personality
        }
        account = SocialMediaAccount.objects.create(**account_data)
        
        self.assertEqual(account.account_name, 'test_account')
        self.assertEqual(account.owner, self.owner)
        self.assertEqual(account.bot_personality, self.bot_personality)
        self.assertTrue(isinstance(account, SocialMediaAccount))
    
    def test_social_media_account_str_method(self):
        """Prueba el método __str__ del modelo"""
        account = SocialMediaAccount.objects.create(
            account_name='test_account',
            group={'category': 'test'},
            owner=self.owner
        )
        expected_str = f"test_account : {account.id}"
        self.assertEqual(str(account), expected_str)


class ModelsIntegrationTest(TestCase):
    """Pruebas de integración entre modelos"""
    
    def test_complete_account_setup(self):
        """Prueba la configuración completa de una cuenta con todas las relaciones"""
        # Crear propietario
        owner = AccountOwner.objects.create(
            owner_name='Integration Test Owner',
            owner_email='integration@test.com',
            owner_phone='9876543210'
        )
        
        # Crear personalidad del bot
        bot_personality = BotPersonality.objects.create(
            name='Integration Bot',
            bio='Bot para pruebas de integración',
            communication_style='Profesional',
            values='Eficiencia y precisión'
        )
        
        # Crear cuenta de red social
        account = SocialMediaAccount.objects.create(
            account_name='integration_test_account',
            group={'type': 'business', 'category': 'technology'},
            owner=owner,
            bot_personality=bot_personality,
            access_token='test_token_12345'
        )
        
        # Verificar relaciones
        self.assertEqual(account.owner.owner_name, 'Integration Test Owner')
        self.assertEqual(account.bot_personality.name, 'Integration Bot')
        self.assertEqual(account.bot_personality.communication_style, 'Profesional')
        
        # Verificar que el propietario tiene la cuenta asociada
        owner_accounts = SocialMediaAccount.objects.filter(owner=owner)
        self.assertEqual(owner_accounts.count(), 1)
        self.assertEqual(owner_accounts.first(), account)
