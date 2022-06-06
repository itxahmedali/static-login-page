import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  navbar:boolean;
  post:boolean;
  user:boolean;
  constructor() {}

  ngOnInit(): void {}
  ngDoCheck() {
    if (localStorage.getItem('access_token') != null) {
      this.navbar = true
    }
    else {
      this.navbar = false
    }
    if (localStorage.getItem('catalogReadPermission') == 'true') {
      this.post = true
    }
    else {
      this.post = false
    }
    if (localStorage.getItem('userReadPermission') == 'true') {
      this.user = true
    }
    else {
      this.user = false
    }
  }
}
