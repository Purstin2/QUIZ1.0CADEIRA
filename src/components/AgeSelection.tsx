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
    '65+': 'https://i.ibb.co/jkLnFLsn/Design-sem-nome-3.jpg'
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center px-4 pt-8">
        {/* Badge de Quiz/Teste */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-3"
        >
          <Clock className="w-3 h-3" />
          <span>TESTE RÁPIDO GRATUITO</span>
        </motion.div>
        
        <h1 className="text-[28px] font-extrabold text-[#2D1441] text-center leading-tight mb-2">
          DESCUBRA SEU PLANO PERSONALIZADO DE <span className="text-[#7432B4]">YOGA NA CADEIRA</span> EM 2 MINUTOS
        </h1>
        
        <p className="text-gray-600 text-center mb-3 max-w-sm">
          <span className="font-semibold">Para mulheres 35+</span> que querem exercícios adaptados à sua idade, 
          corpo e limitações. Desenvolvido por fisioterapeutas especializados
        </p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center mb-5 gap-2"
        >
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            <Award className="w-3 h-3" />
            <span>CERTIFICADO POR ESPECIALISTAS</span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            <Check className="w-3 h-3" />
            <span>100% ADAPTÁVEL AO SEU CORPO</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-6">
          {[['35-44', '45-54'], ['55-64', '65+']].map((row, i) => (
            <React.Fragment key={i}>
              {row.map((age) => (
                <button
                  key={age}
                  onClick={() => handleAgeSelection(age as '35-44' | '45-54' | '55-64' | '65+')}
                  className="relative overflow-hidden rounded-2xl bg-[#7432B4] text-white font-medium h-36 group"
                >
                  <img
                    src={ageImages[age as keyof typeof ageImages]}
                    alt={`Age group ${age}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity"
                  />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <span className="text-lg mb-1">{age}</span>
                    <span className="text-2xl">→</span>
                  </div>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full max-w-md mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
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
                    className={i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
                  />
                ))}
              </div>
              <span className="ml-1 text-sm font-medium text-gray-600">4.9</span>
            </div>
          </div>
          <p className="text-sm text-center text-gray-600">
            <span className="font-semibold text-[#7432B4]">{recentUsers}</span> mulheres já descobriram seu plano personalizado hoje
          </p>
        </div>

        
        <div className="text-[10px] text-gray-500 mt-auto text-center max-w-xs px-4">
          Ao continuar, eu concordo com os <span className="underline">Termos de Serviço</span>, <span className="underline">Política de Privacidade</span>, <span className="underline">Política de Dados</span>, <span className="underline">Assinatura</span>, <span className="underline">Reembolso</span>, e <span className="underline">Cookies</span> (incluindo o uso de rastreamento).
          <br /><br />
          Receba dicas valiosas sobre produtos, serviços e ofertas especiais da FENJES.COM por e-mail!
        </div>
      </div>
    </div>
  );
};

export default AgeSelection;