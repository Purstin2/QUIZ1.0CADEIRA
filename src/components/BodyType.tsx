import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';
import Header from './Header';

const BodyType: React.FC = () => {
  const navigate = useNavigate();
  const { setBodyType } = useQuiz();

  const handleSelection = (type: 'normal' | 'curvy' | 'plus') => {
    setBodyType(type);
    navigate('/dream-body');
  };

  const bodyTypes = [
    {
      value: 'normal',
      label: 'Corpo Normal',
      description: 'Proporções balanceadas, peso médio',
      image: 'https://i.imgur.com/x4v22Q7_d.webp?maxwidth=760&fidelity=grand'
    },
    {
      value: 'curvy',
      label: 'Corpo Curvilíneo',
      description: 'Curvas mais acentuadas, proporção cintura-quadril',
      image: 'https://i.imgur.com/ysFNKb7.jpg'
    },
    {
      value: 'plus',
      label: 'Corpo Plus Size',
      description: 'Mais volume e curvas generosas',
      image: 'https://i.imgur.com/SJu6Mwu_d.webp?maxwidth=760&fidelity=grand'
    }
  ];

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center px-4">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#2D1441] mb-6 text-center">
              Qual é seu tipo de corpo?
            </h2>
          
            <div className="space-y-4">
              {bodyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleSelection(type.value as 'normal' | 'curvy' | 'plus')}
                  className="w-full p-4 flex items-center gap-4 rounded-xl border border-gray-200 hover:border-[#7432B4] hover:bg-[#7432B4] hover:bg-opacity-5 transition-all group"
                >
                  <div className="bg-[#7432B4] bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={type.image} 
                      alt={type.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-gray-800 group-hover:text-[#2D1441] font-medium block">
                      {type.label}
                    </span>
                    <span className="text-gray-500 text-sm block">
                      {type.description}
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

export default BodyType;