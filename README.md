# 📊 Developer Dashboard - Project-Centric

Un dashboard complet et discret pour développeurs, centré sur la gestion des projets avec un système flexible de participants, tâches, métriques et relations de dépendances.

## 🎯 Objectifs

- ✅ **Gestion projet-centrée** : Tous les éléments (participants, tâches, métriques) gravitent autour du projet
- 🔐 **Mode discrétion** : Cachez les noms sensibles, utilisez des codes et des emojis
- 📈 **Analytics** : Suivez vos heures de deep work, d'apprentissage, et autres métriques
- 🤝 **Gestion collaborative** : Ajoutez dynamiquement des participants avec différents rôles
- 🎨 **Flexible** : Ajoutez des champs personnalisés par projet
- 📊 **Graphique** : Visualisez les dépendances entre projets

## 🏗️ Architecture

### Frontend
- **Framework** : Next.js 14 + React 18
- **Styling** : Tailwind CSS
- **State Management** : Zustand (pour le mode discrétion)
- **Graphiques** : Recharts
- **Formulaires** : React Hook Form

### Backend
- **Base de données** : Supabase (PostgreSQL)
- **API** : REST via Supabase Client
- **Auth** : Supabase Auth (ready to implement)

## 🗄️ Structure Base de Données

### Tables principales

```
Projects
├── id (UUID)
├── name
├── description
├── status (active|completed|paused|archived)
├── priority (low|medium|high|critical)
├── progress (0-100%)
├── startDate, endDate
├── ownerId
├── icon, color

ProjectParticipants (Junction)
├── projectId → Projects
├── participantId → Participants
├── role (admin|lead|member|viewer)

Participants
├── id
├── name, email
├── role
├── avatar

Tasks
├── projectId → Projects
├── title, description
├── status (todo|in_progress|review|completed)
├── priority, dueDate
├── assignedTo → Participants
├── estimatedHours, actualHours

Metrics
├── projectId → Projects
├── type (deep_work_hours|learning_hours|tasks_completed|custom)
├── value, unit
├── recordedAt

CustomFields
├── projectId → Projects
├── name, fieldType
├── options, isRequired
├── displayOrder

Events
├── projectId → Projects
├── type (milestone|deployment|review|meeting|other)
├── title, description, date

ProjectRelations (Graphe)
├── sourceProjectId → Projects
├── targetProjectId → Projects
├── relationType (depends_on|blocks|related_to|is_subtask_of)
```

## 🚀 Installation & Démarrage

### 1. Configuration Supabase

```bash
# Créer un projet sur https://supabase.com
# Récupérer les clés :
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

### 2. Exécuter les migrations

```bash
# Copier le contenu de migrations/001_initial_schema.sql
# Aller dans Supabase Dashboard → SQL Editor
# Exécuter le script SQL complet
```

### 3. Installation locale

```bash
cd /home/chahir/labs/projectone
npm install

# Créer .env.local
cp .env.example .env.local
# Remplir les variables Supabase

# Démarrer le serveur dev
npm run dev
```

### 4. Accéder au dashboard

```
http://localhost:3000
```

## 📁 Structure Dossiers

```
.
├── pages/
│   ├── index.tsx          # Accueil - Dashboard principal
│   ├── projects.tsx       # Gestion des projets
│   ├── tasks.tsx          # Gestion des tâches
│   ├── metrics.tsx        # Analytics & métriques
│   ├── participants.tsx    # Gestion de l'équipe
│   └── settings.tsx       # Paramètres & mode discrétion
├── components/
│   ├── Layout.tsx         # Layout principal avec sidebar
│   ├── Dashboard.tsx      # Composants dashboard (cards, stats)
│   └── UI.tsx             # Composants réutilisables
├── hooks/
│   ├── useProjects.ts     # Hook pour projets
│   ├── useTasks.ts        # Hook pour tâches
│   └── useStealthMode.ts  # Store Zustand pour mode discrétion
├── lib/
│   ├── supabase.ts        # Client Supabase
│   └── api.ts             # Fonctions API
├── types/
│   └── index.ts           # Types TypeScript
├── styles/
│   └── globals.css        # Styles globaux
├── migrations/
│   └── 001_initial_schema.sql # Schéma base de données
└── public/
    └── favicon.ico
