import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { mockRecipes } from '../data/mockRecipes';
import { useApp } from '../context/AppContext';
import { Check, ArrowRight } from 'lucide-react';

export function MealSelection() {
  const navigate = useNavigate();
  const { selectedMeals, setSelectedMeals } = useApp();
  const [localSelectedMeals, setLocalSelectedMeals] = useState<string[]>([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleMealSelection = (recipeId: string) => {
    if (localSelectedMeals.includes(recipeId)) {
      setLocalSelectedMeals(prev => prev.filter(id => id !== recipeId));
    } else if (localSelectedMeals.length < 7) {
      setLocalSelectedMeals(prev => [...prev, recipeId]);
    }
  };

  const handleContinue = () => {
    // Assign selected recipes to days
    const mealsWithDays = localSelectedMeals.map((recipeId, index) => {
      const recipe = mockRecipes.find(r => r.id === recipeId);
      return {
        recipe: recipe!,
        day: days[index] || days[0],
      };
    });
    setSelectedMeals(mealsWithDays);
    navigate('/weekly-meal-plan');
  };

  return (
    <Layout title="Recommended Meal Plans">
      <div className="p-6 space-y-4 pb-24">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="text-orange-800 text-sm text-center">
            Select up to 7 meals for your weekly plan
            <br />
            <span className="font-semibold">
              {localSelectedMeals.length} of 7 selected
            </span>
          </p>
        </div>

        <div className="space-y-3">
          {mockRecipes.slice(0, 8).map((recipe) => {
            const isSelected = localSelectedMeals.includes(recipe.id);
            const canSelect = localSelectedMeals.length < 7 || isSelected;

            return (
              <button
                key={recipe.id}
                onClick={() => canSelect && toggleMealSelection(recipe.id)}
                disabled={!canSelect}
                className={`w-full bg-white rounded-xl p-4 shadow-sm transition-all ${
                  isSelected
                    ? 'ring-2 ring-green-500 bg-green-50'
                    : canSelect
                    ? 'hover:shadow-md'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Prep: {recipe.time} • {recipe.servings} servings
                    </p>
                  </div>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      {localSelectedMeals.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
