import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task, TaskStatus } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  owners: string[] = [];
  selectedOwner: string = '';
  searchTerm: string = '';

  showDeleteModal: boolean = false;
  taskIdToDelete: string | null = null;

  @ViewChild('deleteModal') deleteModalRef!: ElementRef;
  @ViewChild('firstModalButton') firstModalButtonRef!: ElementRef;
  @ViewChild('lastModalButton') lastModalButtonRef!: ElementRef;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadOwners();
  }

  ngAfterViewInit(): void {
    // No-op: focus trap is handled when modal opens
  }

  confirmDeleteTask(taskId: string): void {
    this.taskIdToDelete = taskId;
    this.showDeleteModal = true;
    setTimeout(() => {
      if (this.firstModalButtonRef) {
        this.firstModalButtonRef.nativeElement.focus();
      }
    }, 0);
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.taskIdToDelete = null;
  }

  onModalKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      const first = this.firstModalButtonRef?.nativeElement;
      const last = this.lastModalButtonRef?.nativeElement;
      if (!first || !last) return;

      if (event.shiftKey) {
        // Shift+Tab
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    } else if (event.key === 'Escape') {
      this.closeDeleteModal();
    }
  }

  confirmDelete(): void {
    if (this.taskIdToDelete) {
      this.taskService.deleteTask(this.taskIdToDelete);
    }
    this.closeDeleteModal();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  loadOwners(): void {
    this.owners = this.taskService.getUniqueOwners();
  }

  applyFilters(): void {
    let filtered = [...this.tasks];

    // Filter by owner
    if (this.selectedOwner) {
      filtered = filtered.filter(task => task.owner === this.selectedOwner);
    }

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.name.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.owner.toLowerCase().includes(term)
      );
    }

    this.filteredTasks = filtered;
  }

  onOwnerFilterChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedOwner = '';
    this.searchTerm = '';
    this.applyFilters();
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/task', taskId]);
  }

  editTask(taskId: string): void {
    this.router.navigate(['/task', taskId, 'edit']);
  }

  // deleteTask is replaced by confirmDeleteTask and confirmDelete

  // deleteTask(taskId: string): void {
  //   if (confirm('Are you sure you want to delete this task?')) {
  //     this.taskService.deleteTask(taskId);
  //   }
  // }

  createNewTask(): void {
    this.router.navigate(['/task/new']);
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
}
