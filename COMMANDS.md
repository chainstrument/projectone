# 📋 Commands & Workflows

## 🚀 Development Commands

### Start Dev Server
```bash
npm run dev
# http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

### Lint & Format
```bash
npm run lint
# Fix issues
npx prettier --write .
```

## 🗄️ Database Commands

### Apply Migrations
1. Copy SQL from `migrations/001_initial_schema.sql`
2. Go to Supabase Dashboard → SQL Editor
3. Paste and Run
4. Done!

### Reset Database (if needed)
```sql
-- In Supabase SQL Editor
-- ⚠️ Warning: This deletes all data!
DROP TABLE IF EXISTS project_relations CASCADE;
DROP TABLE IF EXISTS custom_field_values CASCADE;
DROP TABLE IF EXISTS custom_fields CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS metrics CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS project_participants CASCADE;
DROP TABLE IF EXISTS participants CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Then re-run 001_initial_schema.sql
```

### Check Database Status
```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects';

-- View all indexes
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

## 🔧 Project Setup

### Initial Setup
```bash
# 1. Navigate to project
cd /home/chahir/labs/projectone

# 2. Install dependencies
npm install

# 3. Create .env.local
cp .env.example .env.local

# 4. Fill in Supabase credentials
# Edit .env.local with your keys

# 5. Run migrations (see DB Commands above)

# 6. Start dev server
npm run dev
```

### Add New Dependencies
```bash
npm install package-name
npm install --save-dev dev-package-name
```

### Update Dependencies
```bash
npm update
# or
npm outdated  # Check for updates
npm install
```

## 📁 Creating New Features

### Add New Page
```bash
# Create new page
touch pages/new-page.tsx

# Template:
import { Layout } from '@/components/Layout';
import { Card } from '@/components/UI';

export default function NewPage() {
  return (
    <Layout title="📋 New Page">
      <Card title="Welcome">
        <p>Content here</p>
      </Card>
    </Layout>
  );
}
```

### Add New Component
```bash
# Create component
touch components/NewComponent.tsx

# Template:
import React from 'react';

interface NewComponentProps {
  // props...
}

export const NewComponent: React.FC<NewComponentProps> = ({ }) => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

### Add New Hook
```bash
# Create hook
touch hooks/useNewHook.ts

# Template:
import { useState, useCallback, useEffect } from 'react';

export const useNewHook = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Initialize
  }, []);

  const handleAction = useCallback(() => {
    // Handle action
  }, []);

  return { state, handleAction };
};
```

### Add New API Route
```bash
# Create route
touch pages/api/new-resource/index.ts
touch pages/api/new-resource/[id].ts

# Template:
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Handle GET
  } else if (req.method === 'POST') {
    // Handle POST
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

## 🧪 Testing & Debugging

### Check if Services are Running
```bash
# Check Next.js server
curl http://localhost:3000

# Check API health
curl http://localhost:3000/api/health

# Check Supabase connection
# Open browser console and test:
# const projects = await projectsAPI.getAll();
```

### Debug Mode
```bash
# Run with debug logging
DEBUG=* npm run dev

# or NODE_ENV specific
NODE_ENV=development npm run dev
```

### View Logs
```bash
# Browser console (F12)
# Shows frontend errors and logs

# Terminal
# Shows Next.js server logs

# Supabase Dashboard
# Shows database queries and errors
```

## 🔐 Environment Variables

### Local Development (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NODE_ENV=development
```

### Production (.env.production)
```bash
# Same as above but with production keys
NEXT_PUBLIC_SUPABASE_URL=https://prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_key_here
SUPABASE_SERVICE_ROLE_KEY=prod_service_key_here
NODE_ENV=production
```

### Check Current ENV
```bash
node -e "console.log(process.env.NODE_ENV)"
```

## 📊 Data Seeding

### Add Test Data (Manual)

#### Via Supabase UI
1. Go to Supabase Dashboard
2. Click on table
3. Click "Insert row"
4. Fill data
5. Save

#### Via SQL
```sql
-- Insert test project
INSERT INTO projects (name, status, owner_id)
VALUES ('Test Project', 'active', 'user-123');

-- Insert test participant
INSERT INTO participants (name, email, role)
VALUES ('John Doe', 'john@example.com', 'admin');

-- Insert test task
INSERT INTO tasks (project_id, title, status)
VALUES ((SELECT id FROM projects LIMIT 1), 'Test Task', 'todo');
```

## 🔄 Git Workflow

### Initialize Repository
```bash
cd /home/chahir/labs/projectone
git init
git add .
git commit -m "Initial commit: Developer Dashboard setup"
```

### Regular Commits
```bash
git status
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Create Feature Branch
```bash
git checkout -b feature/my-feature
# Make changes...
git add .
git commit -m "Add my feature"
git push origin feature/my-feature
# Create PR
```

### Common Commit Types
```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes
refactor: Code refactoring
perf:     Performance improvements
test:     Adding tests
chore:    Maintenance tasks
```

## 📈 Performance Monitoring

### Bundle Analysis
```bash
npm install --save-dev @next/bundle-analyzer

# Update next.config.js to use analyzer
# Run: npm run build
```

### Database Query Performance
```sql
-- Enable query logging in Supabase
-- Monitor in Supabase Dashboard → Logs

-- Check slow queries
EXPLAIN ANALYZE SELECT * FROM projects WHERE status = 'active';
```

### Frontend Performance
```bash
# Use Lighthouse (built into Chrome DevTools)
# Or use npm package
npm install --save-dev lighthouse
npx lighthouse http://localhost:3000
```

## 🚢 Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] No console errors/warnings
- [ ] Performance optimizations done
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Build successful
- [ ] Health check passing
- [ ] Monitoring configured

## 📚 Useful Links

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

### Tools
- [VS Code](https://code.visualstudio.com)
- [Supabase Studio](https://app.supabase.com)
- [GitHub Desktop](https://desktop.github.com)

### Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier Code Formatter
- ESLint

## 💡 Pro Tips

1. **Use Supabase local dev**: `supabase start`
2. **Hot reload**: Changes auto-refresh in browser
3. **TypeScript strict mode**: Catches errors early
4. **Zustand DevTools**: Debug state changes
5. **React DevTools**: Inspect component tree
6. **Network tab**: Check API calls
7. **Lighthouse**: Run performance audits
8. **Create PRs early**: Get feedback on code

---

**Need help?** Check the main [README.md](./README.md) or [ARCHITECTURE.md](./ARCHITECTURE.md)
