import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly APIUrl='http://localhost:3000/api/todoapp/'

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'GetTodos') 
  }

  getById(id: string): Observable<any>{
    return this.http.get<any>(this.APIUrl+'GetTodos/'+id)
  }

  addTodo(todoData: any): Observable<any>{
    return this.http.post<any>(this.APIUrl+'AddTodos', todoData);
  }

  updateTodo(todoId: string, updatedTodoDescription: any): Observable<any> {
    return this.http.patch<any>(this.APIUrl+'UpdateTodos/'+todoId, updatedTodoDescription)
  }

  deleteTodo(id: string): Observable<any>{
    return this.http.delete<any>(this.APIUrl+'DeleteTodos/'+ id)
  }
}
