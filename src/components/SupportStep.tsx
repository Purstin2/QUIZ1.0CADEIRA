import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const SupportStep: React.FC = () => {
 const navigate = useNavigate();
 
 return (
   <AnimatedPage>
     <div className="flex flex-col min-h-screen bg-white">
       <Header />
       <div className="flex-1 flex flex-col items-center justify-center px-4">
         <div className="w-full max-w-md text-center">
           <motion.div 
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.5 }}
             className="mb-6"
           >
             <img 
               src="https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg" 
               alt="Instrutor ajudando aluno" 
               className="w-16 h-16 object-cover rounded-full mx-auto mb-4 border-2 border-[#7432B4]"
             />
             
             <h2 className="text-xl font-bold text-[#2D1441] mb-6">
               Estamos com você em cada passo do caminho
             </h2>
           </motion.div>
           
           <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.5 }}
             className="mb-8"
           >
             <p className="text-gray-600 mb-6 text-sm">
               Detectamos que você tem desconforto em áreas específicas do corpo. 
               Nosso programa será adaptado para cuidar dessas regiões sensíveis.
             </p>
             
             <div className="bg-[#F8F7FA] p-5 rounded-2xl mb-6 text-left">
               <p className="text-[#7432B4] font-semibold mb-4 text-sm">
                 Veja como alcançamos resultados surpreendentes:
               </p>
               
               <ul className="space-y-3">
                 <li className="flex items-start">
                   <span className="text-[#7432B4] mr-2 flex-shrink-0">✅</span>
                   <span className="text-gray-700 text-sm">Treinos personalizados só para você</span>
                 </li>
                 <li className="flex items-start">
                   <span className="text-[#7432B4] mr-2 flex-shrink-0">✅</span>
                   <span className="text-gray-700 text-sm">Plano de refeições personalizado</span>
                 </li>
                 <li className="flex items-start">
                   <span className="text-[#7432B4] mr-2 flex-shrink-0">✅</span>
                   <span className="text-gray-700 text-sm">Capacitando o apoio de treinador</span>
                 </li>
                 <li className="flex items-start">
                   <span className="text-[#7432B4] mr-2 flex-shrink-0">✅</span>
                   <span className="text-gray-700 text-sm">Exercícios adaptados para suas áreas sensíveis</span>
                 </li>
               </ul>
             </div>
           </motion.div>
           
           <motion.button
             onClick={() => navigate('/exercise-style')}
             className="w-full bg-[#7432B4] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#6822A6] transition-colors shadow-lg"
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
           >
             Continuar
           </motion.button>
         </div>
       </div>
     </div>
   </AnimatedPage>
 );
};

export default SupportStep;