import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GhostManagementRoutingModule } from './ghost-management-routing.module';
import { MoneyComponent } from './money/money.component';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';
import { FoodComponent } from './food/food.component';
import { SharedModuleModule } from '@shares/shared-module.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReuseComponentModule } from '@app/_reuse/reuse.module';

// angular rich text editor
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [
    MoneyComponent,
    NoteComponent,
    TodoTodayComponent,
    FoodComponent
  ],
  imports: [
    CommonModule,
    GhostManagementRoutingModule,
    SharedModuleModule,
    DragDropModule,
    HttpClientModule,
    AngularEditorModule,
    ReuseComponentModule
  ],
  providers: [
    DatePipe,
  ]
})
export class GhostManagementModule { }
