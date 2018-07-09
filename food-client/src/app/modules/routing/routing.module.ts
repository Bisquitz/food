import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '../../posts/posts.component';
import { ViewPostComponent } from '../../view-post/view-post.component';
import { AddPostComponent } from '../../add-post/add-post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: ViewPostComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: '**', redirectTo: 'posts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
