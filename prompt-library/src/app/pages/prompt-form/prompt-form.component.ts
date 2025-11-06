import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PromptService } from '../../core/prompt.service';

@Component({
  selector: 'app-prompt-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ promptId ? 'Editar' : 'Novo' }} Prompt</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="promptForm" (ngSubmit)="onSubmit()" class="form">
            <mat-form-field appearance="fill">
              <mat-label>Título</mat-label>
              <input matInput formControlName="titulo" placeholder="Digite o título do prompt">
              @if (promptForm.get('titulo')?.errors?.['required'] && promptForm.get('titulo')?.touched) {
                <mat-error>Título é obrigatório</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Categoria</mat-label>
              <mat-select formControlName="categoria">
                <mat-option value="texto">Texto</mat-option>
                <mat-option value="imagem">Imagem</mat-option>
                <mat-option value="código">Código</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Texto do Prompt</mat-label>
              <textarea matInput formControlName="textoPrompt" rows="5" 
                        placeholder="Digite seu prompt aqui"></textarea>
              @if (promptForm.get('textoPrompt')?.errors?.['required'] && promptForm.get('textoPrompt')?.touched) {
                <mat-error>Texto do prompt é obrigatório</mat-error>
              }
            </mat-form-field>
          </form>
        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-button routerLink="/">Cancelar</button>
          <button mat-raised-button color="primary" 
                  (click)="onSubmit()" 
                  [disabled]="promptForm.invalid">
            {{ promptId ? 'Atualizar' : 'Salvar' }}
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    mat-form-field {
      width: 100%;
    }

    mat-card-actions {
      padding: 1rem;
      gap: 0.5rem;
    }
  `]
})
export class PromptFormComponent implements OnInit {
  public promptForm: FormGroup;
  public promptId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.promptForm = this.fb.group({
      titulo: ['', Validators.required],
      categoria: [''],
      textoPrompt: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.promptId = this.route.snapshot.paramMap.get('id');
    if (this.promptId) {
      const prompt = this.promptService.getPromptById(this.promptId);
      if (prompt) {
        this.promptForm.patchValue({
          titulo: prompt.titulo,
          categoria: prompt.categoria,
          textoPrompt: prompt.textoPrompt
        });
      }
    }
  }

  public onSubmit(): void {
    if (this.promptForm.invalid) {
      return;
    }
    
    if (this.promptId) {
      this.promptService.updatePrompt(this.promptId, this.promptForm.value);
    } else {
      this.promptService.addPrompt(this.promptForm.value);
    }
    
    this.router.navigate(['/']);
  }
}