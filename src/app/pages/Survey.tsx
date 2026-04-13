import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export function Survey() {
  const navigate = useNavigate();
  const { setSurveyData } = useApp();

  const [dietPreferences, setDietPreferences] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);

  const dietOptions = [
    'Low Calorie',
    'High Protein',
    'Low Fat',
    'Low Carb',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
  ];

  const scheduleOptions = [
    'Quick meals (< 20 min)',
    'Medium prep (20-40 min)',
    'Batch cooking',
    'Meal prep friendly',
  ];

  const budgetOptions = [
    'Under $5 per meal',
    '$5-$10 per meal',
    '$10-$15 per meal',
    'Premium ($15+)',
  ];

  const toggleOption = (
    option: string,
    current: string[],
    setter: (val: string[]) => void
  ) => {
    if (current.includes(option)) {
      setter(current.filter((o) => o !== option));
    } else {
      setter([...current, option]);
    }
  };

  const handleSubmit = () => {
    setSurveyData({
      dietPreferences,
      schedule,
      budget,
    });
    navigate('/recipes');
  };

  return (
    <Layout title="Survey">
      <div className="p-6 space-y-6 pb-24">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Tell us about yourself
          </h2>
          <p className="text-gray-600 text-sm">
            We'll generate personalized recipes for you
          </p>
        </div>

        {/* Diet Preferences */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🥗</span>
            <h3 className="font-semibold text-gray-800">Diet Preferences</h3>
          </div>
          <div className="space-y-2">
            {dietOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option, dietPreferences, setDietPreferences)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  dietPreferences.includes(option)
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Time & Schedule */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⏰</span>
            <h3 className="font-semibold text-gray-800">Time & Schedule</h3>
          </div>
          <div className="space-y-2">
            {scheduleOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option, schedule, setSchedule)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  schedule.includes(option)
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💰</span>
            <h3 className="font-semibold text-gray-800">Budget</h3>
          </div>
          <div className="space-y-2">
            {budgetOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option, budget, setBudget)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  budget.includes(option)
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={dietPreferences.length === 0 && schedule.length === 0 && budget.length === 0}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Recipes
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
}
