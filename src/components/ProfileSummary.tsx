import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Target,
  Dumbbell,
  Scale,
  User,
  Activity,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Shield,
  Award,
  Check,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const ProfileSummary: React.FC = () => {
  const navigate = useNavigate();
  const {
    ageRange,
    sex,
    goals,
    bodyType,
    dreamBody,
    chairYogaExperience,
    exerciseStyle,
    availableTime,
    bodyMassIndex,
  } = useQuiz();

  const [showRiskAlert, setShowRiskAlert] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (bodyMassIndex && bodyMassIndex > 25) {
      setTimeout(() => {
        setShowRiskAlert(true);
      }, 1000);
    }

    setTimeout(() => {
      setShowBenefits(true);
    }, 2000);

    setTimeout(() => {
      setAnalysisComplete(true);
    }, 3000);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bodyMassIndex, navigate]);

  const getFitnessLevel = () => {
    if (chairYogaExperience === 'regular') return 'Avançado';
    if (chairYogaExperience === 'tried') return 'Intermediário';
    return 'Iniciante';
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5)
      return {
        category: 'Abaixo do peso',
        color: 'text-blue-600',
        risk: 'Moderado',
      };
    if (bmi < 25)
      return { category: 'Peso ideal', color: 'text-green-600', risk: 'Baixo' };
    if (bmi < 30)
      return {
        category: 'Sobrepeso',
        color: 'text-yellow-600',
        risk: 'Elevado',
      };
    if (bmi < 35)
      return {
        category: 'Obesidade I',
        color: 'text-orange-600',
        risk: 'Alto',
      };
    return {
      category: 'Obesidade II+',
      color: 'text-red-600',
      risk: 'Muito Alto',
    };
  };

  const getPersonalizedBenefits = () => {
    const benefitsList = [];

    benefitsList.push({
      title: 'Melhora significativa da postura',
      description: 'Redução de dores e tensões musculares',
      percentage: '82%',
    });

    const selectedGoalIds = goals.filter((g) => g.selected).map((g) => g.id);

    if (selectedGoalIds.includes('lose-weight')) {
      benefitsList.push({
        title: 'Perda de peso saudável',
        description: `${
          bodyType === 'plus'
            ? 'Adaptada para seu tipo corporal'
            : 'Com progressão personalizada'
        }`,
        percentage: '76%',
      });
    }

    if (selectedGoalIds.includes('manage-mood')) {
      benefitsList.push({
        title: 'Redução de ansiedade e estresse',
        description: 'Melhor qualidade de sono e bem-estar diário',
        percentage: '89%',
      });
    }

    if (selectedGoalIds.includes('improve-mobility')) {
      benefitsList.push({
        title: 'Aumento da flexibilidade',
        description: 'Movimentos mais fluidos e menos dores articulares',
        percentage: '94%',
      });
    }

    if (selectedGoalIds.includes('improve-heart')) {
      benefitsList.push({
        title: 'Melhora da saúde cardiovascular',
        description: 'Melhor circulação e pressão arterial controlada',
        percentage: '78%',
      });
    }

    if (benefitsList.length < 4) {
      benefitsList.push({
        title: 'Mais energia no dia-a-dia',
        description: 'Disposição para atividades cotidianas sem cansaço',
        percentage: '91%',
      });

      if (benefitsList.length < 4) {
        benefitsList.push({
          title: 'Fortalecimento muscular',
          description: 'Músculos mais fortes sem impacto nas articulações',
          percentage: '87%',
        });
      }
    }

    return benefitsList.slice(0, 4);
  };

  const getTimeToResults = () => {
    if (chairYogaExperience === 'regular') return '5-7 dias';
    if (chairYogaExperience === 'tried') return '7-14 dias';
    return '14-21 dias';
  };

  const getTransformationPotential = () => {
    let score = 72;

    if (chairYogaExperience === 'never') score -= 5;
    if (chairYogaExperience === 'regular') score += 10;
    if (bodyMassIndex && bodyMassIndex > 30) score += 8;
    if (availableTime === 'more30') score += 5;
    if (availableTime === 'less15') score -= 3;

    return Math.min(98, Math.max(65, score));
  };

  const getTargetDate = () => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 21);

    const day = targetDate.getDate();
    const month = targetDate.toLocaleString('pt-BR', { month: 'short' });
    const year = targetDate.getFullYear();

    return `${day} de ${month} de ${year}`;
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-4"
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 mb-3 text-white"
                animate={{
                  scale: analysisComplete ? 1 : [1, 1.1, 1],
                  boxShadow: analysisComplete
                    ? '0 0 0 rgba(0,0,0,0)'
                    : [
                        '0 0 0 rgba(168, 85, 247, 0.4)',
                        '0 0 20px rgba(168, 85, 247, 0.6)',
                        '0 0 0 rgba(168, 85, 247, 0.4)',
                      ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: analysisComplete ? 0 : Infinity,
                }}
              >
                {analysisComplete ? (
                  <Check className="w-8 h-8" />
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <TrendingUp className="w-8 h-8" />
                  </motion.div>
                )}
              </motion.div>

              <AnimatePresence mode="wait">
                {!analysisComplete ? (
                  <motion.h2
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-2xl font-bold text-[#2D1441] mb-2"
                  >
                    Analisando seu perfil...
                  </motion.h2>
                ) : (
                  <motion.h2
                    key="complete"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-[#2D1441] mb-2"
                  >
                    Seu relatório está pronto!
                  </motion.h2>
                )}
              </AnimatePresence>

              <p className="text-gray-600 text-sm">
                {analysisComplete
                  ? 'Desenvolvemos um plano personalizado com base em suas respostas'
                  : 'Processando suas respostas para criar seu plano personalizado'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6"
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span className="font-medium">Índice de Transformação</span>
                  </div>
                  <motion.div
                    className="font-bold text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.5 }}
                  >
                    {getTransformationPotential()}%
                  </motion.div>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-yellow-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getTransformationPotential()}%` }}
                    transition={{ delay: 2.5, duration: 1.2 }}
                  />
                </div>
              </div>

              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#7432B4]" />
                    Índice de Massa Corporal (IMC)
                  </h3>
                  <span
                    className={`font-bold ${
                      getBmiCategory(bodyMassIndex).color
                    }`}
                  >
                   {bodyMassIndex ? bodyMassIndex.toFixed(1) : '0.0'}
                  </span>
                </div>

                <div className="relative h-6 mb-1">
                  <div className="absolute inset-0 rounded-full overflow-hidden flex">
                    <div className="h-full w-1/5 bg-blue-400"></div>
                    <div className="h-full w-1/5 bg-green-400"></div>
                    <div className="h-full w-1/5 bg-yellow-400"></div>
                    <div className="h-full w-1/5 bg-orange-400"></div>
                    <div className="h-full w-1/5 bg-red-400"></div>
                  </div>

                  <motion.div
                    className="absolute top-1/2 h-8 w-3 bg-white border border-gray-300 rounded-full shadow-md transform -translate-y-1/2"
                    initial={{ left: 0 }}
                    animate={{
                      left: `${Math.min(
                        Math.max(((bodyMassIndex - 15) / 25) * 100, 0),
                        100
                      )}%`,
                    }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                  ></motion.div>
                </div>

                <div className="flex justify-between text-xs text-gray-600 px-1">
                  <span>15</span>
                  <span>20</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35+</span>
                </div>
              </div>

              <AnimatePresence>
                {showRiskAlert && bodyMassIndex > 25 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-b border-gray-100"
                  >
                    <div className="p-4 bg-yellow-50">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 mb-1">
                            Risco à saúde: {getBmiCategory(bodyMassIndex).risk}
                          </h4>
                          <p className="text-sm text-gray-700">
                            Seu IMC atual está associado a um risco{' '}
                            {getBmiCategory(bodyMassIndex).risk.toLowerCase()}{' '}
                            para problemas de saúde como diabetes tipo 2,
                            hipertensão e doenças cardiovasculares. Nosso método
                            ajudará a reduzir esses riscos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-5 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">
                      Nível de Experiência
                    </div>
                    <div className="font-semibold text-gray-800">
                      {getFitnessLevel()}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Dumbbell className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">
                      Tempo disponível
                    </div>
                    <div className="font-semibold text-gray-800">
                      {availableTime === 'less15'
                        ? 'Menos de 15min'
                        : availableTime === '15to30'
                        ? '15-30min'
                        : 'Mais de 30min'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">
                      Objetivo principal
                    </div>
                    <div className="font-semibold text-gray-800">
                      {goals.find((g) => g.selected)?.title || 'Melhora geral'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">Resultados em</div>
                    <div className="font-semibold text-gray-800">
                      {getTimeToResults()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#F7F3FF] flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#7432B4] flex-shrink-0 overflow-hidden border-2 border-white shadow-md flex items-center justify-center text-white">
                  <Calendar className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-medium text-[#2D1441] mb-1">
                    Meta a ser alcançada até:
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-[#7432B4]">
                      {getTargetDate()}
                    </span>{' '}
                    - apenas 21 dias de método para transformar sua vida!
                  </p>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {showBenefits && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white rounded-xl p-5 shadow-md mb-6"
                >
                  <h3 className="font-semibold text-lg text-[#2D1441] mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#7432B4]" />
                    Benefícios Esperados Para Você
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getPersonalizedBenefits().map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.2 }}
                        className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-start gap-2 mb-2">
                            <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
                              {benefit.percentage}
                            </div>
                            <div className="text-sm font-medium text-[#2D1441] break-words">
                              {benefit.title}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-auto">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
                    Percentuais baseados em estudo clínico com 450 participantes
                    após 21 dias de prática
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {analysisComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={() => navigate('/results')}
                    className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold text-lg py-4 px-8 rounded-xl hover:from-[#6822A6] hover:to-[#8740E6] transition-colors shadow-lg mb-2 relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.2, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    />

                    <span>Ver Meu Plano Completo</span>

                    {countdown > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#6822A6] h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {countdown}
                      </div>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500">
                    Seu plano personalizado está pronto para começar
                    imediatamente
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

export default ProfileSummary;