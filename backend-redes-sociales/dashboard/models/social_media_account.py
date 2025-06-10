from django.db import models
from django.utils import timezone
from .account_owner import AccountOwner
from .Bot_personality import BotPersonality
from .proxy import Proxy


class SocialMediaAccount(models.Model):
    bot_personality = models.ForeignKey(
        BotPersonality, null=True, on_delete=models.SET_NULL
    )
    group = models.JSONField()
    account_name = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255, null=True, blank=True)
    access_secret = models.CharField(max_length=255, null=True, blank=True)
    other_credentials = models.JSONField(null=True, blank=True)
    owner = models.ForeignKey(AccountOwner, on_delete=models.CASCADE)
    proxy = models.OneToOneField(
        Proxy, null=True, blank=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.account_name + " : " + str(self.id)
