import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: '1',
      name: 'Design User Interface',
      description: 'Create wireframes and mockups for the new dashboard',
      status: TaskStatus.IN_PROGRESS,
      owner: 'Alice Johnson',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      name: 'Implement Authentication',
      description: 'Set up user login and registration system',
      status: TaskStatus.DONE,
      owner: 'Bob Smith',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      name: 'Database Schema Design',
      description: 'Design and implement the database structure',
      status: TaskStatus.NEW,
      owner: 'Carol Davis',
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    },
    {
      id: '4',
      name: 'API Development',
      description: 'Create RESTful APIs for task management',
      status: TaskStatus.IN_PROGRESS,
      owner: 'David Wilson',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-19')
    },
    {
      id: '5',
      name: 'Unit Testing',
      description: 'Write comprehensive unit tests for all components',
      status: TaskStatus.NEW,
      owner: 'Eva Brown',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: '6',
      name: 'Performance Optimization',
      description: 'Optimize application performance and loading times',
      status: TaskStatus.IN_PROGRESS,
      owner: 'Frank Miller',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-21')
    },
    {
      id: '7',
      name: 'Documentation',
      description: 'Create comprehensive documentation for the project',
      status: TaskStatus.DONE,
      owner: 'Grace Lee',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: '8',
      name: 'Security Audit',
      description: 'Conduct security review and implement fixes',
      status: TaskStatus.NEW,
      owner: 'Henry Taylor',
      createdAt: new Date('2024-01-26'),
      updatedAt: new Date('2024-01-26')
    },
    {
      id: '9',
      name: 'Mobile Responsiveness',
      description: 'Ensure the application works well on mobile devices',
      status: TaskStatus.IN_PROGRESS,
      owner: 'Iris Garcia',
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-23')
    },
    {
      id: '10',
      name: 'Deployment Setup',
      description: 'Set up CI/CD pipeline and deployment environment',
      status: TaskStatus.NEW,
      owner: 'Jack Anderson',
      createdAt: new Date('2024-01-27'),
      updatedAt: new Date('2024-01-27')
    }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        ...updates,
        updatedAt: new Date()
      };
      this.tasksSubject.next([...this.tasks]);
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  filterByOwner(owner: string): Task[] {
    if (!owner || owner.trim() === '') {
      return this.tasks;
    }
    return this.tasks.filter(task => 
      task.owner.toLowerCase().includes(owner.toLowerCase())
    );
  }

  getUniqueOwners(): string[] {
    return [...new Set(this.tasks.map(task => task.owner))];
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
} 