from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import render
from .models import Team
from django.forms.models import model_to_dict
from utils import data_processing
from exceptions import *


class TeamView(APIView):
    def post(self, request):
        team_data = request.data

        try:
            data_processing(team_data)
        except (NegativeTitlesError, InvalidYearCupError, ImpossibleTitlesError) as err:
            error = {
                "error": err.message
            }
            return Response(error, 400)

        team = Team.objects.create(
            name=team_data['name'],
            titles=team_data['titles'],
            top_scorer=team_data['top_scorer'],
            fifa_code=team_data['fifa_code'],
            first_cup=team_data['first_cup']
        )

        return Response(model_to_dict(team), 201)

    def get(self, request):
        teams = Team.objects.all()

        teams_dict = []

        for team in teams:
            t = model_to_dict(team)
            teams_dict.append(t)

        return Response(teams_dict)


class TeamDetailView(APIView):
    def get(self, request, id):
        try:
            team = Team.objects.get(pk=id)
        except Team.DoesNotExist:
            message = {
                "message": "Team not found"
            }
            return Response(message, 404)

        team_dict = model_to_dict(team)

        return Response(team_dict, 200)

    def patch(self, request, id):
        try:
            team = Team.objects.get(pk=id)
        except Team.DoesNotExist:
            message = {
                "message": "Team not found"
            }
            return Response(message, 404)
        team_data = request.data

        for key, value in request.data.items():
            setattr(team, key, value)

        team.save()
        return Response(model_to_dict(team), 200)

    def delete(self, request, id):
        try:
            team = Team.objects.get(pk=id)
        except Team.DoesNotExist:
            message = {
                "message": "Team not found"
            }
            return Response(message, 404)

        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
