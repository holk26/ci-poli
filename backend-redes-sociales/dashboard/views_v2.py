"""MODULO DE VISTAS"""
from datetime import timezone
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django_filters import rest_framework as django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

from .models.social_media_account import SocialMediaAccount
from .models.task_bot import TaskBot

from .serializers import (
    CreateTasksSerializer,
)


class AddTaskAllAccountsV2(viewsets.ViewSet):
    """
    Una vista especializada para crear una tarea para cada cuenta de redes sociales.
    """

    @swagger_auto_schema(
        tags=["Tasks - Version 2"],
        method="post",
        responses={
            201: "Tareas creadas exitosamente",
            400: "ID de tipo de tarea inválido",
        },
        operation_description="Crear una tarea para cada cuenta de redes sociales o para una cuenta específica por su ID.",
        request_body=CreateTasksSerializer,
        manual_parameters=[
            openapi.Parameter(
                name="social_media_account_id",
                in_=openapi.IN_QUERY,
                description="ID de la cuenta de redes sociales para la cual crear la tarea (opcional)",
                type=openapi.TYPE_INTEGER,
            ),
        ],
    )
    @action(detail=False, methods=["post"])
    def create_tasks_for_all_accounts(self, request):
        serializer = CreateTasksSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        task_type = serializer.validated_data["task_type_id"]
        social_media_account_id = request.query_params.get("social_media_account_id")

        accounts_to_process = (
            SocialMediaAccount.objects.filter(id=social_media_account_id)
            if social_media_account_id
            else SocialMediaAccount.objects.all()
        )

        if not accounts_to_process.exists() and social_media_account_id:
            return Response(
                {
                    "error": "La cuenta de redes sociales con ID {} no existe".format(
                        social_media_account_id
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        affected_accounts = [
            TaskBot.objects.create(
                task_type=task_type,
                bot_executor="NONE",
                status_process="SP",
                comment={"status": "Pending..."},
                social_media_account=account,
            ).social_media_account.id
            for account in accounts_to_process
        ]

        message = (
            "Tarea creada correctamente para la cuenta con ID: {}".format(
                social_media_account_id
            )
            if social_media_account_id
            else "Tareas creadas correctamente"
        )

        return Response(
            {
                "message": message,
                "affected_accounts_count": len(affected_accounts),
                "affected_accounts": affected_accounts,
            },
            status=status.HTTP_201_CREATED,
        )
