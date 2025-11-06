import { Injectable, signal } from '@angular/core';
import { Prompt } from '../../models/prompt';

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

  public addPrompt(novoPrompt: Omit<Prompt, 'id'>) {
    const id = crypto.randomUUID();
    const prompt: Prompt = { id, ...novoPrompt };
    this.prompts.update(prev => [...prev, prompt]);
    this.salvarNoLocalStorage();
  }

  public getPromptById(id: string): Prompt | undefined {
    return this.prompts().find(p => p.id === id);
  }
}