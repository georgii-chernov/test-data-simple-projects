export enum TaskStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE'
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
} 