import { useParams, useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { mockRecipes } from '../data/mockRecipes';
import { Clock, Users, ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedRecipes, addSavedRecipe, removeSavedRecipe } = useApp();

  const recipe = mockRecipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <Layout title="Recipe Not Found">
        <div className="p-6 text-center">
          <p className="text-gray-600">Recipe not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-orange-500 font-semibold"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  const isRecipeSaved = savedRecipes.some(r => r.id === recipe.id);

  const toggleSaveRecipe = () => {
    if (isRecipeSaved) {
      removeSavedRecipe(recipe.id);
    } else {
      addSavedRecipe(recipe);
    }
  };

  return (
    <Layout title="Recipe">
      <div className="pb-6">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={toggleSaveRecipe}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            {isRecipeSaved ? (
              <BookmarkCheck className="w-5 h-5 text-orange-500" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{recipe.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-3 text-lg">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-3 text-lg">Instructions</h2>
            <ol className="space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
}
