import { useState, useEffect, useCallback } from 'react';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(
    async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const newProject = await projectsAPI.create(project);
        setProjects((prev) => [...prev, newProject]);
        return newProject;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create project');
        throw err;
      }
    },
    []
  );

  const updateProject = useCallback(
    async (id: string, updates: Partial<Project>) => {
      try {
        const updated = await projectsAPI.update(id, updates);
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update project');
        throw err;
      }
    },
    []
  );

  const deleteProject = useCallback(async (id: string) => {
    try {
      await projectsAPI.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      throw err;
    }
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};
