import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  taskForm: FormGroup;
  isEditMode = false;
  isNewTask = false;
  taskStatuses = Object.values(TaskStatus);
  loading = true;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: [TaskStatus.NEW, Validators.required],
      owner: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      
      if (taskId === 'new') {
        this.isNewTask = true;
        this.isEditMode = true;
        this.loading = false;
      } else {
        this.loadTask(taskId);
      }
    });
  }

  loadTask(taskId: string): void {
    const task = this.taskService.getTaskById(taskId);
    if (task) {
      this.task = task;
      this.taskForm.patchValue({
        name: task.name,
        description: task.description,
        status: task.status,
        owner: task.owner
      });
    } else {
      // Task not found, redirect to list
      this.router.navigate(['/']);
    }
    this.loading = false;
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && this.task) {
      this.taskForm.patchValue({
        name: this.task.name,
        description: this.task.description,
        status: this.task.status,
        owner: this.task.owner
      });
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      if (this.isNewTask) {
        this.taskService.addTask(formValue);
        this.router.navigate(['/']);
      } else if (this.task) {
        this.taskService.updateTask(this.task.id, formValue);
        this.task = { ...this.task, ...formValue };
        this.isEditMode = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  cancelEdit(): void {
    if (this.isNewTask) {
      this.router.navigate(['/']);
    } else {
      this.isEditMode = false;
      if (this.task) {
        this.taskForm.patchValue({
          name: this.task.name,
          description: this.task.description,
          status: this.task.status,
          owner: this.task.owner
        });
      }
    }
  }

  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id);
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.taskForm.controls).forEach(key => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.NEW:
        return 'status-new';
      case TaskStatus.IN_PROGRESS:
        return 'status-progress';
      case TaskStatus.DONE:
        return 'status-done';
      default:
        return '';
    }
  }

  getStatusIcon(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.NEW:
        return '📋';
      case TaskStatus.IN_PROGRESS:
        return '🔄';
      case TaskStatus.DONE:
        return '✅';
      default:
        return '📋';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}

