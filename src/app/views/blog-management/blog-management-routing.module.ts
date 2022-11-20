import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth-management/auth/admin.guard';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { AddTagComponent } from './tag/add-tag/add-tag.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';

const routes: Routes = [
  { path: 'post-list', component: PostListComponent, canActivate: [LoginGuard] },
  { path: 'post-read/:ref', component: PostDetailComponent, canActivate: [] },
  { path: 'tag-list', component: TagListComponent, canActivate: [AdminGuard] },
  { path: 'tag', component: AddTagComponent, canActivate: [AdminGuard] },
  { path: 'category-list', component: CategoryListComponent, canActivate: [AdminGuard] },
  { path: 'category', component: AddCategoryComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogManagementRoutingModule { }
