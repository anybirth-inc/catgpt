import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, LineChart, Settings } from 'lucide-react';

export function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'ホーム' },
    { to: '/records', icon: ClipboardList, label: '記録' },
    { to: '/statistics', icon: LineChart, label: '統計' },
    { to: '/settings', icon: Settings, label: '設定' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="grid grid-cols-4 h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 ${
                isActive ? 'text-indigo-600' : 'text-gray-600'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}