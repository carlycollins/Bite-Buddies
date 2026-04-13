import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { ScanBarcode, Search, ArrowRight, X } from 'lucide-react';

export function ScanPantry() {
  const navigate = useNavigate();
  const { pantryItems, addPantryItem, setPantryItems } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const commonItems = [
    'Rice', 'Pasta', 'Chicken', 'Eggs', 'Milk', 'Bread',
    'Tomatoes', 'Onions', 'Garlic', 'Olive Oil', 'Salt', 'Pepper',
    'Cheese', 'Butter', 'Flour', 'Sugar', 'Potatoes', 'Carrots',
  ];

  const handleAddItem = (itemName: string) => {
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
    };
    addPantryItem(newItem);
  };

  const handleRemoveItem = (itemId: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== itemId));
  };

  const handleSearchAdd = () => {
    if (searchTerm.trim()) {
      handleAddItem(searchTerm.trim());
      setSearchTerm('');
      setShowSearch(false);
    }
  };

  const handleContinue = () => {
    navigate('/meal-selection');
  };

  return (
    <Layout title="Upload Pantry Items">
      <div className="p-6 space-y-6 pb-24">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            What's in your Pantry?
          </h2>
          <p className="text-gray-600 text-sm">
            Scan an item or search for it to upload
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => alert('Barcode scanning would be integrated with device camera')}
            className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-4 rounded-xl flex flex-col items-center gap-2 hover:shadow-lg transition-shadow"
          >
            <ScanBarcode className="w-8 h-8" />
            <span className="font-semibold">Scan</span>
          </button>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-xl flex flex-col items-center gap-2 hover:shadow-lg transition-shadow"
          >
            <Search className="w-8 h-8" />
            <span className="font-semibold">Search</span>
          </button>
        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchAdd()}
                placeholder="Type item name..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              />
              <button
                onClick={handleSearchAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* Current Pantry Items */}
        {pantryItems.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
              Your Pantry ({pantryItems.length} items)
            </h3>
            <div className="flex flex-wrap gap-2">
              {pantryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg flex items-center gap-2"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Add Common Items */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Add</h3>
          <div className="grid grid-cols-3 gap-2">
            {commonItems.map((item) => (
              <button
                key={item}
                onClick={() => handleAddItem(item)}
                disabled={pantryItems.some(p => p.name === item)}
                className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      {pantryItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              See My Meals
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}