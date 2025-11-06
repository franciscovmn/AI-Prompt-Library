import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from './shared/components/loading.component';
import { ErrorHandlerComponent } from './shared/components/error-handler.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    LoadingComponent,
    ErrorHandlerComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <span>AI Prompt Library</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/">Início</button>
      <button mat-button routerLink="/novo">Novo Prompt</button>
    </mat-toolbar>

    <app-loading />
    <app-error-handler />
    
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    main {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}