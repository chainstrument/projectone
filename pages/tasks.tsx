import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, Button, Input, Select, EmptyState, LoadingSkeleton } from '@/components/UI';
import { TaskItem } from '@/components/Dashboard';
import { useProjects } from '@/hooks/useProjects';
import { useStealthMode } from '@/hooks/useStealthMode';
import { Task } from '@/types';

// Mock tasks data
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    projectId: 'proj-1',
    title: 'Design API Schema',
    description: 'Design the REST API schema',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-03-15',
    estimatedHours: 8,
    createdAt: '2026-03-01',
    updatedAt: '2026-03-05',
  },
  {
    id: '2',
    projectId: 'proj-1',
    title: 'Setup Database',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-03-20',
    estimatedHours: 6,
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  },
];

export default function Tasks() {
  const { projects, loading: projectsLoading } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');
  const stealthMode = useStealthMode();
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    estimatedHours: 0,
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) {
      alert('Please select a project');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      projectId: selectedProjectId,
      ...formData,
      estimatedHours: formData.estimatedHours || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      estimatedHours: 0,
    });
    setShowForm(false);
  };

  const projectTasks = selectedProjectId
    ? tasks.filter((t) => t.projectId === selectedProjectId)
    : tasks;

  const filteredTasks =
    filterStatus === 'all'
      ? projectTasks
      : projectTasks.filter((t) => t.status === filterStatus);

  const handleDeleteTask = (id: string) => {
    if (confirm('Delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <Layout title="✅ Tâches">
      <div className="space-y-8">
        {/* Project Filter */}
        <Card>
          <Select
            label="Select Project"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            options={projects.map((p) => ({
              value: p.id,
              label: stealthMode.hideProjectNames
                ? `Project ${p.id.slice(0, 4)}`
                : p.name,
            }))}
          />
        </Card>

        {/* Status Filter & Add Button */}
        {selectedProjectId && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              {['all', 'todo', 'in_progress', 'review', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`
                    px-3 py-2 rounded text-sm font-medium transition-colors
                    ${
                      filterStatus === status
                        ? 'bg-accent text-white'
                        : 'bg-secondary text-gray-400 hover:text-white'
                    }
                  `}
                >
                  {status === 'all'
                    ? 'All'
                    : status === 'in_progress'
                    ? 'In Progress'
                    : status === 'todo'
                    ? 'To Do'
                    : status}
                </button>
              ))}
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? '✖️' : '➕'} Task
            </Button>
          </div>
        )}

        {/* Add Task Form */}
        {showForm && selectedProjectId && (
          <Card title="➕ New Task" className="bg-secondary">
            <form onSubmit={handleAddTask} className="space-y-4">
              <Input
                label="Task Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="What needs to be done?"
                required
              />

              <Input
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Task details..."
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as any,
                    })
                  }
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                  ]}
                />
                <Input
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>

              <Input
                label="Estimated Hours"
                type="number"
                min="0"
                step="0.5"
                value={formData.estimatedHours}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) })
                }
              />

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Task</Button>
              </div>
            </form>
          </Card>
        )}

        {/* Tasks List */}
        {!selectedProjectId ? (
          <EmptyState
            icon="📋"
            title="Select a Project"
            description="Choose a project above to view and manage its tasks"
          />
        ) : projectsLoading ? (
          <LoadingSkeleton count={5} />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            icon="✅"
            title="No tasks found"
            description="Create your first task to get started"
            action={<Button onClick={() => setShowForm(true)}>Create Task</Button>}
          />
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={(status) => handleStatusChange(task.id, status)}
                onEdit={() => {
                  // TODO: Edit task
                }}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
