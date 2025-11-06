export interface ResultadoPrompt {
  tipo: 'texto' | 'imagem';
  conteudo: string;
}

export interface PromptUpdate {
  titulo: string;
  categoria: string;
  textoPrompt: string;
  resultado?: ResultadoPrompt;
}

export interface Prompt extends PromptUpdate {
  id: string;
  dataCriacao: Date;
  ultimaModificacao: Date;
}