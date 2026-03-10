# 🚀 Installation Guide - Developer Dashboard

## Pré-requis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase gratuit
- Git

## 1️⃣ Setup Supabase

### Créer un projet Supabase

1. Aller sur https://supabase.com
2. Cliquer sur "New Project"
3. Entrer un nom : `developer-dashboard`
4. Choisir une région (Europe de préférence)
5. Attendre le déploiement (2-3 min)

### Récupérer les clés

1. Aller dans **Settings** → **API**
2. Copier :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

## 2️⃣ Exécuter les migrations SQL

1. Dans **Supabase Dashboard** → **SQL Editor**
2. Cliquer sur **New Query**
3. Copier le contenu complet de `migrations/001_initial_schema.sql`
4. Coller dans l'éditeur
5. Cliquer **Run**
6. ✅ Attendre la confirmation

## 3️⃣ Installation locale

```bash
# Clone ou navigue vers le dossier du projet
cd /home/chahir/labs/projectone

# Installer les dépendances
npm install

# ou avec yarn
yarn install
```

## 4️⃣ Configuration .env

```bash
# Copier le fichier d'exemple
cp .env.example .env.local

# Remplir les variables avec vos clés Supabase
# Éditer .env.local et ajouter :
NEXT_PUBLIC_SUPABASE_URL=https://votre-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_key_ici
SUPABASE_SERVICE_ROLE_KEY=votre_service_key_ici
```

## 5️⃣ Démarrer le serveur

```bash
# Mode développement
npm run dev

# Ou avec yarn
yarn dev
```

## 6️⃣ Accéder au dashboard

```
http://localhost:3000
```

## ✅ Vérification

1. Accédez à `http://localhost:3000`
2. Vous devriez voir le dashboard home
3. Essayez de :
   - Créer un projet (Projects)
   - Ajouter une tâche (Tasks)
   - Ajouter un participant (Participants)
   - Activer le mode discrétion (Settings)

## 🆘 Troubleshooting

### Erreur : "Cannot read property 'supabase'"
- Vérifier que `.env.local` est bien rempli
- Redémarrer le serveur dev : `Ctrl+C` puis `npm run dev`

### Erreur Supabase : "Failed to fetch"
- Vérifier l'URL Supabase dans `.env.local`
- Vérifier la connexion internet
- Vérifier dans Supabase Dashboard que les tables existent (SQL Editor)

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

### Node version incompatible
```bash
# Vérifier la version
node --version

# Utiliser nvm pour installer Node 18+
nvm install 18
nvm use 18
```

## 📦 Build pour production

```bash
# Build
npm run build

# Test en local
npm start
```

## 📚 Ressources

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🟢 [Supabase Docs](https://supabase.com/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🦾 [TypeScript](https://www.typescriptlang.org)

## 🎯 Prochains pas

Après l'installation :

1. Explorez le dashboard
2. Créez quelques projets test
3. Ajoutez des participants
4. Testez le mode discrétion
5. Lisez la documentation du code

## 💡 Tips

- Les données sont persistées dans Supabase
- Le mode discrétion est stocké localement (Zustand)
- Les emojis marchent sur tous les navigateurs
- Vous pouvez exporter les données depuis Settings

---

**Questions ?** Consultez le [README.md](./README.md) pour plus d'infos 🚀
