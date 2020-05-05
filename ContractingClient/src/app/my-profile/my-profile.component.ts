import { Component, OnInit } from '@angular/core';
import {ContractingService} from '../contracting.service';
import {Profile} from '../Interfaces/Profile';
import {Skill} from '../Interfaces/Skill';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profile: Profile;
  professions: string[];
  skills: Skill[];
  constructor(private contractingService: ContractingService) { }

  ngOnInit(): void {
    this.getProfile()
    this.getProfessions()
  }

  getProfile(): void {
    const username = sessionStorage.getItem("username");
    this.contractingService.getProfile(username)
    .subscribe(theprofile => {
      this.profile = theprofile;
      console.log(this.profile)
    })
  }
  getProfessions(): void {
    const username = sessionStorage.getItem("username");
    this.contractingService.getProfileSkills(username)
    .subscribe(skills => {
      this.skills = skills
      this.professions = skills.map(skill => {return skill.myprofession});
      console.log(this.professions);
      console.log(this.skills);
    })
  }
  save(): void {
    console.log(this.profile);
    
    console.log(this.professions);
    this.contractingService
      .updateProfile(this.profile.username, this.profile)
      .subscribe(() => {
        console.log("updated");
        this.UpdateProfessions();
        this.getProfessions();
      });

    
  }
  UpdateProfessions(): void {
    this.skills.forEach((skill) => {
      this.contractingService
        .deleteSkills(skill.id).subscribe(() => {
        console.log('Deleted Skill with ', skill.id);
        
      });

    });
    this.addProfessions();

  }
  addProfessions(): void {
      this.professions.forEach((skill) => {
        this.contractingService
          .createSkills(skill, this.profile.username)
          .subscribe(() => console.log('Created Skill'));
      });
    }

}
