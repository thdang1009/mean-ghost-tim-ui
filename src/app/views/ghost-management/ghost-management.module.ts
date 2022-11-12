import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GhostManagementRoutingModule } from './ghost-management-routing.module';
import { MoneyComponent } from './money/money.component';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';
import { FoodComponent } from './food/food.component';
import { SharedModule } from '@shares/shared-module.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReuseComponentModule } from '@app/_reuse/reuse.module';
import { FileUploadModule } from 'ng2-file-upload';

// angular rich text editor
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BookComponent } from './book/book.component';
import { AddFileComponent } from './file/add-file/add-file.component';
import { FileListComponent } from './file/file-list/file-list.component';
import { ChooseFileComponent } from './file/choose-file/choose-file.component';
@NgModule({
  declarations: [
    MoneyComponent,
    NoteComponent,
    TodoTodayComponent,
    FoodComponent,
    BookComponent,
    AddFileComponent,
    FileListComponent,
    ChooseFileComponent
  ],
  imports: [
    CommonModule,
    ReuseComponentModule,
    GhostManagementRoutingModule,
    SharedModule,
    DragDropModule,
    HttpClientModule,
    AngularEditorModule,
    ReuseComponentModule,
    FileUploadModule
  ],
  providers: [
    DatePipe,
  ]
})
export class GhostManagementModule { }
