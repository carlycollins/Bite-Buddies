import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { Calendar } from 'lucide-react';

export function MyMealPlan() {
  const navigate = useNavigate();
  const { selectedMeals } = useApp();

  return (
    <Layout title="My Meal Plan">
      <div className="p-6 space-y-4">
        {selectedMeals.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No meal plan yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create a weekly meal plan to stay organized
            </p>
            <button
              onClick={() => navigate('/scan-pantry')}
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Start Meal Planning
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-1">This Week's Plan</h2>
              <p className="text-white/90 text-sm">
                {selectedMeals.length} meals scheduled
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
                      <div className="text-sm font-semibold text-purple-600 mb-1">
                        {meal.day}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {meal.recipe.name}
                      </h3>
                      <p className="text-sm text-gray-600">{meal.recipe.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/weekly-meal-plan')}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              View Full Plan
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
