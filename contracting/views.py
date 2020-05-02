from django.contrib.auth.models import User, Group
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from rest_framework import viewsets, permissions, views, generics
from rest_framework.response import Response
from .models import Profile, Profession, Skills
from .serializers import ProfileSerializer, SkillsSerializer, ProfessionSerializer
from .serializers import UserSerializer, GroupSerializer
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


class ProfessionViewSet(viewsets.ModelViewSet):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer


class ProfileQueryView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        queryset = Profile.objects.all()

        username = self.request.query_params.get('username', '')
        password = self.request.query_params.get('password', '')
        if username and password:
            return queryset.filter(username=username, password=password)
        else:
            return queryset

        
