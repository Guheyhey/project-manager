import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一： 买咖啡',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: 'Guheyhey',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务2： PPT',
          completed: true,
          priority: 2,
          owner: {
            id: 2,
            name: 'AL',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 3,
          desc: '任务3： maimaimai',
          completed: true,
          priority: 1,
          owner: {
            id: 3,
            name: 'Mercy',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务一： 买咖啡',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'Guheyhey',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务2： PPT',
          completed: true,
          priority: 1,
          owner: {
            id: 2,
            name: 'AL',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },
        {
          id: 3,
          desc: '任务3： maimaimai',
          completed: true,
          priority: 2,
          owner: {
            id: 3,
            name: 'Mercy',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        }
      ]
    },
    {
      id: 3,
      name: '已完成',
      tasks: [
        {
          id: 1,
          desc: '任务1： 买咖啡,666666666666666666666666666666',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: 'Guheyhey',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务2： PPT',
          completed: false,
          priority: 3,
          owner: {
            id: 2,
            name: 'AL',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },
        {
          id: 3,
          desc: '任务3： maimaimai',
          completed: true,
          priority: 3,
          owner: {
            id: 3,
            name: 'Mercy',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        }
      ]
    }
  ]

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

}
