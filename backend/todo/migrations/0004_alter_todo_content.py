# Generated by Django 5.0.3 on 2024-04-26 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_alter_todo_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='content',
            field=models.TextField(blank=True, default='', max_length=1000),
        ),
    ]