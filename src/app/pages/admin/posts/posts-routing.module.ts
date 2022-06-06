import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts.component';
const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"",
        component:PostsComponent
      },
      {
        path:"post/:id",
        component:PostComponent
      }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
