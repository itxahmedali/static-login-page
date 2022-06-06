import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authLogin/auth-login.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PostService } from 'src/app/services/posts/post.service';
export interface Posts {
  body: string;
  id: number;
  title: string;
  userId: number;
}
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  constructor(private postHttp: PostService) { }

  posts: Posts[] = [];
  write: boolean;
  ngOnInit(): void {
    LoaderService.loader.next(true);
    this.postHttp.loadPosts('/posts').subscribe((res: any) => {
      res.map((post: any) => {
        this.posts.push(post);
      
      });
      LoaderService.loader.next(false);
    });
    
  }
  // checking if user have permission for write
  ngDoCheck() {
    if (localStorage.getItem('writePermission') == 'true') {
      this.write = true;
    } else {
      this.write = false;
    }
  }
}
