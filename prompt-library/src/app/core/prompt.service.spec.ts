import { TestBed } from '@angular/core/testing';
import { PromptService } from './prompt.service';
import { Prompt } from '../../models/prompt';

describe('PromptService', () => {
  let service: PromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new prompt', () => {
    const newPrompt = {
      titulo: 'Test Prompt',
      categoria: 'texto',
      textoPrompt: 'Test text'
    };

    service.addPrompt(newPrompt);
    const prompts = service.prompts();
    
    expect(prompts.length).toBe(1);
    expect(prompts[0].titulo).toBe(newPrompt.titulo);
    expect(prompts[0].id).toBeDefined();
  });

  it('should update an existing prompt', () => {
    // Primeiro, adiciona um prompt
    const newPrompt = {
      titulo: 'Test Prompt',
      categoria: 'texto',
      textoPrompt: 'Test text'
    };
    service.addPrompt(newPrompt);
    const promptId = service.prompts()[0].id;

    // Atualiza o prompt
    const updatedData = {
      titulo: 'Updated Title',
      categoria: 'imagem',
      textoPrompt: 'Updated text'
    };
    service.updatePrompt(promptId, updatedData);

    const updatedPrompt = service.getPromptById(promptId);
    expect(updatedPrompt?.titulo).toBe(updatedData.titulo);
    expect(updatedPrompt?.categoria).toBe(updatedData.categoria);
  });

  it('should delete a prompt', () => {
    // Adiciona um prompt
    const newPrompt = {
      titulo: 'Test Prompt',
      categoria: 'texto',
      textoPrompt: 'Test text'
    };
    service.addPrompt(newPrompt);
    const promptId = service.prompts()[0].id;

    // Deleta o prompt
    service.deletePrompt(promptId);
    expect(service.prompts().length).toBe(0);
  });

  it('should persist prompts in localStorage', () => {
    const newPrompt = {
      titulo: 'Test Prompt',
      categoria: 'texto',
      textoPrompt: 'Test text'
    };
    service.addPrompt(newPrompt);

    // Recria o serviço para simular um refresh da página
    service = TestBed.inject(PromptService);
    expect(service.prompts().length).toBe(1);
  });
});