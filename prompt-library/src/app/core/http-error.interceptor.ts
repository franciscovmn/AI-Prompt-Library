import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { UiStateService } from '../core/ui-state.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private uiState: UiStateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.uiState.setLoading(true);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro inesperado';
        
        if (error.error instanceof ErrorEvent) {
          // Erro do cliente
          errorMessage = error.error.message;
        } else {
          // Erro do servidor
          switch (error.status) {
            case 400:
              errorMessage = 'Requisição inválida';
              break;
            case 401:
              errorMessage = 'Não autorizado';
              break;
            case 403:
              errorMessage = 'Acesso negado';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado';
              break;
            case 500:
              errorMessage = 'Erro interno do servidor';
              break;
          }
        }

        this.uiState.showError(errorMessage);
        return throwError(() => error);
      }),
      finalize(() => {
        this.uiState.setLoading(false);
      })
    );
  }
}