import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/itask';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TaskRepository {
  constructor(private httpClient: HttpClient) {}

  create(task: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(`${environment.api}/tasks`, task);
  }

  update(entity: ITask): Observable<ITask> {
    const { id, ...data } = entity;
    return this.httpClient.put<ITask>(`${environment.api}/tasks/${id}`, data);
  }

  getById(id: string): Observable<ITask> {
    return this.httpClient.get<ITask>(`${environment.api}/tasks/${id}`);
  }

  getAll(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(`${environment.api}/tasks/`);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.api}/tasks/${id}`);
  }
}
