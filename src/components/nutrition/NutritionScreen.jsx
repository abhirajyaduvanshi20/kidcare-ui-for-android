import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Share2, 
  Heart, 
  Droplets, 
  Plus, 
  Minus, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { VegBadgeIcon } from '../common/AndroidIcons';

const WEEK_DAYS = [
  { key: 'tuesday', day: 'Tuesday' },
  { key: 'wednesday', day: 'Wednesday' },
  { key: 'thursday', day: 'Thursday' },
  { key: 'friday', day: 'Friday' },
  { key: 'saturday', day: 'Saturday' },
  { key: 'sunday', day: 'Sunday' },
  { key: 'monday', day: 'Monday' }
];

const INITIAL_MEAL_PLANS = {
  tuesday: {
    title: 'Brain Power & Healthy Bones',
    targetKcal: '1,045 kcal',
    doctorTip: 'Ragi (Finger Millet) is 3x richer in calcium than milk, supporting rapid skeletal growth.',
    meals: [
      {
        id: 'tue-m1',
        title: 'Early Morning',
        time: '06:30 AM',
        kcal: '125 kcal',
        themeColor: '#10B981',
        subtitle: 'Warm Cinnamon Milk & Soaked Walnut Paste',
        image: '/assets/glass_full_fresh_milk_1.png',
        ingredients: [
          '100ml warm cow milk',
          'Pinch of Ceylon cinnamon',
          '2 soaked walnut halves (finely crushed)'
        ],
        protein: '4.5g',
        carbs: '14g',
        fats: '6g',
        eaten: true,
        favorite: true
      },
      {
        id: 'tue-m2',
        title: 'Breakfast',
        time: '08:30 AM',
        kcal: '270 kcal',
        themeColor: '#F59E0B',
        subtitle: 'Steamed Ragi & Banana Mini Idlis with Fresh Coconut Chutney',
        image: '/assets/rice_bowl_1.png',
        ingredients: [
          '2 small sprouted ragi-rice idlis',
          '1/2 ripe mashed elaichi banana',
          'Mild coconut-coriander dip'
        ],
        protein: '8g',
        carbs: '42g',
        fats: '6g',
        eaten: false,
        favorite: false
      },
      {
        id: 'tue-m3',
        title: 'Lunch',
        time: '12:45 PM',
        kcal: '360 kcal',
        themeColor: '#056DB5',
        subtitle: 'Soft Butter Phulka with Paneer Bhurji & Carrot Mash',
        image: '/assets/lunch.png',
        ingredients: [
          '1 soft whole wheat phulka torn into bites',
          '40g fresh soft homemade paneer crumble',
          'Steamed sweet carrot & pea mash'
        ],
        protein: '16g',
        carbs: '46g',
        fats: '11g',
        eaten: false,
        favorite: false
      },
      {
        id: 'tue-m4',
        title: 'Dinner',
        time: '07:30 PM',
        kcal: '290 kcal',
        themeColor: '#8B5CF6',
        subtitle: 'Sweet Potato & Masoor Lentil Pureed Porridge',
        image: '/assets/lentil_salad.png',
        ingredients: [
          '1/2 cup cooked red masoor dal',
          'Steamed orange sweet potato cube mash',
          '1/2 tsp cow ghee'
        ],
        protein: '10.5g',
        carbs: '48g',
        fats: '6g',
        eaten: false,
        favorite: false
      }
    ]
  },
  wednesday: {
    title: 'Gut Health & Immunity Boost',
    targetKcal: '1,080 kcal',
    doctorTip: 'Probiotic homemade curd aids digestion and nutrient absorption during growth spurts.',
    meals: [
      {
        id: 'wed-m1',
        title: 'Early Morning',
        time: '06:30 AM',
        kcal: '120 kcal',
        themeColor: '#10B981',
        subtitle: 'Warm Cow Milk with Crushed Almonds',
        image: '/assets/glass_full_fresh_milk_1.png',
        ingredients: [
          '100ml warm cow milk',
          '2 soaked skinless almonds (crushed paste)'
        ],
        protein: '4g',
        carbs: '12g',
        fats: '5.5g',
        eaten: true,
        favorite: false
      },
      {
        id: 'wed-m2',
        title: 'Breakfast',
        time: '08:30 AM',
        kcal: '260 kcal',
        themeColor: '#F59E0B',
        subtitle: 'Soft Oats & Vegetable Porridge',
        image: '/assets/rice_bowl_1.png',
        ingredients: [
          '1/2 cup rolled oats cooked in milk',
          'Grated carrots & green peas puree'
        ],
        protein: '7.5g',
        carbs: '38g',
        fats: '5g',
        eaten: false,
        favorite: true
      },
      {
        id: 'wed-m3',
        title: 'Lunch',
        time: '12:45 PM',
        kcal: '380 kcal',
        themeColor: '#056DB5',
        subtitle: 'Curd Rice Mash with Moong Dal & Ghee',
        image: '/assets/lunch.png',
        ingredients: [
          '1/2 bowl soft mashed curd rice',
          '1/2 bowl yellow moong dal with cumin'
        ],
        protein: '14g',
        carbs: '52g',
        fats: '9g',
        eaten: false,
        favorite: false
      },
      {
        id: 'wed-m4',
        title: 'Dinner',
        time: '07:30 PM',
        kcal: '320 kcal',
        themeColor: '#8B5CF6',
        subtitle: 'Vegetable Dalia Khichdi & Pumpkin Puree',
        image: '/assets/lentil_salad.png',
        ingredients: [
          '1/2 cup broken wheat dalia',
          'Steamed pumpkin & bottle gourd mash'
        ],
        protein: '9.5g',
        carbs: '44g',
        fats: '7g',
        eaten: false,
        favorite: false
      }
    ]
  },
  thursday: {
    title: 'Iron & Active Energy Day',
    targetKcal: '1,060 kcal',
    doctorTip: 'Spinach and lentils with a squeeze of lemon increase natural iron absorption.',
    meals: [
      {
        id: 'thu-m1',
        title: 'Early Morning',
        time: '06:30 AM',
        kcal: '125 kcal',
        themeColor: '#10B981',
        subtitle: 'Warm Milk with Turmeric & Saffron',
        image: '/assets/glass_full_fresh_milk_1.png',
        ingredients: ['100ml warm cow milk', 'Pinch of pure turmeric & saffron'],
        protein: '4.5g',
        carbs: '13g',
        fats: '6g',
        eaten: true,
        favorite: false
      },
      {
        id: 'thu-m2',
        title: 'Breakfast',
        time: '08:30 AM',
        kcal: '280 kcal',
        themeColor: '#F59E0B',
        subtitle: 'Moong Dal Cheela with Mint Curd Dip',
        image: '/assets/rice_bowl_1.png',
        ingredients: ['1 soft yellow moong cheela', '2 tbsp fresh homemade curd dip'],
        protein: '9g',
        carbs: '36g',
        fats: '7g',
        eaten: false,
        favorite: true
      },
      {
        id: 'thu-m3',
        title: 'Lunch',
        time: '12:45 PM',
        kcal: '370 kcal',
        themeColor: '#056DB5',
        subtitle: 'Palak Rice with Toor Dal & Ghee',
        image: '/assets/lunch.png',
        ingredients: ['1/2 bowl spinach pureed rice', '1/2 bowl thick yellow toor dal'],
        protein: '13.5g',
        carbs: '49g',
        fats: '10g',
        eaten: false,
        favorite: false
      },
      {
        id: 'thu-m4',
        title: 'Dinner',
        time: '07:30 PM',
        kcal: '285 kcal',
        themeColor: '#8B5CF6',
        subtitle: 'Moong Dal & Carrot Soft Khichdi',
        image: '/assets/lentil_salad.png',
        ingredients: ['1/2 bowl soft khichdi', '1/2 tsp pure cow ghee'],
        protein: '8.5g',
        carbs: '45g',
        fats: '6.5g',
        eaten: false,
        favorite: false
      }
    ]
  },
  friday: {
    title: 'Protein & Healthy Muscles',
    targetKcal: '1,100 kcal',
    doctorTip: 'Paneer and sprouted lentils provide complete amino acids for growing toddlers.',
    meals: [
      {
        id: 'fri-m1',
        title: 'Early Morning',
        time: '06:30 AM',
        kcal: '130 kcal',
        themeColor: '#10B981',
        subtitle: 'Warm Milk & Crushed Cashew Paste',
        image: '/assets/glass_full_fresh_milk_1.png',
        ingredients: ['100ml warm cow milk', '2 soaked cashews crushed finely'],
        protein: '4.8g',
        carbs: '14g',
        fats: '6.5g',
        eaten: true,
        favorite: false
      },
      {
        id: 'fri-m2',
        title: 'Breakfast',
        time: '08:30 AM',
        kcal: '290 kcal',
        themeColor: '#F59E0B',
        subtitle: 'Vegetable Sooji Upma with Coconut Dip',
        image: '/assets/rice_bowl_1.png',
        ingredients: ['1 small bowl roasted sooji upma', 'Finely diced carrots and peas'],
        protein: '8.5g',
        carbs: '40g',
        fats: '7.5g',
        eaten: false,
        favorite: true
      },
      {
        id: 'fri-m3',
        title: 'Lunch',
        time: '12:45 PM',
        kcal: '390 kcal',
        themeColor: '#056DB5',
        subtitle: 'Paneer Rice Khichdi with Steamed Veggies',
        image: '/assets/lunch.png',
        ingredients: ['35g fresh soft paneer cubes', '1/2 bowl steamed brown rice khichdi'],
        protein: '16g',
        carbs: '47g',
        fats: '12g',
        eaten: false,
        favorite: false
      },
      {
        id: 'fri-m4',
        title: 'Dinner',
        time: '07:30 PM',
        kcal: '290 kcal',
        themeColor: '#8B5CF6',
        subtitle: 'Lauki & Moong Dal Soothing Soup',
        image: '/assets/lentil_salad.png',
        ingredients: ['1 bowl thick lauki-dal soup', '1/2 soft wheat toast'],
        protein: '10g',
        carbs: '42g',
        fats: '6g',
        eaten: false,
        favorite: false
      }
    ]
  },
  saturday: {
    title: 'Weekend Energy & Growth',
    targetKcal: '1,050 kcal',
    doctorTip: 'Variety of colorful fruits and vegetables keeps meals exciting and nutritious.',
    meals: [
      {
        id: 'sat-m1',
        title: 'Early Morning',
        time: '06:30 AM',
        kcal: '125 kcal',
        themeColor: '#10B981',
        subtitle: 'Warm Milk with Cinnamon',
        image: '/assets/glass_full_fresh_milk_1.png',
        ingredients: ['100ml warm milk', 'Pinch of Ceylon cinnamon'],
        protein: '4.5g',
        carbs: '14g',
        fats: '6g',
        eaten: true,
        favorite: false
      },
      {
        id: 'sat-m2',
        title: 'Breakfast',
        time: '08:30 AM',
        kcal: '275 kcal',
        themeColor: '#F59E0B',
        subtitle: 'Soft Rice Idlis with Sambar Puree',
        image: '/assets/rice_bowl_1.png',
        ingredients: ['2 mini steamed idlis', '1/2 bowl mild vegetable sambar puree'],
        protein: '7.8g',
        carbs: '43g',
        fats: '5.5g',
        eaten: false,
        favorite: false
      },
      {
        id: 'sat-m3',
        title: 'Lunch',
        time: '12:45 PM',
        kcal: '360 kcal',
        themeColor: '#056DB5',
        subtitle: 'Jeera Rice with Mixed Dal & Ghee',
        image: '/assets/lunch.png',
        ingredients: ['1/2 bowl soft jeera rice', '1/2 bowl panchmel dal with ghee'],
        protein: '12g',
        carbs: '50g',
        fats: '9g',
        eaten: false,
        favorite: true
      },
      {
        id: 'sat-m4',
        title: 'Dinner',
        time: '07:30 PM',
        kcal: '290 kcal',
        themeColor: '#8B5CF6',
        subtitle: 'Vegetable Dalia with Carrot Mash',
        image: '/assets/lentil_salad.png',
        ingredients: ['1/2 bowl broken wheat dalia', 'Steamed carrot & beetroot puree'],
        protein: '8.5g',
        carbs: '46g',
        fats: '6g',
        eaten: false,
        favorite: false
      }
    ]
  },
  sunday: {
    title: 'Balanced Nutrition & Comfort',
    targetKcal: '1,070 kcal',
    doctorTip: 'Keep meal timings consistent to support natural digestion and sleep schedules.',
    meals: [
      {
        id: 'sun-m1',
        title: 'Early Morning',
        time: '06:30 AM',
        kcal: '125 kcal',
        themeColor: '#10B981',
        subtitle: 'Warm Milk with Soaked Walnuts',
        image: '/assets/glass_full_fresh_milk_1.png',
        ingredients: ['100ml warm milk', '2 crushed walnut halves'],
        protein: '4.5g',
        carbs: '14g',
        fats: '6g',
        eaten: true,
        favorite: false
      },
      {
        id: 'sun-m2',
        title: 'Breakfast',
        time: '08:30 AM',
        kcal: '270 kcal',
        themeColor: '#F59E0B',
        subtitle: 'Ragi Idli with Banana Mash',
        image: '/assets/rice_bowl_1.png',
        ingredients: ['2 soft ragi idlis', '1/2 mashed banana'],
        protein: '8g',
        carbs: '41g',
        fats: '6g',
        eaten: false,
        favorite: true
      },
      {
        id: 'sun-m3',
        title: 'Lunch',
        time: '12:45 PM',
        kcal: '385 kcal',
        themeColor: '#056DB5',
        subtitle: 'Panchmel Dal Khichdi & Curd',
        image: '/assets/lunch.png',
        ingredients: ['1/2 bowl wholesome khichdi', '1/2 bowl fresh homemade curd'],
        protein: '15g',
        carbs: '48g',
        fats: '10g',
        eaten: false,
        favorite: false
      },
      {
        id: 'sun-m4',
        title: 'Dinner',
        time: '07:30 PM',
        kcal: '290 kcal',
        themeColor: '#8B5CF6',
        subtitle: 'Sweet Potato & Masoor Dal Porridge',
        image: '/assets/lentil_salad.png',
        ingredients: ['1/2 cup cooked red masoor dal', 'Steamed orange sweet potato mash'],
        protein: '10g',
        carbs: '47g',
        fats: '6g',
        eaten: false,
        favorite: false
      }
    ]
  },
  monday: {
    title: 'Energy & Cognitive Focus',
    targetKcal: '1,040 kcal',
    doctorTip: 'Steady carbohydrates and clean protein provide energy for active toddler playtime.',
    meals: [
      {
        id: 'mon-m1',
        title: 'Early Morning',
        time: '06:30 AM',
        kcal: '120 kcal',
        themeColor: '#10B981',
        subtitle: 'Warm Milk & Almond Paste',
        image: '/assets/glass_full_fresh_milk_1.png',
        ingredients: ['100ml warm milk', '2 crushed skinless almonds'],
        protein: '4.2g',
        carbs: '13g',
        fats: '5.8g',
        eaten: true,
        favorite: false
      },
      {
        id: 'mon-m2',
        title: 'Breakfast',
        time: '08:30 AM',
        kcal: '265 kcal',
        themeColor: '#F59E0B',
        subtitle: 'Soft Wheat Toast & Paneer Mash',
        image: '/assets/rice_bowl_1.png',
        ingredients: ['1 soft whole wheat toast', '30g crumbled fresh paneer'],
        protein: '8.5g',
        carbs: '37g',
        fats: '7g',
        eaten: false,
        favorite: true
      },
      {
        id: 'mon-m3',
        title: 'Lunch',
        time: '12:45 PM',
        kcal: '365 kcal',
        themeColor: '#056DB5',
        subtitle: 'Moong Dal Khichdi with Spinach Mash',
        image: '/assets/lunch.png',
        ingredients: ['1/2 bowl moong dal khichdi', 'Steamed spinach and carrot puree'],
        protein: '13g',
        carbs: '50g',
        fats: '8.5g',
        eaten: false,
        favorite: false
      },
      {
        id: 'mon-m4',
        title: 'Dinner',
        time: '07:30 PM',
        kcal: '290 kcal',
        themeColor: '#8B5CF6',
        subtitle: 'Vegetable Dalia with Ghee',
        image: '/assets/lentil_salad.png',
        ingredients: ['1/2 bowl vegetable dalia', '1/2 tsp cow ghee'],
        protein: '9g',
        carbs: '45g',
        fats: '6.5g',
        eaten: false,
        favorite: false
      }
    ]
  }
};

