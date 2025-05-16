import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CreditCard, Check, Shield, ArrowRight, X, Loader2, Clock, Heart, Users, Mail, CheckCircle } from 'lucide-react';
import Header from './Header';
import { useQuiz } from '../context/QuizContext';
import EnhancedGuaranteeTag from './EnhancedGuaranteeTag';

// Definir estilos keyframes globais
const shimmerAnimation = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
`;

const notificationAnimation = `
  @keyframes notification {
    0% { transform: translateY(100%); opacity: 0; }
    10% { transform: translateY(0); opacity: 1; }
    90% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
`;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlan, email, setEmail } = useQuiz();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    userEmail: email || ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 em segundos
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [recentBuyers, setRecentBuyers] = useState(18);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSafetyMessage, setShowSafetyMessage] = useState(false);
  const [purchaseStarted, setPurchaseStarted] = useState(false);

  // Adicionar estilos keyframes globais ao carregar o componente
  useEffect(() => {
    // Criar elemento de estilo para animações
    const styleElement = document.createElement('style');
    styleElement.innerHTML = shimmerAnimation + notificationAnimation;
    document.head.appendChild(styleElement);
    
    // Limpar ao desmontar o componente
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Simulação de compras recentes para criar urgência social
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      if (random > 0.7) {
        setRecentBuyers(prev => prev + 1);
        
        // Flash de notificação
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 left-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center z-50';
        notification.style.animation = 'notification 3s forwards';
        notification.innerHTML = `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Alguém acabou de adquirir o método!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 3000);
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Destacar campo de email ao iniciar
  useEffect(() => {
    setTimeout(() => {
      const emailInput = document.getElementById('email-input');
      if (emailInput && !purchaseStarted) {
        emailInput.focus();
      }
    }, 500);
  }, [purchaseStarted]);

  // Contador regressivo para criar urgência
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Formatar tempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Detectar intenção de saída
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !showExitIntent && !isProcessing && purchaseStarted) {
        setShowExitIntent(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showExitIntent, isProcessing, purchaseStarted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Marcar que o processo de compra começou
    if (!purchaseStarted) {
      setPurchaseStarted(true);
    }
    
    // Formatação automática para melhorar experiência
    let formattedValue = value;
    if (name === 'cardNumber' && value) {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
    } else if (name === 'expiry' && value) {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    } else if (name === 'cvv' && value) {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
    
    if (name === 'userEmail') {
      setEmail(formattedValue);
    }
    
    // Remover campo da lista de erros quando editado
    if (errorFields.includes(name)) {
      setErrorFields(errorFields.filter(field => field !== name));
    }
    
    // Mostrar mensagem de segurança quando preencher cartão
    if (name === 'cardNumber' && !showSafetyMessage) {
      setShowSafetyMessage(true);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('name');
    if (!formData.userEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) errors.push('userEmail');
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) errors.push('cardNumber');
    if (!formData.expiry.trim() || formData.expiry.length < 5) errors.push('expiry');
    if (!formData.cvv.trim() || formData.cvv.length < 3) errors.push('cvv');
    
    setErrorFields(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simular processamento com feedback visual
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/success');
    }, 2000);
  };

  const plans = {
    starter: { name: 'Método Essencial', price: 'R$ 19,90' },
    complete: { name: 'Método Completo', price: 'R$ 19,90' },
    premium: { name: 'Método Completo', price: 'R$ 19,90' }
  };

  // Testimonials específicos para checkout - escolhidos estrategicamente para endereçar objeções de última hora
  const checkoutTestimonials = [
    {
      quote: "Hesitei na hora de comprar, mas a garantia me convenceu. Melhor decisão que já tomei para minha saúde!",
      name: "Maria S.",
      city: "São Paulo"
    },
    {
      quote: "Comprei há 40 dias e já perdi 5kg. Sem dietas malucas, só com os exercícios diários na cadeira.",
      name: "Carlos M.",
      city: "Fortaleza"
    },
    {
      quote: "O método é entregue na hora, super organizado e fácil de seguir mesmo para iniciantes.",
      name: "Juliana P.",
      city: "Curitiba"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
      <Header />
      
      {/* Barra de progresso visual + timeout */}
      <div className="bg-[#7432B4] text-white py-2 px-4 text-center text-sm sticky top-0 z-20">
        <div className="flex justify-center items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Sua reserva expira em: <span className="font-bold">{formatTime(timeLeft)}</span></span>
        </div>
        <div className="w-full bg-white/20 h-1 mt-1 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 899) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      <main className="flex-1 px-5 py-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-[#2D1441] mb-2">
              Finalize Seu Acesso ao Método
            </h1>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Preencha seus dados abaixo para obter acesso imediato e transformar sua saúde sem sair da cadeira!
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <motion.form 
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div>
                  {/* Campos pessoais e pagamento em uma só tela */}
                  <h2 className="font-semibold text-lg text-[#2D1441] mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#7432B4]" />
                    Informações pessoais
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 border ${
                          errorFields.includes('name') 
                            ? 'border-red-300 bg-red-50' 
                            : focusedField === 'name'
                              ? 'border-[#7432B4] ring-2 ring-[#7432B4]/20'
                              : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none transition-all`}
                        placeholder="Seu nome completo"
                      />
                      {errorFields.includes('name') && (
                        <p className="text-red-500 text-xs mt-1">Por favor, informe seu nome completo</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('userEmail')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 border ${
                          errorFields.includes('userEmail') 
                            ? 'border-red-300 bg-red-50' 
                            : focusedField === 'userEmail'
                              ? 'border-[#7432B4] ring-2 ring-[#7432B4]/20'
                              : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none transition-all`}
                        placeholder="email@exemplo.com"
                      />
                      {errorFields.includes('userEmail') && (
                        <p className="text-red-500 text-xs mt-1">Por favor, informe um email válido</p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">
                        <CheckCircle className="w-3 h-3 inline mr-1 text-green-500" />
                        Você receberá seu método neste email imediatamente após a compra
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6 mb-4">
                    <h2 className="font-semibold text-lg text-[#2D1441] mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#7432B4]" />
                      Informações de Pagamento
                    </h2>
                    
                    {/* Cartões aceitos */}
                    <div className="flex gap-2 mb-4">
                      <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-6" />
                      <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="Mastercard" className="h-6" />
                      <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="American Express" className="h-6" />
                      <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Elo" className="h-6" />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Número do Cartão
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('cardNumber')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="1234 5678 9012 3456"
                            required
                            className={`w-full px-4 py-3 border ${
                              errorFields.includes('cardNumber') 
                                ? 'border-red-300 bg-red-50' 
                                : focusedField === 'cardNumber'
                                  ? 'border-[#7432B4] ring-2 ring-[#7432B4]/20'
                                  : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none transition-all`}
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errorFields.includes('cardNumber') && (
                          <p className="text-red-500 text-xs mt-1">Por favor, informe um número de cartão válido</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Expiração
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('expiry')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="MM/AA"
                            required
                            className={`w-full px-4 py-3 border ${
                              errorFields.includes('expiry') 
                                ? 'border-red-300 bg-red-50' 
                                : focusedField === 'expiry'
                                  ? 'border-[#7432B4] ring-2 ring-[#7432B4]/20'
                                  : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none transition-all`}
                          />
                          {errorFields.includes('expiry') && (
                            <p className="text-red-500 text-xs mt-1">Data inválida</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('cvv')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="123"
                            required
                            className={`w-full px-4 py-3 border ${
                              errorFields.includes('cvv') 
                                ? 'border-red-300 bg-red-50' 
                                : focusedField === 'cvv'
                                  ? 'border-[#7432B4] ring-2 ring-[#7432B4]/20'
                                  : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none transition-all`}
                          />
                          {errorFields.includes('cvv') && (
                            <p className="text-red-500 text-xs mt-1">CVV inválido</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mensagem de segurança - aparece após preenchimento do cartão */}
                <AnimatePresence>
                  {showSafetyMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                        <Lock className="w-4 h-4 flex-shrink-0" />
                        <span>Suas informações são processadas com criptografia bancária de 256 bits</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Botão de finalização */}
                <button
                  type="submit"
                  disabled={isProcessing || errorFields.length > 0}
                  className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all hover:shadow-lg disabled:opacity-70 relative overflow-hidden"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processando pagamento...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Finalizar e Acessar Agora
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  )}
                  
                  {/* Efeito de shimmer para chamar atenção para o botão */}
                  <span className="absolute inset-0 w-full h-full overflow-hidden">
                    <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 -skew-x-12" style={{ animation: 'shimmer 3s infinite' }}></span>
                  </span>
                </button>
                
                {/* Garantias */}
                <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Acesso imediato</span>
                  </div>
                </div>
              </motion.form>
            </div>
            
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Resumo do Pedido */}
              <div className="bg-white rounded-xl p-6 shadow-md mb-4 sticky top-20">
                <h2 className="font-semibold text-lg text-[#2D1441] mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-[#7432B4] mr-2" />
                  Seu Método
                </h2>
                
                {/* Detalhes da oferta principal */}
                <div className="bg-[#7432B4]/5 p-4 rounded-lg mb-4">
                  <div className="text-center mb-3">
                    <div className="text-xs text-[#7432B4] font-medium mb-1">OFERTA ESPECIAL</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-400 line-through text-sm">R$197,00</span>
                      <span className="text-xl font-bold text-[#7432B4]">R$19,90</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Pagamento único • Acesso vitalício</div>
                  </div>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Método Completo de Transformação</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">45+ exercícios adaptados para cadeira</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Plano de 21 dias personalizado</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Guia nutricional complementar</span>
                    </li>
                  </ul>
                </div>
                
                {/* Garantia de satisfação como destaque */}
                <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Garantia de Satisfação de 7 dias</p>
                      <p className="text-xs text-gray-700">Se não estiver 100% satisfeito nos primeiros 7 dias, devolveremos seu dinheiro integralmente. Sem perguntas.</p>
                    </div>
                  </div>
                </div>
                
                {/* Social proof - criando urgência social */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-green-600 font-medium mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{recentBuyers} pessoas compraram hoje</span>
                  </div>
                  
                  {/* Animação para mostrar últimas compras */}
                  <motion.div 
                    className="text-xs text-gray-500"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Última compra há {Math.floor(Math.random() * 10) + 1} minutos
                  </motion.div>
                </div>
                
                {/* Depoimentos de checkout - social proof estratégica */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-medium text-sm text-gray-700 mb-3 flex items-center">
                    <Heart className="w-4 h-4 text-[#7432B4] mr-1" />
                    O que dizem nossos clientes
                  </h3>
                  
                  <div className="space-y-3">
                    {checkoutTestimonials.map((testimonial, index) => (
                      <div key={index} className="text-sm border-l-2 border-[#7432B4]/30 pl-3">
                        <p className="text-gray-600 italic text-xs">"{testimonial.quote}"</p>
                        <p className="text-gray-500 text-[10px] mt-1">{testimonial.name}, {testimonial.city}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Modal de recuperação de abandono */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button 
                onClick={() => setShowExitIntent(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-[#2D1441] mb-2">Está com dúvidas?</h3>
                <p className="text-gray-600 text-sm">
                  Nossa garantia incondicional de 7 dias elimina qualquer risco para você!
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Garantia de Satisfação Total</p>
                    <p className="text-xs text-gray-700 mt-1">
                      Se você não ficar satisfeito por qualquer motivo, basta enviar um email em até 7 dias e devolveremos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-center mb-2">
                  <div className="text-sm text-gray-700 mb-1">Preço normal:</div>
                  <div className="text-gray-400 line-through font-medium">R$197,00</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-700 mb-1">Oferta especial (expira em breve):</div>
                  <div className="text-2xl font-bold text-green-600 mb-1">R$19,90</div>
                  <div className="text-xs text-gray-500">Pagamento único • Acesso vitalício</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowExitIntent(false)}
                className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold py-3 rounded-xl hover:shadow-lg"
              >
                Aproveitar esta oferta garantida
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;