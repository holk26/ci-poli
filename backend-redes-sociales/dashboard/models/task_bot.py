from django.db import models
from django.utils import timezone
from .social_media_account import SocialMediaAccount
from .task_type import TaskType


class TaskBot(models.Model):
    task_type = models.ForeignKey(
        TaskType, on_delete=models.CASCADE, null=True, blank=True
    )
    bot_executor = models.CharField(max_length=255, null=True, blank=True)
    status_process = models.CharField(max_length=255, null=True, blank=True)
    comment = models.JSONField(null=True, blank=True)
    social_media_account = models.ForeignKey(
        SocialMediaAccount, on_delete=models.CASCADE, null=True, blank=True
    )
    start_date = models.DateTimeField(default=timezone.now, null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    custom_task = models.JSONField(null=True, blank=True, default=dict)

    def __str__(self):
        return f"{self.task_type.task_name} : {self.status_process} {self.bot_executor}: {self.social_media_account}"
