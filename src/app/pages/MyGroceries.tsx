import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { ShoppingCart } from 'lucide-react';

export function MyGroceries() {
  const navigate = useNavigate();
  const { groceryList, selectedStore } = useApp();

  return (
    <Layout title="My Groceries">
      <div className="p-6 space-y-4">
        {groceryList.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No grocery list yet
            </h3>
            <p className="text-gray-600 mb-6">
              Generate a custom grocery list for your favorite stores
            </p>
            <button
              onClick={() => navigate('/grocery-filters')}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Generate Grocery List
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-1">Current List</h2>
              <p className="text-white/90 text-sm">
                {selectedStore?.name} • {groceryList.length} items
              </p>
            </div>

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
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/grocery-list')}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              View Full List
            </button>

            <button
              onClick={() => navigate('/grocery-filters')}
              className="w-full bg-white border-2 border-green-500 text-green-600 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors"
            >
              Generate New List
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
