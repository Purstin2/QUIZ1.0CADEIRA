import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface EmailCaptureModalProps {
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setEmail: saveEmailToContext } = useQuiz();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email && email.includes('@')) {
      try {
        // Save email to Supabase
        const { error: supabaseError } = await supabase
          .from('emails')
          .insert([{ email }]);

        if (supabaseError) {
          if (supabaseError.code === '23505') { // Unique violation
            setError('Este email já está cadastrado.');
            return;
          }
          throw supabaseError;
        }

        // Save to context and show success
        saveEmailToContext(email);
        setSubmitted(true);
        
        // Notify parent after delay
        setTimeout(() => {
          onSubmit(email);
        }, 2000);
      } catch (err) {
        console.error('Error saving email:', err);
        setError('Ocorreu um erro ao salvar seu email. Tente novamente.');
      }
    } else {
      setError('Por favor, insira um email válido.');
    }
  };

  const handleClose = () => {
    onClose();
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none ${
                        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      required
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}
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