import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Shield,
  Star,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    goals, 
    bodyType, 
    bodyMassIndex,
    ageRange
  } = useQuiz();
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutos
  const [recentViewers, setRecentViewers] = useState(173);
  
  // Efeitos para mostrar confete e contar tempo
  useEffect(() => {
    // Efeito de confete
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#7432B4', '#9747FF', '#E9D5FF'],
      });
    }, 500);
    
    // Contagem regressiva
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    // Alternar depoimentos
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => {
      clearInterval(timer);
      clearInterval(testimonialInterval);
    };
  }, []);
  
  // Calcular peso atual/meta
  const estimatedHeight = 1.7;
  const currentWeight = bodyMassIndex ? Math.round(bodyMassIndex * (estimatedHeight * estimatedHeight)) : 70;
  const targetWeight = Math.max(60, currentWeight - 5); // Simplificado para exemplo
  const weightLossAmount = currentWeight - targetWeight;

  // Gerar benefícios baseados nas seleções do quiz 
  const generateMainBenefit = () => {
    const selectedGoalIds = goals.filter(g => g.selected).map(g => g.id);
    
    // Priorizar "Regeneração Articular" independente da seleção
    if (selectedGoalIds.includes('improve-mobility')) {
      return "Recupere sua mobilidade e elimine as dores articulares";
    }
    if (selectedGoalIds.includes('balance-hormones')) {
      return "Reequilibre seu sistema articular e hormonal";
    }
    if (selectedGoalIds.includes('manage-mood')) {
      return "Revitalize suas articulações e reduza o estresse";
    }
    if (selectedGoalIds.includes('lose-weight')) {
      // Mantido como objetivo secundário, conforme combinado
      return "Reactive suas articulações enquanto perde peso";
    }
    
    // Default
    return "Transforme sua mobilidade articular sem esforço";
  };
  
  // Depoimentos adaptados para foco em mobilidade
  const testimonials = [
    {
      quote: "Em 21 dias, recuperei movimentos que não conseguia fazer há anos. As dores nas articulações diminuíram 80%!",
      author: "Maria S., 58 anos"
    },
    {
      quote: "Minhas articulações estavam tão rígidas que mal conseguia me abaixar. Agora tenho mobilidade que não tinha há 15 anos.",
      author: "Carlos L., 62 anos"
    },
    {
      quote: "A ansiedade causada pelas dores crônicas reduziu drasticamente. Finalmente posso dormir sem medicação.",
      author: "Ana F., 45 anos"
    }
  ];
  
  // Formatar tempo restante
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Obter principais benefícios baseados no perfil
  const getBenefits = () => {
    const benefits = [];
    const selectedGoals = goals.filter(g => g.selected);
    
    // Adicionar benefícios de mobilidade primeiro (prioridade)
    benefits.push('Restauração da mobilidade articular');
    benefits.push('Alívio de dores crônicas');
    
    // Adicionar benefícios secundários, se aplicável
    selectedGoals.forEach(goal => {
      if (goal.id === 'lose-weight') {
        benefits.push('Ativação metabólica sem impacto');
      } else if (goal.id === 'manage-mood') {
        benefits.push('Redução de estresse e ansiedade');
      } else if (goal.id === 'balance-hormones') {
        benefits.push('Suporte ao equilíbrio hormonal');
      }
    });
    
    // Adicionar benefícios por idade
    if (ageRange === '55-64' || ageRange === '65+') {
      benefits.push('Protocolos específicos para articulações maduras');
    }
    
    return benefits.slice(0, 3);
  };
  
  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        
        <main className="flex-1 px-4 py-6">
          <div className="max-w-md mx-auto">
            {/* Badge de aprovação - ARQUÉTIPO SÁBIO */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-4"
            >
              <motion.div
                className="bg-green-100 text-green-800 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ delay: 0.2, duration: 1, repeat: 2 }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>PROTOCOLO PERSONALIZADO CONCLUÍDO</span>
              </motion.div>
              
              <h1 className="text-xl font-bold text-[#2D1441] mb-1">
                Sistema de Regeneração Articular Feminina
              </h1>
              <p className="text-sm text-gray-600">
                {generateMainBenefit()} em apenas 21 dias
              </p>
            </motion.div>
            
            {/* Card principal de resultado */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md mb-4 overflow-hidden"
            >
              {/* Banner de valor */}
              <div className="bg-[#7432B4] py-2 px-4 text-center">
                <span className="text-sm font-bold text-white">
                  VALOR: <span className="line-through opacity-70">R$197</span>{' '}
                  <span className="text-yellow-300">POR APENAS R$19,90</span>
                </span>
              </div>
              
              <div className="p-4">
                {/* Card de medidas de mobilidade */}
                <div className="flex justify-between items-center p-3 bg-[#F7F3FF] rounded-lg mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Mobilidade Atual</div>
                    <div className="font-bold text-red-500">Limitada</div>
                  </div>
                  
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="text-[#7432B4]" />
                  </motion.div>
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Meta</div>
                    <div className="font-bold text-green-500">Restaurada</div>
                  </div>
                </div>
                
                {/* Benefícios-chave */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Benefícios do seu protocolo:
                  </h3>
                  <div className="space-y-2">
                    {getBenefits().map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Depoimentos */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 min-h-[100px]">
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  
                  {testimonials.map((testimonial, idx) => (
                    <div 
                      key={idx} 
                      className={`transition-opacity duration-300 ${
                        activeTestimonial === idx ? 'opacity-100' : 'opacity-0 hidden'
                      }`}
                    >
                      <p className="text-xs text-gray-700 italic mb-1">"{testimonial.quote}"</p>
                      <p className="text-xs font-medium text-gray-800">{testimonial.author}</p>
                    </div>
                  ))}
                </div>
                
                {/* Contador e estatísticas */}
                <div className="flex justify-between mb-4 text-center p-2 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500">Restam</div>
                    <div className="font-bold text-[#7432B4]">{formatTime(timeRemaining)}</div>
                  </div>
                  <div className="border-l border-yellow-200"></div>
                  <div>
                    <div className="text-xs text-gray-500">Visualizando</div>
                    <div className="font-bold text-[#7432B4]">{recentViewers}</div>
                  </div>
                  <div className="border-l border-yellow-200"></div>
                  <div>
                    <div className="text-xs text-gray-500">Vagas</div>
                    <div className="font-bold text-[#7432B4]">23</div>
                  </div>
                </div>
                
                {/* Garantia - ARQUÉTIPO SÁBIO */}
                <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg mb-4 border border-green-100">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Garantia de 7 dias</p>
                    <p className="text-xs text-gray-700">Mobilidade restaurada ou seu dinheiro de volta</p>
                  </div>
                </div>
                
                {/* CTA */}
                <motion.button
                  onClick={() => navigate('/sales')}
                  className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg relative overflow-hidden mb-2"
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
                    Ver Meu Protocolo Completo
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
                
                <p className="text-xs text-center text-gray-500">
                  Acesso vitalício com pagamento único hoje
                </p>
              </div>
            </motion.div>
            
            {/* Certificação - ARQUÉTIPO SÁBIO */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm mb-4 text-center"
            >
              <div className="flex justify-center mb-1">
                <Award className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="text-sm font-medium text-[#2D1441]">
                Certificado pela Associação Brasileira de Fisioterapia e Saúde Articular
              </h3>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default ResultsPage;