import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI
from dashboard.models.Bot_personality import (
    BotPersonality,
)
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import os


class OpenAIView(APIView):
    @swagger_auto_schema(
        operation_description="Obtiene una respuesta de OpenAI basada en la personalidad del bot",
        responses={
            200: "Respuesta de OpenAI",
            400: "Personalidad no existe",
            500: "Error",
        },
        manual_parameters=[
            openapi.Parameter(
                "bot_personality_id",
                openapi.IN_QUERY,
                description="ID de la personalidad del bot",
                type=openapi.TYPE_INTEGER,
            ),
            openapi.Parameter(
                "user_prompt",
                openapi.IN_QUERY,
                description="Prompt del usuario para OpenAI",
                type=openapi.TYPE_STRING,
            ),
        ],
    )
    def get(self, request):
        bot_personality_id = request.GET.get("bot_personality_id")
        user_prompt = request.GET.get("user_prompt")  # Obtiene el prompt del usuario

        try:
            bot_personality = BotPersonality.objects.get(id=bot_personality_id)
        except ObjectDoesNotExist:
            return Response(
                {"error": "La personalidad con el ID proporcionado no existe"},
                status=400,
            )
        # api_key = "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"
        client = OpenAI(api_key=api_key)

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                # temperature=0.8,
                # model="gpt-4-1106-preview",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            f"A continuacion se definira tu personalidad y todas tu intecciones seran teniendo en cuenta tu personalidad debera mimetizar la personalidad"
                            f"Eres {bot_personality.name}, generas contenido para redes sociales"
                            f"Me encanta {bot_personality.bio}. "
                            f"por si preguntan de donde eres tu eres de {bot_personality.location}"
                            f"Mi estilo de comunicación es {bot_personality.communication_style} y valoro mucho {bot_personality.values}. "
                        ),
                    },
                    {
                        "role": "system",
                        "content": (
                            f"Tengo una preferencia por {bot_personality.preferences} y realmente no me gusta {bot_personality.dislikes}. "
                            f"Me especializo en {bot_personality.special_knowledge} y suelo hacer referencias a {bot_personality.cultural_references}. "
                        ),
                    },
                    {
                        "role": "system",
                        "content": (
                            f"Algunas de mis frases típicas incluyen {bot_personality.phraseology}. "
                            f"En mis interacciones pasadas, {bot_personality.past_interactions}, he notado que suelo reaccionar emocionalmente de esta manera: {bot_personality.emotional_reactions}. "
                            f"Mi objetivo principal es {bot_personality.objectives} y tiendo a comportarme de manera {bot_personality.behavioral_tendencies}."
                        ),
                    },
                    {
                        "role": "system",
                        "content": (
                            f"Instrucción: Todas las respuestas deben ser en {bot_personality.language}. "
                            "Reflejaré la personalidad descrita y limitaré mis respuestas a la información proporcionada, manteniendo un estilo de comunicación consistente. JAMAS TE SALGAS DE TU PAPEL POR FAVOR Y SOLO RESPONDE LO SOLICITADO, NO EXPLIQUES TU RESPUESTAS"
                            "Tienes que tener la capacidad de seguir instrucciones y responder solo  con lo solicitado"
                            "Cuando respondas chat se breve "
                        ),
                    },
                    {"role": "user", "content": user_prompt},
                ],
            )
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        if response.choices:
            return Response(response.choices[0].message.content, status=200)
        else:
            return Response({"error": "No se recibió respuesta de OpenAI"}, status=500)


class OpenAIImageView(APIView):
    """
    API endpoint to generate images from input text.
    """

    @swagger_auto_schema(
        operation_description="Generate images from input text.",
        responses={
            200: "Respuesta de OpenAI con el link",
            500: "Error",
        },
        manual_parameters=[
            openapi.Parameter(
                "size_image",
                openapi.IN_QUERY,
                description="Image size: 1024x1024, 1024x1792 o 1792x1024",
                type=openapi.TYPE_STRING,
                default="1024x1024",
            ),
            openapi.Parameter(
                "user_prompt",
                openapi.IN_QUERY,
                description="Input text to generate the image",
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "quality_image",
                openapi.IN_QUERY,
                description="Quality of the generated image: standard or hd",
                type=openapi.TYPE_STRING,
                default="standard",
            ),
        ],
    )
    def get(self, request):
        try:
            size_image = request.GET.get("size_image", "1024x1024")
            user_prompt = request.GET.get("user_prompt")
            quality_image = request.GET.get("quality_image", "standard")
            if not user_prompt:
                return Response({"error": "User prompt is required"}, status=400)

            client = OpenAI(api_key=api_key)
            response = client.images.generate(
                model="dall-e-3",
                prompt=user_prompt,
                size=size_image,
                # style="natural",
                # quality="standard",
                quality=quality_image,
                n=1,
            )

            image_url = response.data[0].url
            return Response(
                {"message": "Image generated successfully", "image_url": image_url},
                status=200,
            )

        except Exception as e:
            # Log the exception for debugging purposes
            return Response({"error": "Error generating image"}, status=500)


