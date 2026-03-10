import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, EmptyState, Button } from '@/components/UI';

export default function Custom404() {
  return (
    <Layout title="404 - Page Not Found">
      <div className="flex items-center justify-center min-h-screen">
        <EmptyState
          icon="😕"
          title="Oops! Page not found"
          description="The page you're looking for doesn't exist or has been moved"
          action={
            <a href="/">
              <Button>Go back to Home</Button>
            </a>
          }
        />
      </div>
    </Layout>
  );
}
