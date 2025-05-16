import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronRight } from 'lucide-react';

const MethodPreview: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  // Exemplos de previews do método
  const previewItems = [
    {
      title: 'Alongamento Cervical Adaptado',
      description: 'Alívio imediato para tensão no pescoço',
      image: 'https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg',
    },
    {
      title: 'Twist Abdominal Sentado',
      description: 'Excelente para melhorar digestão e fortalecer core',
      image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg',
    },
    {
      title: 'Elevação Modificada de Pernas',
      description: 'Fortalece parte inferior sem impacto nas articulações',
      image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg',
    },
  ];

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="w-full flex items-center justify-between p-3 bg-[#7432B4]/10 rounded-lg border border-[#7432B4]/20 text-[#2D1441]"
      >
        <div className="flex items-center">
          <Eye className="w-5 h-5 mr-2 text-[#7432B4]" />
          <span className="font-medium">Ver prévia do método</span>
        </div>
        <ChevronRight
          className={`w-5 h-5 transition-transform ${
            showPreview ? 'rotate-90' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {previewItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-[#2D1441]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-[#7432B4]">
                + 42 exercícios exclusivos no método completo
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MethodPreview;