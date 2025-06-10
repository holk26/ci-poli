# Usar una imagen base de Python
FROM python:3.11.5

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Definir las variables de entorno para la base de datos
ENV DATABASE_URL=postgres://admin:BzsDWRk8DDBjHprCQT0i@10.0.0.90:5432/aztecaSocial

# Instalar herramientas de desarrollo y limpiar la caché de apt
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar los requerimientos e instalar las dependencias
COPY requirements.txt .
RUN python -m pip install --upgrade pip && \
    python -m pip install -r requirements.txt &&\
    pip install uvicorn

# Copiar el resto del código de la aplicación
COPY . .

# Ejecutar el comando para aplicar migraciones de Django
RUN python manage.py migrate --noinput

# Ejecutar el comando para recolectar archivos estáticos en la ubicación configurada
RUN python manage.py collectstatic --noinput --clear

# COPY static /app/static

# Exponer el puerto 8000
EXPOSE 8000

# Ejecutar el servidor de Django con Uvicorn para producción
CMD ["uvicorn", "back_redes_sociales.asgi:application", "--host", "0.0.0.0", "--port", "8000"]

