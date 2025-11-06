import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PromptService } from '../../core/prompt.service';
import { AiApiService } from '../../core/ai-api.service';
import { Prompt } from '../../../models/prompt';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PlaygroundComponent implements OnInit {
  public respostaIA = signal<string>('');
  public estaCarregando = signal<boolean>(false);
  public promptCarregado?: Prompt;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private aiApiService: AiApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.promptCarregado = this.promptService.getPromptById(id);
    }
  }

  public executarTeste(): void {
    if (!this.promptCarregado) return;

    this.estaCarregando.set(true);

    this.aiApiService.gerarResposta(this.promptCarregado.textoPrompt).subscribe({
      next: (resposta: any) => {
        const texto =
          resposta?.candidates?.[0]?.content?.parts?.[0]?.text ??
          resposta?.output?.[0]?.content?.text ??
          '';
        this.respostaIA.set(texto);
      },
      error: () => {
        this.respostaIA.set('');
      },
      complete: () => {
        this.estaCarregando.set(false);
      }
    });
  }
}