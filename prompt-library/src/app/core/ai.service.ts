import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${environment.apiUrl}/generate-image`, { prompt });
  }

  generateText(prompt: string): Observable<{ texto: string }> {
    return this.http.post<{ texto: string }>(`${environment.apiUrl}/generate-text`, { prompt });
  }
}