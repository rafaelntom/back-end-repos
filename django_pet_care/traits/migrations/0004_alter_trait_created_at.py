# Generated by Django 4.2.3 on 2023-07-31 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('traits', '0003_alter_trait_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trait',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
