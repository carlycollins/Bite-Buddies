import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { ChefHat, ScanBarcode, ShoppingBag } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  const mainActions = [
    {
      label: 'Generate Recipes for Me',
      description: 'Get personalized recipes based on your preferences',
      icon: ChefHat,
      onClick: () => navigate('/survey'),
      gradient: 'from-orange-400 to-pink-500',
    },
    {
      label: 'Scan My Pantry',
      description: 'Upload your pantry items to find matching meals',
      icon: ScanBarcode,
      onClick: () => navigate('/scan-pantry'),
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      label: 'Generate Grocery List',
      description: 'Create a custom grocery list for your favorite stores',
      icon: ShoppingBag,
      onClick: () => navigate('/grocery-filters'),
      gradient: 'from-green-400 to-emerald-500',
    },
  ];

  return (
    <Layout title="Bite Buddies">
      <div className="p-6 space-y-6">
        {/* App Title/Logo */}
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🍳</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bite Buddies</h2>
          <p className="text-gray-600">
            Your meal planning companion for saving money and time
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="space-y-4">
          {mainActions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`w-full bg-gradient-to-r ${action.gradient} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <action.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg mb-1">{action.label}</h3>
                  <p className="text-white/90 text-sm">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Why Bite Buddies?</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-500">💰</div>
              <p className="text-xs text-gray-600 mt-1">Save Money</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">⏰</div>
              <p className="text-xs text-gray-600 mt-1">Save Time</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">🥗</div>
              <p className="text-xs text-gray-600 mt-1">Eat Healthy</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
