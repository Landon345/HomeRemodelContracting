import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeRemodelContracting';
  username: string;
  myfalse: boolean = false;
  letter: string;

  constructor(private location: Location){

  }
  ngOnInit(): void {
    this.getUsername();

  }

  Logout(): void{
    sessionStorage.removeItem("username");
    this.location.go('/home');
    location.reload();
  }

  getUsername(): void{
    this.username = sessionStorage.getItem('username');

    if(this.username){
      this.letter = this.username.slice(0,1);
    }
  }
}
