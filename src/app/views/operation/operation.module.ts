import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { SharedModule } from '@shares/shared-module.module';
import { ComponentsModule } from '@app/components/components.module';
import { TodoLabelListComponent } from './todo-label/todo-label-list/todo-label-list.component';
import { AddTodoLabelComponent } from './todo-label/add-todo-label/add-todo-label.component';



@NgModule({
  declarations: [
    TodoLabelListComponent,
    AddTodoLabelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OperationRoutingModule,
    ComponentsModule,
  ]
})
export class OperationModule { }
