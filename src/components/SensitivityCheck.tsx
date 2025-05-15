import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from './AnimatedPage';
import Header from './Header';

const SensitivityCheck: React.FC = () => {
const navigate = useNavigate();
const [selectedItems, setSelectedItems] = useState<string[]>([]);
const [showTip, setShowTip] = useState<string | null>(null);

const options = [
{
id: 'back',
label: 'Costas sensíveis',
image: 'https://images.pexels.com/photos/4506226/pexels-photo-4506226.jpeg',
tip: 'Adaptaremos os exercícios para minimizar a pressão nas costas'
},
{
id: 'knees',
label: 'Joelhos sensíveis',
image: 'https://images.pexels.com/photos/4506227/pexels-photo-4506227.jpeg',
tip: 'Incluiremos alternativas que não causam impacto nos joelhos'
}
];

const toggleSelection = (id: string) => {
setSelectedItems(prev =>
prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
);
if (!selectedItems.includes(id)) {
  setShowTip(id);
  setTimeout(() => setShowTip(null), 3000);
}
};

const handleClearSelection = () => {
setSelectedItems([]);
setShowTip(null);
};

const handleNext = () => {
navigate('/support-step');
};

return (
<AnimatedPage>
<div className="flex flex-col min-h-screen bg-white">
<Header />
<div className="flex-1 flex flex-col items-center px-4">
<div className="w-full max-w-md">
<div className="mb-6">
<div className="text-xs text-center text-[#7432B4] uppercase mb-2">SAÚDE</div>
<div className="h-2 w-full bg-[#F4F4F4] rounded-full">
<motion.div
className="h-2 bg-[#7432B4] rounded-full"
initial={{ width: '75%' }}
animate={{ width: '85%' }}
transition={{ duration: 0.5 }}
/>
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

              <AnimatePresence>
                {showTip === option.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 p-3 bg-[#7432B4] text-white text-sm rounded-xl w-full z-10"
                  >
                    {option.tip}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.button
            onClick={handleClearSelection}
            className="w-full p-4 rounded-2xl border border-[#F4F4F4] text-left text-[#2D1441] font-medium hover:border-[#7432B4] hover:bg-[#7432B4]/5 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Nenhuma das opções acima
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