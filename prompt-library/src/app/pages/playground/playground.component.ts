import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AIService } from '../../core/ai.service';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="container">
      <mat-card class="playground-card">
        <mat-card-header>
          <mat-card-title>Playground AI</mat-card-title>
          <mat-card-subtitle>Teste seus prompts em tempo real</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="input-area">
            <mat-form-field appearance="fill">
              <mat-label>Tipo de Geração</mat-label>
              <mat-select [(ngModel)]="tipoGeracao">
                <mat-option value="texto">Texto</mat-option>
                <mat-option value="imagem">Imagem</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Seu Prompt</mat-label>
              <textarea matInput
                        [(ngModel)]="promptText"
                        rows="4"
                        placeholder="Digite seu prompt aqui..."></textarea>
            </mat-form-field>

            <button mat-raised-button
                    color="primary"
                    [disabled]="!promptText"
                    (click)="gerarResultado()">
              <mat-icon>auto_awesome</mat-icon>
              Gerar
            </button>
          </div>

          @if (resultado) {
            <div class="resultado">
              @if (tipoGeracao === 'imagem') {
                <img [src]="resultado" alt="Imagem gerada">
              } @else {
                <p class="texto-gerado">{{ resultado }}</p>
              }
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .playground-card {
      margin-bottom: 2rem;
    }

    .input-area {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    .resultado {
      margin-top: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .resultado img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .texto-gerado {
      white-space: pre-wrap;
      font-family: monospace;
      padding: 1rem;
      background: #2b2b2b;
      color: #fff;
      border-radius: 4px;
    }

    button {
      align-self: flex-end;
    }
  `]
})
export class PlaygroundComponent {
  tipoGeracao = 'texto';
  promptText = '';
  resultado: string | null = null;

  constructor(
    private aiService: AIService
  ) {}

  gerarResultado() {
    if (this.tipoGeracao === 'imagem') {
      this.aiService.generateImage(this.promptText).subscribe({
        next: (response) => {
          this.resultado = response.url;
        }
      });
    } else {
      this.aiService.generateText(this.promptText).subscribe({
        next: (response) => {
          this.resultado = response.texto;
        }
      });
    }
  }
}