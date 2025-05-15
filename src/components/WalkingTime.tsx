import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
import Header from './Header';

const WalkingTime: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1); // valor inicial: 0, 1 ou 2

  const options = [
    {
      id: 'less-20',
      label: 'Menos de 20 minutos',
      icon: '🚶‍♀️'
    },
    {
      id: '20-60',
      label: '20 a 60 minutos',
      icon: '🏃‍♀️'
    },
    {
      id: 'more-60',
      label: 'Mais de 60 minutos',
      icon: '⚡'
    }
  ];

  const handleNext = () => {
    // Aqui você pode salvar a resposta no contexto se necessário
    navigate('/yoga-level');
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

            <h2 className="text-2xl font-bold text-[#2D1441] mb-8 text-center">
              Quanto tempo você passa caminhando em um dia normal?
            </h2>

            {/* Slider com bonequinho */}
            <div className="relative my-10">
              <input
                type="range"
                min={0}
                max={2}
                step={1}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full appearance-none bg-[#F4F4F4] h-2 rounded-full outline-none"
              />
              {/* Bonequinho animado */}
              <div
                className="absolute -top-10 transition-all duration-300 text-3xl"
                style={{
                  left: `calc(${(value / 2) * 100}% - 16px)`
                }}
              >
                {options[value].icon}
              </div>
            </div>

            {/* Legenda abaixo do slider */}
            <div className="flex justify-between text-sm text-gray-700 font-medium">
              {options.map((opt, index) => (
                <span
                  key={opt.id}
                  className={`text-center w-1/3 ${index === value ? 'text-[#7432B4]' : 'text-gray-500'}`}
                >
                  {opt.label}
                </span>
              ))}
            </div>

            {/* Botão continuar */}
            <button
              onClick={handleNext}
              className="mt-10 w-full py-3 bg-[#7432B4] text-white rounded-xl font-semibold hover:bg-[#5e2794] transition"
            >
              Continuar
            </button>

          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default WalkingTime;
