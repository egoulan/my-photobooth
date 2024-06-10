import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CaptureComponent } from './pages/capture/capture.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ParamsComponent } from './pages/params/params.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    CaptureComponent,
    ParamsComponent,
    GalleryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
