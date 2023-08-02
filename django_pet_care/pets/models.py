from django.db import models
from groups.models import Group
from traits.models import Trait

# Create your models here.
# Uma característica (trait) pode estar ligada a vários pets assim como um pet pode possuir várias características.


class CategoryPet(models.TextChoices):
    MALE = 'Male'
    FEMALE = 'Female'
    NOT_INFORMED = 'Not Informed'


class Pet(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    weight = models.FloatField()
    sex = models.CharField(
        max_length=20, choices=CategoryPet.choices, default=CategoryPet.NOT_INFORMED)
    group = models.ForeignKey(
        Group, related_name="pets", on_delete=models.PROTECT)
    traits = models.ManyToManyField(Trait, related_name="pets")

    def __str__(self) -> str:
        return self.name
