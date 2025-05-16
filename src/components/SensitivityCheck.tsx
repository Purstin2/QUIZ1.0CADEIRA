import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from './AnimatedPage';
import Header from './Header';

const SensitivityCheck: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showTip, setShowTip] = useState<string | null>(null);
  
  // ID constante para a opção "nenhuma das opções"
  const NONE_OPTION_ID = 'none';

  const options = [
    {
      id: 'back',
      label: 'Costas sensíveis',
      image: 'https://images.pexels.com/photos/4506226/pexels-photo-4506226.jpeg',
     
    },
    {
      id: 'knees',
      label: 'Joelhos sensíveis',
      image: 'https://images.pexels.com/photos/4506227/pexels-photo-4506227.jpeg',

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

    // Lógica de exibição de dicas permanece a mesma, mas só para opções de sensibilidade
    if (id !== NONE_OPTION_ID && !selectedItems.includes(id)) {
      setShowTip(id);
      setTimeout(() => setShowTip(null), 3000);
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

        <div className="flex-1 flex flex-col items-center px-4">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <div className="h-2 w-full bg-[#F4F4F4] rounded-full">
                <motion.div/>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-[#2D1441] mb-1 text-center">
              Você tem dificuldades com algum dos seguintes itens?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">Você pode escolher ambos</p>

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
                    <div className="w-14 h-14 rounded-xl overflow-hidden">
                      <img
                        src={option.image}
                        alt={option.label}
                        className="w-full h-full object-cover"
                      />
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

                 
                </motion.div>
              ))}

              {/* Botão "Nenhuma das opções" agora é tratado como uma opção selecionável */}
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