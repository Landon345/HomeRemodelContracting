import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {
  username: string;
  constructor() { }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(): void{
    this.username = sessionStorage.getItem('username');
  }
}
