import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GhostManagementRoutingModule } from './ghost-management-routing.module';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';
import { SharedModule } from '@shares/shared-module.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReuseComponentModule } from '@app/_reuse/reuse.module';

// angular rich text editor
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GuestMessageComponent } from './guest-message/guest-message.component';
@NgModule({
  declarations: [
    NoteComponent,
    TodoTodayComponent,
    GuestMessageComponent
  ],
  imports: [
    CommonModule,
    GhostManagementRoutingModule,
    SharedModule,
    DragDropModule,
    HttpClientModule,
    AngularEditorModule,
    ReuseComponentModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class GhostManagementModule { }
