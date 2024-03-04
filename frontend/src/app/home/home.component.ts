import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  todos: any[] = [];
  selectedTodo: any = {};
  updatedDescription: string = '';

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute){

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.updatedDescription = params['updatedDescription']
    });
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    })
  }

  getTodoById(todoId: string): void {
    this.todoService.getById(todoId).subscribe((data) => {
      this.selectedTodo = data;
    })
  }

  addTodo(): void {
    let newTodo = (<HTMLInputElement>document.getElementById('newTodo')).value;
    const formData = new FormData();
    formData.append('description', newTodo);
    this.todoService.addTodo(formData).subscribe((response) => {
      console.log('Todo created successfully:', response);
      this.getTodos();
    })
  }

  goToUpdateTodo(todoId: string): void {
    this.router.navigate(['/UpdateTodos', todoId])
  }
  

  deleteTodo(todoId: string): void {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      console.log('Item deleted succcessfully');
      this.getTodos();
    })
  }
}
