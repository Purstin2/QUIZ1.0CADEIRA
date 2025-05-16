import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';
import EmailCaptureModal from './EmailCaptureModal';

// Header personalizado sem o texto "OBJETIVOS"
const CustomHeader = () => {
  return (
    <header className="px-4 py-4">
      <div className="w-full text-center">
        <h1 className="text-[#7432B4] font-bold text-2xl tracking-wider"> </h1>
      </div>
    </header>
  );
};

const GoalsSelection: React.FC = () => {
  const navigate = useNavigate();
  const { goals, toggleGoal, setSelectedGoalsCount } = useQuiz();
  const [isProcessing, setIsProcessing] = useState(false);
  const [points, setPoints] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [focusedGoal, setFocusedGoal] = useState<string | null>(null);
  const [progressStage, setProgressStage] = useState(0);
  const [userInsight, setUserInsight] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Sistema dinâmico de insights personalizados
  const insights = {
    'lose-weight': 'Perder peso após os 40 anos é mais desafiador devido a mudanças metabólicas, mas nosso método foi criado especificamente para atender a esse desafio.',
    'manage-mood': 'Estresse e ansiedade afetam a qualidade de vida e até mesmo o sono. Nosso método inclui técnicas exclusivas para equilíbrio emocional.',
    'balance-hormones': 'Desequilíbrios hormonais afetam até 80% das mulheres na meia-idade. Nossos exercícios incluem técnicas específicas para harmonização hormonal.',
    'improve-mobility': 'A mobilidade reduzida afeta mais de 60% das pessoas após os 45 anos. Nosso programa foi desenvolvido por fisioterapeutas especializados.',
    'enhance-skin': 'Exercícios específicos de yoga melhoram a circulação e oxigenação da pele, contribuindo para uma aparência mais jovial e saudável.',
    'improve-heart': 'Apenas 15 minutos diários de exercícios adaptados podem reduzir o risco cardiovascular em até 30%, segundo estudos da Mayo Clinic.'
  };

  useEffect(() => {
    const count = goals.filter(g => g.selected).length;
    setSelectedCount(count);

    // Sistema de pontos para gamificação interna
    const basePoints = count * 10;
    const bonusPoints = count >= 2 ? 15 : 0;
    setPoints(basePoints + bonusPoints);

    // Estágios de progresso para desbloqueio de elementos
    if (count >= 3) setProgressStage(3);
    else if (count >= 2) setProgressStage(2);
    else if (count >= 1) setProgressStage(1);
    else setProgressStage(0);

    // Sistema de insights baseado na seleção mais recente
    const selectedGoals = goals.filter(g => g.selected);
    if (selectedGoals.length > 0) {
      const latestGoal = selectedGoals[selectedGoals.length - 1];
      setUserInsight(insights[latestGoal.id as keyof typeof insights] || '');
    }
  }, [goals]);

  const handleGoalToggle = (id: string) => {
    if (!isProcessing) {
      toggleGoal(id);
      setFocusedGoal(id);

      // Reset do foco após breve delay
      setTimeout(() => {
        setFocusedGoal(null);
      }, 800);
    }
  };

  const handleNextStep = () => {
    if (selectedCount > 0) {
      setSelectedGoalsCount(selectedCount);
      // Mostrar o modal antes de navegar
      setShowEmailModal(true);
    }
  };

  const handleEmailModalComplete = (emailCaptured = false) => {
    setShowEmailModal(false);
    // Se email foi capturado, salvar no contexto
    if (emailCaptured) {
      console.log('Email capturado com sucesso!');
    }
    // Proceder com a navegação
    navigate('/chair-yoga-experience');
  };

  const prioritizedGoals = goals;


  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Substituímos o Header padrão pelo personalizado */}
        <CustomHeader />

        <main className="flex-1 flex flex-col px-4">
          <div className="w-full max-w-md mx-auto">
            {/* Título principal com copy persuasiva */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center mb-5"
            >
              <h2 className="text-2xl font-bold text-[#2D1441] mb-3 text-center">
                O que você quer transformar na sua vida?
              </h2>
              <p className="text-gray-600 text-sm">
                Escolha seus objetivos e criaremos um plano{' '}
                <span className="font-semibold text-[#7432B4]">
                  personalizado
                </span>{' '}
                para você alcançá-los sem sair da cadeira
              </p>
            </motion.div>

            {/* Objetivos reordenados estrategicamente */}
            <section className="space-y-2.5 mb-5" aria-label="Lista de objetivos">
              {prioritizedGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border relative transition overflow-hidden ${
                    goal.selected
                      ? 'bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 border-[#7432B4] shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  } ${focusedGoal === goal.id ? 'ring-2 ring-[#7432B4]' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                      goal.selected
                        ? 'bg-[#7432B4] text-white'
                        : 'bg-[#7432B4]/10 text-[#7432B4]'
                    }`}
                  >
                    {goal.icon}
                  </div>
                  <div className="text-left flex-1 ml-3">
                    <div className="font-medium text-gray-800">
                      {goal.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {goal.description}
                    </div>
                  </div>

                  {/* Indicador visual de seleção, sem animação */}
                  {goal.selected && (
                    <div className="bg-[#7432B4] rounded-full flex items-center justify-center text-white text-sm w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </section>

            {/* Área reorganizada de feedback e insights */}
            <div className="space-y-4 mb-5">
              {/* Plano premium - visível após 3+ seleções */}
              <AnimatePresence>
                {progressStage >= 3 && (
                  <motion.div
                    key="premium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <div className="bg-purple-600 rounded-full p-1 mt-0.5 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-800 mb-1">
                            Plano Avançado Ativado:
                          </h3>
                          <p className="text-sm text-purple-700">
                            Seu perfil multidimensional requer um método
                            personalizado de alta performance. Adaptaremos cada
                            exercício para seus objetivos múltiplos, maximizando
                            resultados em menos tempo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botão de continuar corrigido */}
            <motion.button
              onClick={handleNextStep}
              className={`w-full font-semibold py-4 px-6 rounded-2xl text-lg shadow-lg transition-all ${
                selectedCount > 0
                  ? 'bg-[#7432B4] text-white hover:bg-[#6822A6]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selectedCount > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedCount > 0 ? { scale: 0.98 } : {}}
              disabled={selectedCount === 0}
            >
              <span>
                {selectedCount === 0
                  ? 'Selecione pelo menos um objetivo'
                  : `Continuar com ${selectedCount} ${
                      selectedCount === 1 ? 'objetivo' : 'objetivos'
                    }`}
              </span>
            </motion.button>
          </div>
        </main>
      </div>
      {showEmailModal && (
        <EmailCaptureModal
          onClose={() => handleEmailModalComplete(false)}
          onSubmit={(email) => handleEmailModalComplete(true)}
        />
      )}
    </AnimatedPage>
  );
};

export default GoalsSelection;