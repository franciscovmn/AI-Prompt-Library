import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiApiService {
  constructor(private http: HttpClient) {}

  public gerarResposta(textoDoPrompt: string): Observable<any> {
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDox-ItWF2w_dhkTPPDj5WYJw2SW7Gj31c';
    const body = {
      contents: [
        {
          parts: [
            { text: textoDoPrompt }
          ]
        }
      ]
    };
    return this.http.post(API_URL, body);
  }
}