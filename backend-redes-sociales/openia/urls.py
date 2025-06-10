from django.urls import path
from . import views

urlpatterns = [
    path("openai/", views.OpenAIView.as_view(), name="openai"),
    path("openai/image/", views.OpenAIImageView.as_view(), name="openai_image"),
    path("openai/text/", views.OpenTextGenerate.as_view(), name="openai_image"),
    path(
        "openai/image/anality/",
        views.OpenImageAnality.as_view(),
        name="openai_anality_image",
    ),
]
