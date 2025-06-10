from rest_framework import serializers
from drf_yasg import openapi

from .models.social_media_platform import SocialMediaPlatform
from .models.account_owner import AccountOwner
from .models.social_media_account import SocialMediaAccount
from .models.task_type import TaskType
from .models.task_bot import TaskBot
from .models.proxy import Proxy
from .models.Bot_personality import BotPersonality


class BotPersonalitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotPersonality
        fields = "__all__"


class SocialMediaPlatformsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaPlatform
        fields = "__all__"


class AccountOwnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountOwner
        fields = "__all__"


class otherCredentialsField(serializers.JSONField):
    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT,
            "title": "other_credentials",
            "properties": {
                "User": openapi.Schema(
                    title="usuario",
                    type=openapi.TYPE_STRING,
                ),
                "password": openapi.Schema(
                    title="contraseñas",
                    type=openapi.TYPE_STRING,
                ),
                "cookie": openapi.Schema(
                    title="Cookie",
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            "domain": openapi.Schema(type=openapi.TYPE_STRING),
                            "httpOnly": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                            "name": openapi.Schema(type=openapi.TYPE_STRING),
                            "path": openapi.Schema(type=openapi.TYPE_STRING),
                            "sameSite": openapi.Schema(type=openapi.TYPE_STRING),
                            "secure": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                            "value": openapi.Schema(type=openapi.TYPE_STRING),
                            "expiry": openapi.Schema(
                                type=openapi.TYPE_INTEGER, format="int64", nullable=True
                            ),
                        },
                    ),
                    default=None,
                ),
            },
            "required": ["user", "password"],
        }


class SocialMediaAccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaAccount
        fields = "__all__"

    other_credentials = otherCredentialsField()


class TaskTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskType
        fields = "__all__"


class TaskBotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskBot
        fields = "__all__"


class ProxySerializer(serializers.ModelSerializer):
    class Meta:
        model = Proxy
        fields = "__all__"


class SocialMediaAccountsSerializer2(serializers.ModelSerializer):
    bot_personality = BotPersonalitiesSerializer()
    owner = AccountOwnersSerializer()
    proxy = ProxySerializer()

    class Meta:
        model = SocialMediaAccount
        fields = "__all__"


class TaskBotsSerializer2(serializers.ModelSerializer):
    task_type = TaskTypeSerializer()
    social_media_account = SocialMediaAccountsSerializer2()

    class Meta:
        model = TaskBot
        fields = "__all__"


class CustomTaskSerializer(serializers.Serializer):
    type = serializers.CharField(required=False, allow_blank=True)
    post = serializers.CharField(required=False, allow_blank=True)
    links_image = serializers.ListField(
        child=serializers.URLField(), required=False, allow_empty=True
    )


class CreateTasksSerializer(serializers.Serializer):
    task_type_id = serializers.PrimaryKeyRelatedField(queryset=TaskType.objects.all())
    custom_task = CustomTaskSerializer(required=False)

    def to_internal_value(self, data):
        task_type_id = self.fields["task_type_id"].to_internal_value(
            data.get("task_type_id")  # Usar .get() permite que sea opcional
        )
        custom_task = self.fields["custom_task"].to_internal_value(
            data.get("custom_task", {})
        )

        return {
            "task_type_id": task_type_id,
            "custom_task": custom_task,
        }


class TaskBotsPendingSerializer(serializers.ModelSerializer):
    platform_name = serializers.CharField(source="task_type.platform", read_only=True)
    task_name = serializers.CharField(source="task_type.task_name", read_only=True)
    task_description = serializers.CharField(
        source="task_type.descripcion", read_only=True
    )
    bot_executor = serializers.CharField()
    comment = serializers.JSONField()
    custom_task = serializers.JSONField()
    status_process = serializers.CharField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    account_id = serializers.IntegerField(
        source="social_media_account.id", read_only=True
    )
    account_name = serializers.CharField(
        source="social_media_account.account_name", read_only=True
    )
    account_name = serializers.CharField(
        source="social_media_account.account_name", read_only=True
    )

    class Meta:
        model = TaskBot
        fields = [
            "platform_name",
            "task_name",
            "task_description",
            "bot_executor",
            "comment",
            "status_process",
            "start_date",
            "end_date",
            "account_id",
            "account_name",
            "custom_task",
        ]
