import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

interface EmailCaptureModalProps {
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setEmail: saveEmailToContext } = useQuiz();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit button clicked, email:', email);
    if (email && email.includes('@')) {
      saveEmailToContext(email);
      setSubmitted(true);
      // Enviar para API/backend para captura do lead (optional)
      setTimeout(() => {
        console.log('Calling onSubmit with email:', email);
        onSubmit(email); // Trigger onSubmit to notify GoalsSelection
      }, 2000);
    }
  };

  const handleClose = () => {
    console.log('Close button clicked');
    onClose(); // Trigger onClose to close modal and navigate
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl p-6 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            onClick={handleClose}
          >
            <X size={20} />
          </button>

          <div className="text-center mb-4">
            {!submitted ? (
              <>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#7432B4]" />
                </div>
                <h3 className="text-xl font-bold text-[#2D1441] mb-2">
                  Para onde devemos enviar seu plano personalizado?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                Informe seu Melhor E-mail para receber seu plano personalizado ao final do Quiz.
                </p>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu melhor email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#7432B4] text-white font-bold py-3 rounded-lg hover:bg-[#6822A6] transition-colors"
                  >
                    Garantir Meu Plano
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-3">
                  Seus dados estão seguros e protegidos. Não enviamos spam.
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D1441] mb-2">
                  Email salvo com sucesso!
                </h3>
                <p className="text-gray-600">
                  Continue seu quiz para obter seu plano personalizado completo.
                </p>
              </>
            )}
          </div>

          <button
            onClick={handleClose}
            className="w-full mt-2 text-sm text-gray-500 hover:text-[#7432B4]"
          >
            {submitted ? 'Continuar' : 'Continuar sem salvar'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmailCaptureModal;