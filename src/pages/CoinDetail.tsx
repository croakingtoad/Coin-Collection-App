import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon } from 'lucide-react';
import { Coin } from '../types/coin';
import { storageUtils } from '../utils/storage';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
export function CoinDetail() {
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [coin, setCoin] = useState<Coin | null>(null);
  useEffect(() => {
    if (id) {
      loadCoin();
    }
  }, [id]);
  const loadCoin = async () => {
    if (!id) return;
    const foundCoin = await storageUtils.getCoinById(id);
    setCoin(foundCoin || null);
  };
  const handleDelete = async () => {
    if (coin && window.confirm('Are you sure you want to delete this coin?')) {
      await storageUtils.deleteCoin(coin.id);
      navigate('/');
    }
  };
  if (!coin) {
    return <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Coin not found</p>
          <Button onClick={() => navigate('/')}>Back to Collection</Button>
        </div>
      </div>;
  }
  return <div className="w-full min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{coin.name}</h1>
            </div>
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Card>
            {coin.image && <div className="w-full h-96 bg-gray-100">
                <img src={coin.image} alt={coin.name} className="w-full h-full object-contain" />
              </div>}
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label>Year</Label>
                  <p className="text-lg text-gray-900">{coin.year}</p>
                </div>
                <div className="space-y-1">
                  <Label>Country</Label>
                  <p className="text-lg text-gray-900">{coin.country}</p>
                </div>
                <div className="space-y-1">
                  <Label>Denomination</Label>
                  <p className="text-lg text-gray-900">{coin.denomination}</p>
                </div>
                {coin.faceValue && <div className="space-y-1">
                    <Label>Face Value</Label>
                    <p className="text-lg text-gray-900">{coin.faceValue}</p>
                  </div>}
                {coin.mintMark && <div className="space-y-1">
                    <Label>Mint Mark</Label>
                    <p className="text-lg text-gray-900">{coin.mintMark}</p>
                  </div>}
                {coin.value !== undefined && coin.value > 0 && <div className="space-y-1">
                    <Label>Estimated Value</Label>
                    <p className="text-lg text-gray-900">
                      ${coin.value.toFixed(2)}
                    </p>
                  </div>}
              </div>
            </CardContent>
          </Card>
          {(coin.grade || coin.gradingCompany || coin.registrationNumber || coin.specialCollection) && <Card>
              <CardHeader>
                <CardTitle>Grading Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coin.grade && <div className="space-y-1">
                      <Label>Grade</Label>
                      <p className="text-lg text-gray-900">{coin.grade}</p>
                    </div>}
                  {coin.gradingCompany && <div className="space-y-1">
                      <Label>Grading Company</Label>
                      <p className="text-lg text-gray-900">
                        {coin.gradingCompany}
                      </p>
                    </div>}
                  {coin.registrationNumber && <div className="space-y-1">
                      <Label>Registration Number</Label>
                      <p className="text-lg text-gray-900">
                        {coin.registrationNumber}
                      </p>
                    </div>}
                  {coin.specialCollection && <div className="space-y-1">
                      <Label>Special Collection</Label>
                      <p className="text-lg text-gray-900">
                        {coin.specialCollection}
                      </p>
                    </div>}
                </div>
              </CardContent>
            </Card>}
          {(coin.composition || coin.weight) && <Card>
              <CardHeader>
                <CardTitle>Physical Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coin.composition && <div className="space-y-1">
                      <Label>Composition</Label>
                      <p className="text-lg text-gray-900">
                        {coin.composition}
                      </p>
                    </div>}
                  {coin.weight !== undefined && coin.weight > 0 && <div className="space-y-1">
                      <Label>Weight</Label>
                      <p className="text-lg text-gray-900">{coin.weight}g</p>
                    </div>}
                </div>
              </CardContent>
            </Card>}
          {coin.description && <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900">{coin.description}</p>
              </CardContent>
            </Card>}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-1">
                <Label>Date Added</Label>
                <p className="text-gray-900">
                  {new Date(coin.dateAdded).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>;
}