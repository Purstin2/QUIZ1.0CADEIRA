import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AgeSelection from './components/AgeSelection';
import SexSelection from './components/SexSelection';
import CommunityPage from './components/CommunityPage';
import GoalsSelection from './components/GoalsSelection';
import ChairYogaExperience from './components/ChairYogaExperience';
import TargetZones from './components/TargetZones';
import BodyType from './components/BodyType';
import DreamBody from './components/DreamBody';
import ActivityLevel from './components/ActivityLevel';
import WalkingTime from './components/WalkingTime';
import YogaLevel from './components/YogaLevel';
import SensitivityCheck from './components/SensitivityCheck';
import SupportStep from './components/SupportStep';
import ExerciseStylePreference from './components/ExerciseStylePreference';
import AvailableTime from './components/AvailableTime';
import BMICalculator from './components/BMICalculator';
import ResultsPage from './components/ResultsPage'; // Nova página consolidada
import SalesPage from './components/SalesPage';
import Checkout from './components/Checkout';
import SuccessPage from './components/SuccessPage';
import ProgressBar from './components/ProgressBar';
import ExitIntentModal from './components/ExitIntentModal';
import QuickNav from './components/QuickNav';
import { QuizProvider } from './context/QuizContext';

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <QuizProvider>
        <ProgressBar />
        
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AgeSelection />} />
            <Route path="/sex-selection" element={<SexSelection />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/goals" element={<GoalsSelection />} />
            <Route path="/chair-yoga-experience" element={<ChairYogaExperience />} />
            <Route path="/target-zones" element={<TargetZones />} />
            <Route path="/body-type" element={<BodyType />} />
            <Route path="/dream-body" element={<DreamBody />} />
            <Route path="/activity-level" element={<ActivityLevel />} />
            <Route path="/walking-time" element={<WalkingTime />} />
            <Route path="/yoga-level" element={<YogaLevel />} />
            <Route path="/sensitivity-check" element={<SensitivityCheck />} />
            <Route path="/support-step" element={<SupportStep />} />
            <Route path="/exercise-style" element={<ExerciseStylePreference />} />
            <Route path="/available-time" element={<AvailableTime />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            {/* Nova página consolidada substituindo 4 páginas anteriores */}
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        
        <ExitIntentModal />
        <QuickNav />
      </QuizProvider>
    </div>
  );
}

export default App;