import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="aspect-[4/3] w-full relative">
              <img
                src="https://i.imgur.com/cdIhLwv.jpeg"
                alt="Mulheres praticando exercício"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-[#2D1441] mb-1">+ 6,800 mulheres</h2>
              <p className="text-gray-600 mb-4">na casa dos 40 anos já se juntou à nossa família fitness</p>
              
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">4.7</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Avaliado por 8.192 pessoas</p>
              </div>
              
              <p className="text-[#7432B4] font-medium mb-4">
                Junte-se a elas hoje! ✨
              </p>
              
              <button
                onClick={() => navigate('/goals')}
                className="w-full bg-[#7432B4] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#6822A6] transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CommunityPage;