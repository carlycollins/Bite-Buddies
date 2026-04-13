import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Clock, ChevronRight } from 'lucide-react';

export function WeeklyMealPlan() {
  const navigate = useNavigate();
  const { selectedMeals } = useApp();

  if (selectedMeals.length === 0) {
    return (
      <Layout title="Weekly Meal Plan">
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-4">No meals selected yet</p>
          <button
            onClick={() => navigate('/scan-pantry')}
            className="text-blue-500 font-semibold"
          >
            Start Meal Planning
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Weekly Meal Prep Instructions">
      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-1">Your Weekly Plan</h2>
          <p className="text-white/90 text-sm">
            {selectedMeals.length} meals planned for the week
          </p>
        </div>

        <div className="space-y-3">
          {selectedMeals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/meal-prep/${meal.recipe.id}`, { state: { day: meal.day } })}
            >
              <div className="flex items-center gap-4 p-4">
                <img
                  src={meal.recipe.image}
                  alt={meal.recipe.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-blue-600 mb-1">
                    {meal.day}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {meal.recipe.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{meal.recipe.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Meal Prep Tips</h3>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Prep ingredients on Sunday for the week</li>
            <li>• Store meals in airtight containers</li>
            <li>• Most meals stay fresh for 3-4 days</li>
            <li>• Freeze portions for later in the week</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
