import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Importar FormsModule
import { RouterModule, ActivatedRoute } from '@angular/router'; // 2. Importar RouterModule
import { PromptService } from '../../core/prompt.service';
import { AiApiService } from '../../core/ai-api.service';
import { Prompt } from '../../../models/prompt';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  standalone: true,
  imports: [
    FormsModule, // 3. Adicionar FormsModule
    RouterModule // 4. Adicionar RouterModule para o routerLink
  ] 
})
export class PlaygroundComponent implements OnInit {
  public respostaIA = signal<string>('');
  public estaCarregando = signal<boolean>(false);
  public promptCarregado?: Prompt;
  public textoParaTestar: string = ''; // Novo: para o textarea

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private aiApiService: AiApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.promptCarregado = this.promptService.getPromptById(id);
      if (this.promptCarregado) {
        this.textoParaTestar = this.promptCarregado.textoPrompt; // Popula o textarea
      }
    }
  }

  public executarTeste(): void {
    if (!this.textoParaTestar) return;

    this.estaCarregando.set(true);
    this.respostaIA.set('');

    this.aiApiService.gerarResposta(this.textoParaTestar).subscribe({
      next: (resposta: any) => {
        // A API do Google mudou o formato. Acessamos a resposta assim:
        const texto = resposta.candidates[0].content.parts[0].text;
        this.respostaIA.set(texto);
      },
      error: (err) => {
        console.error(err);
        this.respostaIA.set('Ocorreu um erro ao chamar o servidor proxy.');
      },
      complete: () => {
        this.estaCarregando.set(false);
      }
    });
  }
}