import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgJsonEditorModule } from '@maaxgr/ang-jsoneditor';
import { AutosizeModule } from 'ngx-autosize';
import { ScoreToTierPipe, SimpleTimePipe, TimeAgoPipe } from '@pipes/_index';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    // put all the pipe, directive, component should be shared here
    // pipes
    TimeAgoPipe,
    SimpleTimePipe,
    ScoreToTierPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // third party
    NgJsonEditorModule,
    AutosizeModule,
    // angular material
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    MatSliderModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // third party
    NgJsonEditorModule,
    AutosizeModule,
    // pipes
    TimeAgoPipe,
    SimpleTimePipe,
    ScoreToTierPipe,
    // angular material
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    MatSliderModule,
  ]
})
export class SharedModule { }
