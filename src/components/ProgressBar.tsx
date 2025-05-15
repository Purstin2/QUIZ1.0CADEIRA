// src/components/ProgressBar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgressBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Mapeamento das rotas de seleção
  const selectionRoutes = [
    '/',                     // AgeSelection
    '/sex-selection',        // SexSelection
    '/community',            // CommunityPage
    '/goals',                // GoalsSelection
    '/chair-yoga-experience',// ChairYogaExperience
    '/target-zones',         // TargetZones
    '/body-type',            // BodyType
    '/dream-body',           // DreamBody
    '/activity-level',       // ActivityLevel
    '/walking-time',         // WalkingTime
    '/yoga-level',           // YogaLevel
    '/sensitivity-check',    // SensitivityCheck
    '/support-step',         // SupportStep
    '/exercise-style',       // ExerciseStylePreference
    '/available-time',       // AvailableTime
    '/bmi-calculator',       // BMICalculator
  ];
  
  // Total de etapas de seleção
  const totalSteps = selectionRoutes.length;
  
  // Calcular o progresso atual
  const currentIndex = selectionRoutes.indexOf(currentPath);
  const progressPercentage = currentIndex >= 0 
    ? Math.max(5, Math.min(100, ((currentIndex + 1) / totalSteps) * 100)) 
    : 0;
  
  // Função para voltar à página anterior
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Se não for uma página de seleção, não mostrar a barra
  if (currentIndex < 0) {
    return null;
  }
  
  return (
    <div className="px-4 py-3 bg-[#F7F3FF] border-b border-gray-100">
      <div className="w-full max-w-md mx-auto flex items-center space-x-4">
        {/* Botão de voltar */}
        <button 
          onClick={handleGoBack}
          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 hover:bg-purple-50 transition-colors"
          aria-label="Voltar"
        >
          <ChevronLeft size={18} className="text-[#7432B4]" />
        </button>
        
        {/* Barra de progresso */}
        <div className="flex-1 h-2 bg-[#E9E0F4] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#7432B4]"
            initial={{ width: `${progressPercentage > 5 ? progressPercentage - 10 : 0}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;