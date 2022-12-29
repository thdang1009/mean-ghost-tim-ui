import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReuseComponentModule } from '@app/_reuse/reuse.module';
import { FileManagementRoutingModule } from './file-management-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { ChooseFileComponent } from './file/choose-file/choose-file.component';
import { AddFileComponent } from './file/add-file/add-file.component';
import { FileListComponent } from './file/file-list/file-list.component';
import { BookComponent } from './book/book.component';
import { SharedModule } from '@app/_shares/shared-module.module';
import { ViewBookComponent } from './view-book/view-book.component';
import { ComponentsModule } from '@app/components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        BookComponent,
        AddFileComponent,
        FileListComponent,
        ChooseFileComponent,
        ViewBookComponent,
    ],
    providers: [
        DatePipe,
    ],
    imports: [
        CommonModule,
        FileManagementRoutingModule,
        FileUploadModule,
        DragDropModule,
        SharedModule,
        HttpClientModule,
        ReuseComponentModule,
        ComponentsModule
    ]
})
export class FileManagementModule { }
