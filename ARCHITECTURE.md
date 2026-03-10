# 🏗️ Architecture & Design - Developer Dashboard

## 📊 Vue Générale

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js/React)                  │
├─────────────────────────────────────────────────────────────┤
│  Pages:                                                       │
│  ├── Home        : Dashboard principal & stats               │
│  ├── Projects    : CRUD projets                              │
│  ├── Tasks       : Gestion des tâches                        │
│  ├── Metrics     : Analytics et KPIs                         │
│  ├── Participants: Gestion équipe                            │
│  ├── Settings    : Config et stealth mode                    │
│  └── Graph       : Visualisation dépendances                │
│                                                               │
│  Components:                                                  │
│  ├── Layout      : Sidebar + Header principal                │
│  ├── UI          : Composants réutilisables                  │
│  └── Dashboard   : Cards spécialisées                        │
└─────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (Next.js API Routes)            │
├─────────────────────────────────────────────────────────────┤
│  GET/POST   /api/projects                                    │
│  GET/PUT/DELETE /api/projects/[id]                           │
│  GET/POST   /api/tasks                                       │
│  GET/PUT/DELETE /api/tasks/[id]                              │
│  GET/POST   /api/metrics                                     │
│  GET/POST   /api/participants                                │
│  GET/POST   /api/custom-fields                               │
│  GET        /api/health                                      │
└─────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│               CLIENT LIBRARY (Supabase Client)              │
├─────────────────────────────────────────────────────────────┤
│  lib/supabase.ts     : Client Supabase instance              │
│  lib/api.ts          : Fonctions API wrapper                 │
└─────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│                BACKEND (Supabase/PostgreSQL)                │
├─────────────────────────────────────────────────────────────┤
│  Tables:                                                      │
│  ├── projects                 : Projets principaux            │
│  ├── participants             : Équipe                        │
│  ├── project_participants     : Assignations                  │
│  ├── tasks                    : Tâches                        │
│  ├── metrics                  : KPIs                          │
│  ├── custom_fields            : Champs dynamiques             │
│  ├── custom_field_values      : Valeurs champs               │
│  ├── events                   : Événements                    │
│  └── project_relations        : Graphe dépendances           │
│                                                               │
│  Indexes: pour perf optimale                                 │
│  RLS Policies: Sécurité (à implémenter)                     │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Créer un Project

```
User clicks "New Project"
        ↓
Modal Form opens
        ↓
User remplit et submit
        ↓
→ handleSubmit() → createProject(data)
        ↓
→ useProjects hook → projectsAPI.create()
        ↓
→ lib/api.ts → supabase.from('projects').insert()
        ↓
→ Supabase Backend (PostgreSQL)
        ↓
← Response avec le projet créé
        ↓
UI update : setProjects([...prev, newProject])
        ↓
User voit le nouveau projet dans la liste
```

### Assigner Participant à Project

```
User sélectionne participant
        ↓
participantsAPI.addToProject(projectId, participantId, role)
        ↓
supabase.from('project_participants').insert()
        ↓
Supabase crée junction record
        ↓
UI update → affiche le participant
```

## 🎨 Component Hierarchy

```
Layout (Sidebar + Header)
├── Page Component (Projects, Tasks, etc)
│   ├── Card (UI wrapper)
│   │   ├── ProjectCard
│   │   │   ├── Badge
│   │   │   ├── ProgressBar
│   │   │   └── Button
│   │   ├── TaskItem
│   │   │   ├── Badge
│   │   │   └── Button
│   │   └── StatWidget
│   ├── Form (Input + Select + Button)
│   │   ├── Input
│   │   ├── Select
│   │   ├── Button
│   │   └── ProgressBar
│   └── EmptyState
│       └── Button
└── Modals/Dialogs (future)
```

## 🛠️ State Management

### Global State (Zustand)

```typescript
// hooks/useStealthMode.ts
{
  enabled: boolean;
  hideProjectNames: boolean;
  hideTaskNames: boolean;
  useEmojis: boolean;
  useCodedScores: boolean;
  // actions...
}
```

### Local State (React Hooks)

```typescript
// useState pour data des pages
const [projects, setProjects] = useState([]);
const [tasks, setTasks] = useState([]);
const [formData, setFormData] = useState({});
```

### Server State (API/Supabase)

```typescript
// Géré via lib/api.ts et lib/supabase.ts
// Appelé depuis les pages via useProjects, useTasks, etc.
```

## 📱 Responsive Design

