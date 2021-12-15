import { Component, OnInit } from '@angular/core';
import { TodoTodayService } from '@app/_services/todo-today.service';
import { TodoToday } from '../../_models/todo-today';

@Component({
  selector: 'app-todo-today',
  templateUrl: './todo-today.component.html',
  styleUrls: ['./todo-today.component.scss']
})
export class TodoTodayComponent implements OnInit {

  data: TodoToday[] = [];
  isLoadingResults = true;
  constructor(private todoTodayService: TodoTodayService) { }

  ngOnInit() {
    /*
      date: { type: Date, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      content: String, // json string
      status: String
    */
    const temp: TodoToday = {
      content: '{"rows":[{"name":"123","status":2},{"name":"c123de","status":3}]}',
    }
    this.todoTodayService.addTodoToday(temp)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    // this.todoTodayService.getMyTodoToday()
    //   .subscribe((res: any) => {
    //     this.data = res;
    //     console.log(this.data);
    //     this.isLoadingResults = false;
    //   }, err => {
    //     console.log(err);
    //     this.isLoadingResults = false;
    //   });
  }

}
