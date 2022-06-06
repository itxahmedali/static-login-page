import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/users/user.service';
export interface Users {
  address: {street: string, suite: string, city: string, zipcode: string, geo: {lat: string, lng: string}}
  company: {name: string, catchPhrase: string, bs: string}
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor( private userHttp: UserService) { }
  users: Users[] = []
  write: boolean
  ngOnInit(): void {
    LoaderService.loader.next(true);
    this.userHttp.getUsers('/users').subscribe((res: any) => {
      res.map((users: Users) => {
        this.users.push(users)
      })
      LoaderService.loader.next(false);
    })
  }
  // checking if user have permission for write
  ngDoCheck() {
    if (localStorage.getItem('writePermission') == 'true') {
      this.write = true
    }
    else {
      this.write = false
    }
  }
}
