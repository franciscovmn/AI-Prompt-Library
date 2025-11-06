import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiApiService {
  // O URL do seu backend
  private proxyApiUrl = 'http://localhost:3000/api/generate';

  constructor(private http: HttpClient) {}

  public gerarResposta(textoDoPrompt: string): Observable<any> {
    // O corpo da requisição para o seu backend
    const body = {
      prompt: textoDoPrompt
    };

    // Chama o seu backend, não o Google
    return this.http.post(this.proxyApiUrl, body);
  }
}