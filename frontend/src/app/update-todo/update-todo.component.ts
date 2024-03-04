import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit{
  todoId: string = '';
  todoDescription: string = '';

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoId = params['id'];
      this.getTodoDetails(this.todoId);
    })
  }

  getTodoDetails(todoId: string): void {
    this.todoService.getById(todoId).subscribe((data) => {
      this.todoDescription = data.description;
    })
  }

  updateTheTodo(): void {
    const updatedTodo = this.todoDescription;
    this.todoService.updateTodo(this.todoId, { description: updatedTodo }).subscribe((response) => {
      console.log('Todo updated successfully:', response);
    })

    this.navigateBack();
  }

  navigateBack(): void {
    this.router.navigate(['/home'])
  }
}
