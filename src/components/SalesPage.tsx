// Apenas a parte crítica do componente SalesPage.tsx
// Esse componente é muito extenso, então estamos modificando apenas as partes essenciais

// Modifique estas funções dentro do componente SalesPage:

// 1. Função getPlanName modificada
const getPlanName = () => {
  let prefix = 'Sistema de';

  if (bodyMassIndex > 30) {
    prefix = 'Protocolo Avançado de';
  } else if (bodyMassIndex > 25) {
    prefix = 'Programa Completo de';
  }

  const selectedGoalIds = goals.filter((g) => g.selected).map((g) => g.id);

  let suffix = 'Regeneração Articular';

  if (selectedGoalIds.includes('improve-mobility')) {
    suffix += ' e Mobilidade';
  } else if (selectedGoalIds.includes('manage-mood')) {
    suffix += ' e Equilíbrio Emocional';
  } else if (selectedGoalIds.includes('lose-weight')) {
    suffix += ' com Ativação Metabólica';
  }

  return `${prefix} ${suffix}`;
};

// 2. Função getMainBenefit modificada
const getMainBenefit = () => {
  const selectedGoalIds = goals.filter((g) => g.selected).map((g) => g.id);

  if (selectedGoalIds.includes('improve-mobility')) {
    return 'Recupere sua mobilidade e elimine as dores articulares';
  }
  if (selectedGoalIds.includes('balance-hormones')) {
    return 'Reequilibre seu sistema articular e hormonal';
  }
  if (selectedGoalIds.includes('manage-mood')) {
    return 'Revitalize suas articulações e reduza o estresse';
  }
  if (selectedGoalIds.includes('lose-weight')) {
    return 'Reactive suas articulações enquanto perde peso';
  }

  return 'Transforme sua mobilidade articular sem esforço';
};

// 3. Modificação nos Benefícios - Procure por "value stack itens" e substitua
const valueStackItems = [
  { name: 'Sistema de Regeneração Articular Premium', value: 'R$197', included: true },
  { name: 'Protocolo de 21 Dias de Transformação Articular', value: 'R$67', included: true },
  { name: 'Suporte na Comunidade de Mobilidade VIP (3 meses)', value: 'R$147', included: true },
  { name: 'Guia de Nutrição para Saúde Articular', value: 'R$37', included: true },
  { name: 'Acompanhamento de Progresso de Mobilidade', value: 'R$97', included: true },
  {
    name: 'Bônus: Meditações para Alívio da Dor',
    value: 'R$57',
    included: true,
    highlight: true,
  },
  {
    name: 'Bônus: Técnicas de Respiração para Articulações',
    value: 'R$47',
    included: true,
    highlight: true,
  },
];

// 4. Modificação nos depoimentos - Procure por "checkoutTestimonials" e substitua
const checkoutTestimonials = [
  {
    quote: "Hesitei na hora de comprar, mas a garantia me convenceu. As dores articulares que me perturbavam há anos diminuíram em apenas 2 semanas!",
    name: "Maria S.",
    city: "São Paulo"
  },
  {
    quote: "Recuperei a mobilidade que não tinha há 10 anos. Agora consigo brincar com meus netos sem dores ou limitações.",
    name: "Carlos M.",
    city: "Fortaleza"
  },
  {
    quote: "O protocolo é entregue na hora, super organizado e fácil de seguir. Em 21 dias, minhas articulações rejuvenesceram completamente.",
    name: "Juliana P.",
    city: "Curitiba"
  }
];

// 5. Adicione esta seção para a história da fundadora (para o teste A/B)
// Coloque antes do final do retorno JSX, próximo à seção de garantias

<div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
  <h3 className="font-medium text-[#2D1441] mb-2 flex items-center gap-2">
    <User className="w-4 h-4 text-[#7432B4]" />
    A História por Trás do Método
  </h3>
  <p className="text-sm text-gray-700 mb-3">
    "Depois de 20 anos tratando articulações comprometidas como fisioterapeuta, percebi que as mulheres na meia-idade não encontravam soluções adaptadas à sua realidade. Após um acidente que limitou minha própria mobilidade, desenvolvi este método que transformou minha vida e agora ajuda milhares de mulheres a recuperarem movimentos que achavam perdidos para sempre."
  </p>
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <img 
        src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg" 
        alt="Dra. Ana Ferreira" 
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <p className="font-medium text-[#2D1441] text-sm">Dra. Ana Ferreira</p>
      <p className="text-xs text-gray-500">Fisioterapeuta Especialista em Saúde Articular Feminina</p>
    </div>
  </div>
</div>