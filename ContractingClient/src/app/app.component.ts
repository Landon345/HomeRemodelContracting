import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeRemodelContracting';
  username: string = sessionStorage.getItem('username');
  myfalse: boolean = false;

  constructor(private location: Location){

  }

  Logout(): void{
    sessionStorage.removeItem("username");
    this.location.go('/home');
    location.reload();
  }
}
