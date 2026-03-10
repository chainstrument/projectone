import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, Button, Input, Select, EmptyState, Badge } from '@/components/UI';
import { StatWidget } from '@/components/Dashboard';
import { useStealthMode } from '@/hooks/useStealthMode';
import { Metric } from '@/types';

// Mock metrics
const MOCK_METRICS: Metric[] = [
  {
    id: '1',
    projectId: 'proj-1',
    name: 'Deep Work Hours',
    value: 42,
    unit: 'hours',
    type: 'deep_work_hours',
    recordedAt: '2026-03-10',
    createdAt: '2026-03-10',
  },
  {
    id: '2',
    projectId: 'proj-1',
    name: 'Learning Hours',
    value: 12,
    unit: 'hours',
    type: 'learning_hours',
    recordedAt: '2026-03-10',
    createdAt: '2026-03-10',
  },
  {
    id: '3',
    projectId: 'proj-1',
    name: 'Tasks Completed',
    value: 18,
    unit: 'tasks',
    type: 'tasks_completed',
    recordedAt: '2026-03-10',
    createdAt: '2026-03-10',
  },
];

export default function Metrics() {
  const [metrics, setMetrics] = useState<Metric[]>(MOCK_METRICS);
  const [showForm, setShowForm] = useState(false);
  const stealthMode = useStealthMode();
  const [formData, setFormData] = useState({
    name: '',
    value: 0,
    unit: '',
    type: 'custom' as Metric['type'],
    recordedAt: new Date().toISOString().split('T')[0],
  });

  const handleAddMetric = (e: React.FormEvent) => {
    e.preventDefault();

    const newMetric: Metric = {
      id: Date.now().toString(),
      projectId: 'all',
      ...formData,
      value: parseFloat(formData.value as any),
      createdAt: new Date().toISOString(),
    };

    setMetrics([...metrics, newMetric]);
    setFormData({
      name: '',
      value: 0,
      unit: '',
      type: 'custom',
      recordedAt: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const metricsByType = {
    deep_work_hours: metrics.filter((m) => m.type === 'deep_work_hours'),
    learning_hours: metrics.filter((m) => m.type === 'learning_hours'),
    tasks_completed: metrics.filter((m) => m.type === 'tasks_completed'),
    custom: metrics.filter((m) => m.type === 'custom'),
  };

  const totalDeepWork = metricsByType.deep_work_hours.reduce(
    (sum, m) => sum + m.value,
    0
  );
  const totalLearning = metricsByType.learning_hours.reduce(
    (sum, m) => sum + m.value,
    0
  );
  const totalTasks = metricsByType.tasks_completed.reduce(
    (sum, m) => sum + m.value,
    0
  );

  return (
    <Layout title="📊 Métriques & Analytics">
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatWidget
            title="Deep Work Hours"
            value={stealthMode.useCodedScores ? 'A' : `${totalDeepWork}h`}
            icon="🧠"
            subtitle="This period"
            trend="up"
          />
          <StatWidget
            title="Learning Hours"
            value={stealthMode.useCodedScores ? 'B+' : `${totalLearning}h`}
            icon="📚"
            subtitle="This period"
            trend="up"
          />
          <StatWidget
            title="Tasks Completed"
            value={stealthMode.useCodedScores ? 'A-' : totalTasks}
            icon="✅"
            subtitle="This period"
            trend="neutral"
          />
          <StatWidget
            title="Avg Daily"
            value={stealthMode.useCodedScores ? '~6h' : '6h'}
            icon="⏱️"
            subtitle="Per day"
            trend="down"
          />
        </div>

        {/* Metrics by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deep Work */}
          <Card title="🧠 Deep Work Hours" description="Focused coding time">
            <div className="space-y-3">
              {metricsByType.deep_work_hours.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-3 bg-primary rounded"
                >
                  <span className="text-white">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-accent">
                      {stealthMode.useCodedScores
                        ? String.fromCharCode(65 + Math.floor(metric.value / 10))
                        : metric.value}
                    </span>
                    <span className="text-xs text-gray-400">{metric.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning */}
          <Card title="📚 Learning Hours" description="Education & training">
            <div className="space-y-3">
              {metricsByType.learning_hours.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-3 bg-primary rounded"
                >
                  <span className="text-white">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-success">
                      {stealthMode.useCodedScores
                        ? String.fromCharCode(65 + Math.floor(metric.value / 5))
                        : metric.value}
                    </span>
                    <span className="text-xs text-gray-400">{metric.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tasks Completed */}
        <Card title="✅ Tasks Completed" description="Productivity metrics">
          <div className="space-y-3">
            {metricsByType.tasks_completed.map((metric) => (
              <div
                key={metric.id}
                className="flex items-center justify-between p-3 bg-primary rounded"
              >
                <div>
                  <p className="text-white font-medium">{metric.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(metric.recordedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className="text-lg font-bold text-warning">
                  {stealthMode.useCodedScores
                    ? '★'.repeat(Math.min(5, Math.floor(metric.value / 5)))
                    : metric.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Custom Metrics */}
        <Card title="📈 Custom Metrics" description="Your tracked metrics">
          {metricsByType.custom.length === 0 ? (
            <EmptyState
              icon="📊"
              title="No custom metrics"
              description="Create custom metrics to track what matters to you"
              action={<Button onClick={() => setShowForm(true)}>Add Metric</Button>}
            />
          ) : (
            <div className="space-y-3">
              {metricsByType.custom.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-3 bg-primary rounded hover:bg-secondary transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{metric.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(metric.recordedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-accent">
                      {metric.value}
                    </span>
                    <span className="text-xs text-gray-400">{metric.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Add Custom Metric Form */}
        {showForm && (
          <Card title="➕ Add Custom Metric" className="bg-secondary">
            <form onSubmit={handleAddMetric} className="space-y-4">
              <Input
                label="Metric Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Bugs Fixed, Code Reviews"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Value"
                  type="number"
                  step="0.1"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      value: parseFloat(e.target.value),
                    })
                  }
                  required
                />
                <Input
                  label="Unit"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  placeholder="e.g., hours, tasks, bugs"
                  required
                />
              </div>

              <Input
                label="Date"
                type="date"
                value={formData.recordedAt}
                onChange={(e) =>
                  setFormData({ ...formData, recordedAt: e.target.value })
                }
              />

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Metric</Button>
              </div>
            </form>
          </Card>
        )}

        {!showForm && (
          <div className="flex justify-center">
            <Button onClick={() => setShowForm(true)}>
              ➕ Add Custom Metric
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
