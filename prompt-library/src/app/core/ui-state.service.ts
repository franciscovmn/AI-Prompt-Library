import { Injectable, signal } from '@angular/core';

export interface AppError {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  private readonly loadingState = signal<boolean>(false);
  private readonly errorState = signal<AppError | null>(null);

  public loading = this.loadingState.asReadonly();
  public error = this.errorState.asReadonly();

  setLoading(isLoading: boolean) {
    this.loadingState.set(isLoading);
  }

  setError(error: AppError | null) {
    this.errorState.set(error);
  }

  showError(message: string, type: 'error' | 'warning' | 'info' = 'error') {
    this.setError({
      message,
      type,
      timestamp: new Date()
    });

    // Auto-clear errors after 5 seconds
    setTimeout(() => {
      this.setError(null);
    }, 5000);
  }
}