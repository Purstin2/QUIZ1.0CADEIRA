import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Award, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const ChairYogaInfoEnhanced = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [xpPoints, setXpPoints] = useState(50);
  const [showBadge, setShowBadge] = useState(false);
  const [progress, setProgress] = useState(35);
  const navigate = useNavigate();
  const { getNextRoute } = useQuiz();
  
  // Mock values for demonstration
  const chairYogaExperience = 'tried';
  
  useEffect(() => {
    // Show badge animation after delay
    const timer = setTimeout(() => {
      setShowBadge(true);
      setXpPoints(prev => prev + 25);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const benefits = [
    {
      id: 'beginner',
      title: 'Novo no yoga:',
      description: 'Perfeito para quem está começando sua jornada no yoga',
      icon: '🌱',
      fact: 'Yoga na cadeira foi desenvolvido nos anos 80 para tornar o yoga acessível para todos.'
    },
    {
      id: 'mobility',
      title: 'Mobilidade limitada:',
      description: 'Adequado para pessoas com problemas de mobilidade',
      icon: '🪑',
      fact: 'Estudos mostram melhora de 40% na flexibilidade após 8 semanas de prática regular.'
    },
    {
      id: 'weight',
      title: 'Gerenciamento suave de peso:',
      description: 'Suporta uma abordagem segura e sustentável',
      icon: '⚖️',
      fact: 'Você pode queimar até 150 calorias em uma sessão de 30 minutos de yoga na cadeira.'
    }
  ];

  const getExperienceMessage = () => {
    switch (chairYogaExperience) {
      case 'regular':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-100 p-4 rounded-xl mb-6 text-center"
          >
            <p className="text-purple-700 font-medium">
              Uau! Então você está no lugar certo! 🎯
            </p>
          </motion.div>
        );
      case 'tried':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-100 p-4 rounded-xl mb-6 text-center"
          >
            <p className="text-purple-700 font-medium">
              Que bom que você já conhece! Vamos aprofundar ainda mais sua prática 🌟
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleContinue = () => {
    navigate(getNextRoute('/chair-yoga-info'));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      {/* Progress and XP display */}
      <div className="w-full max-w-md mx-auto mb-2">
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs text-center text-purple-700 uppercase">EXPERIÊNCIA</div>
          <div className="flex items-center">
            <div className="bg-purple-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-1">XP</div>
            <motion.span 
              key={xpPoints}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold text-purple-700"
            >
              {xpPoints}
            </motion.span>
          </div>
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-full">
          <motion.div 
            className="h-1 bg-purple-700 rounded-full" 
            initial={{ width: "20%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-purple-900 mb-2 text-center">
          Yoga na Cadeira
        </h2>
        <p className="text-gray-600 text-center mb-6">
          é uma versão modificada do yoga tradicional, realizada enquanto sentado e apoiado por uma cadeira
        </p>

        {getExperienceMessage()}

        {/* Badge unlock animation */}
        <AnimatePresence>
          {showBadge && (
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-xl p-4 text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Award className="mr-2" size={20} />
                    <span className="font-bold">Yogini Curiosa</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs bg-white text-purple-700 px-2 py-1 rounded-full font-bold"
                  >
                    +25 XP
                  </motion.div>
                </div>
                <div className="text-sm">
                  Conquista desbloqueada por aprender sobre Yoga na Cadeira!
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4 mb-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                className={`flex items-start gap-3 p-4 rounded-xl transition-all ${
                  activeCard === benefit.id 
                    ? 'bg-purple-700 text-white' 
                    : 'bg-purple-50 hover:bg-purple-100'
                }`}
                whileHover={{ y: -2, boxShadow: "0px 3px 8px rgba(0,0,0,0.1)" }}
                onClick={() => setActiveCard(activeCard === benefit.id ? null : benefit.id)}
              >
                <div className={`flex items-center justify-center rounded-full w-10 h-10 ${
                  activeCard === benefit.id ? 'bg-white text-purple-700' : 'bg-purple-100'
                } flex-shrink-0`}>
                  <span className="text-xl">{benefit.icon}</span>
                </div>
                <div>
                  <h3 className={`font-medium ${activeCard === benefit.id ? 'text-white' : 'text-purple-900'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-sm ${activeCard === benefit.id ? 'text-purple-100' : 'text-gray-600'}`}>
                    {benefit.description}
                  </p>
                  
                  <AnimatePresence>
                    {activeCard === benefit.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-sm border-t border-purple-300 pt-2"
                      >
                        <div className="flex items-start">
                          <Info size={16} className="mr-1 flex-shrink-0 mt-0.5" />
                          <p className="text-purple-100">{benefit.fact}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="ml-auto flex-shrink-0">
                  <motion.div
                    animate={{ rotate: activeCard === benefit.id ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={16} className={activeCard === benefit.id ? 'text-white' : 'text-purple-700'} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={handleContinue}
          className="w-full bg-purple-700 text-white font-semibold py-4 px-6 rounded-full text-lg shadow-lg"
          whileHover={{ scale: 1.02, boxShadow: "0px 6px 15px rgba(116, 50, 180, 0.4)" }}
          whileTap={{ scale: 0.98 }}
        >
          Continuar
        </motion.button>
      </div>
    </div>
  );
};

export default ChairYogaInfoEnhanced;