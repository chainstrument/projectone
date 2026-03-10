import React from 'react';
import { Project, Task, DashboardStats } from '@/types';
import { Card, ProgressBar, Badge } from './UI';
import { useStealthMode } from '@/hooks/useStealthMode';

interface ProjectCardProps {
  project: Project;
  tasksCount?: number;
  completedCount?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  tasksCount = 0,
  completedCount = 0,
  onEdit,
  onDelete,
}) => {
  const stealthMode = useStealthMode();

  const statusColors = {
    active: 'success',
    completed: 'accent',
    paused: 'warning',
    archived: 'secondary',
  };

  const priorityEmojis = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
    critical: '⚫',
  };

  return (
    <Card className="hover:border-accent transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{project.icon || '📦'}</span>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {stealthMode.hideProjectNames
                  ? `Project ${project.id.slice(0, 4)}`
                  : project.name}
              </h3>
              <Badge variant={statusColors[project.status] as any}>
                {project.status}
              </Badge>
            </div>
          </div>
          {project.description && !stealthMode.hideProjectNames && (
            <p className="text-sm text-gray-400 mt-2">{project.description}</p>
          )}
        </div>
        <span className="text-2xl">{priorityEmojis[project.priority]}</span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-sm font-semibold text-accent">
            {stealthMode.useCodedScores
              ? `${String.fromCharCode(65 + Math.floor(project.progress / 10))}`
              : `${project.progress}%`}
          </span>
        </div>
        <ProgressBar value={project.progress} showLabel={false} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="bg-primary rounded p-2">
          <p className="text-gray-400">Tasks</p>
          <p className="text-white font-semibold">
            {completedCount}/{tasksCount}
          </p>
        </div>
        <div className="bg-primary rounded p-2">
          <p className="text-gray-400">Start</p>
          <p className="text-white font-semibold">
            {new Date(project.startDate).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-700">
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex-1 px-2 py-2 bg-primary hover:bg-secondary rounded text-sm text-accent transition-colors"
          >
            ✏️ Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex-1 px-2 py-2 bg-danger bg-opacity-20 hover:bg-opacity-30 rounded text-sm text-danger transition-colors"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </Card>
  );
};

interface TaskItemProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: Task['status']) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const stealthMode = useStealthMode();

  const statusIcons = {
    todo: '⚪',
    in_progress: '🔵',
    review: '🟡',
    completed: '✅',
  };

  const priorityEmojis = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-primary rounded hover:bg-secondary transition-colors">
      <button
        onClick={() => {
          const nextStatus = {
            todo: 'in_progress' as const,
            in_progress: 'review' as const,
            review: 'completed' as const,
            completed: 'todo' as const,
          };
          onStatusChange?.(nextStatus[task.status]);
        }}
        className="text-2xl hover:scale-110 transition-transform"
      >
        {statusIcons[task.status]}
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">
          {stealthMode.hideTaskNames
            ? `Task ${task.id.slice(0, 4)}`
            : task.title}
        </p>
        {task.dueDate && (
          <p className="text-xs text-gray-400">
            Due: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
          </p>
        )}
      </div>

      <span className="text-lg">{priorityEmojis[task.priority]}</span>

      {task.estimatedHours && (
        <div className="text-xs text-gray-400 bg-primary px-2 py-1 rounded">
          {task.estimatedHours}h
        </div>
      )}

      <div className="flex gap-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-1 text-accent hover:bg-primary rounded transition-colors"
          >
            ✏️
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1 text-danger hover:bg-danger hover:bg-opacity-20 rounded transition-colors"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

interface StatWidgetProps {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  title,
  value,
  icon,
  subtitle,
  trend,
}) => {
  const trendIcon = {
    up: '📈',
    down: '📉',
    neutral: '➡️',
  };

  return (
    <Card className="col-span-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
          <span>{trendIcon[trend]} Trend</span>
        </div>
      )}
    </Card>
  );
};

interface DashboardStatsProps {
  stats: DashboardStats;
}

export const DashboardStatistics: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatWidget
        title="Active Projects"
        value={stats.activeProjects}
        icon="🚀"
        subtitle={`of ${stats.totalProjects} total`}
      />
      <StatWidget
        title="Completed Tasks"
        value={`${stats.completedTasks}/${stats.totalTasks}`}
        icon="✅"
        subtitle={`${Math.round((stats.completedTasks / stats.totalTasks) * 100)}% done`}
      />
      <StatWidget
        title="Deep Work Hours"
        value={stats.deepWorkHours}
        icon="🧠"
        subtitle="This week"
      />
      <StatWidget
        title="Learning Hours"
        value={stats.learningHours}
        icon="📚"
        subtitle="This month"
      />
    </div>
  );
};
