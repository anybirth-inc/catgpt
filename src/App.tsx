import React from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AppRoutes } from './routes';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppRoutes />
      </main>
      <BottomNav />
    </div>
  );
}

export default App;