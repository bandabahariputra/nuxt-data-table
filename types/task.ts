export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export enum TaskLabel {
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  ENHANCEMENT = 'ENHANCEMENT',
  DOCUMENTATION = 'DOCUMENTATION',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export type Task = {
  code: string;
  title: string | null;
  status: TaskStatus | null;
  label: TaskLabel | null;
  priority: TaskPriority | null;
};
