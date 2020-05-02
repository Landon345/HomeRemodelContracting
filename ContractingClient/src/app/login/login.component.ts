import { Component, OnInit } from '@angular/core';
import {ContractingService} from '../contracting.service';
import { Profile } from '../Interfaces/Profile';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  profile: Profile;
  profilearray: Profile[];

  constructor(private contractingService: ContractingService,
              private location: Location) { }

  ngOnInit(): void {
  }


  login(): void {
    this.contractingService.getSpecificProfile(this.username, this.password)
    .subscribe((myprofile)=> {
      if(myprofile.length == 0){
        alert("username of password incorrect");
        this.username = "";
        this.password = "";
      }else{
        console.log('found Profile');
        this.profile = myprofile[0];
        sessionStorage.removeItem('username');
        sessionStorage.setItem('username', this.profile.username);
        console.log(this.profile);
        this.goContractors();
      }
      
    })
  }
  goContractors() : void {
    this.location.go('/contractors');
    location.reload();
  }
}
