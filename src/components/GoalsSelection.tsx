import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

// Removi a importação do LoadingScreen que não será mais usado

const GoalsSelection: React.FC = () => {
  const navigate = useNavigate();
  const { goals, toggleGoal, setSelectedGoalsCount } = useQuiz();
  const [isProcessing, setIsProcessing] = useState(false); // Renomeado para clareza
  const [points, setPoints] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const count = goals.filter(g => g.selected).length;
    setSelectedCount(count);
    setPoints(count * 10);
  }, [goals]);

  const handleGoalToggle = (id: string) => {
    if (!isProcessing) toggleGoal(id);
  };

  const handleNextStep = () => {
    if (selectedCount === 0 || isProcessing) return;
    
    // Salvar contagem para usar na próxima etapa
    setSelectedGoalsCount(selectedCount);
    
    // Indicar processamento sem mostrar tela de loading
    setIsProcessing(true);
    
    // Navegar diretamente para a próxima página relevante, pulando a confirmação
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/chair-yoga-experience');
    }, 500); // Reduzido o tempo para apenas 500ms para melhor experiência
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />

        <main className="flex-1 flex flex-col px-4">
          <div className="w-full max-w-md mx-auto">

            {/* Pontos de gamificação */}
            <div className="mb-6 flex justify-end items-center">
              <div className="flex flex-col items-center" title={`${points} pontos`}>
                <div className="text-xs text-gray-500">PONTOS</div>
                <motion.div
                  key={points}
                  initial={{ scale: 1 }}
                  animate={{ scale: points > 0 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-bold text-[#7432B4]"
                  aria-label={`Você acumulou ${points} pontos`}
                >
                  {points}
                </motion.div>
              </div>
            </div>

            {/* Título e subtítulo */}
            <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
              O que você quer alcançar?
            </h2>
            <p className="text-gray-500 mb-4 text-center text-sm">
              Escolha o que é importante para você agora
            </p>

            {/* Lista de objetivos */}
            <section className="space-y-2.5 mb-6" aria-label="Lista de objetivos">
              {goals.map((goal) => (
                <motion.button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border relative transition ${
                    goal.selected 
                      ? 'bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 border-[#7432B4] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  role="button"
                  aria-pressed={goal.selected}
                  aria-label={`Objetivo: ${goal.title}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    goal.selected ? 'bg-[#7432B4] text-white' : 'bg-[#7432B4]/10 text-[#7432B4]'
                  }`}>
                    {goal.icon}
                  </div>
                  <div className="text-left flex-1 ml-3">
                    <div className="font-medium text-gray-800">{goal.title}</div>
                    <div className="text-sm text-gray-500">{goal.description}</div>
                  </div>
                  {goal.selected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute right-4 w-6 h-6 flex items-center justify-center text-white bg-[#7432B4] rounded-full shadow-md"
                      aria-hidden="true"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </section>

            {/* Botão de continuar - Modificado para mostrar texto de processamento no próprio botão */}
            <motion.button
              onClick={handleNextStep}
              className={`w-full font-semibold py-4 px-6 rounded-2xl text-lg shadow-lg transition-all ${
                selectedCount > 0 
                  ? 'bg-[#7432B4] text-white hover:bg-[#6822A6]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selectedCount > 0 && !isProcessing ? { scale: 1.02 } : {}}
              whileTap={selectedCount > 0 && !isProcessing ? { scale: 0.98 } : {}}
              disabled={selectedCount === 0 || isProcessing}
              aria-disabled={selectedCount === 0 || isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  Processando...
                </span>
              ) : (
                'Continuar'
              )}
            </motion.button>
          </div>
        </main>

        {/* Removi completamente o LoadingScreen */}
      </div>
    </AnimatedPage>
  );
};

export default GoalsSelection;