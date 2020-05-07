from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password, check_password
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from rest_framework import viewsets, permissions, views, generics
from rest_framework.response import Response
from .models import Profile, Profession, Skills
from .serializers import ProfileSerializer, SkillsSerializer, ProfessionSerializer
from .serializers import UserSerializer, GroupSerializer, searchProfilesSerializer
from django.db import connection
from django.db import models
from urllib.parse import urlencode
from django.http import QueryDict, JsonResponse
import json


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        queryset = Profile.objects.all()

        username = self.request.query_params.get('username', '')
        password = self.request.query_params.get('password', '')
        if username and password:
            for p in Profile.objects.raw('SELECT username, password FROM contracting_profile WHERE username = %s', [username]):
                print(p.password, password)
                if(check_password(password, p.password)):
                    return queryset.filter(username=username)
        else:
            return queryset

        return queryset.none();


class ProfessionViewSet(viewsets.ModelViewSet):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer

    def get_queryset(self):
        queryset = Skills.objects.all()

        username = self.request.query_params.get('username', '')
        if username:
            return queryset.filter(myprofile=username)
        else:
            return queryset


class ProfileQueryView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = searchProfilesSerializer

    def get_queryset(self):
        queryset = Profile.objects.all()

        city = self.request.query_params.get('city', '')
        state = self.request.query_params.get('state', '')
        company_name = self.request.query_params.get('companyname', '')
        skills_string = self.request.query_params.get('skills', '')

        print(city, state, company_name, skills_string)
        myskills = skills_string.split(',')
        print(myskills)

        if skills_string and city:
            queryset = Profile.objects.filter(city__icontains=city)
            return queryset
        elif skills_string:
            queryset = Profile.objects.filter(
                profile_skills__in=myskills).distinct()
            print(queryset)
            return queryset
        elif city and state and company_name:
            queryset = Profile.objects.filter(city__icontains=city).filter(
                state__icontains=state).filter(company_name__icontains=company_name)
            # queryset = queryset.filter()
            return queryset
        elif company_name:
            queryset = Profile.objects.filter(
                company_name__icontains=company_name)
            return queryset
        elif city:
            queryset = Profile.objects.filter(city__icontains=city)
            return queryset
        elif state:
            queryset = Profile.objects.filter(state__icontains=state)
            return queryset
        else:
            return queryset
