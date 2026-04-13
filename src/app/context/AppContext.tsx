import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PantryItem {
  id: string;
  name: string;
}

interface Recipe {
  id: string;
  name: string;
  image: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
}

interface SelectedMeal {
  recipe: Recipe;
  day: string;
}

interface SurveyData {
  dietPreferences: string[];
  schedule: string[];
  budget: string[];
}

interface Store {
  id: string;
  name: string;
  distance: string;
  rating: string;
  description: string;
}

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  price: string;
  image: string;
}

interface AppContextType {
  pantryItems: PantryItem[];
  setPantryItems: (items: PantryItem[]) => void;
  addPantryItem: (item: PantryItem) => void;
  surveyData: SurveyData | null;
  setSurveyData: (data: SurveyData) => void;
  selectedMeals: SelectedMeal[];
  setSelectedMeals: (meals: SelectedMeal[]) => void;
  addSelectedMeal: (meal: SelectedMeal) => void;
  removeSelectedMeal: (recipeId: string) => void;
  savedRecipes: Recipe[];
  addSavedRecipe: (recipe: Recipe) => void;
  removeSavedRecipe: (recipeId: string) => void;
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
  groceryList: GroceryItem[];
  setGroceryList: (items: GroceryItem[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);

  const addPantryItem = (item: PantryItem) => {
    setPantryItems(prev => [...prev, item]);
  };

  const addSelectedMeal = (meal: SelectedMeal) => {
    if (selectedMeals.length < 7) {
      setSelectedMeals(prev => [...prev, meal]);
    }
  };

  const removeSelectedMeal = (recipeId: string) => {
    setSelectedMeals(prev => prev.filter(m => m.recipe.id !== recipeId));
  };

  const addSavedRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      if (!prev.find(r => r.id === recipe.id)) {
        return [...prev, recipe];
      }
      return prev;
    });
  };

  const removeSavedRecipe = (recipeId: string) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  return (
    <AppContext.Provider
      value={{
        pantryItems,
        setPantryItems,
        addPantryItem,
        surveyData,
        setSurveyData,
        selectedMeals,
        setSelectedMeals,
        addSelectedMeal,
        removeSelectedMeal,
        savedRecipes,
        addSavedRecipe,
        removeSavedRecipe,
        selectedStore,
        setSelectedStore,
        groceryList,
        setGroceryList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
