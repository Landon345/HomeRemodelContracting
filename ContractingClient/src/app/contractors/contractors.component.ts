import { Component, OnInit } from '@angular/core';
import { Profile } from '../Interfaces/Profile';
import {ContractingService} from '../contracting.service';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {
  username: string;
  profiles: Profile[];
  city: string = "";
  state: string = "";
  company_name: string = "";
  professions: string[];
  
  constructor(private contractingService: ContractingService) { }

  ngOnInit(): void {
    this.getUsername();
    this.getProfiles();
  }

  getUsername(): void{
    this.username = sessionStorage.getItem('username');
  }
  getProfiles(): void {
    this.contractingService.getProfiles().subscribe(theprofiles=>{
      this.profiles = theprofiles;
    })
  }

  search(): void {
    this.contractingService.search(this.city, this.state, this.company_name, this.professions).subscribe(theprofiles=>{
      this.profiles = theprofiles;
    })
  }
}
