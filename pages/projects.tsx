import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, Button, Input, Select, EmptyState, LoadingSkeleton } from '@/components/UI';
import { ProjectCard } from '@/components/Dashboard';
import { useProjects } from '@/hooks/useProjects';
import { useStealthMode } from '@/hooks/useStealthMode';
import { Project } from '@/types';

export default function Projects() {
  const { projects, loading, createProject, updateProject, deleteProject } =
    useProjects();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Project['status']>('active');
  const stealthMode = useStealthMode();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as Project['status'],
    priority: 'medium' as Project['priority'],
    startDate: new Date().toISOString().split('T')[0],
    progress: 0,
    ownerId: 'current-user', // Mock
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({
        ...formData,
        progress: parseInt(formData.progress as any),
      });
      setFormData({
        name: '',
        description: '',
        status: 'active',
        priority: 'medium',
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        ownerId: 'current-user',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.status === filter);

  return (
    <Layout title="📁 Mes Projets">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {['all', 'active', 'completed', 'paused', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`
                  px-4 py-2 rounded font-medium transition-colors
                  ${
                    filter === status
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-gray-400 hover:text-white'
                  }
                `}
              >
                {status === 'all' ? '📊 Tous' : status}
              </button>
            ))}
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? '✖️ Cancel' : '➕ New Project'}
          </Button>
        </div>

        {/* Create Form */}
        {showForm && (
          <Card title="➕ Create New Project" className="bg-secondary">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Project Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Dashboard V2"
                required
              />
              <Input
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="What is this project about?"
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as any,
                    })
                  }
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'paused', label: 'Paused' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'archived', label: 'Archived' },
                  ]}
                />
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
                    { value: 'critical', label: 'Critical' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
                <Input
                  label="Progress (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: e.target.value as any })
                  }
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </Card>
        )}

        {/* Projects Grid */}
        {loading ? (
          <LoadingSkeleton count={6} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No projects found"
            description={`No projects with status "${filter}"`}
            action={<Button onClick={() => setShowForm(true)}>Create First Project</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                tasksCount={5}
                completedCount={3}
                onEdit={() => {
                  // TODO: Edit project
                }}
                onDelete={() => {
                  if (confirm('Are you sure?')) {
                    deleteProject(project.id);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
