import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, Button, Input, EmptyState } from '@/components/UI';

interface ProjectNode {
  id: string;
  name: string;
  x: number;
  y: number;
  connections: string[];
}

export default function Graph() {
  const [nodes, setNodes] = useState<ProjectNode[]>([
    { id: '1', name: 'Backend API', x: 100, y: 100, connections: ['2', '3'] },
    { id: '2', name: 'Frontend App', x: 300, y: 100, connections: [] },
    { id: '3', name: 'Database', x: 100, y: 300, connections: [] },
  ]);

  return (
    <Layout title="📊 Graphe de Dépendances">
      <div className="space-y-8">
        <Card title="🔗 Relations entre Projets" description="Visualisation des dépendances">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* SVG Canvas */}
            <div className="lg:col-span-2 bg-primary rounded p-4 border border-gray-700 h-96">
              <svg width="100%" height="100%" className="border border-gray-600 rounded">
                {/* Connections */}
                {nodes.map((node) =>
                  node.connections.map((targetId) => {
                    const target = nodes.find((n) => n.id === targetId);
                    if (!target) return null;
                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={node.x}
                        y1={node.y}
                        x2={target.x}
                        y2={target.y}
                        stroke="#475569"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    );
                  })
                )}

                {/* Nodes */}
                {nodes.map((node) => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="30"
                      fill="#3b82f6"
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    <text
                      x={node.x}
                      y={node.y + 50}
                      textAnchor="middle"
                      fill="#f1f5f9"
                      fontSize="12"
                    >
                      {node.name}
                    </text>
                  </g>
                ))}

                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#475569" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Legend & Controls */}
            <div className="space-y-4">
              <Card title="📋 Légende">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent rounded-full"></div>
                    <span className="text-gray-300">Projet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 border-t-2 border-gray-600"></div>
                    <span className="text-gray-300">Dépendance</span>
                  </div>
                </div>
              </Card>

              <Card title="🔗 Relations">
                <div className="space-y-2 text-sm">
                  {nodes.map((node) =>
                    node.connections.map((targetId) => (
                      <div
                        key={`rel-${node.id}-${targetId}`}
                        className="p-2 bg-primary rounded text-gray-300"
                      >
                        <span className="text-accent font-medium">{node.name}</span>
                        <span className="mx-2">→</span>
                        <span className="text-success font-medium">
                          {nodes.find((n) => n.id === targetId)?.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Coming Soon */}
        <Card title="🚀 Fonctionnalités à venir">
          <p className="text-gray-400 mb-4">
            La visualisation graphique complète avec D3.js/Recharts permettra :
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✨ Zoom et pan interactif</li>
            <li>✨ Types de relations visuelles (depends_on, blocks, related_to)</li>
            <li>✨ Détection de cycles</li>
            <li>✨ Chemins critiques</li>
            <li>✨ Export en SVG/PNG</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
}
