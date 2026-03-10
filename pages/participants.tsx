import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, Button, Input, Select, Badge, EmptyState } from '@/components/UI';
import { useStealthMode } from '@/hooks/useStealthMode';

interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'lead' | 'member' | 'viewer';
  avatar?: string;
  joinedAt: string;
}

const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    joinedAt: '2026-01-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'lead',
    joinedAt: '2026-01-15',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'member',
    joinedAt: '2026-02-01',
  },
];

export default function Participants() {
  const [participants, setParticipants] = useState<Participant[]>(MOCK_PARTICIPANTS);
  const [showForm, setShowForm] = useState(false);
  const stealthMode = useStealthMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'member' as Participant['role'],
  });

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();

    const newParticipant: Participant = {
      id: Date.now().toString(),
      ...formData,
      joinedAt: new Date().toISOString().split('T')[0],
    };

    setParticipants([...participants, newParticipant]);
    setFormData({
      name: '',
      email: '',
      role: 'member',
    });
    setShowForm(false);
  };

  const handleDeleteParticipant = (id: string) => {
    if (confirm('Remove this participant?')) {
      setParticipants(participants.filter((p) => p.id !== id));
    }
  };

  const handleChangeRole = (
    id: string,
    role: Participant['role']
  ) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, role } : p))
    );
  };

  const roleColors = {
    admin: 'bg-danger',
    lead: 'bg-accent',
    member: 'bg-success',
    viewer: 'bg-warning',
  };

  const roleEmojis = {
    admin: '👑',
    lead: '⭐',
    member: '👤',
    viewer: '👁️',
  };

  return (
    <Layout title="👥 Participants">
      <div className="space-y-8">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <p className="text-gray-400 text-sm mb-1">Total Participants</p>
            <p className="text-3xl font-bold text-white">{participants.length}</p>
          </Card>
          <Card>
            <p className="text-gray-400 text-sm mb-1">Admins</p>
            <p className="text-3xl font-bold text-danger">
              {participants.filter((p) => p.role === 'admin').length}
            </p>
          </Card>
          <Card>
            <p className="text-gray-400 text-sm mb-1">Leads</p>
            <p className="text-3xl font-bold text-accent">
              {participants.filter((p) => p.role === 'lead').length}
            </p>
          </Card>
          <Card>
            <p className="text-gray-400 text-sm mb-1">Members</p>
            <p className="text-3xl font-bold text-success">
              {participants.filter((p) => p.role === 'member').length}
            </p>
          </Card>
        </div>

        {/* Add Participant */}
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? '✖️ Cancel' : '➕ Add Participant'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card title="➕ Add New Participant" className="bg-secondary">
            <form onSubmit={handleAddParticipant} className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Full name"
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@example.com"
                required
              />

              <Select
                label="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as any,
                  })
                }
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'lead', label: 'Lead' },
                  { value: 'member', label: 'Member' },
                  { value: 'viewer', label: 'Viewer' },
                ]}
              />

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Participant</Button>
              </div>
            </form>
          </Card>
        )}

        {/* Participants List */}
        <Card title="📋 Team Members">
          {participants.length === 0 ? (
            <EmptyState
              icon="👥"
              title="No participants"
              description="Add team members to collaborate"
              action={<Button onClick={() => setShowForm(true)}>Add First Member</Button>}
            />
          ) : (
            <div className="space-y-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-4 p-4 bg-primary rounded hover:bg-secondary transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-accent bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-accent">
                      {participant.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">
                      {stealthMode.hideProjectNames
                        ? `${roleEmojis[participant.role]} Member ${participant.id.slice(0, 4)}`
                        : `${roleEmojis[participant.role]} ${participant.name}`}
                    </p>
                    {!stealthMode.hideProjectNames && (
                      <p className="text-xs text-gray-400">{participant.email}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Joined {new Date(participant.joinedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  {/* Role Badge & Actions */}
                  <div className="flex items-center gap-2">
                    <select
                      value={participant.role}
                      onChange={(e) =>
                        handleChangeRole(participant.id, e.target.value as any)
                      }
                      className="input w-32 text-xs"
                    >
                      <option value="admin">👑 Admin</option>
                      <option value="lead">⭐ Lead</option>
                      <option value="member">👤 Member</option>
                      <option value="viewer">👁️ Viewer</option>
                    </select>

                    <button
                      onClick={() => handleDeleteParticipant(participant.id)}
                      className="p-2 text-danger hover:bg-danger hover:bg-opacity-20 rounded transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