```

## 🎨 Fonctionnalités Clés

### 🏠 Home Dashboard
- **Focus du jour** : Top tâches prioritaires
- **Progression projets** : Barres de progression visuelles
- **Statistiques** : Deep work hours, learning hours, tasks completed
- **Participants actifs** : Vue d'ensemble de l'équipe
- **Vue projets** : Grille avec statuts et progression

### 📁 Page Projets
- Liste/grille de tous les projets
- Filtres par statut (active, completed, paused, archived)
- Créer, éditer, supprimer des projets
- Voir la progression et les participants par projet
- Icônes et couleurs personnalisables

### ✅ Page Tâches
- Vue par projet
- Statuts : To Do → In Progress → Review → Completed
- Filtres par statut et priorité
- Drag & drop pour changer les statuts (ready to implement)
- Estimation d'heures et temps réel
- Assigner à des participants

### 📊 Page Métriques
- **Deep Work Hours** : Heures de code concentré
- **Learning Hours** : Temps d'apprentissage
- **Tasks Completed** : Nombre de tâches accomplies
- **Custom Metrics** : Suivre n'importe quel KPI
- Graphiques et tendances
- Codes chiffrés en mode discrétion

### 👥 Page Participants
- Lister tous les participants
- Rôles : Admin, Lead, Member, Viewer
- Ajouter/supprimer dynamiquement
- Assigner à des projets
- Gestion des rôles

### ⚙️ Settings
- **Mode Discrétion** : 
  - 🔐 Cacher les noms de projets
  - 🔐 Cacher les noms de tâches
  - 😀 Utiliser des emojis
  - 🔤 Scores codés (A, B, C)
- Thème (dark/light/auto)
- Langue (EN/FR/ES)
- Notifications
- Danger Zone (export, reset, delete)

## 🔐 Mode Discrétion (Stealth Mode)

**Parfait pour que personne ne voit les détails sensibles !**

### Options disponibles
1. **Hide Project Names** : `Project P-ABC` au lieu de `Super Secret Project`
2. **Hide Task Names** : `Task T-XYZ` au lieu de `Implement API Security`
3. **Use Emojis** : 📁 📊 ✅ 🧠 pour reconnaissance rapide
4. **Coded Scores** : `A+`, `B`, `C` au lieu de `42 hours`, `18 tasks`

### Exemple
```
Mode Normal:
┌─────────────────────────────────┐
│ 🚀 Mobile App Redesign          │
│ Deep Work: 42 hours             │
│ Tasks: 18/25 completed          │
└─────────────────────────────────┘

Mode Discrétion:
┌─────────────────────────────────┐
│ 📦 Project P-ABC                │
│ Deep Work: A+ grade             │
│ Tasks: ★★★★ rating             │
└─────────────────────────────────┘
```

## 🔗 API Endpoints

```typescript
// Projets
GET    /api/projects              # Tous les projets
POST   /api/projects              # Créer un projet
GET    /api/projects/:id          # Détails d'un projet
PUT    /api/projects/:id          # Modifier un projet
DELETE /api/projects/:id          # Supprimer un projet

// Tâches
GET    /api/projects/:id/tasks    # Tâches d'un projet
POST   /api/projects/:id/tasks    # Créer une tâche
PUT    /api/tasks/:id             # Modifier une tâche
DELETE /api/tasks/:id             # Supprimer une tâche

// Métriques
GET    /api/projects/:id/metrics  # Métriques d'un projet
POST   /api/metrics               # Ajouter une métrique
DELETE /api/metrics/:id           # Supprimer une métrique

// Participants
GET    /api/participants          # Tous les participants
POST   /api/participants          # Ajouter un participant
GET    /api/projects/:id/participants
POST   /api/projects/:id/participants # Assigner à projet
DELETE /api/projects/:id/participants/:pid # Retirer du projet

// Custom Fields
GET    /api/projects/:id/custom-fields
POST   /api/projects/:id/custom-fields
PUT    /api/custom-fields/:id
DELETE /api/custom-fields/:id
```

## 🚀 Prochaines Étapes

### Phase 1 : Foundation ✅
- [x] Structure Next.js
- [x] Schéma base de données
- [x] Composants UI
- [x] Pages principales

### Phase 2 : Backend API 🔄
- [ ] Routes API pour CRUD
- [ ] Authentification Supabase
- [ ] Websockets pour temps réel
- [ ] Tests unitaires

### Phase 3 : Graphique & Dépendances
- [ ] Visualisation D3.js/Recharts des relations
- [ ] Drag & drop pour tâches
- [ ] Timeline des projets
- [ ] Gantt chart

### Phase 4 : Premium
- [ ] Exports PDF/CSV
- [ ] Webhooks & intégrations (Slack, GitHub)
- [ ] Mobile app
- [ ] Notifications en temps réel
- [ ] Collaboration temps réel

## 🛠️ Technologies

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, PostCSS |
| State | Zustand |
| Forms | React Hook Form |
| Charts | Recharts |
| Backend | Supabase (PostgreSQL) |
| Icons | Lucide React |
| HTTP | Axios |
| Dates | Date-fns |

## 📝 Example: Créer un Projet

```typescript
// pages/projects.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const newProject = await createProject({
      name: 'Dashboard V2',
      description: 'Refactor dashboard',
      status: 'active',
      priority: 'high',
      startDate: new Date().toISOString().split('T')[0],
      progress: 0,
      ownerId: 'user-123',
    });
    console.log('Projet créé:', newProject);
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

## 🤝 Contribution

Les contributions sont bienvenues ! Pour ajouter une nouvelle fonctionnalité :

1. Créer une branche : `git checkout -b feature/my-feature`
2. Commit : `git commit -am 'Add my feature'`
3. Push : `git push origin feature/my-feature`
4. Pull Request : Ouvrir une PR avec description

## 📄 License

MIT

## 📞 Support

Pour questions ou bugs :
- Créer une issue sur GitHub
- Email : support@dashboard.dev

---

**Built with ❤️ for developers who love to track their projects** 🚀
