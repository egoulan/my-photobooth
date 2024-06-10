import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-video-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-stream.component.html',
  styleUrl: './video-stream.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoStreamComponent {
  videoUrl = 'http://your-raspberry-pi-ip:5000/video_feed';
}
