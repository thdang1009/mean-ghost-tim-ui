import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogManagementRoutingModule } from './blog-management-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SharedModuleModule } from '@shares/shared-module.module';


@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    BlogManagementRoutingModule,
    SharedModuleModule
  ]
})
export class BlogManagementModule { }
