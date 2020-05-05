import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Profile } from '../Interfaces/Profile';
import { Skill } from '../Interfaces/Skill';
import { ContractingService } from '../contracting.service';
import { Profession } from '../Interfaces/Profession';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  profile: Profile;
  passwordConfirmation: string;
  professions: string[];
  profiles: Profile[];

  constructor(private contractingService: ContractingService, private location: Location) {}

  ngOnInit(): void {
    this.profile = {
      username: null,
      email: null,
      password: null,
      company_name: null,
      rating: 3.5,
      phonenumber: null,
      city: null,
      state: null,
      number_of_ratings: 0,
      profile_description: null,
      picture_path: null,
      years_experience: null,
    };
    this.getProfiles();
  }

  register(): void {
    console.log(this.profile);
    this.profiles.forEach((user) => {
      if (user.username == this.profile.username) {
        alert('That username is already being used.');
      }
    });
    if (this.profile.password != this.passwordConfirmation) {
      alert('Make sure your password and password confirmation are the same.');
    }

    this.contractingService
      .createProfile(this.profile)
      .subscribe(() => {
        console.log("created");
        this.addProfessions();
        this.goContractors();
      });

    
  }
  addProfessions(): void {
    this.professions.forEach((skill) => {
      this.contractingService
        .createSkills(skill, this.profile.username)
        .subscribe(() => console.log('Created Skill'));
    });
  }
  getProfiles(): void {
    this.contractingService.getProfiles().subscribe((myprofiles) => {
      console.log(myprofiles);
      this.profiles = myprofiles;
    });
  }
  goContractors() : void {
    this.location.go('/contractors');
    location.reload();
  }
  test(): void {
    const myprofile: Profile = {
      username: 'Landon34567898765',
      email: '18lschlangen@hotmail.com',
      password: '1234',
      company_name: "Harry's Lights",
      rating: 0,
      phonenumber: '3202567894',
      city: 'Minneapolis',
      state: 'Minnesota',
      number_of_ratings: 0,
      profile_description: 'I am a hard worker',
      picture_path: 'hkj',
      years_experience: 2,
    };
    this.contractingService
      .createProfile(myprofile)
      .subscribe(() => console.log('created'));
  }
  test2(): void {
    const myProfession: Profession = {
      name: 'Lights',
      category: 'foundations',
    };
    this.contractingService
      .createProfession(myProfession)
      .subscribe(() => console.log('created'));
  }
  test3(): void {
    this.profile.username = 'dom';
    this.professions = ['concrete', 'lights'];

    this.professions.forEach((skill) => {
      this.contractingService
        .createSkills(skill, this.profile.username)
        .subscribe(() => console.log('Created Skill'));
    });
  }
}
