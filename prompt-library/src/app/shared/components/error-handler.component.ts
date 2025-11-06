import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UiStateService } from '../../core/ui-state.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  template: '',
})
export class ErrorHandlerComponent {
  private snackBar = inject(MatSnackBar);
  private uiState = inject(UiStateService);

  constructor() {
    // Observa mudanças no estado de erro
    effect(() => {
      const error = this.uiState.error();
      if (error) {
        const panelClass = {
          error: ['error-snackbar'],
          warning: ['warning-snackbar'],
          info: ['info-snackbar'],
        }[error.type];

        this.snackBar.open(error.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass,
        });
      }
    });
  }
}