export const NutritionScreen = () => {
  const { currentKid, showToast, setActiveTab } = useApp();
  const [selectedDayKey, setSelectedDayKey] = useState('tuesday');
  const [hydrationCups, setHydrationCups] = useState(5);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(true);
  const [mealPlans, setMealPlans] = useState(INITIAL_MEAL_PLANS);

  const currentPlan = mealPlans[selectedDayKey] || mealPlans.tuesday;
  const meals = currentPlan.meals || [];

  const eatenCount = meals.filter(m => m.eaten).length;
  const totalCount = meals.length;
  const percentComplete = Math.round((eatenCount / totalCount) * 100);

  const toggleMealEaten = (mealId) => {
    setMealPlans(prev => {
      const dayData = prev[selectedDayKey];
      const updatedMeals = dayData.meals.map(m => {
        if (m.id === mealId) {
          const nextState = !m.eaten;
          showToast(nextState ? `Marked "${m.title}" as Eaten! 🥣` : `Updated "${m.title}"`);
          return { ...m, eaten: nextState };
        }
        return m;
      });
      return {
        ...prev,
        [selectedDayKey]: { ...dayData, meals: updatedMeals }
      };
    });
  };

  const toggleMealFavorite = (mealId) => {
    setMealPlans(prev => {
      const dayData = prev[selectedDayKey];
      const updatedMeals = dayData.meals.map(m => {
        if (m.id === mealId) {
          return { ...m, favorite: !m.favorite };
        }
        return m;
      });
      return {
        ...prev,
        [selectedDayKey]: { ...dayData, meals: updatedMeals }
      };
    });
  };

  const handleHydrationChange = (delta) => {
    setHydrationCups(prev => {
      const next = Math.max(0, Math.min(8, prev + delta));
      showToast(`Logged ${next} of 8 Cups (~${next * 200} ml) 💧`);
      return next;
    });
  };

  const handleDownloadPDF = () => {
    showToast(`Downloading "${currentKid?.name || 'Child'}_Diet_Plan.pdf"...`);
    setTimeout(() => {
      showToast('Diet Plan PDF downloaded successfully! 📄');
    }, 1200);
  };

  const handleShareDietPlan = async () => {
    const shareText = `KidCare Nutrition Plan for ${currentKid?.name || 'Reyansh'}: ${currentPlan.title} (${currentPlan.targetKcal}) prescribed by Dr. Ila B.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `KidCare Diet Plan - ${currentKid?.name}`,
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        showToast('Diet plan link copied to clipboard! 🔗');
      }
    } else {
      navigator.clipboard?.writeText(shareText);
      showToast('Diet Plan details copied to clipboard! 🔗');
    }
  };

  return (
    <div 
      className="screen-scroll-container" 
      style={{ 
        background: '#FAF9F7', 
        minHeight: '100%', 
        paddingBottom: '120px',
        overflowX: 'hidden'
      }}
    >
      {/* 1. Clean Child Profile Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          background: '#FFFFFF',
          borderBottom: '1px solid #EEF2F6'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '2px solid #056DB5',
              flexShrink: 0
            }}
          >
            <img 
              src={currentKid?.photo || "/assets/kid1_1.png"} 
              alt={currentKid?.name || "Child"} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/kid1_1.png';
              }}
            />
          </div>

          <div>
            <h2 
              style={{ 
                fontSize: '16px', 
                fontWeight: '800', 
                color: '#0F172A', 
                margin: 0,
                lineHeight: 1.2 
              }}
            >
              {currentKid?.name || 'Reyansh Sharma'}
            </h2>
            <p 
              style={{ 
                fontSize: '11.5px', 
                color: '#056DB5', 
                margin: '1px 0 0 0',
                fontWeight: '700' 
              }}
            >
              {currentKid?.age || '1 yr 5 mos'} • Blood Group: {currentKid?.bloodGroup || 'B+'}
            </p>
          </div>
        </div>

        {/* Doctor Published Pill */}
        <div style={{
          background: '#E8F8F3',
          border: '1px solid #A7F3D0',
          borderRadius: '12px',
          padding: '4px 10px',
          textAlign: 'right'
        }}>
          <span style={{ fontSize: '9px', fontWeight: '800', color: '#047857', textTransform: 'uppercase', display: 'block' }}>
            ✓ PUBLISHED
          </span>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#0F172A', display: 'block' }}>
            Dr. Ila B
          </span>
        </div>
      </div>

      {/* 2. Weekday-Only Selector Strip (Tuesday 1/4, Wednesday, Thursday...) */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '12px 16px',
          background: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {WEEK_DAYS.map((d) => {
          const isSelected = selectedDayKey === d.key;
          const dayMeals = mealPlans[d.key]?.meals || [];
          const dayEaten = dayMeals.filter(m => m.eaten).length;

          return (
            <button
              key={d.key}
              onClick={() => setSelectedDayKey(d.key)}
              style={{
                flex: '0 0 auto',
                padding: '8px 16px',
                borderRadius: '24px',
                border: isSelected ? 'none' : '1.5px solid #E2E8F0',
                background: isSelected ? '#0077D7' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#0369A1',
                fontSize: '13px',
                fontWeight: isSelected ? '800' : '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSelected ? '0 4px 12px rgba(0, 119, 215, 0.3)' : 'none',
                transition: 'all 0.15s ease',
                outline: 'none'
              }}
            >
              <span>{d.day}</span>
              {isSelected && (
                <span 
                  style={{
                    background: '#10B981',
                    color: '#FFFFFF',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    padding: '1px 6px',
                    borderRadius: '10px'
                  }}
                >
                  {dayEaten}/{dayMeals.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* 3. Daily Hydration Tracker */}
        <div style={{
          background: '#EBF5FF',
          border: '1px solid #C3E0FD',
          borderRadius: '18px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: '#0077D7',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Droplets size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  Daily Hydration Tracker
                </h4>
                <p style={{ fontSize: '11px', color: '#0284C7', margin: '1px 0 0', fontWeight: '600' }}>
                  Target: 8 Cups (~1,600 ml)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handleHydrationChange(-1)}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569'
                }}
              >
                <Minus size={13} strokeWidth={2.5} />
              </button>

              <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#0F172A', minWidth: '28px', textAlign: 'center' }}>
                {hydrationCups}/8
              </span>

              <button
                onClick={() => handleHydrationChange(1)}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#0077D7',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF'
                }}
              >
                <Plus size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div style={{
            width: '100%',
            height: '5px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(hydrationCups / 8) * 100}%`,
              height: '100%',
              background: '#0077D7',
              borderRadius: '5px',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((cupNum) => (
              <span 
                key={cupNum}
                style={{
                  fontSize: '14px',
                  opacity: cupNum <= hydrationCups ? 1 : 0.25,
                  transition: 'opacity 0.2s ease'
                }}
              >
                💧
              </span>
            ))}
          </div>
        </div>

        {/* 4. Meal Preferences & Dietary Profile */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          border: '1px solid #E2E8F0',
          padding: '14px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
        }}>
          <div 
            onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: '800', color: '#0077D7', margin: 0 }}>
                Meal Preferences & Dietary Profile
              </h3>
              <VegBadgeIcon width={15} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '11.5px', fontWeight: '600' }}>
              <span>{isPreferencesOpen ? 'Hide' : 'Show'}</span>
              {isPreferencesOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </div>
          </div>

          {isPreferencesOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', animation: 'fadeIn 0.2s ease' }}>
              
              <div style={{
                background: '#FAFAFA',
                borderRadius: '12px',
                border: '1px solid #F1F5F9',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', minWidth: '52px' }}>
                  <span style={{ fontSize: '16px' }}>💚</span>
                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#0077D7' }}>Likes</span>
                </div>
                <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '12px', flex: 1 }}>
                  <p style={{ fontSize: '12px', color: '#1E293B', fontWeight: '600', margin: 0, lineHeight: 1.35 }}>
                    Fresh fruit purée, moong dal rice, warm spiced milk, ragi porridge
                  </p>
                </div>
              </div>

              <div style={{
                background: '#FAFAFA',
                borderRadius: '12px',
                border: '1px solid #F1F5F9',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', minWidth: '52px' }}>
                  <span style={{ fontSize: '16px' }}>💔</span>
                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#0077D7' }}>Dislikes</span>
                </div>
                <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '12px', flex: 1 }}>
                  <p style={{ fontSize: '12px', color: '#1E293B', fontWeight: '600', margin: 0, lineHeight: 1.35 }}>
                    Spicy peppers, bitter gourd, overly hard crunchy solids
                  </p>
                </div>
              </div>

              <div style={{
                background: '#FAFAFA',
                borderRadius: '12px',
                border: '1px solid #F1F5F9',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', minWidth: '52px' }}>
                  <span style={{ fontSize: '16px' }}>⚠️</span>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#EF4444' }}>Allergy Food</span>
                </div>
                <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '12px', flex: 1 }}>
                  <p style={{ fontSize: '12.5px', color: '#DC2626', fontWeight: '800', margin: 0 }}>
                    Peanuts, Dust
                  </p>
                </div>
              </div>

              <div style={{
                background: '#FAFAFA',
                borderRadius: '12px',
                border: '1px solid #F1F5F9',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', minWidth: '52px' }}>
                  <span style={{ fontSize: '16px' }}>🩺</span>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#0077D7' }}>Medical Status</span>
                </div>
                <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '12px', flex: 1 }}>
                  <p style={{ fontSize: '12px', color: '#1E293B', fontWeight: '700', margin: 0 }}>
                    Mild Eczema
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 5. Clean, Beautiful & Simple Meal Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {meals.map((meal) => (
            <div
              key={meal.id}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderLeft: `5px solid ${meal.themeColor || '#056DB5'}`,
                borderRadius: '18px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {/* Card Top: Image + Info */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                {/* Food Image */}
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#F8FAFC',
                  flexShrink: 0,
                  border: '1px solid #F1F5F9'
                }}>
                  <img 
                    src={meal.image} 
                    alt={meal.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/assets/rice_bowl_1.png'; }}
                  />

                  {/* Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMealFavorite(meal.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.92)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart 
                      size={13} 
                      color={meal.favorite ? '#EF4444' : '#64748B'} 
                      fill={meal.favorite ? '#EF4444' : 'none'} 
                    />
                  </button>
                </div>

                {/* Meal Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                      {meal.title} <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#64748B' }}>({meal.time})</span>
                    </h4>
                    <span style={{
                      background: '#F1F5F9',
                      color: '#0F172A',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 7px',
                      borderRadius: '8px'
                    }}>
                      {meal.kcal}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#334155', margin: '2px 0 4px', lineHeight: 1.3 }}>
                    {meal.subtitle}
                  </p>

                  {/* Clean Ingredients Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {meal.ingredients.map((ing, i) => (
                      <span key={i} style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.3 }}>
                        • {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom: Macros & Action */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px' }}>
                  <span><strong style={{ color: '#0077D7' }}>P:</strong> {meal.protein}</span>
                  <span><strong style={{ color: '#047857' }}>C:</strong> {meal.carbs}</span>
                  <span><strong style={{ color: '#D97706' }}>F:</strong> {meal.fats}</span>
                </div>

                {meal.eaten ? (
                  <button
                    type="button"
                    onClick={() => toggleMealEaten(meal.id)}
                    style={{
                      background: '#047857',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Check size={13} strokeWidth={3} /> Eaten ✓
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleMealEaten(meal.id)}
                    style={{
                      background: '#FFFFFF',
                      color: '#047857',
                      border: '1.5px solid #047857',
                      borderRadius: '12px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Mark Eaten
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* 7. Bottom Action Buttons: Download PDF & Share Diet Plan */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginTop: '6px',
          marginBottom: '20px',
          paddingBottom: '20px'
        }}>
          <button
            type="button"
            onClick={handleDownloadPDF}
            style={{
              background: '#EBF4FA',
              color: '#0077D7',
              border: '1.5px solid #BAE6FD',
              borderRadius: '16px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Download size={16} strokeWidth={2.5} />
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={handleShareDietPlan}
            style={{
              background: '#0077D7',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0, 119, 215, 0.3)'
            }}
          >
            <Share2 size={16} strokeWidth={2.5} />
            <span>Share Diet Plan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
