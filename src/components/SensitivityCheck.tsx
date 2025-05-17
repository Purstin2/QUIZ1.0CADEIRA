import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Unlink, CloudRain, Hand, Infinity } from 'lucide-react';
import AnimatedPage from './AnimatedPage';

const SensitivityCheck: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showTip, setShowTip] = useState<string | null>(null);
  
  // ID constante para a opção "nenhuma das opções"
  const NONE_OPTION_ID = 'none';

  // Opções de sensibilidade atualizadas para mulheres 40+ com ícones em vez de imagens
  const options = [
    {
      id: 'back',
      label: 'Dores nas costas e coluna',
      icon: <Activity className="w-6 h-6 text-[#7432B4]" />,
      tip: 'Comum em 68% das mulheres após os 40 anos. Nosso método inclui adaptações específicas para aliviar e prevenir dores na região lombar.'
    },
    {
      id: 'knees',
      label: 'Desconforto nos joelhos',
      icon: <Unlink className="w-6 h-6 text-[#7432B4]" />,
      tip: 'A redução natural de colágeno após os 40 pode afetar a estabilidade das articulações. Exercícios adaptados podem fortalecer sem impacto.'
    },
    {
      id: 'shoulders',
      label: 'Tensão nos ombros e pescoço',
      icon: <CloudRain className="w-6 h-6 text-[#7432B4]" />,
      tip: 'Tensão na região cervical afeta 72% das mulheres 40+ e pode ser agravada por estresse. Nossos exercícios incluem alívio específico para esta área.'
    },
    {
      id: 'wrists',
      label: 'Sensibilidade nos pulsos',
      icon: <Hand className="w-6 h-6 text-[#7432B4]" />,
      tip: 'Comum em mulheres com sintomas de artrite ou uso frequente de computador. Adaptamos os exercícios para minimizar a pressão nesta área.'
    },
    {
      id: 'balance',
      label: 'Dificuldades de equilíbrio',
      icon: <Infinity className="w-6 h-6 text-[#7432B4]" />,
      tip: 'Após os 45 anos, muitas mulheres notam mudanças sutis no equilíbrio. Nosso método inclui exercícios que ajudam a restaurar a estabilidade.'
    }
  ];

  // Nova função para gerenciar a lógica de seleção
  const toggleSelection = (id: string) => {
    if (id === NONE_OPTION_ID) {
      // Se selecionar "Nenhuma das opções", limpa qualquer outra seleção
      if (selectedItems.includes(NONE_OPTION_ID)) {
        // Se clicar novamente em "Nenhuma", deseleciona
        setSelectedItems([]);
      } else {
        // Seleciona apenas "Nenhuma das opções"
        setSelectedItems([NONE_OPTION_ID]);
      }
    } else {
      // Para outras opções
      setSelectedItems(prev => {
        // Se já estiver selecionado, remove da seleção
        if (prev.includes(id)) {
          return prev.filter(item => item !== id);
        } else {
          // Se for nova seleção, adiciona e remove "Nenhuma das opções" se estiver selecionada
          const newSelection = prev.filter(item => item !== NONE_OPTION_ID);
          return [...newSelection, id];
        }
      });
    }

    // Exibir dica sobre a sensibilidade selecionada
    if (id !== NONE_OPTION_ID && !selectedItems.includes(id)) {
      const option = options.find(opt => opt.id === id);
      if (option?.tip) {
        setShowTip(id);
        setTimeout(() => setShowTip(null), 5000);
      }
    }
  };

  // Função de navegação baseada na seleção
  const handleNext = () => {
    // Se "nenhuma das opções" foi selecionada OU não há nada selecionado, pule para exercise-style
    if (selectedItems.includes(NONE_OPTION_ID) || selectedItems.length === 0) {
      navigate('/exercise-style');
    } else {
      // Se houver áreas sensíveis selecionadas, vá para a página de suporte
      navigate('/support-step');
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center px-4 pt-7">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#2D1441] mb-1 text-center">
              Você sente desconforto em alguma destas áreas?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">Selecione todas as áreas relevantes para você</p>

            <div className="space-y-4 mb-6">
              {options.map(option => (
                <motion.div key={option.id} className="relative">
                  <motion.button
                    onClick={() => toggleSelection(option.id)}
                    className={`w-full p-4 flex items-center gap-4 rounded-2xl border transition-all ${
                      selectedItems.includes(option.id)
                        ? 'border-[#7432B4] bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10'
                        : 'border-[#F4F4F4] hover:border-[#7432B4]/30 hover:bg-[#7432B4]/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#7432B4]/10">
                      {option.icon}
                    </div>
                    <span className="font-medium text-[#2D1441]">{option.label}</span>
                    {selectedItems.includes(option.id) && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="ml-auto w-6 h-6 bg-[#7432B4] rounded-full flex items-center justify-center text-white text-sm"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Dica informativa sobre a sensibilidade - mostrada temporariamente após seleção */}
                  <AnimatePresence>
                    {showTip === option.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 -bottom-16 bg-[#7432B4] text-white p-3 rounded-lg text-xs z-10 shadow-lg"
                      >
                        {option.tip}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Botão "Nenhuma das opções" */}
              <motion.button
                onClick={() => toggleSelection(NONE_OPTION_ID)}
                className={`w-full p-4 rounded-2xl border text-left font-medium transition-all ${
                  selectedItems.includes(NONE_OPTION_ID)
                    ? 'border-[#7432B4] bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 text-[#2D1441]'
                    : 'border-[#F4F4F4] hover:border-[#7432B4]/30 hover:bg-[#7432B4]/5 text-[#2D1441]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span>Nenhuma das opções acima</span>
                  {selectedItems.includes(NONE_OPTION_ID) && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-6 h-6 bg-[#7432B4] rounded-full flex items-center justify-center text-white text-sm"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </div>



            <motion.button
              onClick={handleNext}
              className="w-full bg-[#7432B4] text-white font-semibold py-4 rounded-2xl text-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Próximo passo
            </motion.button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default SensitivityCheck;