import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, Award, Clock, Check } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';

const AgeSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAgeRange, getNextRoute } = useQuiz();
  const [recentUsers, setRecentUsers] = useState(0);

  useEffect(() => {
    const updateRecentUsers = () => {
      const randomUsers = Math.floor(Math.random() * (1800 - 1200 + 1)) + 1200;
      setRecentUsers(randomUsers);
    };

    updateRecentUsers();
    const interval = setInterval(updateRecentUsers, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleAgeSelection = (age: '35-44' | '45-54' | '55-64' | '65+') => {
    setAgeRange(age);
    navigate(getNextRoute(location.pathname));
  };

  const ageImages = {
    '35-44': 'https://i.ibb.co/5gHr243G/Design-sem-nome.jpg',
    '45-54': 'https://i.ibb.co/7dfDfr0t/Design-sem-nome-4.jpg',
    '55-64': 'https://i.ibb.co/zVqMpNTF/Design-sem-nome-2.jpg',
    '65+': 'https://i.ibb.co/jkLnFLsn/Design-sem-nome-3.jpg',
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Badge de Quiz/Teste - ARQUÉTIPO CUIDADOR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6"
        >
          <Clock className="w-4 h-4" />
          <span>AVALIAÇÃO GRATUITA DE MOBILIDADE</span>
        </motion.div>

        {/* Title - Ênfase no problema (CUIDADOR) */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D1441] text-center leading-tight mb-4 max-w-3xl">
  DESCUBRA SEU MÉTODO PERSONALIZADO DE{' '}
  <span className="text-[#7432B4]"> YOGA NA CADEIRA </span> QUE ELIMINA SUAS DORES
</h1>

        {/* Subtitle - Problema + Solução (CUIDADOR) */}
        <p className="text-gray-600 text-sm sm:text-base text-center mb-8 max-w-md sm:max-w-lg lg:max-w-xl">
          <span className="font-semibold">Para mulheres que sofrem com limitações de movimento e dores articulares.</span> Método desenvolvido por fisioterapeutas especializados em saúde feminina.
        </p>

        {/* Age Selection Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md sm:max-w-lg lg:max-w-2xl mb-10">
          {[['35-44', '45-54'], ['55-64', '65+']].map((row, i) => (
            <React.Fragment key={i}>
              {row.map((age) => (
                <button
                  key={age}
                  onClick={() =>
                    handleAgeSelection(age as '35-44' | '45-54' | '55-64' | '65+')
                  }
                  className="relative overflow-hidden rounded-2xl bg-[#7432B4] text-white font-medium h-32 sm:h-36 lg:h-40 group"
                >
                  <img
                    src={ageImages[age as keyof typeof ageImages]}
                    alt={`Age group ${age}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity"
                  />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl mb-1">{age}</span>
                    <span className="text-2xl sm:text-3xl">→</span>
                  </div>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Social Proof - Confiança (SÁBIO) */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl mb-10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex -space-x-2">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="ml-1 text-sm font-medium text-gray-600">4.9</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-center text-gray-600">
            <span className="font-semibold text-[#7432B4]">{recentUsers}</span>{' '}
            mulheres recuperaram sua mobilidade com nosso método exclusivo
          </p>
        </div>

        {/* Footer Text */}
        <div className="text-xs sm:text-sm text-gray-500 text-center max-w-md sm:max-w-lg lg:max-w-2xl px-4">
          Ao continuar, eu concordo com os{' '}
          <span className="underline">Termos de Serviço</span> e{' '}
          <span className="underline">Política de Privacidade</span>.
          <br />
          Receba dicas exclusivas sobre mobilidade articular e recuperação física.
        </div>
      </div>
    </div>
  );
};

export default AgeSelection;