import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ScoreToTierPipe, SimpleTimePipe, TimeAgoPipe } from '@pipes/_index';
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
    AutosizeModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // third party
    AutosizeModule,
    // pipes
    TimeAgoPipe,
    SimpleTimePipe,
    ScoreToTierPipe,
    AngularMaterialModule
  ]
})
export class SharedModule { }
