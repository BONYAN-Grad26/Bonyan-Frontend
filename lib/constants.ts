import { ActivityLevel, Allergy } from "./interfaces";
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

