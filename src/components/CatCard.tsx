import React from 'react';
import { Cat } from '../types';
import { Cat as CatIcon, Activity, AlertTriangle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAge } from '../utils/dateUtils';

interface CatCardProps {
  cat: Cat;
}

export function CatCard({ cat }: CatCardProps) {
  const getStatusColor = (status: Cat['healthStatus']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/cats/${cat.id}`} className="block">
        <div className="relative h-48">
          {cat.photos.length > 0 ? (
            <img
              src={cat.photos[0]}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <CatIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full ${getStatusColor(cat.healthStatus)}`}>
            {cat.healthStatus === 'healthy' ? (
              <Activity className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
          <div className="mt-1 text-sm text-gray-600">
            <p>年齢: {getAge(cat.birthDate)}</p>
            <p>品種: {cat.breed}</p>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Link
          to={`/cats/${cat.id}/record`}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          記録を追加
        </Link>
      </div>
    </div>
  );
}