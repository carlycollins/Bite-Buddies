import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Survey } from './pages/Survey';
import { Recipes } from './pages/Recipes';
import { RecipeDetail } from './pages/RecipeDetail';
import { ScanPantry } from './pages/ScanPantry';
import { MealSelection } from './pages/MealSelection';
import { WeeklyMealPlan } from './pages/WeeklyMealPlan';
import { MealPrepInstructions } from './pages/MealPrepInstructions';
import { GroceryFilters } from './pages/GroceryFilters';
import { StoreList } from './pages/StoreList';
import { GroceryList } from './pages/GroceryList';
import { MyPantry } from './pages/MyPantry';
import { MyMealPlan } from './pages/MyMealPlan';
import { MyGroceries } from './pages/MyGroceries';
import { ExploreRecipes } from './pages/ExploreRecipes';
import { SavedRecipes } from './pages/SavedRecipes';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Home,
    },
    {
      path: '/survey',
      Component: Survey,
    },
    {
      path: '/recipes',
      Component: Recipes,
    },
    {
      path: '/recipe/:id',
      Component: RecipeDetail,
    },
    {
      path: '/scan-pantry',
      Component: ScanPantry,
    },
    {
      path: '/meal-selection',
      Component: MealSelection,
    },
    {
      path: '/weekly-meal-plan',
      Component: WeeklyMealPlan,
    },
    {
      path: '/meal-prep/:id',
      Component: MealPrepInstructions,
    },
    {
      path: '/grocery-filters',
      Component: GroceryFilters,
    },
    {
      path: '/store-list',
      Component: StoreList,
    },
    {
      path: '/grocery-list',
      Component: GroceryList,
    },
    {
      path: '/my-pantry',
      Component: MyPantry,
    },
    {
      path: '/my-meal-plan',
      Component: MyMealPlan,
    },
    {
      path: '/my-groceries',
      Component: MyGroceries,
    },
    {
      path: '/explore-recipes',
      Component: ExploreRecipes,
    },
    {
      path: '/saved-recipes',
      Component: SavedRecipes,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
