import { useNavigate, useLocation } from 'react-router';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { MapPin, Star, DollarSign } from 'lucide-react';

const mockStores = [
  {
    id: '1',
    name: 'Walmart',
    distance: '0.5 mi',
    rating: '4.2',
    description: 'Everyday low prices on groceries and household items',
    priceLevel: '$',
  },
  {
    id: '2',
    name: 'CVS',
    distance: '1.2 mi',
    rating: '4.4',
    description: 'Convenient pharmacy with grocery essentials',
    priceLevel: '$$',
  },
  {
    id: '3',
    name: 'Kroger',
    distance: '2.1 mi',
    rating: '4.3',
    description: 'Fresh produce and weekly deals',
    priceLevel: '$',
  },
  {
    id: '4',
    name: 'Whole Foods',
    distance: '3.5 mi',
    rating: '4.5',
    description: 'Organic and natural products',
    priceLevel: '$$$',
  },
  {
    id: '5',
    name: 'Target',
    distance: '1.8 mi',
    rating: '4.6',
    description: 'Quality groceries and household goods',
    priceLevel: '$$',
  },
];

export function StoreList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedStore, setGroceryList } = useApp();
  const filters = location.state?.filters || [];

  const handleSelectStore = (store: typeof mockStores[0]) => {
    setSelectedStore(store);
    
    // Generate mock grocery list
    const mockGroceryList = [
      {
        id: '1',
        name: 'Rice',
        quantity: '2 Bags',
        price: '$3.49/ea',
        image: '🍚',
      },
      {
        id: '2',
        name: 'Chicken',
        quantity: '1 lb.',
        price: '$7.50/lb',
        image: '🍗',
      },
      {
        id: '3',
        name: 'Tomatoes',
        quantity: '1 lb.',
        price: '$2.99/lb',
        image: '🍅',
      },
      {
        id: '4',
        name: 'Pasta',
        quantity: '1 Box',
        price: '$1.99/ea',
        image: '🍝',
      },
      {
        id: '5',
        name: 'Eggs',
        quantity: '1 Dozen',
        price: '$4.29/ea',
        image: '🥚',
      },
    ];
    setGroceryList(mockGroceryList);
    
    navigate('/grocery-list');
  };

  const getFilterLabel = () => {
    if (filters.includes('price')) return 'Sorted by Price';
    if (filters.includes('distance')) return 'Sorted by Distance';
    return 'Stores Near You';
  };

  return (
    <Layout title="Stores">
      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-1">{getFilterLabel()}</h2>
          <p className="text-white/90 text-sm">
            Select a store to generate your grocery list
          </p>
        </div>

        <div className="space-y-3">
          {mockStores.map((store) => (
            <button
              key={store.id}
              onClick={() => handleSelectStore(store)}
              className="w-full bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {store.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{store.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{store.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">{store.priceLevel}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{store.description}</p>
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Did you know?</h3>
          <p className="text-sm text-blue-700">
            Shopping at stores closer to you can save on gas and reduce your carbon footprint!
          </p>
        </div>
      </div>
    </Layout>
  );
}
