import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [],
    imports: [

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
        MatTabsModule,
        MatChipsModule
    ],
    exports: [
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
        MatTabsModule,
        MatChipsModule]
})
export class AngularMaterialModule { }