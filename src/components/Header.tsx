import React from 'react';
import { CoinsIcon } from 'lucide-react';
export function Header() {
  return <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <CoinsIcon className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Coin Collection
            </h1>
            <p className="text-sm text-gray-600">
              Manage your numismatic treasures
            </p>
          </div>
        </div>
      </div>
    </header>;
}