import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, CoinsIcon } from 'lucide-react';
import { Coin } from '../types/coin';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
interface CoinCardProps {
  coin: Coin;
  viewMode: 'grid' | 'list';
  onDelete: (id: string) => void;
}
export function CoinCard({
  coin,
  viewMode,
  onDelete
}: CoinCardProps) {
  const navigate = useNavigate();
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this coin?')) {
      onDelete(coin.id);
    }
  };
  if (viewMode === 'list') {
    return <Card onClick={() => navigate(`/coin/${coin.id}`)} className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              {coin.image ? <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                  <CoinsIcon className="w-8 h-8 text-gray-400" />
                </div>}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {coin.name}
              </h3>
              <p className="text-sm text-gray-600">
                {coin.year} • {coin.country}
              </p>
              <p className="text-sm text-gray-500">{coin.denomination}</p>
            </div>
            <div className="flex items-center gap-4">
              {coin.value !== undefined && coin.value > 0 && <div className="text-right">
                  <p className="text-sm text-gray-600">Value</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${coin.value.toFixed(2)}
                  </p>
                </div>}
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <TrashIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card onClick={() => navigate(`/coin/${coin.id}`)} className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
      <div className="aspect-square bg-gray-100 relative">
        {coin.image ? <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
            <CoinsIcon className="w-16 h-16 text-gray-400" />
          </div>}
        <Button variant="destructive" size="icon" onClick={handleDelete} className="absolute top-2 right-2 shadow-lg">
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
          {coin.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {coin.year} • {coin.country}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{coin.denomination}</span>
          {coin.value !== undefined && coin.value > 0 && <Badge>${coin.value.toFixed(2)}</Badge>}
        </div>
      </CardContent>
    </Card>;
}