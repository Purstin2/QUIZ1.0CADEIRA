import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Target,
  TrendingDown,
  Activity,
  Calendar,
  Star,
  Shield,
  Award,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const PlanDefinitive: React.FC = () => {
  const navigate = useNavigate();
  const {
    bodyMassIndex,
    goals,
    bodyType,
    sex,
    ageRange,
    availableTime,
    chairYogaExperience,
  } = useQuiz();

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [showConversion, setShowConversion] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [reservationCount, setReservationCount] = useState(23);
  const [showReservation, setShowReservation] = useState(false);

  // Desencadear efeitos visuais de conversão
  useEffect(() => {
    // Primeiro exibir animação de confetes para celebrar aprovação no programa
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7432B4', '#9747FF', '#E9D5FF'],
      });
    }, 1000);

    // Exibir elementos de conversão após animação inicial
    setTimeout(() => {
      setShowConversion(true);
    }, 2500);

    // Simular outras pessoas reservando vagas (escassez real)
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setReservationCount((prev) => Math.max(0, prev - 1));
        setShowReservation(true);
        setTimeout(() => setShowReservation(false), 5000);
      }
    }, 15000);

    // Simular contagem regressiva
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Mudar depoimentos a cada 4 segundos
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownTimer);
      clearInterval(testimonialInterval);
    };
  }, []);

  // Cálculo personalizado de peso e data
  const personalizedData = useMemo(() => {
    // Estimativa de altura baseada no IMC (uma simplificação para este exemplo)
    const estimatedHeight = 1.7; // metros
    const currentWeight = bodyMassIndex
      ? Math.round(bodyMassIndex * (estimatedHeight * estimatedHeight))
      : 70;

    // Definindo peso alvo baseado no IMC e outras características
    let targetWeight;
    if (bodyMassIndex) {
      if (bodyMassIndex > 25) {
        // Para sobrepeso, mira num IMC saudável
        targetWeight = Math.round(24 * (estimatedHeight * estimatedHeight));
      } else if (bodyMassIndex < 18.5) {
        // Para abaixo do peso, mira num IMC saudável inferior
        targetWeight = Math.round(19 * (estimatedHeight * estimatedHeight));
      } else {
        // Para IMC normal, ajuste fino baseado nos objetivos
        const hasWeightLossGoal = goals.some(
          (g) => g.id === 'lose-weight' && g.selected
        );
        targetWeight = hasWeightLossGoal
          ? Math.round(currentWeight * 0.95) // Redução de 5% se quer perder peso
          : Math.round(currentWeight); // Manutenção para outros objetivos
      }
    } else {
      // Valor padrão caso não tenha IMC
      targetWeight = bodyType === 'plus' ? 65 : 60;
    }

    // Cálculo da diferença de peso
    const weightDifference = Math.abs(currentWeight - targetWeight);

    // Definindo a data alvo com base na diferença de peso
    const today = new Date();
    let targetDate = new Date();

    // Sempre usar 21 dias como padrão (alinhado com programa)
    targetDate.setDate(today.getDate() + 21);

    // Ajustes baseados em características demográficas
    if (ageRange === '55-64' || ageRange === '65+') {
      // Mais tempo para pessoas mais velhas
      targetDate.setDate(targetDate.getDate() + 7);
    }

    // Geração de pontos para o gráfico
    const totalDays = Math.round(
      (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weeklyPoints = [];
    const weightStep = (currentWeight - targetWeight) / (totalDays / 7);

    for (let i = 0; i <= totalDays / 7; i++) {
      const pointDate = new Date(today);
      pointDate.setDate(today.getDate() + i * 7);

      weeklyPoints.push({
        date: pointDate,
        weight: Math.round((currentWeight - weightStep * i) * 10) / 10,
      });
    }

    return {
      currentWeight,
      targetWeight,
      targetDate,
      weeklyPoints,
      weightDifference,
      totalDays,
    };
  }, [bodyMassIndex, goals, bodyType, sex, ageRange]);

  // Formatação da data
  const formatDate = (date: Date) => {
    return `${date.getDate()} de ${
      [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
      ][date.getMonth()]
    }. de ${date.getFullYear()}`;
  };

  // Determinando mensagem personalizada
  const getPersonalizedMessage = () => {
    const hasWeightLossGoal = goals.some(
      (g) => g.id === 'lose-weight' && g.selected
    );
    const hasMoodGoal = goals.some((g) => g.id === 'manage-mood' && g.selected);
    const hasHealthGoal = goals.some(
      (g) => g.id === 'improve-heart' && g.selected
    );

    if (hasWeightLossGoal) {
      return `Prevemos que você alcançará ${
        personalizedData.targetWeight
      } kg até ${formatDate(personalizedData.targetDate)}, perdendo ${
        Math.round(personalizedData.weightDifference * 10) / 10
      } kg no total.`;
    } else if (hasMoodGoal || hasHealthGoal) {
      return `Seu plano está configurado para melhorar sua saúde geral até ${formatDate(
        personalizedData.targetDate
      )}, mantendo um peso ideal de ${personalizedData.targetWeight} kg.`;
    } else {
      return `Seu programa personalizado vai até ${formatDate(
        personalizedData.targetDate
      )}, ajudando você a atingir sua melhor forma física.`;
    }
  };

  // Determinar os obstáculos específicos com base no perfil
  const getPersonalObstacles = () => {
    const obstacles = [];

    if (bodyMassIndex > 25) {
      obstacles.push('Metabolismo desacelerado');
    }

    if (availableTime === 'less15') {
      obstacles.push('Falta de tempo para exercícios tradicionais');
    }

    if (chairYogaExperience === 'never') {
      obstacles.push('Inexperiência com exercícios de baixo impacto');
    }

    // Adicionando um obstáculo padrão se necessário
    if (obstacles.length === 0) {
      obstacles.push('Dificuldade em manter consistência na prática');
    }

    // Garantindo que temos pelo menos 2 obstáculos
    if (obstacles.length === 1) {
      obstacles.push('Falta de orientação personalizada');
    }

    return obstacles;
  };

  // Depoimentos personalizados baseados no perfil
  const testimonials = useMemo(() => {
    const hasWeightLossGoal = goals.some(
      (g) => g.id === 'lose-weight' && g.selected
    );
    const hasMobilityGoal = goals.some(
      (g) => g.id === 'improve-mobility' && g.selected
    );

    const baseTestimonials = [
      {
        quote:
          'Perdi 7kg em 28 dias sem sair da minha cadeira! Nunca pensei que seria possível com minha idade.',
        author: 'Maria S., 58 anos',
        relevance: hasWeightLossGoal ? 'weight' : 'general',
      },
      {
        quote:
          'Minhas dores nas costas desapareceram completamente após 14 dias. Minha médica ficou impressionada!',
        author: 'Carlos L., 62 anos',
        relevance: hasMobilityGoal ? 'mobility' : 'general',
      },
      {
        quote:
          'Sou cadeirante e achava que yoga não era para mim. Este método mudou completamente minha qualidade de vida.',
        author: 'Débora A., 47 anos',
        relevance: 'accessibility',
      },
      {
        quote:
          'Minha pressão arterial normalizou e minha energia disparou. Tudo com apenas 15 minutos por dia!',
        author: 'Roberto M., 54 anos',
        relevance: 'health',
      },
    ];

    // Prioriza os depoimentos por relevância
    let sortedTestimonials = [...baseTestimonials];

    if (hasWeightLossGoal) {
      sortedTestimonials.sort((a, b) => (a.relevance === 'weight' ? -1 : 1));
    } else if (hasMobilityGoal) {
      sortedTestimonials.sort((a, b) => (a.relevance === 'mobility' ? -1 : 1));
    }

    return sortedTestimonials;
  }, [goals]);

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        <main className="flex-1 px-6 py-5 overflow-hidden">
          <div className="max-w-lg mx-auto">
            {/* Título com estado de Aprovação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-4"
            >
              <motion.div
                className="bg-green-100 text-green-800 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ delay: 0.2, duration: 1, repeat: 2 }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>VOCÊ FOI APROVADA PARA O PROGRAMA</span>
              </motion.div>

              <h2 className="text-xl font-bold text-[#2D1441] mb-2">
                Seu plano personalizado está pronto
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {getPersonalizedMessage()}
              </p>

              {/* Label de vagas limitadas - gatilho de escassez */}
              <motion.div
                className="bg-orange-100 text-orange-800 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  repeat: 3,
                  repeatDelay: 5,
                }}
              >
                <AlertTriangle className="w-3 h-3" />
                <span>RESTAM APENAS {reservationCount} VAGAS HOJE</span>
              </motion.div>
            </motion.div>

            {/* Gráfico de Progresso Otimizado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-[#7432B4]" />
                    Sua jornada personalizada
                  </h3>
                  <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                    21 dias
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Gráfico com proporções responsivas */}
                <div className="relative w-full h-[200px] mb-4">
                  {/* Background do gráfico */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-t from-red-50 via-yellow-50 to-green-50 border border-gray-100"></div>

                  {/* Linhas de grade */}
                  <div className="absolute inset-0 flex flex-col justify-between px-10">
                    {[0, 1, 2, 3].map((_, i) => (
                      <div key={i} className="w-full h-px bg-gray-100"></div>
                    ))}
                  </div>

                  {/* Caminho SVG responsivo */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FF5757" />
                        <stop offset="50%" stopColor="#FFA14D" />
                        <stop offset="100%" stopColor="#4ADE80" />
                      </linearGradient>
                    </defs>

                    {/* Curva de progresso que usa porcentagens relativas */}
                    <motion.path
                      d="M 5,80 C 20,75 35,65 50,55 S 80,45 95,35"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 1.5 }}
                    />
                  </svg>

                  {/* Pontos de início e fim com posicionamento relativo */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: 'spring' }}
                    className="absolute left-[5%] bottom-[20%] w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-red-500 rounded-full shadow-md flex items-center justify-center text-white text-[10px] font-bold">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
                          <div className="font-bold text-red-500">70 kg</div>
                          <div className="text-[10px] text-gray-500">Hoje</div>
                        </div>
                        HOJE
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1, type: 'spring' }}
                    className="absolute right-[5%] top-[35%] w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-green-500 rounded-full shadow-md flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
                          <div className="font-bold text-green-500">60 kg</div>
                          <div className="text-[10px] text-gray-500">
                            4 jun.
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Ponto intermediário */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="absolute left-1/2 top-1/2 w-3 h-3 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>

                {/* Legenda do gráfico */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Hoje</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>Progresso contínuo</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>4 de jun. de 2025</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Indicadores de Peso com estilo de KPI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                <div className="p-4 text-center">
                  <div className="text-gray-500 text-xs mb-1">Peso atual</div>
                  <div className="text-xl font-bold text-red-500">
                    {personalizedData.currentWeight} kg
                  </div>
                </div>

                <div className="p-4 text-center">
                  <div className="text-gray-500 text-xs mb-1">Diferença</div>
                  <div className="text-xl font-bold text-amber-500">
                    {personalizedData.currentWeight >
                    personalizedData.targetWeight
                      ? '- '
                      : '+ '}
                    {Math.round(
                      Math.abs(
                        personalizedData.currentWeight -
                          personalizedData.targetWeight
                      ) * 10
                    ) / 10}{' '}
                    kg
                  </div>
                </div>

                <div className="p-4 text-center">
                  <div className="text-gray-500 text-xs mb-1">Meta</div>
                  <div className="text-xl font-bold text-green-500">
                    {personalizedData.targetWeight} kg
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nova seção: Obstáculos Superados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md mb-6 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-[#2D1441] flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#7432B4]" />
                  Obstáculos que serão superados
                </h3>
              </div>

              <div className="p-4">
                {getPersonalObstacles().map((obstacle, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 mb-3 last:mb-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    <div className="bg-red-100 text-red-800 p-2 rounded-full">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-800">
                          {obstacle}
                        </div>
                        <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                          Resolvido
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Superado com técnicas avançadas do nosso método
                        exclusivo
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Nova seção: Depoimentos em Carrossel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md mb-6 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-[#2D1441] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#7432B4]" />
                  Pessoas reais, resultados reais
                </h3>
              </div>

              <div className="p-4 min-h-[120px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm italic mb-3">
                      "{testimonials[currentTestimonialIndex].quote}"
                    </p>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#2D1441]">
                        {testimonials[currentTestimonialIndex].author}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Certificações e Garantias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 mb-6 border border-purple-200"
            >
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#7432B4] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-[#2D1441] mb-1">
                    Método certificado com garantia
                  </h4>
                  <p className="text-xs text-gray-700">
                    Desenvolvido por especialistas e validado pela ABFS com
                    garantia de satisfação de 7 dias ou seu dinheiro de volta.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Elemento de conversão (mostrar após animações iniciais) */}
            <AnimatePresence>
              {showConversion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={() => navigate('/creating-plan')}
                    className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold text-lg py-4 px-8 rounded-xl hover:from-[#6822A6] hover:to-[#8740E6] transition-colors shadow-lg relative overflow-hidden mb-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
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
                    {/* Efeito de brilho para chamar atenção */}
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
                      <span>Criar Meu Plano Agora</span>
                      <ArrowRight className="w-5 h-5" />
                    </span>

                    {countdown > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#6822A6] h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {countdown}
                      </div>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500">
                    Não perca sua vaga - reserva garantida por apenas 15 minutos
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notificação flutuante de reservas (escassez social) */}
            <AnimatePresence>
              {showReservation && (
                <motion.div
                  initial={{ opacity: 0, x: -100, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 20 }}
                  exit={{ opacity: 0, x: -100, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="fixed bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 max-w-[250px] z-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {Math.floor(Math.random() * 3) + 1} pessoa
                        {Math.random() > 0.5 ? 's' : ''} acabaram de reservar
                        uma vaga
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        Restam apenas {reservationCount} vagas hoje
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default PlanDefinitive;
