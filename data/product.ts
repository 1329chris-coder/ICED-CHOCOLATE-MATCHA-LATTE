export const productData = {
  name: 'Iced Chocolate Matcha Latte',
  tagline: 'The Perfect Blend of Energy & Zen',
  price: 7.50,
  currency: 'USD',
  
  colors: {
    primary: '#6A994E', // Matcha Green
    secondary: '#3D2817', // Chocolate Brown
    accent: '#88B04B', // Vibrant Green
    neutral: '#F5F5F5' // Cream
  },
  
  assets: {
    sequenceFolder: '/images/sequence/',
    sequenceFrameCount: 192,
    sequencePrefix: 'ezgif-frame-',
    staticCup: '/images/matcha-cup-static.png',
    finalTagline: 'ENERGY MEETS HARMONY. ORDER NOW.'
  },
  
  nutritionHighlights: [
    { label: 'Natural Caffeine', value: '95mg', icon: '⚡' },
    { label: 'L-Theanine', value: '45mg', icon: '🧘' },
    { label: 'Antioxidants', value: 'High', icon: '🛡️' },
    { label: 'Added Sugar', value: '0g', icon: '🚫' }
  ],
  
  keyBenefits: [
    'Sustained Energy Without Jitters',
    'Enhanced Focus & Mental Clarity',
    'Rich in Antioxidants',
    'Perfectly Balanced Sweet & Earthy',
    'Cold-Brewed for Smoothness',
    'Premium Japanese Matcha'
  ],
  
  storyBeats: [
    {
      id: 1,
      title: 'THE ENERGY',
      subtitle: 'Premium Chocolate',
      description: 'Rich, velvety cacao delivers smooth sustained energy',
      scrollProgress: 0.2
    },
    {
      id: 2,
      title: 'THE ZEN',
      subtitle: 'Ceremonial Grade Matcha',
      description: 'Japanese green tea brings calm focus and clarity',
      scrollProgress: 0.4
    },
    {
      id: 3,
      title: 'THE FUSION',
      subtitle: 'Perfectly Balanced',
      description: 'Chocolate meets matcha in harmonious bliss',
      scrollProgress: 0.6
    },
    {
      id: 4,
      title: 'THE CHILL',
      subtitle: 'Ice Cold Perfection',
      description: 'Served over ice for refreshing invigoration',
      scrollProgress: 0.8
    }
  ],
  
  detailedSections: [
    {
      id: 'ingredients',
      title: 'Premium Ingredients',
      subtitle: 'Only The Finest',
      content: [
        {
          name: 'Ceremonial Grade Matcha',
          description: 'Sourced from Uji, Japan - the gold standard of matcha. Hand-picked, stone-ground green tea leaves packed with antioxidants and natural caffeine.'
        },
        {
          name: 'Belgian Dark Chocolate',
          description: 'Rich, smooth cacao from sustainable farms. Delivers deep flavor and natural energy without the crash.'
        },
        {
          name: 'Organic Oat Milk',
          description: 'Creamy, plant-based perfection. Naturally sweet and perfectly complements both chocolate and matcha.'
        },
        {
          name: 'Natural Sweetener',
          description: 'Monk fruit extract provides subtle sweetness with zero calories and zero sugar.'
        }
      ]
    },
    {
      id: 'benefits',
      title: 'Science-Backed Benefits',
      subtitle: 'Fuel Your Body & Mind',
      content: [
        {
          name: 'Sustained Energy',
          description: 'Natural caffeine from matcha (95mg) releases slowly, providing 4-6 hours of clean energy without jitters or crashes.'
        },
        {
          name: 'Enhanced Focus',
          description: 'L-Theanine from matcha promotes alpha brain waves - the same state achieved during meditation. Stay calm, focused, and productive.'
        },
        {
          name: 'Metabolic Boost',
          description: 'EGCG antioxidants in matcha support healthy metabolism and fat oxidation naturally.'
        },
        {
          name: 'Mood Enhancement',
          description: 'Theobromine in chocolate promotes feelings of well-being and happiness. Start your day right.'
        }
      ]
    },
    {
      id: 'preparation',
      title: 'Crafted To Perfection',
      subtitle: 'The Art Of Balance',
      content: [
        {
          name: 'Cold-Brewed Matcha',
          description: 'Our matcha is whisked with cold water using traditional methods, preserving delicate flavors and maximizing antioxidants.'
        },
        {
          name: 'Chocolate Infusion',
          description: 'Premium cacao is gently blended to create a velvety smooth base that harmonizes with matcha\'s earthy notes.'
        },
        {
          name: 'Perfectly Chilled',
          description: 'Poured over hand-selected ice cubes, each sip delivers refreshing invigoration from first taste to last drop.'
        }
      ]
    },
    {
      id: 'testimonials',
      title: 'Loved By Thousands',
      subtitle: 'Real People, Real Results',
      quotes: [
        {
          text: 'This is my morning ritual now. The energy is smooth and the taste is incredible - not too sweet, perfectly balanced.',
          author: 'Sarah M.',
          role: 'Yoga Instructor'
        },
        {
          text: 'As a developer, I need sustained focus. This beats coffee hands down. No jitters, just pure productivity.',
          author: 'Marcus L.',
          role: 'Software Engineer'
        },
        {
          text: 'I was skeptical about chocolate and matcha together, but WOW. This is now my pre-workout go-to.',
          author: 'Emma R.',
          role: 'Fitness Coach'
        }
      ]
    }
  ],
  
  specifications: {
    servingSize: '16 oz (473ml)',
    calories: 120,
    protein: '3g',
    carbs: '18g',
    fat: '4g',
    caffeine: '95mg',
    lTheanine: '45mg',
    sugar: '0g',
    allergens: 'Contains: Oat milk (gluten-free)'
  }
};
