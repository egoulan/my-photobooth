import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { DomSanitizer } from '@angular/platform-browser';
import { first, switchMap } from 'rxjs';
import { CameraService } from '../../camera/services/camera.service';
import { VideoStreamComponent } from '../../components/video-stream/video-stream.component';
import { initialCounter } from '../../data/constants';
import { Photo } from '../../data/models/photo.model';

@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    VideoStreamComponent,
  ],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptureComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cameraService = inject(CameraService);

  photo1?: Signal<Photo>;
  photo2?: Signal<Photo>;

  photoQuantity: 'one' | 'two' = 'one';
  count = signal(initialCounter);
  displayCount = false;

  startCount() {
    this.displayCount = true;
    const countdownInterval = setInterval(() => {
      this.count.update((count) => count - 1);
      if (this.count() === 0) {
        clearInterval(countdownInterval);
        this.displayCount = false;
        this.count.set(initialCounter);
      }
    }, 1000);
  }

  takePhoto(isSecond?: true) {
    const repeat = this.photoQuantity === 'one' ? 1 : 2;
    console.log('aaa');
    this.startCount();

    if (isSecond) {
      this.photo2 = undefined;
    } else {
      this.photo1 = undefined;
    }

    setTimeout(() => {
      this.cameraService
        .capturePhoto()
        .pipe(
          first(),
          switchMap((response: any) =>
            this.cameraService.fetchPhoto(response.filename)
          )
        )
        .subscribe(
          (photoData: any) => {
            if (photoData && photoData.image) {
              const imageUrl = 'data:image/jpeg;base64,' + photoData.image;
              if (isSecond) {
                this.photo2 = signal({
                  urlData: this.sanitizer.bypassSecurityTrustUrl(imageUrl),
                });
              } else {
                this.photo1 = signal({
                  urlData: this.sanitizer.bypassSecurityTrustUrl(imageUrl),
                });
                if (this.photoQuantity === 'two') {
                  this.takePhoto(true);
                }
              }
            } else {
              alert('Photo not found or invalid response');
            }
          },
          (error) => alert(error.message)
        );
    }, 3000);
  }

  printPhoto() {
    // if (this.photoFilename) {
    //   this.cameraService
    //     .printPhoto(this.photoFilename)
    //     .subscribe((response) => {
    //       alert(response.message);
    //     });
    // }
  }

  // private convertBlobToDataURL(blob: Blob) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   reader.onloadend = () => {
  //     this.photoUrl = reader.result as string;
  //   };
  // }
}
