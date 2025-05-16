import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GenderSelection = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (gender) => {
    setSelected(gender);
    handleContinue(gender);
  };

  const handleContinue = (gender) => {
    navigate('/community', { state: { gender } });
  };

  return (
    <div className="min-h-screen flex items-start justify-center w-full pt-12 px-4 sm:px-6">
      <div className="flex flex-col items-center w-full max-w-sm mx-auto -mt-0">
        <h2 className="text-2xl font-bold text-[#2D1441] mb-8 text-center">Selecione seu sexo</h2>

        <div className="grid grid-cols-2 gap-2 w-full mb-10">
          <motion.div
            className={`rounded-2xl border p-6 flex flex-col items-center text-center cursor-pointer transition-all ${
              selected === 'female' ? 'border-purple-700 bg-purple-50' : 'border-gray-200'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('female')}
          >
            <div className="text-6xl mb-3">👩</div>
            <div className={`font-medium ${selected === 'female' ? 'text-purple-700' : 'text-gray-800'}`}>
              Feminino
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Programa adaptado para mulheres
            </div>
          </motion.div>

          <motion.div
            className={`rounded-2xl border p-6 flex flex-col items-center text-center cursor-pointer transition-all ${
              selected === 'male' ? 'border-purple-700 bg-purple-50' : 'border-gray-200'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('male')}
          >
            <div className="text-6xl mb-3">👨</div>
            <div className={`font-medium ${selected === 'male' ? 'text-purple-700' : 'text-gray-800'}`}>
              Masculino
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Programa adaptado para homens
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;