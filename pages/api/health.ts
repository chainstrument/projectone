import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    status: 'ok',
    message: 'Developer Dashboard API v1',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      tasks: '/api/tasks',
      metrics: '/api/metrics',
      participants: '/api/participants',
      customFields: '/api/custom-fields',
    },
    features: [
      'Project Management',
      'Task Tracking',
      'Metrics & Analytics',
      'Team Collaboration',
      'Stealth Mode',
      'Dependency Graph',
    ],
  });
}
