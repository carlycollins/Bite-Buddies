import { Home, Package, Calendar, ShoppingCart, Compass, Bookmark, X } from 'lucide-react';
import { Link } from 'react-router';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'My Pantry', path: '/my-pantry', icon: Package },
    { label: 'My Meal Plan', path: '/my-meal-plan', icon: Calendar },
    { label: 'My Groceries', path: '/my-groceries', icon: ShoppingCart },
    { label: 'Explore Recipes', path: '/explore-recipes', icon: Compass },
    { label: 'Saved Recipes', path: '/saved-recipes', icon: Bookmark },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 border-b border-gray-100"
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
