import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, SearchIcon, GridIcon, ListIcon } from 'lucide-react';
import { Coin } from '../types/coin';
import { storageUtils } from '../utils/storage';
import { CoinCard } from '../components/CoinCard';
import { SearchBar } from '../components/SearchBar';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
export function Dashboard() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    loadCoins();
  }, []);
  useEffect(() => {
    filterCoins();
  }, [searchQuery, coins]);
  const loadCoins = async () => {
    const loadedCoins = await storageUtils.getCoins();
    setCoins(loadedCoins);
  };
  const filterCoins = () => {
    if (!searchQuery.trim()) {
      setFilteredCoins(coins);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = coins.filter(coin => coin.name.toLowerCase().includes(query) || coin.country.toLowerCase().includes(query) || coin.year.toString().includes(query) || coin.denomination.toLowerCase().includes(query));
    setFilteredCoins(filtered);
  };
  const handleDelete = async (id: string) => {
    await storageUtils.deleteCoin(id);
    loadCoins();
  };
  return <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:w-96">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex gap-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}>
              <GridIcon className="w-5 h-5" />
            </Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}>
              <ListIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600 mb-1">Total Coins</div>
              <div className="text-3xl font-bold text-gray-900">
                {coins.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600 mb-1">Total Value</div>
              <div className="text-3xl font-bold text-gray-900">
                $
                {coins.reduce((sum, coin) => sum + (coin.value || 0), 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600 mb-1">Countries</div>
              <div className="text-3xl font-bold text-gray-900">
                {new Set(coins.map(c => c.country)).size}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Coins Grid/List */}
        {filteredCoins.length === 0 ? <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <SearchIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {coins.length === 0 ? 'No coins yet' : 'No coins found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {coins.length === 0 ? 'Start building your collection by adding your first coin' : 'Try adjusting your search terms'}
            </p>
            {coins.length === 0 && <Button onClick={() => navigate('/add')}>
                <PlusIcon className="w-5 h-5 mr-2" />
                Add First Coin
              </Button>}
          </div> : <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredCoins.map(coin => <CoinCard key={coin.id} coin={coin} viewMode={viewMode} onDelete={handleDelete} />)}
          </div>}
      </main>
      {/* Floating Action Button */}
      <Button onClick={() => navigate('/add')} size="icon" className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg">
        <PlusIcon className="w-6 h-6" />
      </Button>
    </div>;
}