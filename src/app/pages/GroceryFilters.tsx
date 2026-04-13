import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { ArrowRight } from 'lucide-react';

export function GroceryFilters() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: 'price', label: 'View Stores By Price', icon: '💰' },
    { id: 'distance', label: 'View Stores By Distance', icon: '📍' },
    { id: 'promotions', label: 'View Active Promotions in the Area', icon: '🎉' },
    { id: 'compare', label: 'Compare Prices By Item', icon: '🔍' },
  ];

  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(prev => prev.filter(f => f !== filterId));
    } else {
      setSelectedFilters(prev => [...prev, filterId]);
    }
  };

  const handleContinue = () => {
    navigate('/store-list', { state: { filters: selectedFilters } });
  };

  return (
    <Layout title="My Groceries">
      <div className="p-6 space-y-6 pb-24">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Find Your Store
          </h2>
          <p className="text-gray-600 text-sm">
            Select how you'd like to search for grocery stores
          </p>
        </div>

        <div className="space-y-3">
          {filterOptions.map((option) => {
            const isSelected = selectedFilters.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleFilter(option.id)}
                className={`w-full bg-white rounded-xl p-5 shadow-sm transition-all ${
                  isSelected
                    ? 'ring-2 ring-green-500 bg-green-50'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{option.icon}</div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800">
                      {option.label}
                    </h3>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-blue-700">
            Select multiple filters to find the best store that matches all your criteria!
          </p>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={selectedFilters.length === 0}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Stores
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
}
