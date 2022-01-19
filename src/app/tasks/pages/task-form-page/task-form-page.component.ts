import { ITask } from './../../models/itask';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    title: [''],
    description: [''],
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
    private snackbar: SnackBarService
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
      error: () => alert('Erro ao buscar uma tarefa')
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
    this.taskRepository.create(task).subscribe(escreve => {
      this.snackbar.addSuccess('Tarefa Criada com Sucesso');
    });
  }

  update(task: ITask): void {
    this.taskRepository.update(task).subscribe(rescreve => {
      this.snackbar.addInfo('Tarefa Atualizada com Sucesso')
    });
  }
}




