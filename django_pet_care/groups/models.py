from django.db import models


# Um grupo (group) pode ter vários pets atrelados a ele, porém um pet somente poderá estar conectado a um grupo.

class Group(models.Model):
    scientific_name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.scientific_name
