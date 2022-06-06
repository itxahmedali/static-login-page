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
export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
// user id
id:any
post:Post;
user:User
write:boolean
constructor(private postHttp: PostService, private userHttp: UserService, private route: ActivatedRoute,) { }
ngOnInit(): void {
  LoaderService.loader.next(true);
  this.id=this.route.snapshot.paramMap.get("id");
  setTimeout(() => {
   this.postHttp.loadPosts(`/posts/${this.id}`).subscribe((res:any)=>{
     this.post = res
     this.userHttp.getUsers(`/users/${res.userId}`).subscribe((res:any)=>{
       this.user = res;
       LoaderService.loader.next(false);
      })
    })
  });
}
// checking if user have permission for write
ngDoCheck() {
  if(localStorage.getItem('writePermission') == 'true'){
    this.write = true
  }
  else{
    this.write = false
  }
}
}
