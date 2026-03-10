import React, { useState } from 'react';
import Link from 'next/link';
import { useStealthMode } from '@/hooks/useStealthMode';
import { Button } from './UI';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const stealthMode = useStealthMode();

  const menuItems = [
    { href: '/', label: '🏠 Accueil', icon: '🏠' },
    { href: '/projects', label: '📁 Projets', icon: '📁' },
    { href: '/tasks', label: '✅ Tâches', icon: '✅' },
    { href: '/metrics', label: '📊 Métriques', icon: '📊' },
    { href: '/participants', label: '👥 Participants', icon: '👥' },
    { href: '/settings', label: '⚙️ Paramètres', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-primary">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 bg-secondary border-r border-gray-700 transition-all duration-300 z-40
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-white">
              {stealthMode.enabled ? '🔐' : '📊'} Dev Dashboard
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary rounded transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center px-4 py-3 text-gray-300 hover:bg-primary hover:text-white transition-colors">
              {sidebarOpen ? (
                <span>{item.label}</span>
              ) : (
                <span className="text-xl">{item.icon}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Stealth Mode Toggle */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => stealthMode.toggleStealthMode()}
            className={`
              w-full py-2 rounded transition-colors text-sm font-medium
              ${
                stealthMode.enabled
                  ? 'bg-accent text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            {sidebarOpen ? (stealthMode.enabled ? '🔐 Stealth On' : '👁️ Normal') : '🔐'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
          flex-1 flex flex-col overflow-hidden transition-all duration-300
          ${sidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        {/* Top Bar */}
        <header className="h-16 bg-secondary border-b border-gray-700 flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-white">{title || 'Dashboard'}</h2>
          <div className="flex items-center gap-4">
            {stealthMode.enabled && (
              <span className="text-sm text-warning font-medium">🔐 Mode Discrétion Actif</span>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
