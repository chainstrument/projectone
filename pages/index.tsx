import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, Button, EmptyState, LoadingSkeleton } from '@/components/UI';
import {
  ProjectCard,
  TaskItem,
  DashboardStatistics,
} from '@/components/Dashboard';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { useStealthMode } from '@/hooks/useStealthMode';
import { Project, DashboardStats } from '@/types';

export default function Home() {
  const { projects, loading: projectsLoading } = useProjects();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    deepWorkHours: 0,
    learningHours: 0,
    activeParticipants: 0,
  });
  const stealthMode = useStealthMode();

  useEffect(() => {
    if (projects.length > 0) {
      const activeProjects = projects.filter((p) => p.status === 'active').length;
      const completedProjects = projects.filter((p) => p.status === 'completed').length;

      setDashboardStats({
        totalProjects: projects.length,
        activeProjects,
        completedProjects,
        totalTasks: 0, // Will be calculated from tasks
        completedTasks: 0,
        deepWorkHours: 42, // Mock data
        learningHours: 12, // Mock data
        activeParticipants: 5, // Mock data
      });
    }
  }, [projects]);

  const topProjects = projects
    .filter((p) => p.status === 'active')
    .sort((a, b) => b.priority.localeCompare(a.priority))
    .slice(0, 3);

  return (
    <Layout title="🏠 Dashboard Accueil">
      <div className="space-y-8">
        {/* Stats */}
        {projectsLoading ? (
          <LoadingSkeleton count={4} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" />
        ) : (
          <DashboardStatistics stats={dashboardStats} />
        )}

        {/* Today's Focus Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Tasks */}
          <Card
            title="📋 Focus du Jour"
            description="Top 5 prioritaires"
            className="lg:col-span-2"
          >
            {projectsLoading ? (
              <LoadingSkeleton count={3} />
            ) : projects.length === 0 ? (
              <EmptyState
                icon="📭"
                title="Aucun projet"
                description="Créez votre premier projet pour commencer"
                action={<Button>+ New Project</Button>}
              />
            ) : (
              <div className="space-y-2">
                {topProjects.map((project) => (
                  <div key={project.id} className="p-3 bg-primary rounded">
                    <p className="text-white font-medium">
                      {stealthMode.hideProjectNames
                        ? `${project.icon || '📦'} P-${project.id.slice(0, 3).toUpperCase()}`
                        : `${project.icon || '📦'} ${project.name}`}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {project.progress}% complete
                      </span>
                      <span className="text-xs font-semibold text-accent">
                        {project.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Learning & Health */}
          <Card title="🧠 Apprentissage & Santé" description="Cette semaine">
            <div className="space-y-3">
              <div className="p-3 bg-primary rounded">
                <p className="text-white font-medium flex items-center gap-2">
                  📚 <span>Deep Work</span>
                </p>
                <p className="text-2xl font-bold text-accent mt-2">
                  {stealthMode.useCodedScores ? 'A' : '42h'}
                </p>
              </div>
              <div className="p-3 bg-primary rounded">
                <p className="text-white font-medium flex items-center gap-2">
                  🏃 <span>Sport</span>
                </p>
                <p className="text-2xl font-bold text-success mt-2">
                  {stealthMode.useCodedScores ? 'B' : '8h'}
                </p>
              </div>
              <div className="p-3 bg-primary rounded">
                <p className="text-white font-medium flex items-center gap-2">
                  😴 <span>Sleep</span>
                </p>
                <p className="text-2xl font-bold text-warning mt-2">
                  {stealthMode.useCodedScores ? 'C' : '6.5h/night'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Projects Overview */}
        <Card title="📁 Vue d'ensemble des projets">
          {projectsLoading ? (
            <LoadingSkeleton count={6} />
          ) : projects.length === 0 ? (
            <EmptyState
              icon="📦"
              title="Pas de projets"
              description="Commencez en créant votre premier projet"
              action={<Button>+ Créer un Projet</Button>}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  tasksCount={5}
                  completedCount={3}
                />
              ))}
            </div>
          )}
        </Card>

        {/* Active Participants */}
        <Card title="👥 Participants Actifs">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { initials: 'JD', name: 'John Doe', role: 'Lead' },
              { initials: 'JS', name: 'Jane Smith', role: 'Developer' },
              { initials: 'MC', name: 'Mike Chen', role: 'Designer' },
              { initials: 'SR', name: 'Sarah Rodriguez', role: 'QA' },
              { initials: 'AD', name: 'Alex Dev', role: 'Admin' },
            ].map((participant, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 bg-primary rounded hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-accent bg-opacity-20 flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-accent">
                    {participant.initials}
                  </span>
                </div>
                <p className="text-xs text-white text-center font-medium">
                  {participant.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">{participant.role}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
