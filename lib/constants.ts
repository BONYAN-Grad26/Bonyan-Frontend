import { ActivityLevel, Allergy, NutritionData, WorkoutData } from "./interfaces";
import { LayoutDashboard, Apple, Dumbbell, User, Settings ,Ban} from 'lucide-react';

export const baseUrl = process.env.BASE_URL || 'http://localhost:8080/api';

export const staticAllergies : Allergy[] = [
    { id: '1', name: 'Penicillin', type: 'medicine', severity: 'high', notes: 'Causes severe skin rash and shortness of breath.' },
    { id: '2', name: 'Peanuts', type: 'food', severity: 'high', notes: 'Anaphylaxis risk - requires immediate Epinephrine auto-injector.' },
    { id: '3', name: 'Dust & Pollen', type: 'environmental', severity: 'low', notes: 'Triggers allergic rhinitis mostly during spring season.' },
]
export const getSeverityBadge = (severity: string) => {
    switch (severity) {
        case 'high': return 'bg-red-50 text-red-700 border-red-200';
        case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
        default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
};

export const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Meals', href: '/meals', icon: Apple },
  { label: 'Workouts', href: '/workouts', icon: Dumbbell },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
  {label :"Alleries", href:'/alleries' , icon: Ban }
];

// --- 2. Default/Mock Data Formulation ---
export const defaultNutrition: NutritionData = {
  id: 101,
  date: "2026-06-20",
  dayOfWeek: 6, // Saturday
  targetCalories: 2400,
  targetProtein: 160,
  targetCarbs: 250,
  targetFat: 70,
  targetFiber: 35,
  targetSugar: 25,
  waterGoal: 3.5,
  aiDailyTips: "Your activity levels are high today. Prioritize complex carbs 2 hours before your workout session and hit your hydration target early!",
  meals: [
    {
      id: 1,
      name: "High-Protein Oatmeal",
      mealType: "Breakfast",
      description: "Rolled oats cooked with whey protein, topped with fresh berries and chia seeds.",
      preparationTime: 10,
      preparationInstructions: "1. Boil oats in water or almond milk.\n2. Stir in whey protein once cooked off the heat.\n3. Top with berries, chia seeds, and a dash of cinnamon.",
      order: 1,
      ingredients: [
        { ingredientId: 201, ingredientName: "Rolled Oats", quantity: 60, measurementUnit: "g" },
        { ingredientId: 202, ingredientName: "Whey Isolate", quantity: 30, measurementUnit: "g" },
        { ingredientId: 203, ingredientName: "Chia Seeds", quantity: 10, measurementUnit: "g" }
      ]
    },
    {
      id: 2,
      name: "Grilled Chicken & Rice",
      mealType: "Lunch",
      description: "Seasoned chicken breast paired with basmati rice and steamed broccoli.",
      preparationTime: 25,
      preparationInstructions: "1. Grill the marinated chicken breast until internal temp hits 165°F.\n2. Serve alongside fluffy boiled basmati rice.\n3. Side with lightly salted steamed broccoli.",
      order: 2,
      ingredients: [
        { ingredientId: 301, ingredientName: "Chicken Breast", quantity: 200, measurementUnit: "g" },
        { ingredientId: 302, ingredientName: "Basmati Rice", quantity: 150, measurementUnit: "g" },
        { ingredientId: 303, ingredientName: "Broccoli", quantity: 100, measurementUnit: "g" }
      ]
    }
  ]
};

export const defaultWorkout: WorkoutData = {
  session: "Hypertrophy Push Day",
  focus: "Chest, Shoulders & Triceps",
  exercises: [
    {
      name: "Incline Dumbbell Press",
      sets: 4,
      reps: "8-10",
      rest_seconds: 90,
      notes: "Focus on a controlled 3-second eccentric phase. Keep shoulder blades strictly retracted."
    },
    {
      name: "Overhead Barbell Press",
      sets: 3,
      reps: "6-8",
      rest_seconds: 120,
      notes: "Engage your core completely to prevent lower back overarching at peak contraction."
    },
    {
      name: "Tricep Overhead Extensions",
      sets: 4,
      reps: "12-15",
      rest_seconds: 60,
      notes: "Keep elbows tucked in close to your head. Maximize the deep stretch at the bottom."
    }
  ]
};




export const macros = (nutrition:NutritionData) => {
    return [
        { name: 'Protein', value: nutrition.targetProtein, unit: 'g', color: 'bg-emerald-500', textColor: 'text-emerald-700', progress: '75%' },
        { name: 'Carbs', value: nutrition.targetCarbs, unit: 'g', color: 'bg-amber-500', textColor: 'text-amber-700', progress: '60%' },
        { name: 'Fats', value: nutrition.targetFat, unit: 'g', color: 'bg-rose-400', textColor: 'text-rose-700', progress: '45%' },
        { name: 'Fiber', value: nutrition.targetFiber, unit: 'g', color: 'bg-teal-500', textColor: 'text-teal-700', progress: '80%' },
        { name: 'Sugar', value: nutrition.targetSugar, unit: 'g', color: 'bg-slate-400', textColor: 'text-slate-700', progress: '30%' },
    ];
}