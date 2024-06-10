import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private apiUrl = 'http://0.0.0.0:5000';

  constructor(private http: HttpClient) {}

  capturePhoto(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/capture`);
  }

  fetchPhoto(filename: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/photos/${filename}`);
  }

  printPhoto(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/print/${filename}`);
  }
}
