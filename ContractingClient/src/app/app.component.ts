import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeRemodelContracting';
  username: string = sessionStorage.getItem('username');
  myfalse: boolean = false;



  Logout(): void{
    sessionStorage.removeItem("username");
    location.reload();
  }
}
