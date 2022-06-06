import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PostService } from 'src/app/services/posts/post.service';
import { UserService } from 'src/app/services/users/user.service';
export interface User {
  address: {street: string, suite: string, city: string, zipcode: string, geo: {lat: string, lng: string}}
  company: {name: string, catchPhrase: string, bs: string}
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}
export interface Posts {
  body: string;
  id: number;
  title: string;
  userId: number;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  // user id
  id: any;
  user: User;
  write: boolean
  posts: Posts[] = [];
  duplicate:Posts[];
  constructor(private userHttp: UserService, private route: ActivatedRoute, private postHttp: PostService) { }
  ngOnInit(): void {
    LoaderService.loader.next(true);
    this.id = this.route.snapshot.paramMap.get("id");
    setTimeout(() => {
      this.userHttp.getUsers(`/users/${this.id}`).subscribe((res: any) => {
        this.user = res
        this.postHttp.loadPosts('/posts').subscribe((res: any) => {
          res.map((post: any) => {
            this.posts.push(post);
          });
          this.duplicate = this.posts.filter(obj => obj.userId == this.id);
          LoaderService.loader.next(false);
        });
      })
    });
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
