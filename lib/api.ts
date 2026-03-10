import { supabase } from './supabase';
import {
  Project,
  Task,
  Metric,
  CustomField,
  Event,
  ProjectRelation,
  Participant,
  ProjectParticipant,
} from '@/types';

// PROJECTS
export const projectsAPI = {
  async getAll() {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    return data as Project[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Project;
  },

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  async delete(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  },
};

// TASKS
export const tasksAPI = {
  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('projectId', projectId);
    if (error) throw error;
    return data as Task[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Task;
  },

  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
      .single();
    if (error) throw error;
    return data as Task;
  },

  async update(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Task;
  },

  async delete(id: string) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
  },
};

// METRICS
export const metricsAPI = {
  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('projectId', projectId);
    if (error) throw error;
    return data as Metric[];
  },

  async create(metric: Omit<Metric, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('metrics')
      .insert([metric])
      .select()
      .single();
    if (error) throw error;
    return data as Metric;
  },

  async delete(id: string) {
    const { error } = await supabase.from('metrics').delete().eq('id', id);
    if (error) throw error;
  },
};

// CUSTOM FIELDS
export const customFieldsAPI = {
  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('custom_fields')
      .select('*')
      .eq('projectId', projectId)
      .order('displayOrder', { ascending: true });
    if (error) throw error;
    return data as CustomField[];
  },

  async create(field: Omit<CustomField, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('custom_fields')
      .insert([field])
      .select()
      .single();
    if (error) throw error;
    return data as CustomField;
  },

  async update(id: string, updates: Partial<CustomField>) {
    const { data, error } = await supabase
      .from('custom_fields')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as CustomField;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('custom_fields')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// EVENTS
export const eventsAPI = {
  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('projectId', projectId)
      .order('date', { ascending: false });
    if (error) throw error;
    return data as Event[];
  },

  async create(event: Omit<Event, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    if (error) throw error;
    return data as Event;
  },

  async delete(id: string) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
  },
};

// PROJECT RELATIONS
export const projectRelationsAPI = {
  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('project_relations')
      .select('*, sourceProject:source_project_id(*), targetProject:target_project_id(*)')
      .or(`sourceProjectId.eq.${projectId},targetProjectId.eq.${projectId}`);
    if (error) throw error;
    return data as ProjectRelation[];
  },

  async create(relation: Omit<ProjectRelation, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('project_relations')
      .insert([relation])
      .select()
      .single();
    if (error) throw error;
    return data as ProjectRelation;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('project_relations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// PARTICIPANTS
export const participantsAPI = {
  async getAll() {
    const { data, error } = await supabase.from('participants').select('*');
    if (error) throw error;
    return data as Participant[];
  },

  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('project_participants')
      .select('*, participant:participant_id(*)')
      .eq('projectId', projectId);
    if (error) throw error;
    return data as ProjectParticipant[];
  },

  async create(participant: Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('participants')
      .insert([participant])
      .select()
      .single();
    if (error) throw error;
    return data as Participant;
  },

  async addToProject(projectId: string, participantId: string, role: string) {
    const { data, error } = await supabase
      .from('project_participants')
      .insert([{ projectId, participantId, role }])
      .select()
      .single();
    if (error) throw error;
    return data as ProjectParticipant;
  },

  async removeFromProject(projectId: string, participantId: string) {
    const { error } = await supabase
      .from('project_participants')
      .delete()
      .eq('projectId', projectId)
      .eq('participantId', participantId);
    if (error) throw error;
  },
};
