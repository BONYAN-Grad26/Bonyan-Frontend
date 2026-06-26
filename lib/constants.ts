import { ActivityLevel, AllergenType, Allergy, ApiMealPlanResponse, NutritionData, WorkoutData } from "./interfaces";
import { LayoutDashboard, Apple, Dumbbell, User, Settings ,Ban ,Salad,Workflow} from 'lucide-react';

export const baseUrl = process.env.BASE_URL || 'http://localhost:8080/api';

export const machineUrl = process.env.MACHINE_URL || 'https://fitness-part.onrender.com'

export const workoutUrl = process.env.WORKOUT_URL || 'http://localhost:8080/workout-plan'

export const staticAllergies : Allergy[] = [
    { id: '1', name: 'Penicillin', type: AllergenType.OTHER, severity: 'high', notes: 'Causes severe skin rash and shortness of breath.' },
    { id: '2', name: 'Peanuts', type: AllergenType.NUTS, severity: 'high', notes: 'Anaphylaxis risk - requires immediate Epinephrine auto-injector.' },
    { id: '3', name: 'Dust & Pollen', type: AllergenType.OTHER, severity: 'low', notes: 'Triggers allergic rhinitis mostly during spring season.' },
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
  { label :"ingredients" ,href :"/ingredients?currentPage=1" , icon:Salad},
  {label:"Machine Classifier", href:"/machine-classfier", icon : Workflow},
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
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
        {
          ingredientId: 201, ingredientName: "Rolled Oats", quantity: 60, measurementUnit: "g",
          id: 0,
          name: ""
        },
        {
          ingredientId: 202, ingredientName: "Whey Isolate", quantity: 30, measurementUnit: "g",
          id: 0,
          name: ""
        },
        {
          ingredientId: 203, ingredientName: "Chia Seeds", quantity: 10, measurementUnit: "g",
          id: 0,
          name: ""
        }
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
        {
          ingredientId: 301, ingredientName: "Chicken Breast", quantity: 200, measurementUnit: "g",
          id: 0,
          name: ""
        },
        {
          ingredientId: 302, ingredientName: "Basmati Rice", quantity: 150, measurementUnit: "g",
          id: 0,
          name: ""
        },
        {
          ingredientId: 303, ingredientName: "Broccoli", quantity: 100, measurementUnit: "g",
          id: 0,
          name: ""
        }
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
export const parseDescription = (desc: string) => {
  const calories = parseFloat(desc.match(/Calories:\s*([\d.]+)/)?.[1] || '0');
  const protein = parseFloat(desc.match(/Protein:\s*([\d.]+)g/)?.[1] || '0');
  const carbs = parseFloat(desc.match(/Carbs:\s*([\d.]+)g/)?.[1] || '0');
  const fat = parseFloat(desc.match(/Fat:\s*([\d.]+)g/)?.[1] || '0');
  return { calories, protein, carbs, fat };
};
export const apiData: ApiMealPlanResponse[] = [
  {
    id: 101,
    weekNumber: 26,
    startDate: "2026-06-21",
    endDate: "2026-06-27",
    weeklyCalorieTarget: 15400.0,
    weeklyProteinTarget: 1050.0,
    weeklyCarbTarget: 1925.0,
    weeklyFatTarget: 490.0,
    weeklyStrategy: "Lean Mass Gain & High Energy Maintenance",
    aiPreparationTips: "Drink at least 3L of water and space meals by 3-4 hours.",
    days: [
      {
        id: 1,
        date: "2026-06-21",
        dayOfWeek: 1, // Sunday
        targetCalories: 2200.0,
        targetProtein: 150.0,
        targetCarbs: 275.0,
        targetFat: 70.0,
        targetFiber: 30.0,
        targetSugar: 45.0,
        waterGoal: 3.5,
        aiDailyTips: "Focus on slow-digesting carbs today to sustain steady energy levels.",
        meals: [
          {
            id: 1,
            name: "Power Oatmeal with Greek Yogurt and Berries",
            mealType: "BREAKFAST",
            description: "Calories: 681.8 | Protein: 33.3g | Carbs: 98.1g | Fat: 20.1g",
            order: 1,
            preparationInstructions: "Cook oats with water or low fat milk. Stir in Greek yogurt, top with sliced banana and a portion of almonds.",
            preparationTime: 15,
            ingredients: [
              {
                ingredientId: 23, ingredientName: "Oats", quantity: 100, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 27, ingredientName: "Greek Yogurt", quantity: 100, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 14, ingredientName: "Banana", quantity: 100, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 24, ingredientName: "Almonds", quantity: 25, measurementUnit: "g",
                id: 0,
                name: ""
              }
            ]
          },
          {
            id: 2,
            name: "Grilled Chicken Breast with Brown Rice and Steamed Broccoli",
            mealType: "LUNCH",
            description: "Calories: 497.9 | Protein: 53.3g | Carbs: 32.9g | Fat: 16.9g",
            order: 2,
            preparationInstructions: "Grill chicken breast. Cook brown rice. Steam broccoli. Toss with olive oil.",
            preparationTime: 30,
            ingredients: [
              {
                ingredientId: 18, ingredientName: "Chicken Breast", quantity: 150, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 22, ingredientName: "Brown Rice", quantity: 100, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 17, ingredientName: "Broccoli", quantity: 150, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 29, ingredientName: "Olive Oil", quantity: 10, measurementUnit: "g",
                id: 0,
                name: ""
              }
            ]
          },
          {
            id: 3,
            name: "Baked Salmon with Black Beans and Tomato Salad",
            mealType: "DINNER",
            description: "Calories: 875.4 | Protein: 64.7g | Carbs: 18.6g | Fat: 43.7g",
            order: 3,
            preparationInstructions: "Bake salmon. Cook black beans. Prepare a salad with sliced tomato and olive oil.",
            preparationTime: 25,
            ingredients: [
              {
                ingredientId: 20, ingredientName: "Salmon", quantity: 250, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 30, ingredientName: "Black Beans", quantity: 150, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 15, ingredientName: "Tomato", quantity: 150, measurementUnit: "g",
                id: 0,
                name: ""
              },
              {
                ingredientId: 29, ingredientName: "Olive Oil", quantity: 10, measurementUnit: "g",
                id: 0,
                name: ""
              }
            ]
          }
        ]
      }
    ]
  }
]




export const steps = [
  { title: 'Basic Info', description: 'Your measurements' },
  { title: 'Body Composition', description: 'Muscle & fat %' },
  { title: 'Lifestyle', description: 'Activity level' },
  { title: 'Goals', description: 'Your targets' },
  { title: 'Allergies', description: 'Dietary restrictions' },
  { title: 'Medical Notes', description: 'Health info' },
  { title: 'Analysis', description: 'Your AI plan' },
];

export const stepsInfo = {
  "personalInfo":0,
  "bodyInfo":1,
  "targetInfo":3,
  "medicalInfo":5
}