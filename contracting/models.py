from django.db import models

# Create your models here.


class Profession(models.Model):
    name = models.CharField(primary_key=True, max_length=100)
    category = models.CharField(null=True, max_length=100)

    def __str__(self):
        return self.name


class Profile(models.Model):
    username = models.CharField(primary_key=True, max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=200)
    company_name = models.CharField(max_length=50)
    rating = models.DecimalField(decimal_places=2, max_digits=3, default=3.5)
    phonenumber = models.CharField(max_length=30)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=50)
    number_of_ratings = models.IntegerField(default=0)
    profile_description = models.TextField()
    picture_path = models.CharField(max_length=255, null=True)
    years_experience = models.DecimalField(decimal_places=1, max_digits=3)
    profile_skills = models.ManyToManyField(
        Profession,
        through='Skills',
        through_fields=('myprofile', 'myprofession'),
    )

    def __str__(self):
        return self.username


class Skills(models.Model):
    myprofile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    myprofession = models.ForeignKey(Profession, on_delete=models.CASCADE)

    def __str__(self):
        return self.myprofile + " " + self.myprofession
