import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PromptService } from '../../core/prompt.service';

@Component({
  selector: 'app-prompt-list',
  templateUrl: './prompt-list.component.html',
  styleUrls: ['./prompt-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PromptListComponent {
  public meusPrompts: any;

  constructor(private promptService: PromptService) {
    this.meusPrompts = this.promptService.prompts;
  }
}