// Project types
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'paused' | 'archived';
  startDate: string;
  endDate?: string;
  progress: number; // 0-100
  priority: 'low' | 'medium' | 'high' | 'critical';
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

// Participant types
export interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'lead' | 'member' | 'viewer';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Project-Participant junction
export interface ProjectParticipant {
  id: string;
  projectId: string;
  participantId: string;
  role: 'admin' | 'lead' | 'member' | 'viewer';
  joinedAt: string;
  project?: Project;
  participant?: Participant;
}

// Task types
export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
}

// Metric types
export interface Metric {
  id: string;
  projectId: string;
  name: string;
  value: number;
  unit: string;
  type: 'deep_work_hours' | 'learning_hours' | 'tasks_completed' | 'custom';
  recordedAt: string;
  createdAt: string;
}

// Custom Field types
export interface CustomField {
  id: string;
  projectId: string;
  name: string;
  fieldType: 'text' | 'number' | 'select' | 'date' | 'boolean';
  options?: string[];
  isRequired: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Custom Field Value
export interface CustomFieldValue {
  id: string;
  customFieldId: string;
  projectId: string;
  value: string | number | boolean;
  createdAt: string;
  updatedAt: string;
}

// Event types
export interface Event {
  id: string;
  projectId: string;
  type: 'milestone' | 'deployment' | 'review' | 'meeting' | 'other';
  title: string;
  description?: string;
  date: string;
  createdAt: string;
  createdBy: string;
}

// Project Relation types (dependencies graph)
export interface ProjectRelation {
  id: string;
  sourceProjectId: string;
  targetProjectId: string;
  relationType: 'depends_on' | 'blocks' | 'related_to' | 'is_subtask_of';
  createdAt: string;
  sourceProject?: Project;
  targetProject?: Project;
}

// Dashboard stats
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  deepWorkHours: number;
  learningHours: number;
  activeParticipants: number;
}

// Today's focus
export interface TodaysFocus {
  topTasks: Task[];
  learningItems: any[];
  healthItems: any[];
}
