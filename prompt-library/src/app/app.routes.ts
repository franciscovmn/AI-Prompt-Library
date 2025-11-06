import { Routes } from '@angular/router';
import { PromptListComponent } from './pages/prompt-list/prompt-list.component';
import { PromptFormComponent } from './pages/prompt-form/prompt-form.component';
import { PlaygroundComponent } from './pages/playground/playground.component';

export const routes: Routes = [
  { path: '', component: PromptListComponent }, // Home
  { path: 'novo-prompt', component: PromptFormComponent },
  { path: 'editar/:id', component: PromptFormComponent }, // Reusando o form
  { path: 'playground/:id', component: PlaygroundComponent },
  { path: '**', redirectTo: '' } // Rota coringa
];