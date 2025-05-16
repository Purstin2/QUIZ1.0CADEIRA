import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, AlertCircle, TrendingDown, Shield } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const BMICalculator: React.FC = () => {
  const navigate = useNavigate();
  const { setBodyMassIndex, dreamBody, bodyType } = useQuiz();

  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [targetWeight, setTargetWeight] = useState(60);
  const [showWarning, setShowWarning] = useState(false);

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiColor, setBmiColor] = useState('text-yellow-500');

  useEffect(() => {
    calculateBMI();

    // Definir peso alvo automaticamente com base no IMC
    if (bmi) {
      const h = height / 100;
      let idealBmi = 22; // IMC ideal médio
      if (dreamBody === 'athletic') idealBmi = 23;
      if (bodyType === 'plus') idealBmi = 24;

      const calculatedIdealWeight = Math.round(idealBmi * (h * h));
      setTargetWeight(calculatedIdealWeight);
    }
  }, [height, weight, bmi, dreamBody, bodyType]);

  const calculateBMI = () => {
    const h = height / 100;
    const result = weight / (h * h);
    const rounded = parseFloat(result.toFixed(1));
    setBmi(rounded);

    if (result < 18.5) {
      setBmiCategory('Abaixo do peso');
      setBmiColor('text-blue-500');
    } else if (result < 25) {
      setBmiCategory('Peso ideal');
      setBmiColor('text-emerald-500');
    } else if (result < 30) {
      setBmiCategory('Sobrepeso');
      setBmiColor('text-yellow-500');
      setShowWarning(true);
    } else if (result < 35) {
      setBmiCategory('Obesidade I');
      setBmiColor('text-orange-500');
      setShowWarning(true);
    } else {
      setBmiCategory('Obesidade II+');
      setBmiColor('text-red-500');
      setShowWarning(true);
    }
  };

  const handleNext = () => {
    if (bmi) {
      setBodyMassIndex(bmi);
      navigate('/profile-summary');
    }
  };

  // Insights de saúde baseados no IMC
  const healthInsights = [
    {
      threshold: 18.5,
      color: 'blue',
      risk: 'Nutricional',
      message:
        'Possível déficit de nutrientes essenciais e massa muscular reduzida',
    },
    {
      threshold: 25,
      color: 'green',
      risk: 'Baixo',
      message:
        'Baixo risco de doenças relacionadas ao peso - mantenha hábitos saudáveis',
    },
    {
      threshold: 30,
      color: 'yellow',
      risk: 'Moderado',
      message:
        'Maior risco de diabetes tipo 2, hipertensão e doenças cardiovasculares',
    },
    {
      threshold: 35,
      color: 'orange',
      risk: 'Alto',
      message:
        'Risco significativo de apneia do sono, problemas articulares e cardiovasculares',
    },
    {
      threshold: 100,
      color: 'red',
      risk: 'Muito Alto',
      message:
        'Risco grave de complicações de saúde. Ação imediata recomendada',
    },
  ];

  // Benefícios da perda de peso
  const currentHealthInsight = healthInsights.find(
    (insight) => bmi && bmi < insight.threshold
  );

  // Benefícios esperados com a yoga na cadeira
  const yogaBenefits = [
    '✅ Melhora da postura e redução de dores',
    '✅ Aumento da flexibilidade e força muscular',
    '✅ Redução do estresse e ansiedade',
    '✅ Melhor circulação sanguínea',
    '✅ Suporte para perda saudável de peso',
    '✅ Mais energia e disposição no dia-a-dia',
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 px-5 py-6 max-w-xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-2xl font-bold text-[#2D1441] mb-1"
          >
            Suas medidas atuais
          </motion.h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Última etapa para que seu plano personalizado seja criado!
          </p>

          <div className="bg-[#F8F7FA] rounded-2xl p-5 shadow-sm mb-6 space-y-6">
            {/* Altura */}
            <div>
              <label className="text-gray-700 font-medium">Altura</label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">140 cm</span>
                <span className="bg-[#7432B4] text-white px-3 py-1 rounded-md text-sm">
                  {height} cm
                </span>
                <span className="text-sm text-gray-500">220 cm</span>
              </div>
              <input
                type="range"
                min="140"
                max="220"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full custom-slider"
              />
            </div>

            {/* Peso atual */}
            <div>
              <label className="text-gray-700 font-medium">Peso atual</label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">40 kg</span>
                <span className="bg-[#7432B4] text-white px-3 py-1 rounded-md text-sm">
                  {weight} kg
                </span>
                <span className="text-sm text-gray-500">150 kg</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full custom-slider"
              />
            </div>
          </div>

          {/* IMC resultado */}
          {bmi && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-4 mb-6 border"
              style={{
                backgroundColor: `rgba(${
                  currentHealthInsight?.color === 'green'
                    ? '220, 252, 231'
                    : currentHealthInsight?.color === 'yellow'
                    ? '254, 249, 195'
                    : currentHealthInsight?.color === 'orange'
                    ? '255, 237, 213'
                    : currentHealthInsight?.color === 'red'
                    ? '254, 226, 226'
                    : '224, 242, 254'
                }, 0.6)`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className={`text-xl font-bold ${bmiColor}`}>
                    IMC: {bmi}
                  </div>
                  <div className="text-sm text-gray-600">{bmiCategory}</div>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <div className="text-xs text-gray-500">Nível de risco</div>
                  <div
                    className={`font-bold text-lg ${
                      currentHealthInsight?.color === 'green'
                        ? 'text-green-500'
                        : currentHealthInsight?.color === 'yellow'
                        ? 'text-yellow-600'
                        : currentHealthInsight?.color === 'orange'
                        ? 'text-orange-500'
                        : currentHealthInsight?.color === 'red'
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }`}
                  >
                    {currentHealthInsight?.risk}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                {currentHealthInsight?.message}
              </p>

              {/* Alertas de saúde condicionais */}
              {showWarning && (
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Seu IMC sugere necessidade de atenção
                    </p>
                    <p className="text-xs text-gray-600">
                      Nosso método adaptado pode ajudar a melhorar esses
                      indicadores em 21 dias
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          

          {/* Botão de continuar */}
          <motion.button
            onClick={handleNext}
            className="w-full bg-[#7432B4] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#6822A6] transition-colors shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Criar Meu Plano Personalizado
          </motion.button>
        </main>

        {/* Slider style */}
        <style>{`
          .custom-slider {
            appearance: none;
            height: 6px;
            background: #E0D6F2;
            border-radius: 9999px;
            outline: none;
          }

          .custom-slider::-webkit-slider-thumb {
            appearance: none;
            height: 22px;
            width: 22px;
            background: #7432B4;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: background 0.2s;
          }

          .custom-slider::-moz-range-thumb {
            height: 22px;
            width: 22px;
            background: #7432B4;
            border: none;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          }

          .custom-slider:focus::-webkit-slider-thumb {
            background: #5c2495;
          }
        `}</style>
      </div>
    </AnimatedPage>
  );
};

export default BMICalculator;
