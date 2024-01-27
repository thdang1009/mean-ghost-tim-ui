import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GuestNavbarComponent } from './guest-navbar/guest-navbar.component';
import { GuestSidebarComponent } from './guest-sidebar/guest-sidebar.component';
import { FormsModule } from '@angular/forms';
import { ProgressWithLabelComponent } from './progress-with-label/progress-with-label.component';
import { GhostSiteBtnComponent } from './ghost-site-btn/ghost-site-btn.component';
import { ListBadgeComponent } from './list-badge/list-badge.component';
import { GhostPdfViewerComponent } from './ghost-pdf-viewer/ghost-pdf-viewer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// third party
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfControlPanelComponent } from './pdf-control-panel/pdf-control-panel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PdfViewerModule,
    DragDropModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GuestNavbarComponent,
    GuestSidebarComponent,
    ProgressWithLabelComponent,
    GhostSiteBtnComponent,
    ListBadgeComponent,
    GhostPdfViewerComponent,
    PdfControlPanelComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GuestNavbarComponent,
    GuestSidebarComponent,
    ProgressWithLabelComponent,
    GhostSiteBtnComponent,
    ListBadgeComponent,
    GhostPdfViewerComponent,
    PdfControlPanelComponent,
  ],
  providers: [
  ]
})
export class ComponentsModule { }
