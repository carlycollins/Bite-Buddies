import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Clock, Users, BookmarkX, Bookmark } from 'lucide-react';

export function SavedRecipes() {
  const navigate = useNavigate();
  const { savedRecipes, removeSavedRecipe } = useApp();

  return (
    <Layout title="Saved Recipes">
      <div className="p-6 space-y-4">
        {savedRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No saved recipes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Save your favorite recipes to access them quickly
            </p>
            <button
              onClick={() => navigate('/explore-recipes')}
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Explore Recipes
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-1">Your Saved Recipes</h2>
              <p className="text-white/90 text-sm">
                {savedRecipes.length} recipe{savedRecipes.length !== 1 ? 's' : ''} saved
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {savedRecipes.map((recipe) => (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSavedRecipe(recipe.id);
                      }}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <BookmarkX className="w-4 h-4 text-red-500" />
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
          </>
        )}
      </div>
    </Layout>
  );
}
