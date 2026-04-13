import { useParams, useNavigate, useLocation } from 'react-router';
import { Layout } from '../components/Layout';
import { mockRecipes } from '../data/mockRecipes';
import { Clock, Users, ArrowLeft } from 'lucide-react';

export function MealPrepInstructions() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const day = location.state?.day || 'This Day';

  const recipe = mockRecipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <Layout title="Meal Prep">
        <div className="p-6 text-center">
          <p className="text-gray-600">Recipe not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Weekly Meal Prep Instructions">
      <div className="pb-6">
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="pt-8">
            <div className="text-sm font-semibold mb-1">{day}</div>
            <h1 className="text-2xl font-bold mb-2">{recipe.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">🛒</span>
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-purple-600 rounded"
                  />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">👨‍🍳</span>
              Steps
            </h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1 pt-0.5">
                    <p>{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-2">✅ Storage Tips</h3>
            <p className="text-sm text-green-700">
              Store in an airtight container in the refrigerator for up to 3-4 days.
              Reheat in microwave for 2-3 minutes or until heated through.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
