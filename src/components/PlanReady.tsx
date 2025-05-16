import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Lock,
  Award,
  Users,
  Calendar,
  Star,
  Zap,
  ChevronDown,
  Heart,
  Shield,
  TrendingDown,
  AlertTriangle,
  Mail,
  Gift,
  FileText,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';
import MethodPreview from './MethodPreview';

const PlanReady: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { email, setEmail, goals, bodyType, ageRange, bodyMassIndex } =
    useQuiz();

  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });
  const [userEmail, setUserEmail] = useState(email || '');
  const [recentViewers, setRecentViewers] = useState(173);
  const [showPeople, setShowPeople] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [unlockPulse, setUnlockPulse] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [claimingStatus, setClaimingStatus] = useState<
    'idle' | 'claiming' | 'claimed'
  >('idle');
  const [bonusUnlocked, setBonusUnlocked] = useState(false);

  // Gerar um nome distintivo para o plano baseado no perfil
  const getPlanName = () => {
    let prefix = 'Método';

    if (bodyMassIndex > 30) {
      prefix = 'Sistema Total';
    } else if (bodyMassIndex > 25) {
      prefix = 'Programa Completo';
    }

    const selectedGoalIds = goals.filter((g) => g.selected).map((g) => g.id);

    let suffix = 'Yoga na Cadeira';

    if (selectedGoalIds.includes('lose-weight')) {
      suffix += ' para Emagrecimento';
    } else if (selectedGoalIds.includes('improve-mobility')) {
      suffix += ' para Mobilidade';
    } else if (selectedGoalIds.includes('manage-mood')) {
      suffix += ' para Equilíbrio';
    }

    return `${prefix} ${suffix}`;
  };

  // Plano features baseados no perfil
  const getPlanFeatures = () => {
    const coreFeatures = [
      {
        title: 'Programa 21 Dias',
        description: 'Transformação completa em apenas 3 semanas',
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        title: 'Exercícios Guiados',
        description: 'Sequências detalhadas passo a passo sem sair da cadeira',
        icon: <FileText className="w-4 h-4" />,
      },
    ];

    const personalizedFeatures = [];

    // Adicionar features baseados em objetivos
    const selectedGoalIds = goals.filter((g) => g.selected).map((g) => g.id);

    if (selectedGoalIds.includes('lose-weight')) {
      personalizedFeatures.push({
        title: 'Queima de Gordura Localizada',
        description: 'Exercícios específicos para ativação de gordura teimosa',
        icon: <Zap className="w-4 h-4" />,
      });
    }

    if (selectedGoalIds.includes('improve-mobility')) {
      personalizedFeatures.push({
        title: 'Recuperação Articular',
        description:
          'Sequências específicas para melhorar amplitude de movimento',
        icon: <Heart className="w-4 h-4" />,
      });
    }

    if (selectedGoalIds.includes('manage-mood')) {
      personalizedFeatures.push({
        title: 'Equilíbrio Mental',
        description:
          'Técnicas de respiração para redução de ansiedade e estresse',
        icon: <Shield className="w-4 h-4" />,
      });
    }

    // Features baseados em características corporais
    if (bodyMassIndex > 25) {
      personalizedFeatures.push({
        title: 'Adaptações Corporais',
        description: `Movimentos especiais para ${
          bodyType === 'plus' ? 'corpos plus size' : 'seu tipo corporal'
        }`,
        icon: <Users className="w-4 h-4" />,
      });
    }

    // Feature baseado na idade
    if (ageRange === '55-64' || ageRange === '65+') {
      personalizedFeatures.push({
        title: 'Adequado à Maturidade',
        description:
          'Ajustes específicos para articulações sensíveis e força reduzida',
        icon: <Shield className="w-4 h-4" />,
      });
    }

    // Garantir que temos pelo menos 4 features
    if (personalizedFeatures.length < 2) {
      personalizedFeatures.push({
        title: 'Progressão Inteligente',
        description:
          'Sistema que evolui com você, evitando platôs de resultados',
        icon: <TrendingDown className="w-4 h-4" />,
      });
    }

    // Limitar a 2 features personalizadas + bônus de nutrição
    const limitedPersonalized = personalizedFeatures.slice(0, 2);

    // Feature bônus sempre presente
    const bonusFeature = {
      title: 'BÔNUS: Guia Nutricional',
      description: 'Complemento alimentar para maximizar resultados',
      icon: <Gift className="w-4 h-4" />,
      bonus: true,
    };

    return [...coreFeatures, ...limitedPersonalized, bonusFeature];
  };

  // Gerar reviews baseados no perfil
  const getRelevantReviews = () => {
    const baseReviews = [
      {
        quote:
          'Perdi 7kg em 28 dias sem sair da cadeira. Era exatamente o que eu precisava!',
        author: 'Maria S., 58 anos',
        rating: 5,
        relevance: 'weight',
      },
      {
        quote:
          'As dores nas minhas costas sumiram completamente após 2 semanas. Era cética no início, agora indico para todos.',
        author: 'Ana L., 62 anos',
        rating: 5,
        relevance: 'mobility',
      },
      {
        quote:
          'Minha ansiedade reduziu drasticamente e finalmente consigo dormir melhor. Método incrível!',
        author: 'Roberto C., 47 anos',
        rating: 5,
        relevance: 'mood',
      },
      {
        quote:
          'Aos 70 anos, achei que não conseguiria mais exercitar... Estou mais ativa que muitas amigas décadas mais jovens!',
        author: 'Helena M., 70 anos',
        rating: 5,
        relevance: 'senior',
      },
    ];

    // Filtrar reviews mais relevantes
    const selectedGoalIds = goals.filter((g) => g.selected).map((g) => g.id);
    let prioritizedReviews = [...baseReviews];

    if (selectedGoalIds.includes('lose-weight')) {
      prioritizedReviews.sort((a, b) => (a.relevance === 'weight' ? -1 : 1));
    } else if (selectedGoalIds.includes('improve-mobility')) {
      prioritizedReviews.sort((a, b) => (a.relevance === 'mobility' ? -1 : 1));
    } else if (selectedGoalIds.includes('manage-mood')) {
      prioritizedReviews.sort((a, b) => (a.relevance === 'mood' ? -1 : 1));
    } else if (ageRange === '55-64' || ageRange === '65+') {
      prioritizedReviews.sort((a, b) => (a.relevance === 'senior' ? -1 : 1));
    }

    return prioritizedReviews;
  };

  // Usuários online falsos para sensação de escassez social
  const getActiveUsers = () => {
    return [
      { name: 'Maria', location: 'São Paulo', time: 2 },
      { name: 'Carlos', location: 'Rio de Janeiro', time: 4 },
      { name: 'Ana', location: 'Belo Horizonte', time: 6 },
      { name: 'Roberto', location: 'Curitiba', time: 8 },
      { name: 'Juliana', location: 'Porto Alegre', time: 10 },
    ];
  };

  // Efeitos de inicialização
  useEffect(() => {
    // Tocar som de celebração
    try {
      audioRef.current = new Audio('/success-notification.mp3');
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Silenciosamente falha se autoplay bloqueado
      });
    } catch (e) {
      console.log('Audio play failed');
    }

    // Efeito de confete na entrada
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#7432B4', '#9747FF', '#E9D5FF'],
      });
    }, 500);

    // Mostrar badge de sucesso
    setTimeout(() => {
      setShowBadge(true);

      // Pulsar feature destacada
      setTimeout(() => {
        setUnlockPulse('bonus');

        // Mostrar pessoas online
        setTimeout(() => {
          setShowPeople(true);

          // Mostrar notificação
          setTimeout(() => {
            setShowNotification(true);
          }, 3000);
        }, 2000);
      }, 1500);
    }, 1000);

    // Ciclar entre features
    const featureInterval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % getPlanFeatures().length);
    }, 4000);

    // Ciclar entre depoimentos
    const reviewInterval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % getRelevantReviews().length);
    }, 5000);

    // Contagem regressiva
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds > 0 ? prev.seconds - 1 : 59;
        const newMinutes = newSeconds === 59 ? prev.minutes - 1 : prev.minutes;

        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    // Atualizar contagem de espectadores
    const viewersInterval = setInterval(() => {
      const change = Math.random();
      if (change > 0.7) {
        setRecentViewers((prev) => prev + 1);
      } else if (change < 0.2) {
        setRecentViewers((prev) => Math.max(prev - 1, 150));
      }
    }, 5000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(reviewInterval);
      clearInterval(countdownInterval);
      clearInterval(viewersInterval);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Efeito para desbloquear bônus
  useEffect(() => {
    if (emailConfirmed && !bonusUnlocked) {
      setTimeout(() => {
        setBonusUnlocked(true);

        // Efeito de confete para o bônus
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFB900'],
        });
      }, 1500);
    }
  }, [emailConfirmed]);

  // Lidar com email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  // Confirmar email
  const handleConfirmEmail = () => {
    if (userEmail && userEmail.includes('@')) {
      setEmail(userEmail);
      setEmailConfirmed(true);
    }
  };

  // Começar processo de reserva
  const handleClaim = () => {
    setClaimingStatus('claiming');

    // Simulação de processamento
    setTimeout(() => {
      setClaimingStatus('claimed');

      // Dirigir para a página de vendas
      setTimeout(() => {
        navigate('/sales');
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white relative overflow-hidden">
        <Header />

        {/* Partículas de fundo para sensação de celebração */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-300 opacity-20"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 5,
            }}
          />
        ))}

        <main className="flex-1 px-6 py-3 relative z-10">
          <div className="max-w-md mx-auto">
            {/* Badge de sucesso */}
            <AnimatePresence>
              {showBadge && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="mb-4 flex justify-center"
                >
                  <div className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium text-sm">
                      SEU PLANO ESTÁ PRONTO!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Título do plano personalizado */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4"
            >
              <h2 className="text-xl font-bold text-[#2D1441] mb-1">
                {getPlanName()}
              </h2>
              <p className="text-sm text-gray-600">
                Transformação garantida em apenas 21 dias
              </p>
            </motion.div>

            {/* Card de produto principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-5"
            >
              {/* Banner de valor */}
              <div className="bg-[#7432B4] py-2 px-4 text-center">
                <span className="text-sm font-bold text-white">
                  VALOR: <span className="line-through opacity-70">R$197</span>{' '}
                  <span className="text-yellow-300">POR APENAS R$19,90</span>
                </span>
              </div>

              {/* Conteúdo do card */}
              <div className="p-4">
                {/* Lista de features animadas */}
                <div className="mb-4 min-h-[180px]">
                  <AnimatePresence mode="wait">
                    {getPlanFeatures().map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: featureIndex === index ? 1 : 0,
                          x: featureIndex === index ? 0 : 20,
                          scale:
                            unlockPulse === 'bonus' && feature.bonus
                              ? [1, 1.05, 1]
                              : 1,
                        }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-3 ${
                          featureIndex !== index ? 'hidden' : ''
                        } ${
                          feature.bonus
                            ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-100'
                            : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            feature.bonus
                              ? 'bg-yellow-400 text-white'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {feature.icon}
                        </div>
                        <div>
                          <h3
                            className={`font-medium text-base ${
                              feature.bonus
                                ? 'text-yellow-800'
                                : 'text-gray-800'
                            }`}
                          >
                            {feature.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              feature.bonus
                                ? 'text-yellow-700'
                                : 'text-gray-600'
                            }`}
                          >
                            {feature.description}
                          </p>

                          {feature.bonus && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="bg-white text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                BÔNUS GRATUITO
                              </span>
                              <span className="bg-white text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                ECONOMIA DE R$37
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Navegação de features */}
                  <div className="flex justify-center gap-1 mt-4">
                    {getPlanFeatures().map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFeatureIndex(idx)}
                        className={`w-2 h-2 rounded-full ${
                          featureIndex === idx
                            ? 'bg-purple-700'
                            : 'bg-purple-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Depoimentos */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 min-h-[110px]">
                  <AnimatePresence mode="wait">
                    {getRelevantReviews().map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeReview === index ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${activeReview !== index ? 'hidden' : ''}`}
                      >
                        <div className="flex text-yellow-400 mb-1">
                          {Array.from({ length: 5 }).map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              size={14}
                              className={
                                starIdx < review.rating
                                  ? 'fill-yellow-400'
                                  : 'fill-gray-200 text-gray-200'
                              }
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-700 italic mb-2">
                          {review.quote}
                        </p>
                        <p className="text-xs font-medium text-gray-800">
                          {review.author}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Seção de email */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Confirme seu e-mail para envio do plano
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={handleEmailChange}
                      disabled={emailConfirmed}
                      className={`flex-1 py-2 px-3 bg-white border ${
                        emailConfirmed
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-300'
                      } rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4]`}
                      placeholder="seu@email.com"
                    />
                    <button
                      onClick={handleConfirmEmail}
                      disabled={
                        emailConfirmed || !userEmail || !userEmail.includes('@')
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        emailConfirmed
                          ? 'bg-green-100 text-green-700'
                          : !userEmail || !userEmail.includes('@')
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-[#7432B4] text-white hover:bg-[#6822A6]'
                      } transition-colors`}
                    >
                      {emailConfirmed ? <CheckCircle size={16} /> : 'Confirmar'}
                    </button>
                  </div>

                  {/* Mensagem de bônus desbloqueado */}
                  <AnimatePresence>
                    {bonusUnlocked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2"
                      >
                        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-2 text-xs text-yellow-800 flex items-start gap-2">
                          <Gift className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Bônus desbloqueado!
                            </span>{' '}
                            Guia Nutricional Completo adicionado ao seu plano.
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contador regressivo */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-500">
                      Oferta especial expira em:
                    </div>
                    <div className="text-xs text-gray-500">Vagas limitadas</div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <div className="flex justify-center gap-1 text-lg font-bold text-[#2D1441]">
                        <div className="bg-[#7432B4] text-white w-7 h-7 flex items-center justify-center rounded">
                          {String(timeLeft.minutes).padStart(2, '0').charAt(0)}
                        </div>
                        <div className="bg-[#7432B4] text-white w-7 h-7 flex items-center justify-center rounded">
                          {String(timeLeft.minutes).padStart(2, '0').charAt(1)}
                        </div>
                        <span>:</span>
                        <div className="bg-[#7432B4] text-white w-7 h-7 flex items-center justify-center rounded">
                          {String(timeLeft.seconds).padStart(2, '0').charAt(0)}
                        </div>
                        <div className="bg-[#7432B4] text-white w-7 h-7 flex items-center justify-center rounded">
                          {String(timeLeft.seconds).padStart(2, '0').charAt(1)}
                        </div>
                      </div>
                    </div>

                    <div className="w-24 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: recentViewers > 180 ? [1, 1.05, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <div className="font-bold text-lg text-[#2D1441]">
                          {recentViewers}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          visualizando
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Garantia */}
                <div className="flex items-center gap-2 mb-4 bg-green-50 p-2 rounded-lg border border-green-100">
                  <Shield className="w-4 h-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-xs text-green-800">
                      <span className="font-medium">Garantia de 7 dias</span> -
                      Resultados ou devolução do investimento
                    </div>
                  </div>
                </div>

                {/* Prévia do método */}
                <MethodPreview />

                {/* Botão de ação principal */}
                <motion.button
                  onClick={handleClaim}
                  className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold text-base py-3 px-6 rounded-lg hover:from-[#6822A6] hover:to-[#8740E6] transition-colors shadow relative overflow-hidden disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    y: [0, -4, 0],
                    boxShadow: [
                      '0 4px 6px rgba(116, 50, 180, 0.2)',
                      '0 10px 15px rgba(116, 50, 180, 0.3)',
                      '0 4px 6px rgba(116, 50, 180, 0.2)',
                    ],
                  }}
                  transition={{
                    y: { repeat: Infinity, duration: 2, repeatDelay: 0.5 },
                    boxShadow: {
                      repeat: Infinity,
                      duration: 2,
                      repeatDelay: 0.5,
                    },
                  }}
                  disabled={claimingStatus !== 'idle' || !emailConfirmed}
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
                  {/* Texto do botão baseado no estado */}
                  <span className="relative z-10">
                    {claimingStatus === 'idle' && <>Ver Meu Plano Completo</>}
                    {claimingStatus === 'claiming' && <>Processando...</>}
                    {claimingStatus === 'claimed' && (
                      <>Plano Reservado com Sucesso!</>
                    )}
                  </span>
                </motion.button>

                {/* Texto de encorajamento */}
                <div className="text-center mt-2">
                  <p className="text-xs text-gray-500">
                    Acesso vitalício com uma única compra hoje
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Certificado de aprovação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm mb-4 text-center"
            >
              <div className="flex justify-center mb-1">
                <Award className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="text-sm font-medium text-[#2D1441] mb-1">
                Seu plano foi certificado pela SBFS
              </h3>
              <p className="text-xs text-gray-600">
                Todas as sequências foram aprovadas por especialistas em
                fisioterapia
              </p>
            </motion.div>
          </div>
        </main>

        {/* Notificação flutuante - pessoas vendo a página */}
        <AnimatePresence>
          {showPeople && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-[220px] border border-gray-200 z-20"
            >
              <div className="flex items-start gap-2">
                <div className="flex -space-x-2 flex-shrink-0">
                  {[1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full bg-gray-200 border border-white overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/24?img=${10 + idx}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-800">
                    {recentViewers} pessoas visualizando
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {Math.floor(Math.random() * 20) + 10} reservaram nos últimos
                    30min
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notificação flutuante - outras pessoas comprando */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, x: -100, y: -40 }}
              animate={{ opacity: 1, x: 0, y: -40 }}
              exit={{ opacity: 0, x: -100, y: -40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 max-w-[250px] z-50"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">
                    <span className="font-bold">
                      {
                        getActiveUsers()[
                          Math.floor(Math.random() * getActiveUsers().length)
                        ].name
                      }
                    </span>{' '}
                    acabou de adquirir o plano
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    há {Math.floor(Math.random() * 3) + 1} minutos
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-white"
              >
                <span className="text-[8px]">×</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sombras sutis de vinheta para criar profundidade */}
        <div className="pointer-events-none fixed inset-0 bg-gradient-radial from-transparent to-black/10 opacity-40 z-0"></div>

        <style jsx>{`
          .bg-gradient-radial {
            background-image: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
          }
        `}</style>
      </div>
    </AnimatedPage>
  );
};

export default PlanReady;