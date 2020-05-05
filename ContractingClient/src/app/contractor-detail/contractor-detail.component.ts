import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractingService } from '../contracting.service';
import { Profile } from '../Interfaces/Profile';
import { Skill } from '../Interfaces/Skill';

@Component({
  selector: 'app-contractor-detail',
  templateUrl: './contractor-detail.component.html',
  styleUrls: ['./contractor-detail.component.css'],
})
export class ContractorDetailComponent implements OnInit {
  profile: Profile;
  skills: Skill[];
  param: string = this.route.snapshot.paramMap.get('username');;

  constructor(
    private route: ActivatedRoute,
    private contractingService: ContractingService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getSkills();
  }

  getProfile(): void {
    const username: string = this.route.snapshot.paramMap.get('username');
    this.contractingService.getProfile(username).subscribe((myProfile) => {
      this.profile = myProfile;
      this.profile.profile_description = this.profile.profile_description.slice(0, 400);
      console.log(this.profile);
    });
  }

  getSkills(): void {
    const username: string = this.route.snapshot.paramMap.get('username');
    this.contractingService.getProfileSkills(username).subscribe((mySkills => {
      this.skills = mySkills;
      console.log(this.skills);
    }))
  }
}
