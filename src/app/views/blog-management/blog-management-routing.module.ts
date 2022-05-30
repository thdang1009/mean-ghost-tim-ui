import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth-management/auth/admin.guard';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: 'post-list', component: PostListComponent, canActivate: [AdminGuard] },
  { path: 'post-add', component: PostDetailComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogManagementRoutingModule { }
