import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const AvailableTime: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const timeOptions = [
    {
      id: 'less15',
      label: 'Menos de 15 minutos',
      value: '15 min',
      icon: <Clock className="w-5 h-5" />,
      description: 'Exercícios rápidos e eficientes',
    },
    {
      id: '15to30',
      label: '15-30 minutos',
      value: '30 min',
      icon: <Clock className="w-5 h-5" />,
      description: 'Tempo ideal para resultados balanceados',
    },
    {
      id: '30to45',
      label: '30-45 minutos',
      value: '45 min',
      icon: <Clock className="w-5 h-5" />,
      description: 'Sessões completas com resultados otimizados',
    },
    {
      id: 'more45',
      label: 'Mais de 45 minutos',
      value: '60 min',
      icon: <Clock className="w-5 h-5" />,
      description: 'Treinos intensivos para máximos resultados',
    },
  ];

  const handleSelect = (id: string) => {
    setSelected(id);
    navigate('/bmi-calculator');
  };

  const getTimeByDay = () => {
    switch (selected) {
      case 'less15':
        return '5-10 minutos';
      case '15to30':
        return '10-20 minutos';
      case '30to45':
        return '15-30 minutos';
      case 'more45':
        return '20-45 minutos';
      default:
        return '';
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">

        <main className="flex-1 flex flex-col px-4">
          <div className="w-full max-w-md mx-auto">
            {/* Título e subtítulo */}
            <h2 className="text-2xl font-bold text-[#2D1441] mt-6 mb-2 text-center">
              Quanto tempo você tem para exercícios?
            </h2>
            <p className="text-gray-500 mb-4 text-center text-sm">
              Escolha a duração ideal de treino por sessão
            </p>

            {/* Lista de opções de tempo */}
            <section className="space-y-2.5 mb-6" aria-label="Opções de tempo">
              {timeOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className="w-full flex items-center p-4 rounded-2xl border relative transition bg-white border-gray-200 hover:border-[#7432B4]"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label={`Tempo: ${option.label}`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-[#7432B4]/10 text-[#7432B4]">
                    {option.icon}
                  </div>
                  <div className="text-left flex-1 ml-3">
                    <div className="font-medium text-gray-800">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {option.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </section>

           
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default AvailableTime;
