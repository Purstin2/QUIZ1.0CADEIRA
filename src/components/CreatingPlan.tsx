import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, Shield, CheckCircle, Target } from 'lucide-react';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const CreatingPlan: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const { goals, bodyType, bodyMassIndex } = useQuiz();
  
  // Memoize data to prevent recalculation
  const phases = useMemo(() => [
    { title: "Analisando seu perfil...", description: "Processando dados para criar seu plano personalizado" },
    { title: "Adaptando exercícios...", description: "Ajustando movimentos para seu tipo corporal e necessidades" },
    { title: "Otimizando para resultados...", description: "Criando sequências para seus objetivos específicos" },
    { title: "Finalizando seu plano...", description: "Últimos ajustes para uma experiência perfeita" },
    { title: "Plano pronto!", description: "Seu caminho personalizado para transformação está completo" }
  ], []);
  
  // Simpler benefits list based on user profile
  const userBenefits = useMemo(() => {
    const benefits = ["Exercícios adaptados", "Progressão personalizada"];
    
    // Add conditional benefits
    if (bodyMassIndex > 25) benefits.push("Ajuste metabólico");
    if (goals.some(g => g.id === 'lose-weight' && g.selected)) benefits.push("Queima calórica otimizada");
    if (goals.some(g => g.id === 'improve-mobility' && g.selected)) benefits.push("Recuperação articular");
    
    return benefits.slice(0, 3); // Limit to max 3 benefits
  }, [goals, bodyMassIndex]);
  
  // Simplified progress animation
  useEffect(() => {
    // Total animation time: 3 seconds
    const totalTime = 3000;
    const interval = 50;
    const steps = totalTime / interval;
    const increment = 100 / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const newProgress = Math.min(step * increment, 100);
      setProgress(newProgress);
      
      // Update phases based on progress
      if (newProgress >= 95) setCurrentPhase(4);
      else if (newProgress >= 70) setCurrentPhase(3);
      else if (newProgress >= 40) setCurrentPhase(2);
      else if (newProgress >= 10) setCurrentPhase(1);
      
      // Complete and navigate
      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => navigate('/plan-ready'), 500);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
      <Header />
      <main className="flex-1 px-6 py-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          {/* Progress Circle */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-28 h-28 mb-4">
              {/* Background Circle */}
              <div className="absolute inset-0 rounded-full border-8 border-purple-100"></div>
              
              {/* Progress Circle */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#E9D5FF"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#7432B4"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
                  transform="rotate(-90, 50, 50)"
                  initial={false}
                />
              </svg>
              
              {/* Progress Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-[#2D1441]">
                  {Math.round(progress)}%
                </span>
              </div>
              
              {/* Success Mark */}
              {progress >= 100 && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                  <CheckCircle size={18} />
                </div>
              )}
            </div>
            
            {/* Current Phase Title */}
            <h2 className="text-xl font-semibold text-[#2D1441] mb-1 text-center">
              {phases[currentPhase].title}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {phases[currentPhase].description}
            </p>
          </div>
          
          {/* Processing Card */}
          <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm mb-6">
            {/* Active Processing Items */}
            <div className="mb-6">
              <h3 className="font-medium text-[#2D1441] mb-3">
                Em processamento
              </h3>
              <div className="space-y-3">
                {[0, 1, 2].map((idx) => {
                  const activePhase = idx <= currentPhase;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activePhase ? 'bg-[#7432B4] text-white' : 'bg-gray-100'
                      }`}>
                        {activePhase ? <CheckCircle size={12} /> : <span className="text-xs">{idx+1}</span>}
                      </div>
                      <div className={`text-sm ${activePhase ? 'text-gray-800' : 'text-gray-400'}`}>
                        {idx === 0 ? 'Análise de perfil concluída' : 
                         idx === 1 ? 'Personalização para seu tipo corporal' : 
                         'Otimização para seus objetivos específicos'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Benefits List */}
            <div className="bg-[#7432B4]/5 rounded-lg p-4">
              <h3 className="font-medium text-[#2D1441] mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#7432B4]" />
                <span>Benefícios do seu plano</span>
              </h3>
              <div className="space-y-2">
                {userBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      progress > 30 * (idx + 1) ? 'bg-green-500 text-white' : 'bg-gray-200'
                    } flex items-center justify-center`}>
                      {progress > 30 * (idx + 1) && <CheckCircle size={10} />}
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom Note */}
          <p className="text-xs text-center text-gray-500">
            Seu plano é desenvolvido com base nas mais recentes pesquisas em fisiologia 
            do exercício e adaptado especificamente para o seu perfil.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreatingPlan;