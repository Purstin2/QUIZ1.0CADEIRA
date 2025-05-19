import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type AgeRange = '35-44' | '45-54' | '55-64' | '65+' | null;
type ChairYogaExperience = 'regular' | 'tried' | 'never' | null;
type BodyType = 'normal' | 'curvy' | 'plus' | null;
type DreamBody = 'fit' | 'athletic' | 'shapely' | 'content' | null;

export interface Goal {
  id: string;
  title: string;
  description: string;
  icon: string;
  selected: boolean;
}

interface QuizContextType {
  ageRange: AgeRange;
  setAgeRange: (age: AgeRange) => void;
  goals: Goal[];
  toggleGoal: (id: string) => void;
  chairYogaExperience: ChairYogaExperience;
  setChairYogaExperience: (experience: ChairYogaExperience) => void;
  bodyType: BodyType;
  setBodyType: (type: BodyType) => void;
  dreamBody: DreamBody;
  setDreamBody: (type: DreamBody) => void;
  getNextRoute: (currentRoute: string) => string;
  selectedGoalsCount: number;
  setSelectedGoalsCount: (count: number) => void;
  exerciseStyle: string[];
  setExerciseStyle: (styles: string[]) => void;
  availableTime: string | null;
  setAvailableTime: (time: string | null) => void;
  bodyMassIndex: number | null;
  setBodyMassIndex: (bmi: number) => void;
  yogaLevel: string | null;
  setYogaLevel: (level: string | null) => void;
  selectedPlan: 'starter' | 'complete' | 'premium' | null;
  setSelectedPlan: (plan: 'starter' | 'complete' | 'premium' | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
  sessionId: string | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState<AgeRange>(null);
  const [chairYogaExperience, setChairYogaExperience] = useState<ChairYogaExperience>(null);
  const [bodyType, setBodyType] = useState<BodyType>(null);
  const [dreamBody, setDreamBody] = useState<DreamBody>(null);
  const [selectedGoalsCount, setSelectedGoalsCount] = useState(0);
  const [exerciseStyle, setExerciseStyle] = useState<string[]>([]);
  const [availableTime, setAvailableTime] = useState<string | null>(null);
  const [bodyMassIndex, setBodyMassIndex] = useState<number | null>(null);
  const [yogaLevel, setYogaLevel] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'complete' | 'premium' | null>('complete');
  const [email, setEmail] = useState<string | null>(null);

  // Initialize session on first load
  useEffect(() => {
    const initSession = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_sessions')
          .insert([{
            last_step: '/',
            user_agent: navigator.userAgent
          }])
          .select()
          .single();

        if (error) throw error;
        setSessionId(data.id);
      } catch (err) {
        console.error('Error creating session:', err);
      }
    };

    initSession();
  }, []);

  // Update session progress on route change
  useEffect(() => {
    const updateProgress = async (path: string) => {
      if (!sessionId) return;

      try {
        await supabase
          .from('quiz_sessions')
          .update({ 
            last_step: path,
            completed: path === '/success',
            email: email // Update email if available
          })
          .eq('id', sessionId);
      } catch (err) {
        console.error('Error updating session:', err);
      }
    };

    // Listen for route changes
    const handleRouteChange = () => {
      updateProgress(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [sessionId, email]);

  const quizSequence = [
    '/',
    '/goals',
    '/body-type',
    '/dream-body',
    '/target-zones',
    '/chair-yoga-experience',
    '/activity-level',
    '/sensitivity-check',
    '/support-step',
    '/exercise-style',
    '/available-time',
    '/bmi-calculator',
    '/profile-summary',
    '/results',
    '/sales',
    '/checkout',
    '/success'
  ];

  const getNextRoute = (currentRoute: string): string => {
    const currentIndex = quizSequence.indexOf(currentRoute);
    if (currentIndex === -1 || currentIndex === quizSequence.length - 1) {
      return '/';
    }
    return quizSequence[currentIndex + 1];
  };

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'lose-weight',
      title: 'Perder peso',
      description: 'Queimar esses quilos extras',
      icon: '🔥',
      selected: false,
    },
    {
      id: 'manage-mood',
      title: 'Controlar mudanças de humor',
      description: 'Sentir-se mais equilibrada e menos estressada',
      icon: '🍃',
      selected: false,
    },
    {
      id: 'balance-hormones',
      title: 'Equilibrar hormônios',
      description: 'Reduzir sintomas da menopausa',
      icon: '💧',
      selected: false,
    },
    {
      id: 'improve-mobility',
      title: 'Melhorar mobilidade',
      description: 'Manter as articulações saudáveis e prevenir artrite',
      icon: '✅',
      selected: true,
    },
    {
      id: 'enhance-skin',
      title: 'Melhorar a pele',
      description: 'Alcançar um brilho mais jovial e reduzir rugas',
      icon: '✨',
      selected: false,
    },
    {
      id: 'improve-heart',
      title: 'Melhorar saúde cardíaca',
      description: 'Controlar pressão arterial e colesterol',
      icon: '💜',
      selected: false,
    },
  ]);

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, selected: !goal.selected } : goal
      )
    );
  };

  return (
    <QuizContext.Provider
      value={{
        ageRange,
        setAgeRange,
        goals,
        toggleGoal,
        chairYogaExperience,
        setChairYogaExperience,
        bodyType,
        setBodyType,
        dreamBody,
        setDreamBody,
        getNextRoute,
        selectedGoalsCount,
        setSelectedGoalsCount,
        exerciseStyle,
        setExerciseStyle,
        availableTime,
        setAvailableTime,
        bodyMassIndex,
        setBodyMassIndex,
        yogaLevel,
        setYogaLevel,
        selectedPlan,
        setSelectedPlan,
        email,
        setEmail,
        sessionId
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};