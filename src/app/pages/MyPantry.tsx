import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { Plus, Package } from 'lucide-react';

export function MyPantry() {
  const navigate = useNavigate();
  const { pantryItems } = useApp();

  return (
    <Layout title="My Pantry">
      <div className="p-6 space-y-4">
        {pantryItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Your pantry is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding items to find matching recipes
            </p>
            <button
              onClick={() => navigate('/scan-pantry')}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Add Pantry Items
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-1">Your Pantry</h2>
              <p className="text-white/90 text-sm">
                {pantryItems.length} items in your inventory
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="grid grid-cols-2 gap-3">
                {pantryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center"
                  >
                    <div className="text-2xl mb-1">📦</div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/scan-pantry')}
              className="w-full bg-white border-2 border-blue-500 text-blue-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add More Items
            </button>

            <button
              onClick={() => navigate('/meal-selection')}
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Find Recipes
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
