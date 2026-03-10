import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, Button, Input, Select, Badge } from '@/components/UI';
import { useStealthMode } from '@/hooks/useStealthMode';

export default function Settings() {
  const stealthMode = useStealthMode();
  const [appSettings, setAppSettings] = useState({
    appName: 'Developer Dashboard',
    theme: 'dark',
    language: 'en',
    notifications: true,
    emailDigest: 'weekly',
  });

  const [saved, setSaved] = useState(false);

  const handleSaveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout title="⚙️ Paramètres">
      <div className="space-y-8">
        {/* Stealth Mode Settings */}
        <Card title="🔐 Mode Discrétion" description="Cachez les informations sensibles">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary rounded">
              <div>
                <p className="text-white font-medium">Activer Mode Discrétion</p>
                <p className="text-sm text-gray-400">
                  Cache les noms de projets et tâches
                </p>
              </div>
              <button
                onClick={() => stealthMode.toggleStealthMode()}
                className={`
                  px-4 py-2 rounded font-medium transition-colors
                  ${
                    stealthMode.enabled
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-gray-400'
                  }
                `}
              >
                {stealthMode.enabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {stealthMode.enabled && (
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between p-3 bg-primary rounded">
                  <label className="text-white font-medium">
                    🚫 Cacher les noms de projets
                  </label>
                  <input
                    type="checkbox"
                    checked={stealthMode.hideProjectNames}
                    onChange={() => stealthMode.toggleHideProjectNames()}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-primary rounded">
                  <label className="text-white font-medium">
                    🚫 Cacher les noms de tâches
                  </label>
                  <input
                    type="checkbox"
                    checked={stealthMode.hideTaskNames}
                    onChange={() => stealthMode.toggleHideTaskNames()}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-primary rounded">
                  <label className="text-white font-medium">
                    😀 Utiliser les emojis
                  </label>
                  <input
                    type="checkbox"
                    checked={stealthMode.useEmojis}
                    onChange={() => stealthMode.toggleEmojis()}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-primary rounded">
                  <label className="text-white font-medium">
                    🔤 Utiliser les scores codés (A, B, C)
                  </label>
                  <input
                    type="checkbox"
                    checked={stealthMode.useCodedScores}
                    onChange={() => stealthMode.toggleCodedScores()}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* App Settings */}
        <Card title="📱 Paramètres Généraux" description="Configuration de l'application">
          <div className="space-y-4">
            <Input
              label="Nom de l'Application"
              value={appSettings.appName}
              onChange={(e) =>
                setAppSettings({ ...appSettings, appName: e.target.value })
              }
            />

            <Select
              label="Thème"
              value={appSettings.theme}
              onChange={(e) =>
                setAppSettings({ ...appSettings, theme: e.target.value })
              }
              options={[
                { value: 'dark', label: '🌙 Dark' },
                { value: 'light', label: '☀️ Light' },
                { value: 'auto', label: '🔄 Auto' },
              ]}
            />

            <Select
              label="Langue"
              value={appSettings.language}
              onChange={(e) =>
                setAppSettings({ ...appSettings, language: e.target.value })
              }
              options={[
                { value: 'en', label: '🇬🇧 English' },
                { value: 'fr', label: '🇫🇷 Français' },
                { value: 'es', label: '🇪🇸 Español' },
              ]}
            />
          </div>
        </Card>

        {/* Notification Settings */}
        <Card title="🔔 Notifications" description="Préférences de notifications">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-primary rounded">
              <label className="text-white font-medium">Activer les notifications</label>
              <input
                type="checkbox"
                checked={appSettings.notifications}
                onChange={(e) =>
                  setAppSettings({
                    ...appSettings,
                    notifications: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded"
              />
            </div>

            {appSettings.notifications && (
              <Select
                label="Fréquence du résumé email"
                value={appSettings.emailDigest}
                onChange={(e) =>
                  setAppSettings({
                    ...appSettings,
                    emailDigest: e.target.value,
                  })
                }
                options={[
                  { value: 'daily', label: '📅 Quotidien' },
                  { value: 'weekly', label: '📆 Hebdomadaire' },
                  { value: 'monthly', label: '📊 Mensuel' },
                  { value: 'never', label: '🔇 Jamais' },
                ]}
              />
            )}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card
          title="⚠️ Zone Danger"
          description="Actions irréversibles"
          className="border-danger border-2"
        >
          <div className="space-y-3">
            <Button variant="secondary" fullWidth>
              📥 Exporter les données
            </Button>
            <Button variant="secondary" fullWidth>
              🔄 Réinitialiser l'application
            </Button>
            <Button variant="danger" fullWidth>
              🗑️ Supprimer tous les données
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          {saved && (
            <div className="text-green-500 font-medium flex items-center gap-2">
              ✅ Paramètres sauvegardés
            </div>
          )}
          <Button onClick={handleSaveSettings}>💾 Enregistrer</Button>
        </div>

        {/* API Documentation */}
        <Card title="🔌 API & Intégrations" description="Hooks et endpoints">
          <div className="space-y-4">
            <div className="p-4 bg-primary rounded">
              <p className="text-white font-medium mb-2">Base URL API</p>
              <code className="text-xs text-gray-300 bg-black p-2 rounded block break-all">
                https://api.example.com/v1
              </code>
            </div>

            <div className="p-4 bg-primary rounded">
              <p className="text-white font-medium mb-2">Documentation</p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>📖 <a href="/docs" className="text-accent hover:underline">API Docs</a></li>
                <li>🔐 <a href="/docs/auth" className="text-accent hover:underline">Authentication</a></li>
                <li>📚 <a href="/docs/webhooks" className="text-accent hover:underline">Webhooks</a></li>
                <li>🧪 <a href="/playground" className="text-accent hover:underline">API Playground</a></li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
