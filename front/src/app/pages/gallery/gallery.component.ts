import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent { }
