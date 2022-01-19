import { ITask } from './../../models/itask';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskRepository } from '../../repositories/task.repository';
import { SnackBarService } from 'src/app/services/snack-bar-service';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss'],
})
export class TaskFormPageComponent implements OnInit {
  pageTitle = 'Nova tarefa';

  // configuração do formulário
  form = this.formBuild.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    done: [false],
  });

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
  get done(): FormControl {
    return this.form.get('done') as FormControl;
  }

  taskId: string | undefined = undefined;

  constructor(
    private formBuild: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private taskRepository: TaskRepository,
    private snackbar: SnackBarService,
    private rota: Router
  ) {}

  ngOnInit(): void {
    const paramId = this.activatedRouter.snapshot.paramMap.get('id');
    if (paramId) {
      this.taskId = paramId;
      this.loadTask();
    }
  }

  loadTask(): void {
    this.taskRepository.getById(this.taskId || '').subscribe({
      next: (response: ITask) => {
        this.pageTitle = 'Editando tarefa';
        this.form.patchValue({
          title: response.title,
          description: response.description,
          done: response.done,
        });
      },
      error: () => alert('Erro ao buscar uma tarefa'),
    });
  }

  onSubmit(): void {
    const taskToSave: ITask = {
      ...this.form.value, // pegando todos os valores do formulário
      id: this.taskId, // atualizando o id caso exista
    };

    if (taskToSave.id) {
      this.update(taskToSave);
    } else {
      this.create(taskToSave);
    }
  }

  create(task: ITask): void {
    if (this.form.valid) {
      this.taskRepository.create(task).subscribe((escreve) => {
        this.snackbar.addSuccess('Tarefa Criada com Sucesso');
        this.rota.navigate(['/']);
      });
    } else {
      this.form.dirty;
      this.form.touched;
      this.snackbar.addError('Necessário preencher os campos');
    }
  }

  update(task: ITask): void {
    if (this.form.valid) {
      this.taskRepository.update(task).subscribe((rescreve) => {
        this.snackbar.addSuccess('Tarefa Atualizada com Sucesso');
        this.rota.navigate(['/']);
      });
    } else {
      this.form.dirty;
      this.form.touched;
      this.snackbar.addError('Necessário preencher os campos');
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
