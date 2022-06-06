import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
declare var require: any
const permissions = require('./permissions.json');

interface ICredentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  users = [
    {
      username: 'naveed@gmail.com',
      password: 'Pa$$w0rd!',
      catalogReadPermission: 'false',
      userReadPermission: 'false',
      writePermission: 'false',
    },
    {
      username: 'aqib@gmail.com',
      password: 'Pa$$w0rd!',
      catalogReadPermission: 'false',
      userReadPermission: 'true',
      writePermission: 'false',
    },
    {
      username: 'ali@gmail.com',
      password: 'Pa$$w0rd!',
      catalogReadPermission: 'true',
      userReadPermission: 'false',
      writePermission: 'false',
    },
    {
      username: 'ahmed@gmail.com',
      password: 'Pa$$w0rd!',
      catalogReadPermission: 'true',
      userReadPermission: 'true',
      writePermission: 'true',
    },
  ];
  public userPermissions = new BehaviorSubject([]);
  private loggedIn = false;
  constructor(private router: Router) {
  }

  get permissions() {
    return this.userPermissions.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  login(credentials: ICredentials) {
    let access_token: any = Math.floor(100000 + Math.random() * 900000);
    this.fakeLogin().subscribe((res:any) => {
      this.userPermissions.next(res.permissions);
      let user = this.users.find(
        (x) => x.username === credentials.email && x.password === credentials.password
        );
        if (user) {
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['']);
        localStorage.setItem('userReadPermission', user.userReadPermission);
        localStorage.setItem('catalogReadPermission', user.catalogReadPermission);
        localStorage.setItem('writePermission', user.writePermission);
        LoaderService.loader.next(false);
      }
    });
  }

  private fakeLogin() {
    return of({ permissions });
  }
}
