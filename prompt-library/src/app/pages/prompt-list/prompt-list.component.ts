import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { PromptService } from '../../core/prompt.service';
import { AIService } from '../../core/ai.service';
import { Prompt, PromptUpdate } from '../../models/prompt';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="container">
      <header class="header">
        <h1>Minha Biblioteca de Prompts</h1>
        <button mat-raised-button color="primary" [routerLink]="['/novo']">
          <mat-icon>add</mat-icon>
          Novo Prompt
        </button>
      </header>

      <div class="grid">
        @for (prompt of meusPrompts(); track prompt.id) {
          <mat-card class="prompt-card">
            <mat-card-header>
              <mat-card-title>{{ prompt.titulo }}</mat-card-title>
              <mat-card-subtitle>
                <mat-chip-set>
                  <mat-chip>{{ prompt.categoria }}</mat-chip>
                  <mat-chip>Criado: {{ prompt.dataCriacao | date:'dd/MM/yy HH:mm' }}</mat-chip>
                  <mat-chip>Modificado: {{ prompt.ultimaModificacao | date:'dd/MM/yy HH:mm' }}</mat-chip>
                </mat-chip-set>
              </mat-card-subtitle>
            </mat-card-header>
            
            <mat-card-content>
              <p>{{ prompt.textoPrompt }}</p>
              @if (prompt.resultado) {
                <div class="resultado">
                  @if (prompt.resultado.tipo === 'imagem') {
                    <img [src]="prompt.resultado.conteudo" alt="Imagem gerada">
                  } @else {
                    <p class="texto-gerado">{{ prompt.resultado.conteudo }}</p>
                  }
                </div>
              }
            </mat-card-content>

            <mat-divider></mat-divider>

            <mat-card-actions>
              <button mat-button color="primary" [routerLink]="['/editar', prompt.id]">
                <mat-icon>edit</mat-icon>
                Editar
              </button>
              <button mat-button color="warn" (click)="excluirPrompt(prompt.id)">
                <mat-icon>delete</mat-icon>
                Excluir
              </button>
              <button mat-button (click)="gerarIA(prompt)">
                <mat-icon>auto_awesome</mat-icon>
                Gerar
              </button>
            </mat-card-actions>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .prompt-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .resultado {
      margin-top: 1rem;
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
    }

    mat-card-actions {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }
  `]
})
export class PromptListComponent {
  private promptService = inject(PromptService);
  private aiService = inject(AIService);
  
  public meusPrompts = this.promptService.prompts;

  excluirPrompt(id: string) {
    if (confirm('Tem certeza que deseja excluir este prompt?')) {
      this.promptService.deletePrompt(id);
    }
  }

  gerarIA(prompt: Prompt) {
    const update: PromptUpdate = {
      titulo: prompt.titulo,
      categoria: prompt.categoria,
      textoPrompt: prompt.textoPrompt
    };
    
    if (prompt.categoria.toLowerCase().includes('imagem')) {
      this.aiService.generateImage(prompt.textoPrompt).subscribe({
        next: (resultado) => {
          this.promptService.updatePrompt(prompt.id, {
            ...update,
            resultado: {
              tipo: 'imagem',
              conteudo: resultado.url
            }
          });
        }
      });
    } else {
      this.aiService.generateText(prompt.textoPrompt).subscribe({
        next: (resultado) => {
          this.promptService.updatePrompt(prompt.id, {
            ...update,
            resultado: {
              tipo: 'texto',
              conteudo: resultado.texto
            }
          });
        }
      });
    }
  }
}