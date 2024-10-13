import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogManagementRoutingModule } from './blog-management-routing.module';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { SharedModule } from '@shares/shared-module.module';
import { CLIPBOARD_OPTIONS, ClipboardButtonComponent, ClipboardOptions, MarkdownModule, MARKED_OPTIONS, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { AnchorService } from '@shares/anchor/anchor.service';
import { ReuseComponentModule } from '@reuse/reuse.module';
import { AddTagComponent } from './tag/add-tag/add-tag.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ComponentsModule } from '@components/components.module';
// import { AngClapModule } from 'ang-clap';
// import { DocuModule, DocuEditorModule } from 'ng-write';
import { PostEditComponent } from './post/post-edit/post-edit.component';


export function markedOptionsFactory(anchorService: AnchorService): MarkedOptions {
  const renderer = new MarkedRenderer();

  // fix `href` for absolute link with fragments so that _copy-paste_ urls are correct
  renderer.link = (href: string, title: string, text: string) => {
    return MarkedRenderer.prototype.link.call(renderer, anchorService.normalizeExternalUrl(href), title, text) as string;
  };

  return { renderer };
}

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    AddTagComponent,
    TagListComponent,
    AddCategoryComponent,
    CategoryListComponent,
    PostEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReuseComponentModule,
    BlogManagementRoutingModule,
    ComponentsModule,
    // third party
    // AngClapModule,
    // DocuModule,
    // DocuEditorModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
  ]
})
export class BlogManagementModule { }
