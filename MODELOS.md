# MODELOS DE BASE DE DATOS - DASHBOARD

## Aplicación de Redes Sociales

**Universidad Politécnico Grancolombiano**  
**Proyecto: Pipeline CI/CD - Redes Sociales**

---

## 📋 RESUMEN DE MODELOS

La aplicación cuenta con 7 modelos principales que gestionan la información de cuentas de redes sociales, personalidades de bots, tareas automatizadas y configuraciones del sistema.

### Diagrama de Relaciones

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  AccountOwner   │────▶│SocialMediaAccount│◀────│ BotPersonality  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                 │
                                 │
                        ┌─────────────────┐
                        │     Proxy       │
                        └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │    TaskBot      │────▶│    TaskType     │
                        └─────────────────┘     └─────────────────┘
                                 │                        │
                                 ▼                        ▼
                        ┌─────────────────────────────────────────┐
                        │       SocialMediaPlatform                │
                        └─────────────────────────────────────────┘
```

---

## 📊 MODELOS DETALLADOS

### 1. AccountOwner

**Propósito**: Gestiona la información de los propietarios de las cuentas de redes sociales.

```python
class AccountOwner(models.Model):
    owner_name = models.CharField(max_length=255)
    owner_email = models.EmailField()
    owner_phone = models.CharField(max_length=20)
    owner_urls = models.JSONField(null=True, blank=True)
```

**Campos:**

- `owner_name`: Nombre del propietario de la cuenta
- `owner_email`: Correo electrónico del propietario
- `owner_phone`: Número telefónico de contacto
- `owner_urls`: URLs relacionadas (formato JSON)

**Relaciones:**

- Uno a muchos con `SocialMediaAccount`

---

### 2. BotPersonality

**Propósito**: Define las personalidades y comportamientos de los bots para la automatización de redes sociales.

```python
class BotPersonality(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=255, default="ESPAÑOL")
    communication_style = models.TextField(null=True, blank=True)
    values = models.TextField(null=True, blank=True)
    preferences = models.TextField(null=True, blank=True)
    dislikes = models.TextField(null=True, blank=True)
    example_responses = models.TextField(null=True, blank=True)
    special_knowledge = models.TextField(null=True, blank=True)
    cultural_references = models.TextField(null=True, blank=True)
    phraseology = models.TextField(null=True, blank=True)
    past_interactions = models.TextField(null=True, blank=True)
    emotional_reactions = models.TextField(null=True, blank=True)
    objectives = models.TextField(null=True, blank=True)
    behavioral_tendencies = models.TextField(null=True, blank=True)
```

**Características principales:**

- **Personalización completa**: 16 campos que definen la personalidad del bot
- **Multilingual**: Soporte para diferentes idiomas (por defecto español)
- **IA Training**: Campos específicos para entrenar modelos de inteligencia artificial

**Casos de uso:**

- Automatización de respuestas personalizadas
- Generación de contenido con personalidad específica
- Interacciones coherentes en redes sociales

---

### 3. Proxy

**Propósito**: Gestiona la configuración de proxies para el acceso seguro y distribuido a las redes sociales.

```python
class Proxy(models.Model):
    ip_address = models.GenericIPAddressField(unique=True)
    port = models.PositiveIntegerField(unique=True)
    username = models.CharField(max_length=255, null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)
```

**Campos:**

- `ip_address`: Dirección IP del proxy (único)
- `port`: Puerto de conexión (único)
- `username`: Usuario para autenticación (opcional)
- `password`: Contraseña para autenticación (opcional)

**Funcionalidades:**

- Evitar bloqueos por IP
- Distribución geográfica
- Anonimato en las conexiones

---

### 4. SocialMediaAccount

**Propósito**: Modelo central que representa las cuentas de redes sociales gestionadas por el sistema.

```python
class SocialMediaAccount(models.Model):
    bot_personality = models.ForeignKey(BotPersonality, null=True, on_delete=models.SET_NULL)
    group = models.JSONField()
    account_name = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255, null=True, blank=True)
    access_secret = models.CharField(max_length=255, null=True, blank=True)
    other_credentials = models.JSONField(null=True, blank=True)
    owner = models.ForeignKey(AccountOwner, on_delete=models.CASCADE)
    proxy = models.OneToOneField(Proxy, null=True, blank=True, on_delete=models.SET_NULL)
```

**Relaciones:**

- `bot_personality`: Personalidad asignada al bot (FK)
- `owner`: Propietario de la cuenta (FK)
- `proxy`: Proxy asignado (One-to-One)

**Campos técnicos:**

- `group`: Agrupación de cuentas (JSON)
- `access_token`: Token de acceso API
- `access_secret`: Secret para autenticación
- `other_credentials`: Credenciales adicionales (JSON)

---

### 5. SocialMediaPlatform

**Propósito**: Define las plataformas de redes sociales disponibles en el sistema.

```python
class SocialMediaPlatform(models.Model):
    platform_name = models.TextField(null=True, blank=True, unique=True)
    platform_api_url = models.TextField(null=True, blank=True)
```

**Campos:**

- `platform_name`: Nombre de la plataforma (único)
- `platform_api_url`: URL de la API de la plataforma

**Plataformas soportadas:**

- Facebook, Instagram, Twitter/X
- LinkedIn, TikTok, YouTube
- Plataformas personalizadas

---

### 6. TaskType

**Propósito**: Define los tipos de tareas que pueden ejecutar los bots en las redes sociales.

```python
class TaskType(models.Model):
    task_name = models.CharField(max_length=255)
    creator = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255, default="detail")
    create_date = models.DateTimeField(default=timezone.now)
    platform = models.ForeignKey(SocialMediaPlatform, on_delete=models.CASCADE)
```

**Campos:**

- `task_name`: Nombre descriptivo de la tarea
- `creator`: Usuario que creó el tipo de tarea
- `descripcion`: Descripción detallada de la tarea
- `create_date`: Fecha de creación
- `platform`: Plataforma objetivo (FK)

**Ejemplos de tareas:**

- Publicar contenido
- Responder mensajes
- Seguir usuarios
- Analizar métricas

---

### 7. TaskBot

**Propósito**: Gestiona las instancias de ejecución de tareas automatizadas.

```python
class TaskBot(models.Model):
    task_type = models.ForeignKey(TaskType, on_delete=models.CASCADE, null=True, blank=True)
    bot_executor = models.CharField(max_length=255, null=True, blank=True)
    status_process = models.CharField(max_length=255, null=True, blank=True)
    comment = models.JSONField(null=True, blank=True)
    social_media_account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE, null=True, blank=True)
    start_date = models.DateTimeField(default=timezone.now, null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    custom_task = models.JSONField(null=True, blank=True, default=dict)
```

**Campos de control:**

- `task_type`: Tipo de tarea a ejecutar (FK)
- `bot_executor`: Identificador del bot ejecutor
- `status_process`: Estado actual de la tarea
- `social_media_account`: Cuenta objetivo (FK)

**Campos temporales:**

- `start_date`: Fecha/hora de inicio
- `end_date`: Fecha/hora de finalización

**Campos adicionales:**

- `comment`: Comentarios de la ejecución (JSON)
- `custom_task`: Configuración personalizada (JSON)

---

## 🔄 FLUJO DE DATOS

### Proceso de Automatización

1. **Configuración inicial**:

   - Se crea un `AccountOwner`
   - Se define una `BotPersonality`
   - Se configura un `Proxy` (opcional)

2. **Registro de cuenta**:

   - Se crea una `SocialMediaAccount` vinculando todos los elementos anteriores
   - Se especifica la `SocialMediaPlatform` objetivo

3. **Definición de tareas**:

   - Se crean `TaskType` específicos para cada plataforma
   - Se configuran las acciones y parámetros

4. **Ejecución**:
   - Se instancia un `TaskBot` que ejecuta la tarea
   - Se registra el progreso y resultados
   - Se almacenan logs y métricas

### Relaciones Clave

- **AccountOwner** → **SocialMediaAccount** (1:N)
- **BotPersonality** → **SocialMediaAccount** (1:N)
- **Proxy** → **SocialMediaAccount** (1:1)
- **SocialMediaPlatform** → **TaskType** (1:N)
- **TaskType** → **TaskBot** (1:N)
- **SocialMediaAccount** → **TaskBot** (1:N)

---

## 🛠️ CONSIDERACIONES TÉCNICAS

### Seguridad

- **Tokens sensibles**: `access_token` y `access_secret` deben estar encriptados
- **Credenciales**: `other_credentials` almacena información sensible en JSON
- **Proxies**: Configuración segura para evitar exposición de IPs

### Escalabilidad

- **JSONField**: Permite flexibilidad en configuraciones futuras
- **Foreign Keys**: Diseño normalizado para evitar redundancia
- **Índices**: Campos únicos para optimizar consultas

### Mantenimiento

- **Soft deletes**: Uso de `SET_NULL` para preservar historial
- **Timestamps**: `timezone.now` para auditoría temporal
- **Flexibilidad**: Campos opcionales para adaptabilidad

---

## 📈 MÉTRICAS Y ANÁLISIS

### Campos de Seguimiento

- Todas las tareas registran fecha de inicio y fin
- Estados de proceso para monitoreo en tiempo real
- Comentarios en JSON para análisis detallado
- Configuraciones personalizadas para ajustes específicos

### Optimizaciones Implementadas

- Campos únicos para evitar duplicados
- Relaciones eficientes con CASCADE y SET_NULL
- JSONField para datos flexibles
- Timestamps automáticos para auditoría

---

**Documentación generada para el proyecto CI/CD**  
**Universidad Politécnico Grancolombiano - 2025**
