import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Award, Heart, Shield, TrendingDown, CheckCircle, Target, ArrowRight,
  Users, Star, Calendar, Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { goals, bodyType, ageRange, bodyMassIndex } = useQuiz();
  
  // Estados unificados
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Configurar coisas quando a página carrega
  useEffect(() => {
    // Efeito de confete na entrada
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#7432B4', '#9747FF', '#E9D5FF'],
      });
    }, 1000);
    
    // Animar análise (mais rápido que antes)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowCTA(true);
          return 100;
        }
        return prev + 4; // Mais rápido
      });
    }, 80);
    
    // Contador regressivo
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    
    // Alternar depoimentos
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
      clearInterval(testimonialInterval);
    };
  }, []);
  
  // Função para determinar o peso alvo
  const getTargetWeight = () => {
    if (!bodyMassIndex) return 60;
    
    const estimatedHeight = 1.7;
    const currentWeight = Math.round(bodyMassIndex * (estimatedHeight * estimatedHeight));
    
    if (bodyMassIndex > 25) {
      return Math.round(24 * (estimatedHeight * estimatedHeight));
    } else if (bodyMassIndex < 18.5) {
      return Math.round(19 * (estimatedHeight * estimatedHeight));
    } else {
      const hasWeightLossGoal = goals.some(g => g.id === 'lose-weight' && g.selected);
      return hasWeightLossGoal ? Math.round(currentWeight * 0.95) : currentWeight;
    }
  };
  
  // Calcular IMC atual
  const currentWeight = bodyMassIndex ? Math.round(bodyMassIndex * (1.7 * 1.7)) : 70;
  const targetWeight = getTargetWeight();
  
  // Mensagem personalizada
  const getMessage = () => {
    const hasWeightLossGoal = goals.some(g => g.id === 'lose-weight' && g.selected);
    const hasMobilityGoal = goals.some(g => g.id === 'improve-mobility' && g.selected);
    
    if (hasWeightLossGoal) {
      return `Seu plano recomenda perder ${Math.abs(currentWeight - targetWeight)}kg em 21 dias`;
    } else if (hasMobilityGoal) {
      return 'Seu plano foca em melhorar mobilidade e aliviar dores em 21 dias';
    } else {
      return 'Seu plano personalizado está pronto para transformar sua saúde';
    }
  };
  
  // Depoimentos filtrados por relevância
  const testimonials = [
    {
      quote: 'Perdi 7kg sem sair da cadeira. Nunca pensei que seria possível com minha idade!',
      author: 'Maria S., 58 anos',
      relevance: 'weight',
    },
    {
      quote: 'Minhas dores nas costas sumiram completamente após 14 dias.',
      author: 'Carlos L., 62 anos',
      relevance: 'mobility',
    },
    {
      quote: 'Minha ansiedade reduziu e finalmente consigo dormir melhor.',
      author: 'Roberto C., 47 anos',
      relevance: 'mood',
    }
  ];
  
  // Benefícios específicos
  const getBenefits = () => {
    const benefits = [];
    
    if (goals.some(g => g.id === 'lose-weight' && g.selected)) {
      benefits.push('Queima calórica otimizada');
    }
    if (goals.some(g => g.id === 'improve-mobility' && g.selected)) {
      benefits.push('Alívio das dores articulares');
    }
    if (goals.some(g => g.id === 'manage-mood' && g.selected)) {
      benefits.push('Redução de ansiedade');
    }
    
    // Garantir que temos pelo menos 3 benefícios
    if (benefits.length < 3) {
      benefits.push('Melhora da postura');
      benefits.push('Maior energia diária');
    }
    
    return benefits.slice(0, 3);
  };
  
  // Formatação de tempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        
        {/* Contador em destaque */}
        <div className="bg-[#7432B4] text-white py-2 px-4 text-center text-sm sticky top-0 z-20">
          <div className="flex justify-center items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Oferta especial expira em: <span className="font-bold">{formatTime(timeLeft)}</span></span>
          </div>
        </div>
        
        <main className="flex-1 px-4 py-6 overflow-hidden">
          <div className="max-w-md mx-auto">
            {/* Status de aprovação e plano */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4"
            >
              <motion.div
                className="bg-green-100 text-green-800 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ delay: 0.2, duration: 1, repeat: 1 }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>VOCÊ FOI APROVADA</span>
              </motion.div>
              
              <h2 className="text-xl font-bold text-[#2D1441] mb-1">
                {progress < 100 ? 'Analisando seus resultados...' : 'Seu plano personalizado está pronto'}
              </h2>
              <p className="text-sm text-gray-600">
                {getMessage()}
              </p>
            </motion.div>
            
            {/* Análise com progresso */}
            {progress < 100 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-5 shadow-sm mb-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#7432B4]" /> 
                    Analisando seu perfil
                  </h3>
                  <span className="font-bold text-[#7432B4]">{progress}%</span>
                </div>
                
                <div className="w-full h-2 bg-purple-100 rounded-full mb-4">
                  <motion.div 
                    className="h-full bg-[#7432B4] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="space-y-2">
                  {['Calibrando para seu tipo corporal', 'Ajustando para seus objetivos', 'Calculando dieta de cadeira ideal'].map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        progress > (idx + 1) * 25 ? 'bg-[#7432B4] text-white' : 'bg-gray-100'
                      }`}>
                        {progress > (idx + 1) * 25 ? <CheckCircle className="w-3 h-3" /> : <span className="text-xs">{idx+1}</span>}
                      </div>
                      <span className={`text-sm ${progress > (idx + 1) * 25 ? 'text-gray-800' : 'text-gray-400'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Resultados após análise */}
            <AnimatePresence>
              {progress >= 100 && (
                <>
                  {/* Card de resultados */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-4"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-[#7432B4]" />
                          Seu plano personalizado
                        </h3>
                        <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                          21 dias
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {/* Indicador de peso visualizado */}
                      <div className="flex justify-between mb-4 bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
                        <div className="text-center">
                          <div className="text-gray-500 text-xs">Início</div>
                          <div className="text-lg font-bold text-red-500">{currentWeight} kg</div>
                        </div>
                        
                        <div className="flex items-center">
                          <motion.div 
                            animate={{ x: [0, 5, 0] }} 
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ArrowRight className="text-[#7432B4]" />
                          </motion.div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-gray-500 text-xs">Meta</div>
                          <div className="text-lg font-bold text-green-500">{targetWeight} kg</div>
                        </div>
                      </div>
                      
                      {/* Benefícios em lista compacta */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Benefícios do seu plano:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {getBenefits().map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Depoimentos */}
                      <div className="bg-gray-50 rounded-lg p-3 min-h-[90px] relative">
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTestimonial}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <p className="text-xs text-gray-700 italic mb-1">"{testimonials[activeTestimonial].quote}"</p>
                            <p className="text-xs font-medium text-gray-800">{testimonials[activeTestimonial].author}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Garantia destacada */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-green-50 rounded-lg p-3 mb-6 border border-green-100 flex items-start gap-2"
                  >
                    <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Garantia de satisfação de 7 dias</p>
                      <p className="text-xs text-gray-700">Certificado pela Associação Brasileira de Fisioterapia</p>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            {/* CTA */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={() => navigate('/sales')}
                    className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg relative overflow-hidden mb-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      boxShadow: [
                        '0 4px 6px rgba(116, 50, 180, 0.2)',
                        '0 10px 15px rgba(116, 50, 180, 0.3)',
                        '0 4px 6px rgba(116, 50, 180, 0.2)',
                      ],
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity },
                    }}
                  >
                    {/* Efeito de brilho */}
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: '-100%', opacity: 0.3 }}
                      animate={{ x: '100%', opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Ver Meu Plano Completo
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.button>
                  
                  <p className="text-xs text-gray-500">
                    Oferta especial por tempo limitado: apenas {Math.floor(Math.random() * 20) + 10} vagas restantes
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default ResultsPage;