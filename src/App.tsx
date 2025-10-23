import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Dashboard } from './pages/Dashboard';
import { AddCoin } from './pages/AddCoin';
import { CoinDetail } from './pages/CoinDetail';
export function App() {
  return <div className="w-full min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddCoin />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" expand={true} richColors closeButton />
    </div>;
}