import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UiStateService } from '../../core/ui-state.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    @if (uiState.loading()) {
      <div class="loading-overlay">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
  `]
})
export class LoadingComponent {
  protected uiState = inject(UiStateService);
}