import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) { }
  title = 'assignment';
  navbar: boolean;
  post: boolean;
  user: boolean;
  navToggle() {
    var btn = <HTMLInputElement>document.getElementById('btn');
    var box = <HTMLInputElement>document.getElementById('box');

    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      box.classList.remove('active');
    } else {
      btn.classList.add('active');
      box.classList.add('active');
    }
  }
  logout() {
    LoaderService.loader.next(true);
    localStorage.clear();
    this.navToggle();
    this.router.navigate(['login']);
    setTimeout(() => {
      LoaderService.loader.next(false);
    }, 1000);
  }
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
