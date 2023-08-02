from rest_framework.views import APIView, Response, Request
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Pet
from groups.models import Group
from traits.models import Trait
from .serializers import PetSerializer


class PetView(APIView, PageNumberPagination):
    def get(self, request: Request):
        trait_name = request.query_params.get('trait')

        if trait_name:
            pets = Pet.objects.filter(traits__name__iexact=trait_name)
        else:
            pets = Pet.objects.all()

        result_page = self.paginate_queryset(pets, request, view=self)
        serializer = PetSerializer(result_page, many=True)

        return self.get_paginated_response(serializer.data)

    def post(self, request: Request):
        serializer = PetSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        group_data = serializer.validated_data.pop('group')
        traits_data = serializer.validated_data.pop('traits')

        try:
            group = Group.objects.get(
                scientific_name__iexact=group_data['scientific_name'])
        except Group.DoesNotExist:
            group = Group.objects.create(
                scientific_name=group_data['scientific_name'])

        traits_list = []
        for trait_data in traits_data:
            trait_name = trait_data['name']
            try:
                trait = Trait.objects.get(name__iexact=trait_name)
            except Trait.DoesNotExist:
                trait = Trait.objects.create(name=trait_name)
            traits_list.append(trait)

        pet = Pet.objects.create(**serializer.validated_data, group=group)
        pet.traits.add(*traits_list)

        return_pet_serializer = PetSerializer(pet)

        return Response(return_pet_serializer.data, status=status.HTTP_201_CREATED)


class PetDetailedView(APIView, PageNumberPagination):
    def get(self, request, pet_id):
        pet = get_object_or_404(Pet, id=pet_id)
        serializer = PetSerializer(pet, many=False)
        return Response(serializer.data)

    def delete(self, request, pet_id):
        pet = get_object_or_404(Pet, id=pet_id)
        pet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pet_id):
        pet = get_object_or_404(Pet, id=pet_id)
        serializer = PetSerializer(
            instance=pet, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)

        group_data = serializer.validated_data.pop('group', None)

        if group_data is not None:
            group_scientific_name = group_data.get('scientific_name')
            if group_scientific_name:
                try:
                    group = Group.objects.get(
                        scientific_name__iexact=group_scientific_name)
                except Group.DoesNotExist:
                    group = Group.objects.create(
                        scientific_name=group_scientific_name)
                serializer.validated_data['group'] = group
                pet.group = group

        traits_data = serializer.validated_data.pop('traits', None)
        if traits_data is not None:
            pet.traits.clear()
            traits_list = []
            for new_trait in traits_data:
                trait_name = new_trait['name']
                try:
                    trait = Trait.objects.get(name__iexact=trait_name)
                except Trait.DoesNotExist:
                    trait = Trait.objects.create(name=trait_name)
                traits_list.append(trait)
            pet.traits.add(*traits_list)

        pet.name = serializer.validated_data.get('name', pet.name)
        pet.age = serializer.validated_data.get('age', pet.age)
        pet.weight = serializer.validated_data.get('weight', pet.weight)

        pet.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
