import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Clock,
  Award,
  Star,
  Shield,
  Trophy,
  CheckCircle,
  AlertTriangle,
  FileText,
  Zap,
  Heart,
  Users,
  Brain,
  Sparkles,
  Target,
  Activity,
  Calendar,
  TrendingDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const CreatingPlan: React.FC = () => {
  const navigate = useNavigate();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const {
    goals,
    bodyType,
    dreamBody,
    bodyMassIndex,
    chairYogaExperience,
    ageRange,
  } = useQuiz();

  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [unlockPulse, setUnlockPulse] = useState<number | null>(null);
  const [fastForward, setFastForward] = useState(false);
  const [generatingSpecial, setGeneratingSpecial] = useState<string | null>(
    null
  );
  const audioContext = useRef<AudioContext | null>(null);

  // Determine user risk profile (for personalized messaging)
  const getUserRiskProfile = () => {
    if (bodyMassIndex > 30) return 'high';
    if (bodyMassIndex > 25) return 'moderate';
    return 'low';
  };

  // Get a personalized benefit based on quiz answers
  const getPersonalizedBenefit = () => {
    const selectedGoalIds = goals.filter((g) => g.selected).map((g) => g.id);

    if (selectedGoalIds.includes('lose-weight')) {
      return 'queima de gordura localizada';
    }
    if (selectedGoalIds.includes('improve-mobility')) {
      return 'flexibilidade e mobilidade';
    }
    if (selectedGoalIds.includes('manage-mood')) {
      return 'redução do estresse e ansiedade';
    }
    return 'condicionamento físico completo';
  };

  // Determine if user gets a special bonus based on profile
  const getSpecialUnlock = () => {
    if (chairYogaExperience === 'never' && bodyMassIndex > 25) {
      return 'Guia Iniciante: Primeiros Passos';
    }
    if (ageRange === '55-64' || ageRange === '65+') {
      return 'Módulo Especial: Yoga para Articulações';
    }
    if (bodyType === 'plus') {
      return 'Adaptações para Todos os Tipos de Corpo';
    }
    return 'Guia de Nutrição Express';
  };

  // Inicializa o contexto de áudio na primeira interação do usuário
  useEffect(() => {
    if (!audioContext.current) {
  {
      const setupAudio = () => {
        const SituationalAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContext.current = SituationalAudioContext;
        document.removeEventListener('click', setupAudio);
      };
      document.addEventListener('click', setupAudio);
      return () => {
        document.removeEventListener('click', setupAudio);
        if (audioContext.current && audioContext.current.state !== 'closed') {
          audioContext.current.close();
        }
      };
    }
  }, []);

  const playMilestoneSound = (milestoneIndex: number) => {
    if (!audioContext.current) return;

    try {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      const frequencies = [330, 392, 440, 494, 523];
      oscillator.frequency.value =
        frequencies[milestoneIndex % frequencies.length];
      oscillator.type = 'sine';
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      const now = audioContext.current.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      oscillator.start(now);
      oscillator.stop(now + 0.5);
    } catch (error) {
      console.error('Erro ao tocar som:', error);
    }
  };

  const playSuccessSound = () => {
    if (!audioContext.current) return;

    try {
      const chord = [523.25, 659.25, 783.99];
      chord.forEach((frequency, index) => {
        const oscillator = audioContext.current!.createOscillator();
        const gainNode = audioContext.current!.createGain();
        oscillator.frequency.value = frequency;
        oscillator.type = index === 0 ? 'sine' : 'triangle';
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.current!.destination);
        const now = audioContext.current!.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        const startTime = now + index * 0.08;
        oscillator.start(startTime);
        oscillator.stop(startTime + 1.5);
      });
    } catch (error) {
      console.error('Erro ao tocar som de sucesso:', error);
    }
  };

  const playUnlockSound = () => {
    if (!audioContext.current) return;

    try {
      const oscillator1 = audioContext.current.createOscillator();
      const oscillator2 = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      oscillator1.frequency.value = 600;
      oscillator2.frequency.value = 900;
      oscillator1.type = 'triangle';
      oscillator2.type = 'sine';
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      const now = audioContext.current.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      oscillator1.start(now);
      oscillator2.start(now + 0.1);
      oscillator1.stop(now + 0.8);
      oscillator2.stop(now + 0.8);
    } catch (error) {
      console.error('Erro ao tocar som de unlock:', error);
    }
  };

  const milestones = [
    {
      threshold: 10,
      title: 'Analisando seu perfil de saúde...',
      icon: <Heart className="text-red-500" />,
      activities: [
        'Processando IMC e composição corporal',
        'Avaliando histórico de atividade física',
        'Calculando perfil metabólico personalizado',
      ],
    },
    {
      threshold: 25,
      title: 'Criando rotina personalizada...',
      icon: <Clock className="text-blue-500" />,
      activities: [
        'Otimizando frequência e duração dos exercícios',
        'Equilibrando intensidade com seu nível de experiência',
        'Ajustando sequências para suas necessidades específicas',
      ],
    },
    {
      threshold: 40,
      title: 'Adaptando exercícios para seu corpo...',
      icon: <Users className="text-purple-600" />,
      activities: [
        `Personalizando movimentos para tipo corporal ${
          bodyType === 'plus'
            ? 'plus size'
            : bodyType === 'curvy'
            ? 'curvilíneo'
            : 'regular'
        }`,
        'Maximizando conforto durante a prática',
        'Priorizando segurança para suas articulações',
      ],
    },
    {
      threshold: 60,
      title: 'Otimizando para seus objetivos...',
      icon: <Target className="text-green-600" />,
      activities: [
        `Intensificando foco em ${getPersonalizedBenefit()}`,
        'Equilibrando exercícios para resultados completeos',
        'Criando progressão adaptativa para evolução constante',
      ],
    },
    {
      threshold: 80,
      title: 'Adicionando elementos avançados...',
      icon: <Zap className="text-yellow-500" />,
      activities: [
        'Incorporando técnicas de respiração para maximizar resultados',
        'Incluindo micro-movimentos para ativação muscular profunda',
        'Adicionando variações para prevenir platôs de resultados',
      ],
    },
    {
      threshold: 95,
      title: 'Finalizando seu plano exclusivo...',
      icon: <Sparkles className="text-amber-500" />,
      activities: [
        'Compilando todos os elementos em sequência ideal',
        'Aplicando toques finais de personalização',
        'Verificando eficácia do método para seu perfil específico',
      ],
    },
    {
      threshold: 100,
      title: 'Plano pronto para transformar sua vida!',
      icon: <Award className="text-green-500" />,
      activities: [
        'Conferindo todos os detalhes uma última vez',
        'Confirmando compatibilidade com seu perfil',
        'Preparando materiais para entrega imediata',
      ],
    },
  ];

  const planElements = [
    {
      label: 'Rotina Diária',
      description: '15 minutos de transformação sem sair da cadeira',
      icon: <FileText className="w-4 h-4" />,
      unlockAt: 30,
    },
    {
      label: 'Adaptações Posturais',
      description: `Personalização para ${
        bodyType === 'plus'
          ? 'todos os tipos de corpo'
          : 'sua estrutura corporal'
      }`,
      icon: <Users className="w-4 h-4" />,
      unlockAt: 45,
    },
    {
      label: 'Plano de Progressão',
      description: 'Evolução intelligente sem sobrecargas ou lesões',
      icon: <TrendingDown className="w-4 h-4" />,
      unlockAt: 55,
    },
    {
      label: 'Sequências Avançadas',
      description: 'Para resultados após dominar os fundamentos',
      icon: <Zap className="w-4 h-4" />,
      unlockAt: 65,
    },
    {
      label: getSpecialUnlock(),
      description: 'Conteúdo exclusivo liberado pelo seu perfil',
      icon: <Award className="w-4 h-4" />,
      unlockAt: 75,
      special: true,
    },
    {
      label: 'Guia de Nutrição Simplificado',
      description: 'Complementos alimentares para maximizar resultados',
      icon: <Brain className="w-4 h-4" />,
      unlockAt: 85,
    },
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#7432B4', '#9747FF', '#FFD700'],
    });
    playSuccessSound();
  };

  useEffect(() => {
    const totalTime = fastForward ? 1250 : 3000;
    const interval = 50;
    const steps = totalTime / interval;
    const increment = 100 / steps;

    let step = 0;

    const animationInterval = setInterval(() => {
      step++;
      const newValue = Math.min(Math.round(step * increment), 100);
      setProgressPercentage(newValue);

      planElements.forEach((element) => {
        if (
          newValue >= element.unlockAt &&
          !completedActivities.includes(element.label)
        ) {
          setCompletedActivities((prev) => [...prev, element.label]);
          setUnlockPulse(element.unlockAt);

          if (element.special) {
            setGeneratingSpecial(element.label);
            setTimeout(() => setGeneratingSpecial(null), 2000);
          }
          playUnlockSound();
        }
      });

      for (let i = milestones.length - 1; i >= 0; i--) {
        if (newValue >= milestones[i].threshold && currentMilestone < i) {
          setCurrentMilestone(i);
          playMilestoneSound(i);
          if (i < milestones.length - 1) {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.6 },
              colors: ['#7432B4'],
            });
          }
          break;
        }
      }

      if (newValue >= 100) {
        clearInterval(animationInterval);
        triggerConfetti();
        setShowAchievement(true);

        setTimeout(() => {
          navigate('/plan-ready');
        }, 3000);
      }
    }, interval);

    return () => clearInterval(animationInterval);
  }, [navigate, currentMilestone, completedActivities, fastForward]);

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        <main className="flex-1 px-6 py-5 flex flex-col items-center">
          <div className="max-w-lg w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 rounded-full border-8 border-purple-100"></div>
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#7432B4" />
                      <stop offset="100%" stopColor="#9747FF" />
                    </linearGradient>
                  </defs>
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
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 46 * (1 - progressPercentage / 100)
                    }`}
                    transform="rotate(-90, 50, 50)"
                    transition={{ type: 'tween', ease: 'linear' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-xl font-bold text-[#2D1441]"
                    animate={{
                      opacity: [1, 0.7, 1],
                      scale: progressPercentage === 100 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: progressPercentage < 100 ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  >
                    {progressPercentage}%
                  </motion.span>
                </div>
                <AnimatePresence>
                  {progressPercentage === 100 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                      className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg"
                    >
                      <CheckCircle size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div
              key={currentMilestone}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-5"
            >
              <div className="inline-flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {milestones[currentMilestone].icon}
                </motion.div>
                <h2 className="text-lg font-semibold text-[#2D1441]">
                  {milestones[currentMilestone].title}
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                {progressPercentage < 100
                  ? 'Seu plano único está sendo criado com base nas suas respostas'
                  : 'Seu plano personalizado está pronto!'}
              </p>
            </motion.div>
            {bodyMassIndex > 25 &&
              progressPercentage > 15 &&
              progressPercentage < 75 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 mb-1">
                        Nível de risco:{' '}
                        {getUserRiskProfile() === 'high'
                          ? 'Elevado'
                          : 'Moderado'}
                      </p>
                      <p className="text-amber-700">
                        Seu IMC de {bodyMassIndex.toFixed(1)} exige adaptações
                        específicas. Estamos ajustando seu plano para maximizar
                        resultados com segurança.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm mb-5">
              <h3 className="font-medium text-[#2D1441] mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#7432B4]" />
                <span>Atividades em processamento</span>
              </h3>
              <div className="space-y-3">
                {milestones[currentMilestone].activities.map(
                  (activity, idx) => (
                    <motion.div
                      key={`${currentMilestone}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2, duration: 0.3 }}
                      className="flex items-start gap-2"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-5 h-5 mt-0.5 flex-shrink-0 bg-purple-100 rounded-full flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#7432B4]"></div>
                      </motion.div>
                      <div className="text-sm text-gray-700">{activity}</div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
            <div className="mb-5 bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 rounded-lg border border-purple-100 p-4">
              <h3 className="font-medium text-[#2D1441] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7432B4]" />
                <span>Elementos do seu plano</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {planElements.map((element, idx) => {
                  const isUnlocked = completedActivities.includes(
                    element.label
                  );
                  const isPulsing = unlockPulse === element.unlockAt;
                  const isGeneratingSpecial =
                    generatingSpecial === element.label;

                  return (
                    <motion.div
                      key={element.label}
                      className={`rounded-lg p-3 ${
                        isGeneratingSpecial
                          ? 'bg-yellow-100 border border-yellow-200'
                          : isUnlocked
                          ? 'bg-white border border-green-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                      animate={
                        isPulsing
                          ? {
                              scale: [1, 1.05, 1],
                              boxShadow: [
                                '0 0 0 rgba(116, 50, 180, 0)',
                                '0 0 15px rgba(116, 50, 180, 0.3)',
                                '0 0 0 rgba(116, 50, 180, 0)',
                              ],
                            }
                          : {}
                     bob{
                    }
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <div
                        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                          isGeneratingSpecial
                            ? 'bg-yellow-400 text-white'
                            : isUnlocked
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isUnlocked ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          element.icon
                        )}
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          isGeneratingSpecial
                            ? 'text-yellow-800'
                            : isUnlocked
                            ? 'text-gray-800'
                            : 'text-gray-400'
                        }`}
                      >
                        {element.label}
                      </div>
                    </div>
                    < paredes
                      className={`text-xs pl-8 ${
                        isGeneratingSpecial
                          ? 'text-yellow-700'
                          : isUnlocked
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {element.description}
                    </p>
                    {element.special && (
                      <div className="mt-1 pl-8">
                        <span
                          className={`inline-block text-[10px] px-1.5 py-0.5 rounded ${
                            isUnlocked
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          CONTEÚDO EXCLUSIVO
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            <AnimatePresence>
              {showAchievement && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="mb-5 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-5 text-white shadow-lg overflow-hidden relative"
                >
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, Math.random() * -30],
                        x: [0, (Math.random() - 0.5) * 40],
                      }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                      }}
                    />
                  ))}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            '0px 0px 0px rgba(255,255,255,0.3)',
                            '0px 0px 20px rgba(255,255,255,0.6)',
                            '0px 0px 0px rgba(255,255,255,0.3)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Trophy className="w-8 h-8 text-yellow-300" />
                      </motion.div>
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                      >
                        +1
                      </motion.div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-xl mb-1">
                        Conquista Desbloqueada!
                      </h3>
                      <p className="text-sm text-purple-100">
                        Seu plano personalizado de 21 dias está pronto para
                        transformar sua vida!
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <div className="bg-purple-700/30 px-2 py-1 rounded-full text-xs">
                          <span className="text-yellow-300 font-bold">
                            {completedActivities.length}/6
                          </span>{' '}
                          elementos desbloqueados
                        </div>
                        <div className="bg-purple-700/30 px-2 py-1 rounded-full text-xs">
                          <span className="text-yellow-300 font-bold">
                            100%
                          </span>{' '}
                          personalizado
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!showAchievement && !fastForward && progressPercentage < 40 && (
              <motion.button
                onClick={() => setFastForward(true)}
                className="w-full py-2 text-[#7432B4] text-sm font-medium border border-[#7432B4]/30 rounded-lg hover:bg-[#7432B4]/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Processar mais rápido
              </motion.button>
            )}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-center text-gray-500 px-6"
            >
              Seu plano é desenvolvido com base nas mais recentes pesquisas em
              fisiologia do exercício e adaptado especificamente ao seu perfil.
            </motion.p>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default CreatingPlan;