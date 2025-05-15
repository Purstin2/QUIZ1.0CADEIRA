import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
import Header from './Header';

const ActivityLevel: React.FC = () => {
  const navigate = useNavigate();

  const levels = [
    {
      id: 'sedentary',
      label: 'Sedentário',
      description: 'Pouco ou nenhum exercício',
      icon: '🛋️'
    },
    {
      id: 'lightly',
      label: 'Pouco ativo',
      description: 'Exercícios leves 1-2 dias por semana',
      icon: '🚶‍♀️'
    },
    {
      id: 'moderately',
      label: 'Moderadamente ativo',
      description: 'Exercícios moderados 3-5 dias por semana',
      icon: '🏃‍♀️'
    },
    {
      id: 'very',
      label: 'Muito ativo',
      description: 'Exercícios intensos 6-7 dias por semana',
      icon: '💪'
    },
    {
      id: 'highly',
      label: 'Altamente ativo',
      description: 'Exercícios diários intensos e trabalho físico',
      icon: '🏋️‍♀️'
    }
  ];

  const handleSelect = () => {
    navigate('/walking-time');
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center px-4">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <div className="text-xs text-center text-[#7432B4] uppercase mb-2">ATIVIDADE</div>
              <div className="h-1 w-full bg-[#F4F4F4] rounded-full">
                <div className="h-1 w-4/5 bg-[#7432B4] rounded-full" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#2D1441] mb-6 text-center">
              Qual é seu nível de atividade?
            </h2>

            <div className="space-y-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={handleSelect}
                  className="w-full p-4 flex items-center gap-4 rounded-xl border border-gray-200 hover:border-[#7432B4] hover:bg-[#7432B4] hover:bg-opacity-5 transition-all group"
                >
                  <div className="bg-[#7432B4] bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center text-xl">
                    {level.icon}
                  </div>
                  <div className="text-left">
                    <span className="text-gray-800 group-hover:text-[#2D1441] font-medium block">
                      {level.label}
                    </span>
                    <span className="text-gray-500 text-sm block">
                      {level.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ActivityLevel;
