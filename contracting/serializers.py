from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Profile, Profession, Skills


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

        



class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = '__all__'


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = '__all__'  

    def create(self, validated_data):
        profile = Profile.objects.create(
            username = validated_data['username'],
            email =validated_data['email'],
            password = make_password(validated_data['password']),
            company_name =validated_data['company_name'],
            rating = validated_data['rating'],
            phonenumber =validated_data['phonenumber'],
            city = validated_data['city'],
            state =validated_data['state'],
            number_of_ratings =validated_data['number_of_ratings'],
            profile_description =validated_data['profile_description'],
            picture_path = validated_data['picture_path'],
            years_experience =validated_data['years_experience'],
        ) 
        return profile


class searchProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'