```
Mobile (< 768px)
- Sidebar hamburger
- Single column layout
- Full-width forms

Tablet (768px - 1024px)
- Sidebar visible
- 2-column grids
- Optimized forms

Desktop (> 1024px)
- Full sidebar
- 3-4 column grids
- All features visible
```

## 🔒 Security Considerations

### Todo (à implémenter)
- [ ] Authentication Supabase
- [ ] RLS Policies par table
- [ ] Rate limiting sur API
- [ ] Input validation côté serveur
- [ ] CORS configuration
- [ ] CSRF protection
- [ ] JWT token refresh
- [ ] API key rotation

### Actuellement
- ✅ Variables d'env sécurisées
- ✅ .env.local ignoré
- ✅ Supabase Anon Key (public-safe)
- ✅ Service Role Key en serveur-side seulement

## 🚀 Performance

### Optimisations implémentées
- ✅ Code splitting (Next.js automatic)
- ✅ Image optimization (next/image ready)
- ✅ CSS-in-JS minimisé (Tailwind)
- ✅ React Hook Form (léger)
- ✅ Zustand vs Redux (lighter)

### À faire
- [ ] Pagination pour listes longues
- [ ] Lazy loading des images
- [ ] API caching strategy
- [ ] Database query optimization
- [ ] Virtual scrolling pour grandes listes
- [ ] Service Worker/PWA

## 📦 Build & Deployment

### Dev
```bash
npm run dev
→ http://localhost:3000
```

### Production
```bash
npm run build
npm start
→ Optimized build
```

### Deployment Options
1. **Vercel** (recommandé pour Next.js)
2. **Netlify**
3. **Docker** + Any VPS
4. **AWS/GCP/Azure**

## 🧪 Testing Strategy

### À implémenter
```
Unit Tests
├── Components (React Testing Library)
├── Hooks (Jest)
└── Utils (Jest)

Integration Tests
├── Pages (E2E)
├── API routes
└── Supabase interactions

E2E Tests (Cypress/Playwright)
├── User flows
└── Critical paths
```

## 📚 Database Schema Details

### Projects
```sql
id (UUID)           -- Primary key
name               -- Project title
description        -- Long text
status             -- active|completed|paused|archived
priority           -- low|medium|high|critical
progress           -- 0-100%
startDate          -- TIMESTAMP
endDate            -- TIMESTAMP (optional)
ownerId            -- FK to auth user
icon               -- Emoji or SVG reference
color              -- Hex color code
created_at         -- Timestamp
updated_at         -- Timestamp

-- Indexes
pk: id
idx: owner_id, status
```

### Project-Participants (Junction)
```sql
projectId          -- FK projects
participantId      -- FK participants
role               -- admin|lead|member|viewer
joinedAt           -- When added

-- Constraints
unique(projectId, participantId)
```

### Tasks
```sql
projectId          -- FK projects
title              -- Task name
description        -- Details
status             -- todo|in_progress|review|completed
priority           -- low|medium|high
assignedTo         -- FK participants (nullable)
dueDate            -- TIMESTAMP
estimatedHours     -- Decimal
actualHours        -- Decimal
created_at
updated_at

-- Indexes
idx: projectId, status, assignedTo
```

### Metrics
```sql
projectId          -- FK projects
type               -- deep_work_hours|learning_hours|tasks_completed|custom
name               -- Metric name
value              -- Numeric value
unit               -- hours|tasks|etc
recordedAt         -- When recorded
created_at
```

### Custom Fields
```sql
projectId          -- FK projects
name               -- Field label
fieldType          -- text|number|select|date|boolean
options            -- JSON array [option1, option2...]
isRequired         -- Boolean
displayOrder       -- Sort order

-- Allows dynamic project-specific fields
```

## 🔗 API Response Format

```typescript
// Success
{
  data: [...],
  status: 200
}

// Error
{
  error: "Descriptive error message",
  status: 400|500
}

// Health
{
  status: 'ok',
  version: '1.0.0',
  endpoints: {...}
}
```

## 🎓 Learning Resources

- Architecture decision records (ADR) pending
- Component storybook (pending)
- API documentation (Swagger/OpenAPI pending)
- Database ER diagram in migrations/
- Code examples in lib/ and pages/

---

**Note**: Cette architecture peut être scaling horizontalement :
- Add API Gateway (Kong/Nginx)
- Database replication
- Redis caching layer
- Message queues (Bull/RabbitMQ)
- File storage (S3)
- CDN for assets