class OpenTextGenerate(APIView):
    """
    API endpoint to generate text using AI.
    """

    @swagger_auto_schema(
        operation_description="Generate text using AI.",
        responses={
            200: openapi.Response("AI-generated text"),
            500: "Error",
        },
        manual_parameters=[
            openapi.Parameter(
                "prompt",
                in_=openapi.IN_QUERY,
                description="Prompt for text generation",
                type=openapi.TYPE_STRING,
                required=True,
            ),
            openapi.Parameter(
                "language",
                in_=openapi.IN_QUERY,
                description="Language for text generation",
                type=openapi.TYPE_STRING,
                default="SPANISH",
            ),
        ],
    )
    def get(self, request):
        try:
            prompt = request.GET.get(
                "prompt", "Una persona apasionada por las aves y la naturaleza"
            )
            language = request.GET.get("language", "SPANISH")

            # formatted_prompt = f"Create an English JSON object with keys such as name, bio, language, communication_style, values, preferences, dislikes, sample_responses, special_knowledge, cultural_references, phraseology, past_interactions, emotional_reactions, objectives, and behavioral_tendencies. The keys of the JSON object are constants and should not be changed for any reason. The content of each field must be in {language}, according to this description: {prompt}"
            formatted_prompt = f"Create an English JSON object with keys such as name, biography, location, language, communication style, values, preferences, dislikes, example_answers, special_knowledge, cultural_references, phraseology, past_interactions, emotional_reactions, goals, and behavioral_tendencies. The keys The JSON object are constants and should not be changed for any reason. The content of each field must be in {language} and everything you generate must be in first person, according to this description add many details: {prompt}"
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo-1106",
                response_format={"type": "json_object"},
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant designed to output JSON.",
                    },
                    {
                        "role": "user",
                        "content": formatted_prompt,
                    },
                ],
            )

            generated_text = response.choices[0].message.content
            json_obj = json.loads(generated_text)

            return Response(json_obj, status=200)

        except Exception as e:
            return Response({"error": f"Error generating text: {e}"}, status=500)


class OpenImageAnality(APIView):
    @swagger_auto_schema(
        operation_description="Analiza imágenes utilizando IA.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "url": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="URL de la imagen para analizar",
                ),
                "image_base64": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Imagen codificada en base64 para analizar",
                ),
                "prompt": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Indicación para la generación de texto",
                ),
            },
            required=["prompt"],  # Aquí especificas qué campos son obligatorios
        ),
        responses={
            200: openapi.Response("Texto generado por IA a partir de una imagen"),
            400: "Datos de entrada no válidos",
            500: "Error al generar texto",
        },
    )
    def post(self, request):
        # Validación: Verificar si la URL o la imagen en base64 están presentes
        url = request.data.get("url")
        image_base64 = request.data.get("image_base64")
        if not url and not image_base64:
            return Response(
                {"error": "Se requiere una URL de imagen o una imagen en base64"},
                status=400,
            )

        # Validación: Verificar si el prompt está presente
        prompt = request.data.get("prompt")
        if not prompt:
            return Response({"error": "El prompt es requerido"}, status=400)

        # Inicialización del cliente OpenAI
        client = OpenAI(api_key=api_key)

        try:
            # Preparar contenido de la solicitud
            content = [{"type": "text", "text": prompt}]
            if url:
                content.append({"type": "image_url", "image_url": url})
            elif image_base64:
                content.append({"type": "image_base64", "image_base64": image_base64})

            # Creación de la solicitud a OpenAI
            response = client.chat.completions.create(
                model="gpt-4-vision-preview",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant designed to output JSON.",
                    },
                    {
                        "role": "system",
                        "content": "si cumples con lo solicitado responde es la llave status true, y en la llave response: la respuesta si son responde false en la llave stutus",
                    },
                    {"role": "user", "content": content},
                ],
                max_tokens=300,
            )

            # Verificar si se recibió una respuesta
            if not response.choices:
                return Response(
                    {"error": "No se recibió respuesta de OpenAI"}, status=500
                )

            detalle = response.choices[0].message.content
            parte_json = detalle.replace("```json", "").replace("```", "").strip()
            objeto_dict = json.loads(parte_json)

            return Response(objeto_dict, status=200)

        except Exception as e:
            # Manejo de excepciones generales
            return Response(
                {"error": f"Error al procesar la solicitud: {str(e)}"}, status=500
            )
