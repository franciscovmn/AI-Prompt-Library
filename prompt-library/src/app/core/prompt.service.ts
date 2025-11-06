import { Injectable, signal } from '@angular/core';
import { Prompt, PromptUpdate } from '../models/prompt';

@Injectable({ providedIn: 'root' })
export class PromptService {
  public prompts = signal<Prompt[]>([]);

  constructor() {
    const raw = localStorage.getItem('meus-prompts');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Prompt[];
        this.prompts.set(parsed);
      } catch {
        // se o JSON estiver inválido, mantém o array vazio
      }
    }
  }

  private salvarNoLocalStorage() {
    localStorage.setItem('meus-prompts', JSON.stringify(this.prompts()));
  }

  public addPrompt(novoPrompt: PromptUpdate) {
    const id = crypto.randomUUID();
    const agora = new Date();
    const prompt: Prompt = {
      id,
      ...novoPrompt,
      dataCriacao: agora,
      ultimaModificacao: agora
    };
    this.prompts.update(prev => [...prev, prompt]);
    this.salvarNoLocalStorage();
  }

  public getPromptById(id: string): Prompt | undefined {
    return this.prompts().find(p => p.id === id);
  }

  public updatePrompt(id: string, promptData: PromptUpdate) {
    this.prompts.update(prompts => 
      prompts.map(p => {
        if (p.id === id) {
          const originalDates = {
            dataCriacao: p.dataCriacao,
            ultimaModificacao: new Date()
          };
          return { ...promptData, ...originalDates, id };
        }
        return p;
      })
    );
    this.salvarNoLocalStorage();
  }

  public deletePrompt(id: string) {
    this.prompts.update(prompts => prompts.filter(p => p.id !== id));
    this.salvarNoLocalStorage();
  }
}