from django.db import models

# Create your models here.


class Todo(models.Model):
    body = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    content = models.TextField(max_length=1000,default="")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)