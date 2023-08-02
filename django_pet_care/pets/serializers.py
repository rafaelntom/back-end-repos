from rest_framework import serializers
from .models import CategoryPet
from traits.serializers import TraitSerializer
from groups.serializers import GroupSerializer


class PetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    group = GroupSerializer()
    traits = TraitSerializer(many=True)
    sex = serializers.ChoiceField(choices=CategoryPet.choices, required=False)
    name = serializers.CharField(max_length=50)
    age = serializers.IntegerField()
    weight = serializers.FloatField()
