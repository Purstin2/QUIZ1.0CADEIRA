import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Adicionado AnimatePresence aqui
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Shield,
  Star,
  AlertTriangle,
  Zap,
  Heart
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
    ageRange,
    availableTime
  } = useQuiz();
  
  const [showDetails, setShowDetails] = useState(false);
  
  // Efeito de confete para celebrar a conclusão da análise
  useEffect(() => {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#7432B4', '#9747FF', '#E9D5FF'],
      });
    }, 800);
    
    // Mostrar detalhes automaticamente após um tempo
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Identificar os principais desafios baseados nas respostas
  const getChallenges = () => {
    const challenges = [];
    const selectedGoals = goals.filter(g => g.selected);
    
    selectedGoals.forEach(goal => {
      if (goal.id === 'improve-mobility') {
        challenges.push({
          title: 'Limitação de movimento',
          description: 'Dificuldade para realizar tarefas cotidianas que exigem flexibilidade'
        });
      } else if (goal.id === 'manage-mood') {
        challenges.push({
          title: 'Impacto emocional',
          description: 'Estresse e ansiedade relacionados às limitações físicas'
        });
      } else if (goal.id === 'lose-weight') {
        challenges.push({
          title: 'Sobrecarga articular',
          description: 'Pressão adicional nas articulações comprometendo a mobilidade'
        });
      } else if (goal.id === 'balance-hormones') {
        challenges.push({
          title: 'Desequilíbrio hormonal',
          description: 'Mudanças que afetam a saúde e lubrificação das articulações'
        });
      }
    });
    
    // Adicionar desafio baseado no IMC, se relevante
    if (bodyMassIndex > 25) {
      challenges.push({
        title: 'Influência do peso',
        description: 'Pressão nas articulações intensificando desconforto e limitação'
      });
    }
    
    // Adicionar desafio baseado na idade, se aplicável
    if (ageRange === '55-64' || ageRange === '65+') {
      challenges.push({
        title: 'Desgaste natural',
        description: 'Redução de colágeno e lubrificação nas articulações com a idade'
      });
    }
    
    // Limitar a 3 desafios para não sobrecarregar
    return challenges.slice(0, 3);
  };
  
  // Gerar soluções personalizadas com base nos desafios identificados
  const getSolutions = () => {
    const solutions = [
      {
        title: 'Protocolo de Regeneração Articular Personalizado',
        description: `Sequência de movimentos especialmente adaptados para ${bodyType === 'plus' ? 'corpos plus size' : 'seu tipo corporal'} e nível de mobilidade atual`
      }
    ];
    
    const selectedGoals = goals.filter(g => g.selected);
    
    // Adicionar soluções específicas baseadas nos objetivos
    if (selectedGoals.some(g => g.id === 'improve-mobility')) {
      solutions.push({
        title: 'Sequências de Liberação Miofascial',
        description: 'Movimentos que aliviam tensões profundas e restauram a amplitude de movimento'
      });
    }
    
    if (selectedGoals.some(g => g.id === 'balance-hormones' || g.id === 'manage-mood')) {
      solutions.push({
        title: 'Práticas de Respiração Regenerativa',
        description: 'Técnicas que equilibram o sistema nervoso e promovem relaxamento profundo'
      });
    }
    
    // Adicionar solução baseada no tempo disponível
    if (availableTime === 'less15') {
      solutions.push({
        title: 'Mini-Sessões de Alto Impacto',
        description: 'Rotinas de 5-15 minutos com eficiência máxima para seu dia ocupado'
      });
    } else {
      solutions.push({
        title: 'Progressão de 21 Dias',
        description: 'Evolução gradual que respeita o ritmo natural de recuperação do corpo'
      });
    }
    
    return solutions.slice(0, 3);
  };
  
  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        
        <main className="flex-1 px-4 py-6">
          <div className="max-w-md mx-auto">
            {/* Cabeçalho com resultado da análise */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <motion.div
                className="bg-green-100 text-green-800 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ delay: 0.2, duration: 1, repeat: 2 }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>ANÁLISE CONCLUÍDA</span>
              </motion.div>
              
              <h1 className="text-xl font-bold text-[#2D1441] mb-2">
                Seu Relatório de Mobilidade
              </h1>
              <p className="text-sm text-gray-600">
                Baseado nas suas respostas, identificamos oportunidades específicas para restaurar sua mobilidade articular
              </p>
            </motion.div>
            
            {/* Card de análise - sem pressão de venda */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md mb-6 overflow-hidden"
            >
              {/* Seção de perfil de saúde articular */}
              <div className="bg-[#7432B4]/10 p-4">
                <h2 className="text-[#2D1441] font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#7432B4]" />
                  Seu Perfil de Saúde Articular
                </h2>
                
                <div className="mt-3 flex justify-center">
                  <motion.div 
                    className="w-full max-w-sm h-5 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.2, duration: 1.5 }}
                    />
                    
                    {/* Marcador de posição atual */}
                    <motion.div 
                      className="w-4 h-10 bg-white border border-gray-300 rounded-full shadow-md transform -translate-y-7.5 flex items-center justify-center"
                      initial={{ left: '20%', opacity: 0 }}
                      animate={{ left: `${bodyMassIndex > 30 ? '20%' : bodyMassIndex > 25 ? '35%' : bodyMassIndex > 22 ? '55%' : '70%'}`, opacity: 1 }}
                      transition={{ delay: 2.7, duration: 0.8 }}
                      style={{ position: 'relative', marginTop: '-18px' }}
                    >
                      <div className="w-2 h-2 bg-[#7432B4] rounded-full"></div>
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="mt-3 pt-3 flex justify-between text-xs text-gray-600">
                  <span>Precisa atenção</span>
                  <span>Em progresso</span>
                  <span>Saudável</span>
                </div>
              </div>
              
              <div className="p-4">
                {/* Desafios identificados */}
                <div className="mb-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Desafios identificados
                  </h3>
                  
                  <div className="space-y-3">
                    {getChallenges().map((challenge, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (idx * 0.2) }}
                        className="bg-amber-50 p-3 rounded-lg"
                      >
                        <p className="font-medium text-sm text-amber-700">{challenge.title}</p>
                        <p className="text-xs text-amber-800/70">{challenge.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Soluções personalizadas */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5 }}
                      className="mb-5"
                    >
                      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        Soluções recomendadas para você
                      </h3>
                      
                      <div className="space-y-3">
                        {getSolutions().map((solution, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (idx * 0.2) }}
                            className="bg-green-50 p-3 rounded-lg"
                          >
                            <p className="font-medium text-sm text-green-700">{solution.title}</p>
                            <p className="text-xs text-green-800/70">{solution.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Previsão de resultados */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="bg-[#7432B4]/5 p-4 rounded-lg mb-5"
                    >
                      <h3 className="text-sm font-medium text-[#2D1441] mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#7432B4]" />
                        Resultados esperados com o Sistema de Regeneração Articular
                      </h3>
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Redução de dores</span>
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-[#7432B4]"
                              initial={{ width: 0 }}
                              animate={{ width: '75%' }}
                              transition={{ delay: 1.7, duration: 1 }}
                            />
                          </div>
                          <span className="text-xs font-medium text-[#7432B4]">75%</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Aumento da mobilidade</span>
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-[#7432B4]"
                              initial={{ width: 0 }}
                              animate={{ width: '82%' }}
                              transition={{ delay: 1.9, duration: 1 }}
                            />
                          </div>
                          <span className="text-xs font-medium text-[#7432B4]">82%</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Autonomia diária</span>
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-[#7432B4]"
                              initial={{ width: 0 }}
                              animate={{ width: '91%' }}
                              transition={{ delay: 2.1, duration: 1 }}
                            />
                          </div>
                          <span className="text-xs font-medium text-[#7432B4]">91%</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mt-3">
                        Baseado em estudo com 872 mulheres de perfil similar ao seu
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* CTA para conhecer o método (sem venda direta) */}
                <motion.button
                  onClick={() => navigate('/sales')}
                  className="w-full bg-[#7432B4] text-white font-medium py-3 px-6 rounded-xl hover:bg-[#6822A6] transition-all mb-2 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Conhecer o método completo
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <p className="text-xs text-center text-gray-500">
                  Desenvolvido por especialistas em saúde articular feminina
                </p>
              </div>
            </motion.div>
            
            {/* Selo de credibilidade */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm mb-4 text-center"
            >
              <div className="flex justify-center mb-1">
                <Award className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="text-xs text-[#2D1441]">
                Sistema certificado pela Associação Brasileira de Fisioterapia e Saúde Articular
              </h3>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default ResultsPage;