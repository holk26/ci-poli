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

from .models.social_media_platform import SocialMediaPlatform
from .models.account_owner import AccountOwner
from .models.social_media_account import SocialMediaAccount
from .models.task_type import TaskType
from .models.task_bot import TaskBot
from .models.proxy import Proxy
from .models.Bot_personality import BotPersonality

from .serializers import (
    BotPersonalitiesSerializer,
    SocialMediaPlatformsSerializer,
    AccountOwnersSerializer,
    SocialMediaAccountsSerializer,
    TaskTypeSerializer,
    TaskBotsSerializer,
    SocialMediaAccountsSerializer2,
    ProxySerializer,
    TaskBotsSerializer2,
    CreateTasksSerializer,
    TaskBotsPendingSerializer,
)


class BotPersonalitiesViewSet(viewsets.ModelViewSet):
    queryset = BotPersonality.objects.all()
    serializer_class = BotPersonalitiesSerializer
    permission_classes = [AllowAny]


class SocialMediaPlatformsViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaPlatform.objects.all()
    serializer_class = SocialMediaPlatformsSerializer
    permission_classes = [AllowAny]


class AccountOwnersViewSet(viewsets.ModelViewSet):
    queryset = AccountOwner.objects.all()
    serializer_class = AccountOwnersSerializer
    permission_classes = [AllowAny]


class SocialMediaAccountsViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaAccount.objects.all()
    serializer_class = SocialMediaAccountsSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        method="patch",
        operation_description="Actualiza la cookie de una cuenta de redes sociales específica.",
        request_body=openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Items(
                type=openapi.TYPE_OBJECT,
                properties={
                    "domain": openapi.Schema(
                        type=openapi.TYPE_STRING, description="Dominio de la cookie"
                    ),
                    "httpOnly": openapi.Schema(
                        type=openapi.TYPE_BOOLEAN,
                        description="Indica si la cookie es HTTPOnly",
                    ),
                    "name": openapi.Schema(
                        type=openapi.TYPE_STRING, description="Nombre de la cookie"
                    ),
                    "path": openapi.Schema(
                        type=openapi.TYPE_STRING, description="Ruta de la cookie"
                    ),
                    "sameSite": openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description="Atributo SameSite de la cookie",
                    ),
                    "secure": openapi.Schema(
                        type=openapi.TYPE_BOOLEAN,
                        description="Indica si la cookie es segura",
                    ),
                    "value": openapi.Schema(
                        type=openapi.TYPE_STRING, description="Valor de la cookie"
                    ),
                    "expiry": openapi.Schema(
                        type=openapi.TYPE_INTEGER,
                        format="int64",
                        description="Tiempo de expiración de la cookie",
                        nullable=True,
                    ),
                },
            ),
            description="Array de objetos cookie con sus atributos específicos",
        ),
        responses={
            200: openapi.Response(description="Cookie actualizada correctamente."),
            400: openapi.Response(description="Datos de la cookie inválidos."),
            404: openapi.Response(description="Cuenta no encontrada."),
        },
    )
    @action(detail=True, methods=["patch"])
    def update_cookie(self, request, pk=None):
        social_media_account = self.get_object()

        # Suponiendo que request.data es una lista de cookies
        cookie_data = request.data

        if cookie_data and isinstance(cookie_data, list):
            # Aquí actualizas solo el campo cookie
            social_media_account.other_credentials["cookie"] = cookie_data
            social_media_account.save(update_fields=["other_credentials"])
            return Response({"status": "cookie updated"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid cookie data"}, status=status.HTTP_400_BAD_REQUEST
            )


class TaskTypeFilter(django_filters.FilterSet):
    platform_id = django_filters.NumberFilter(field_name="platform__id")

    class Meta:
        model = TaskType
        fields = ["platform_id"]


class TaskTypeViewSet(viewsets.ModelViewSet):
    queryset = TaskType.objects.all().order_by("create_date")
    serializer_class = TaskTypeSerializer
    permission_classes = [AllowAny]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TaskTypeFilter

    @swagger_auto_schema(
        operation_description="Listar todos los tipos de tareas, o filtrar por ID de plataforma.",
        manual_parameters=[
            openapi.Parameter(
                name="platform_id",
                in_=openapi.IN_QUERY,
                description="ID de la plataforma para filtrar los tipos de tareas.",
                type=openapi.TYPE_INTEGER,
            ),
        ],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class TaskBotsViewSet(viewsets.ModelViewSet):
    queryset = TaskBot.objects.all()
    serializer_class = TaskBotsSerializer
    permission_classes = [AllowAny]


class ProxyViewSet(viewsets.ModelViewSet):
    queryset = Proxy.objects.all()
    serializer_class = ProxySerializer
    permission_classes = [AllowAny]


class SocialMediaAccountsCompletedViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaAccount.objects.select_related(
        "bot_personality", "owner", "proxy"
    ).all()
    serializer_class = SocialMediaAccountsSerializer2
    permission_classes = [AllowAny]

    def get_queryset(self):
        return self.queryset.prefetch_related("bot_personality")


class TaskPendings(viewsets.ModelViewSet):
    queryset = TaskBot.objects.all()
    serializer_class = TaskBotsSerializer2

    def get_queryset(self):
        # Realizar una "carga anticipada" (eager load) de los datos relacionados
        # para mejorar el rendimiento y reducir el número de consultas a la base de datos.
        return TaskBot.objects.select_related(
            "task_type__platform",
            "social_media_account__bot_personality",
            "social_media_account__owner",
            "social_media_account__proxy",
        ).all()


# necesito que por cada cuenta crees un registro http://127.0.0.1:8000/api/task_bots/
# para agragarle tareas a las cuents
class AddTaskAllAccounts(viewsets.ViewSet):
    """
    Una vista especializada para crear una tarea para cada cuenta de redes sociales.
    """

    @swagger_auto_schema(
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
        custom_task_data = serializer.validated_data.get("custom_task")

        if custom_task_data is None:
            custom_task_data = {}

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

        # Ejemplo del objeto
        # custom_task
        #     {
        #         "type": "page, muro, all",
        #         "post": "mensaje del post",
        #         "links_image": ["link", "link"],
        #     },

        affected_accounts = [
            TaskBot.objects.create(
                task_type=task_type,
                bot_executor="NONE",
                status_process="SP",
                comment={"status": "Pending..."},
                social_media_account=account,
                custom_task=custom_task_data,
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


class TaskBotFilter(filters.FilterSet):
    start_date = filters.DateTimeFilter(field_name="start_date", lookup_expr="gte")
    end_date = filters.DateTimeFilter(field_name="end_date", lookup_expr="lte")
    status_process = filters.CharFilter(field_name="status_process")

    class Meta:
        model = TaskBot
        fields = ["start_date", "end_date", "status_process"]


class TaskPendingBotViewSet(viewsets.ModelViewSet):
    queryset = TaskBot.objects.all()
    serializer_class = TaskBotsPendingSerializer

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                name="start_date",
                in_=openapi.IN_QUERY,
                description="Fecha de inicio para filtrar las tareas pendientes (formato: YYYY-MM-DDTHH:MM:SS)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATETIME,
                default=timezone.now().isoformat(),
            ),
            openapi.Parameter(
                name="start_date_end",
                in_=openapi.IN_QUERY,
                description="Fecha de fin para filtrar las tareas pendientes (formato: YYYY-MM-DDTHH:MM:SS)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATETIME,
                default=timezone.now().isoformat(),
            ),
            openapi.Parameter(
                name="status_process",
                in_=openapi.IN_QUERY,
                description="Estado del proceso para filtrar las tareas pendientes",
                type=openapi.TYPE_STRING,
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        start_date = request.query_params.get("start_date")
        start_date_end = request.query_params.get("start_date_end")
        status_process = request.query_params.get("status_process")

        queryset = TaskBot.objects.all()

        if start_date:
            queryset = queryset.filter(start_date__date=start_date)

        if start_date_end:
            queryset = queryset.filter(start_date__date__lte=start_date_end)

        if status_process:
            queryset = queryset.filter(status_process=status_process)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
