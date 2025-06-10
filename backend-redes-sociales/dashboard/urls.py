# dashboard/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BotPersonalitiesViewSet,
    SocialMediaPlatformsViewSet,
    AccountOwnersViewSet,
    SocialMediaAccountsViewSet,
    TaskTypeViewSet,
    TaskBotsViewSet,
    SocialMediaAccountsCompletedViewSet,
    ProxyViewSet,
    TaskPendings,
    AddTaskAllAccounts,
    TaskPendingBotViewSet,
)

from .views_v2 import AddTaskAllAccountsV2


router = DefaultRouter()
router.register(r"bot_personalities", BotPersonalitiesViewSet)
router.register(r"social_media_platforms", SocialMediaPlatformsViewSet)
router.register(r"account_owners", AccountOwnersViewSet)
router.register(r"social_media_accounts", SocialMediaAccountsViewSet)
router.register(r"task_types", TaskTypeViewSet)
router.register(r"task_bots", TaskBotsViewSet)
router.register(r"social_medias", SocialMediaAccountsCompletedViewSet)
router.register(r"proxy", ProxyViewSet)
router.register(r"pending_bots", TaskPendings)
router.register(r"generate_tasks", AddTaskAllAccounts, basename="generate-tasks")
router.register(r"view_tasks", TaskPendingBotViewSet, basename="view-tasks")


router2 = DefaultRouter()
router2.register(r"generate_tasks", AddTaskAllAccountsV2, basename="generate-tasks-V2")

urlpatterns = [
    path("", include(router.urls)),
    path("v2/", include(router2.urls)),
]
