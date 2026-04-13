import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { MapPin, DollarSign } from 'lucide-react';

export function GroceryList() {
  const navigate = useNavigate();
  const { selectedStore, groceryList } = useApp();

  if (!selectedStore || groceryList.length === 0) {
    return (
      <Layout title="My Grocery List">
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-4">No grocery list yet</p>
          <button
            onClick={() => navigate('/grocery-filters')}
            className="text-green-500 font-semibold"
          >
            Generate Grocery List
          </button>
        </div>
      </Layout>
    );
  }

  const total = groceryList.reduce((sum, item) => {
    const price = parseFloat(item.price.match(/\d+\.\d+/)?.[0] || '0');
    const quantity = parseInt(item.quantity.match(/\d+/)?.[0] || '1');
    return sum + (price * quantity);
  }, 0);

  return (
    <Layout title="My Grocery List">
      <div className="p-6 space-y-4">
        {/* Store Header */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-2">{selectedStore.name}</h2>
          <div className="flex items-center gap-3 text-white/90 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{selectedStore.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{selectedStore.priceLevel}</span>
            </div>
          </div>
        </div>

        {/* Grocery Items */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          {groceryList.map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-4">
              <div className="text-3xl">{item.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{item.price}</p>
                <p className="text-xs text-gray-500">
                  ${(parseFloat(item.price.match(/\d+\.\d+/)?.[0] || '0') * parseInt(item.quantity.match(/\d+/)?.[0] || '1')).toFixed(2)} total
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-lg">Estimated Total</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <p className="text-white/80 text-sm mt-1">Plus applicable taxes</p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">🛒 Shopping Tips</h3>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Check for store coupons before shopping</li>
            <li>• Compare unit prices for best value</li>
            <li>• Buy store brand for savings</li>
            <li>• Shop sales and stock up on staples</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border-2 border-green-500 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors">
            Share List
          </button>
          <button className="bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
            Print List
          </button>
        </div>
      </div>
    </Layout>
  );
}
