import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Records } from '../pages/Records';
import { Statistics } from '../pages/Statistics';
import { Settings } from '../pages/Settings';
import { CatDetails } from '../pages/CatDetails';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cats/:id" element={<CatDetails />} />
      <Route path="/cats/:id/record" element={<CatDetails />} />
      <Route path="/records" element={<Records />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}