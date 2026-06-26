

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

enum ErrorType {
    NOT_FOUND_ERR,
    BAD_REQUEST_ERR,
    UNAUTHORIZED_ERR,
    FORBIDDEN_ERR,
    VALIDATION_ERR,
    INTERNAL_SERVER_ERR,
    NONE
}

type ErrorResonse = {
    message: string;
    type: ErrorType;

}
export interface ResponseData {
    success: boolean;
    error: ErrorResonse;
    data: Record<string, any> | null;



}

export interface TempData  {
  accessToken:string,
  expiresIn:string
}
export enum DietGoal {
  LOSE_WEIGHT = "LOSE_WEIGHT",
  GAIN_MUSCLE = "GAIN_MUSCLE",
  MAINTAIN_WEIGHT = "MAINTAIN_WEIGHT",
  IMPROVE_HEALTH = "IMPROVE_HEALTH",
}

export enum ActivityLevel {
  SEDENTARY = "SEDENTARY",
  LIGHTLY_ACTIVE = "LIGHTLY_ACTIVE",
  MODERATELY_ACTIVE = "MODERATELY_ACTIVE",
  VERY_ACTIVE = "VERY_ACTIVE",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum DietType {
  BALANCED = "BALANCED",
  KETOGENIC = "KETOGENIC",
  VEGETARIAN = "VEGETARIAN",
  VEGAN = "VEGAN",
  PALEO = "PALEO",
  MEDITERRANEAN = "MEDITERRANEAN",
  LOW_CARB = "LOW_CARB",
  HIGH_PROTEIN = "HIGH_PROTEIN",
  INTERMITTENT_FASTING = "INTERMITTENT_FASTING",
}
export interface OnboardingData {
  // Basic Info
  age: number;
  gender: Gender ;
  height: number;
  weight: number;
  // Body Composition
  musclePercentage: number;
  fatPercentage: number;
  // Lifestyle
  activityLevel: ActivityLevel;
  // Goals
  dietGoal: DietGoal;
  targetWeight: number;
  dailyCalories: number;
  dietType: DietType;
  // Allergies
  allergies: string[];
  // Medical Notes
  medicalNotes: string;
}

export interface HealthData {
  "age": number;
  "weightKg": number;
  "heightCm": number;
  "muscleMassKg": number;
  "fatPercentage": number;
  "gender": Gender;
  "activityLevel": ActivityLevel;
  "medicalNotes": string;
  "dietType": DietType;
  "dietGoal": DietGoal;
  "targetWeightKg": number;
  "dailyCalorieTarget": number;
}

export interface HealthProfileData {
  id: number;
  age: number;
  weightKg: number;
  heightCm: number;
  muscleMassKg: number;
  fatPercentage: number;

  gender: Gender;
  activityLevel: ActivityLevel;

  medicalNotes: string | null;

  dietType: DietType;
  dietGoal: DietGoal;

  bmi: number;
  bmiCategory: string | null;

  tdee: number;

  fatMass: number;
  leanMass: number;

  bodyFatCategory: string | null;

  targetWeightKg: number;
  dailyCalorieTarget: number;
}


// Define layout structure for Allergy data
export interface Allergy {
  id: string;
  name: string;
  type: AllergenType;
  severity: 'low' | 'medium' | 'high';
  notes: string;
}

export interface AllergyFromServer {
    id:number ;
    name:string;
    description:string;
    type:string;
    userEmail:string


}




export enum AllergenType {
    GLUTEN = "GLUTEN",
    LUPIN = "LUPIN",
    CRUSTACEAN = "CRUSTACEAN",
    EGG = "EGG",
    FISH = "FISH",
    MICE = "MICE",
    SHELLFISH = "SHELLFISH",
    SOY = "SOY",
    WHEAT = "WHEAT",
    NUTS = "NUTS",
    OTHER = "OTHER"
}


export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  measurementUnit: string;
}

export interface Meal {
  id: number;
  name: string;
  mealType: string;
  description: string;
  preparationTime: number;
  preparationInstructions: string;
  order: number;
  ingredients: Array<Ingredient>;
}

export interface NutritionData {
  id: number;
  date: string;
  dayOfWeek: number;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  targetFiber: number;
  targetSugar: number;
  waterGoal: number;
  aiDailyTips: string;
  meals: Array<Meal>;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  notes: string;
}

export interface WorkoutData {
  session: string;
  focus: string;
  exercises: Array<Exercise>;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface MachineData {
  "label": string,
  "confidence": number,
  "video_url": string
}

export interface IngredientData {
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  measurementUnit: string; // مثل "g" أو "ml" إلخ
}

export interface Meal {
  id: number;
  name: string;
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | string; 
  description: string; 
  order: number;
  preparationInstructions: string ;
  preparationTime: number ;
  ingredients: IngredientData[];
}

export interface DayPlan {

  id: number;
  date: string;                     // صيغة تاريخ "YYYY-MM-DD"
  dayOfWeek: number;                // int32 يمثل ترتيب اليوم
  targetCalories: number;           // double
  targetProtein: number;            // double
  targetCarbs: number;              // double
  targetFat: number;                // double
  targetFiber: number;              // double
  targetSugar: number;              // double
  waterGoal: number;                // double
  aiDailyTips: string ;
  meals: Meal[];
}

export interface ApiMealPlanResponse {
  id: number;
  weekNumber: number;
  startDate: string;
  endDate: string;
  weeklyCalorieTarget: number;
  weeklyProteinTarget: number;
  weeklyCarbTarget: number;
  weeklyFatTarget: number;
  weeklyStrategy: string;
  aiPreparationTips: string | null;
  days: DayPlan[];
}
export interface Exercise {
  name: string;
  sets: number;
  reps: string; 
  rest_seconds: number;
  notes: string;
}

export interface DaySession {
  session: string; 
  focus: string;   
  exercises: Exercise[]; 
}

export interface WeeklySchedule {
  Monday: DaySession;
  Tuesday: DaySession;
  Wednesday: DaySession;
  Thursday: DaySession;
  Friday: DaySession;
  Saturday: DaySession;
  Sunday: DaySession;
}

export interface PlanData {
  plan_name: string;
  split_type: string;
  split_reasoning: string;
  weekly_schedule: WeeklySchedule;
}



