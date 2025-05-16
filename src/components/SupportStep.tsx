import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Shield, User, Award, Star } from 'lucide-react';
import AnimatedPage from './AnimatedPage';

const SupportStep: React.FC = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showCertification, setShowCertification] = useState(false);
  
  // Simula um carregamento progressivo para elementos importantes
  useEffect(() => {
    setTimeout(() => {
      setShowCertification(true);
    }, 1200);
    
    // Ciclar entre os depoimentos a cada 5 segundos
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(testimonialInterval);
  }, []);
  
  // Depoimentos de pessoas que tiveram condições similares
  const testimonials = [
    {
      quote: "As dores nas minhas costas me impediam de fazer qualquer exercício, até conhecer este método. Hoje me movimento sem dor!",
      author: "Maria S., 58 anos",
      reduction: "78% de redução nas dores"
    },
    {
      quote: "Meus joelhos não me deixavam fazer nem uma caminhada. Graças aos exercícios adaptados, recuperei mobilidade que não tinha há anos.",
      author: "Carlos P., 64 anos",
      reduction: "82% de melhora na mobilidade"
    },
    {
      quote: "Pensei que teria que viver com dores crônicas para sempre. Este programa mudou completamente minha qualidade de vida.",
      author: "Ana L., 52 anos",
      reduction: "90% mais disposição diária"
    }
  ];
  
  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F7F5FF] to-white">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-md">
            
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {/* Título simplificado */}
              <motion.div 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-6"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#7432B4]/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#7432B4]" />
                </div>
                
                <h2 className="text-xl font-bold text-[#2D1441] mb-1">
                  Diagnóstico de Sensibilidade Completo
                </h2>
                <p className="text-[#7432B4] text-sm">
                  Suas áreas sensíveis serão tratadas com atenção especial
                </p>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="bg-[#F8F7FA] p-5 rounded-2xl mb-6">
                  <div className="flex items-start gap-3 mb-5">
                    <Shield className="w-6 h-6 text-[#7432B4] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-[#2D1441]">
                        Detectamos áreas de sensibilidade
                      </p>
                      <p className="text-gray-600 text-sm">
                        Com base em sua análise, criaremos um programa que respeita suas limitações e <span className="font-medium">acelera sua recuperação</span>.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-[#7432B4] font-semibold mb-4 text-sm">
                    Seu programa incluirá:
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-[#7432B4]/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-[#7432B4]" />
                      </div>
                      <div>
                        <span className="text-gray-800 font-medium block text-sm">Treinos adaptados para áreas sensíveis</span>
                        <span className="text-gray-500 text-xs">Movimentos especialmente desenvolvidos por fisioterapeutas</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#7432B4]/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-[#7432B4]" />
                      </div>
                      <div>
                        <span className="text-gray-800 font-medium block text-sm">Sequências progressivas de fortalecimento</span>
                        <span className="text-gray-500 text-xs">Evoluindo gradualmente conforme seu corpo responde</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#7432B4]/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-[#7432B4]" />
                      </div>
                      <div>
                        <span className="text-gray-800 font-medium block text-sm">Orientações de alívio imediato</span>
                        <span className="text-gray-500 text-xs">Técnicas para redução de desconforto entre sessões</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#7432B4]/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-[#7432B4]" />
                      </div>
                      <div>
                        <span className="text-gray-800 font-medium block text-sm">Suporte nutricional anti-inflamatório</span>
                        <span className="text-gray-500 text-xs">Alimentos que ajudam na recuperação dos tecidos</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Depoimentos em carrossel */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-1 text-[#7432B4]" />
                      Histórias de recuperação
                    </h3>
                    <div className="flex">
                      {testimonials.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            idx === activeTestimonial 
                              ? 'bg-[#7432B4]' 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTestimonial}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm italic mb-2">
                          "{testimonials[activeTestimonial].quote}"
                        </p>
                        <div className="flex justify-between items-end">
                          <p className="text-xs font-medium text-gray-600">
                            {testimonials[activeTestimonial].author}
                          </p>
                          <span className="text-xs font-bold text-green-600">
                            {testimonials[activeTestimonial].reduction}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Certificação médica */}
                <AnimatePresence>
                  {showCertification && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center justify-center gap-2 mb-6 bg-[#7432B4]/5 py-2 px-3 rounded-lg"
                    >
                      <Award className="w-5 h-5 text-[#7432B4]" />
                      <span className="text-xs font-medium text-[#2D1441]">
                        Programa Certificado pela Associação Brasileira de Fisioterapia
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* CTA intermediário */}
                <motion.button
  onClick={() => navigate('/exercise-style')}
  className="w-full bg-[#7432B4] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#6822A6] transition-all shadow-sm"
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.98 }}
>
  Continuar Personalização
</motion.button>

                
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default SupportStep;