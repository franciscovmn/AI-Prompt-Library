import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PromptService } from '../../core/prompt.service';

@Component({
  selector: 'app-prompt-form',
  templateUrl: './prompt-form.component.html',
  styleUrls: ['./prompt-form.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class PromptFormComponent implements OnInit {
  public promptForm: FormGroup;

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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const prompt = this.promptService.getPromptById(id);
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
    this.promptService.addPrompt(this.promptForm.value);
    this.router.navigate(['/']);
  }
}