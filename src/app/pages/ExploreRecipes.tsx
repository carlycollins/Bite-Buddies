import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { mockRecipes } from '../data/mockRecipes';
import { Clock, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ExploreRecipes() {
  const navigate = useNavigate();
  const { savedRecipes, addSavedRecipe, removeSavedRecipe } = useApp();

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  const toggleSaveRecipe = (recipe: typeof mockRecipes[0], e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRecipeSaved(recipe.id)) {
      removeSavedRecipe(recipe.id);
    } else {
      addSavedRecipe(recipe);
    }
  };

  return (
    <Layout title="Explore Recipes">
      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-1">Discover New Recipes</h2>
          <p className="text-white/90 text-sm">
            Browse our collection of student-friendly recipes
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mockRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={(e) => toggleSaveRecipe(recipe, e)}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  {isRecipeSaved(recipe.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-orange-500" />
                  ) : (
                    <Bookmark className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2">
                  {recipe.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
