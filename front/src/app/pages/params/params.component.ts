import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-params',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './params.component.html',
    styleUrl: './params.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParamsComponent { }
