import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown,
  Sun, 
  Sunrise, 
  Moon, 
  Utensils, 
  Coffee,
  GlassWater,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import {
  LikesIcon,
  DislikesIcon,
  AllergyFoodIcon,
  MedicalIllIcon,
  VegBadgeIcon
} from '../common/AndroidIcons';

const WEEK_DAYS = [
  { key: 'monday', day: 'Mon', fullName: 'Monday' },
  { key: 'tuesday', day: 'Tue', fullName: 'Tuesday' },
  { key: 'wednesday', day: 'Wed', fullName: 'Wednesday' },
  { key: 'thursday', day: 'Thu', fullName: 'Thursday' },
  { key: 'friday', day: 'Fri', fullName: 'Friday' },
  { key: 'saturday', day: 'Sat', fullName: 'Saturday' },
  { key: 'sunday', day: 'Sun', fullName: 'Sunday' }
];

const MEAL_SCHEDULE_BY_DAY = {
  monday: [
    {
      id: 'mon-m1',
      title: 'Early Morning',
      time: '7:00 AM',
      nodeType: 'sun',
      nodeColor: '#F59E0B',
      tag: 'Energy & Calcium',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Warm Almond Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'mon-m2',
      title: 'Breakfast',
      time: '8:30 AM',
      nodeType: 'sunrise',
      nodeColor: '#EA580C',
      tag: 'Protein & Fiber',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Soft Wheat Toast', icon: 'plate', quantity: '2 pcs' },
        { name: 'Paneer Mash', icon: 'cutlery', quantity: '1 bowl' }
      ]
    },
    {
      id: 'mon-m3',
      title: 'Mid-morning snacks',
      time: '11:00 AM',
      nodeType: 'moon',
      nodeColor: '#16A34A',
      tag: 'Vitamins & Minerals',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Apple Puree', icon: 'bowl', quantity: '1 bowl' }
      ]
    },
    {
      id: 'mon-m4',
      title: 'Lunch',
      time: '1:30 PM',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      tag: 'Wholesome Nutrition',
      image: '/assets/lunch.png',
      items: [
        { name: 'Moong Dal Khichdi', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Spinach Mash', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'mon-m5',
      title: 'Evening snacks',
      time: '5:30 PM',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      tag: 'Light Refuel',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Cow Milk', icon: 'glass', quantity: '1 glass' },
        { name: 'Roasted Makhana', icon: 'bowl', quantity: '1 cup' }
      ]
    },
    {
      id: 'mon-m6',
      title: 'Dinner',
      time: '8:00 PM',
      nodeType: 'night',
      nodeColor: '#1E293B',
      tag: 'Easy Digestion',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Vegetable Dalia', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  tuesday: [
    {
      id: 'tue-m1',
      title: 'Early Morning',
      time: '7:00 AM',
      nodeType: 'sun',
      nodeColor: '#F59E0B',
      tag: 'Calcium Starter',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'tue-m2',
      title: 'Breakfast',
      time: '8:30 AM',
      nodeType: 'sunrise',
      nodeColor: '#EA580C',
      tag: 'Iron & Carbohydrates',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Sooji Chilla', icon: 'plate', quantity: '1 pcs' },
        { name: 'Tomato Chutney', icon: 'cutlery', quantity: '1 tbsp' }
      ]
    },
    {
      id: 'tue-m3',
      title: 'Mid-morning snacks',
      time: '11:00 AM',
      nodeType: 'moon',
      nodeColor: '#16A34A',
      tag: 'Natural Potassium',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Banana', icon: 'banana', quantity: '1 pcs' }
      ]
    },
    {
      id: 'tue-m4',
      title: 'Lunch',
      time: '1:30 PM',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      tag: 'Complete Meal',
      image: '/assets/lunch.png',
      items: [
        { name: 'Veg Rice Khichdi', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Aloo Chokha', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Curd (cow milk)', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'tue-m5',
      title: 'Evening snacks',
      time: '5:30 PM',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      tag: 'Fiber & Energy',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '1 glass' },
        { name: 'Oats Pancake', icon: 'plate', quantity: '1 pc' }
      ]
    },
    {
      id: 'tue-m6',
      title: 'Dinner',
      time: '8:00 PM',
      nodeType: 'night',
      nodeColor: '#1E293B',
      tag: 'Calm Night Digestion',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Daliya Khichdi', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Aloo Chokha', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  wednesday: [
    {
      id: 'wed-m1',
      title: 'Early Morning',
      time: '7:00 AM',
      nodeType: 'sun',
      nodeColor: '#F59E0B',
      tag: 'Hydration Starter',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'wed-m2',
      title: 'Breakfast',
      time: '8:30 AM',
      nodeType: 'sunrise',
      nodeColor: '#EA580C',
      tag: 'Calcium & Iron',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Ragi Idli', icon: 'plate', quantity: '2 pcs' },
        { name: 'Coconut Dip', icon: 'cutlery', quantity: '1 tbsp' }
      ]
    },
    {
      id: 'wed-m3',
      title: 'Mid-morning snacks',
      time: '11:00 AM',
      nodeType: 'moon',
      nodeColor: '#16A34A',
      tag: 'Fiber Boost',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Mashed Pear', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'wed-m4',
      title: 'Lunch',
      time: '1:30 PM',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      tag: 'Probiotic Rich',
      image: '/assets/lunch.png',
      items: [
        { name: 'Curd Rice Mash', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Pumpkin Puree', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'wed-m5',
      title: 'Evening snacks',
      time: '5:30 PM',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      tag: 'Whole Grains',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '1 glass' },
        { name: 'Whole Grain Biscuit', icon: 'plate', quantity: '2 pcs' }
      ]
    },
    {
      id: 'wed-m6',
      title: 'Dinner',
      time: '8:00 PM',
      nodeType: 'night',
      nodeColor: '#1E293B',
      tag: 'Gentle on Gut',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Soft Rice Khichdi', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  thursday: [
    {
      id: 'thu-m1',
      title: 'Early Morning',
      time: '7:00 AM',
      nodeType: 'sun',
      nodeColor: '#F59E0B',
      tag: 'Fresh Start',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'thu-m2',
      title: 'Breakfast',
      time: '8:30 AM',
      nodeType: 'sunrise',
      nodeColor: '#EA580C',
      tag: 'Light & Nutritious',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Poha with Veggies', icon: 'plate', quantity: '1 bowl' }
      ]
    },
    {
      id: 'thu-m3',
      title: 'Mid-morning snacks',
      time: '11:00 AM',
      nodeType: 'moon',
      nodeColor: '#16A34A',
      tag: 'Vitamin C & A',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Papaya Cubes', icon: 'banana', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'thu-m4',
      title: 'Lunch',
      time: '1:30 PM',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      tag: 'Protein & Carbs',
      image: '/assets/lunch.png',
      items: [
        { name: 'Rice & Yellow Dal', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Aloo Bharta', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'thu-m5',
      title: 'Evening snacks',
      time: '5:30 PM',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      tag: 'Healthy Crunch',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '1 glass' },
        { name: 'Suji Rusk', icon: 'plate', quantity: '1 pc' }
      ]
    },
    {
      id: 'thu-m6',
      title: 'Dinner',
      time: '8:00 PM',
      nodeType: 'night',
      nodeColor: '#1E293B',
      tag: 'Warm & Soothing',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Lentil Veggie Soup', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  friday: [
    {
      id: 'fri-m1',
      title: 'Early Morning',
      time: '7:00 AM',
      nodeType: 'sun',
      nodeColor: '#F59E0B',
      tag: 'Calcium Boost',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Warm Milk', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'fri-m2',
      title: 'Breakfast',
      time: '8:30 AM',
      nodeType: 'sunrise',
      nodeColor: '#EA580C',
      tag: 'Protein Rich',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Moong Dal Cheela', icon: 'plate', quantity: '1 pc' },
        { name: 'Curd Dip', icon: 'bowl', quantity: '1 tbsp' }
      ]
    },
    {
      id: 'fri-m3',
      title: 'Mid-morning snacks',
      time: '11:00 AM',
      nodeType: 'moon',
      nodeColor: '#16A34A',
      tag: 'Vitamin Rich',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Chikoo Mash', icon: 'banana', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'fri-m4',
      title: 'Lunch',
      time: '1:30 PM',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      tag: 'Iron & Folate',
      image: '/assets/lunch.png',
      items: [
        { name: 'Palak Rice', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Toor Dal Tadka', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'fri-m5',
      title: 'Evening snacks',
      time: '5:30 PM',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      tag: 'Hydration',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Cow Milk', icon: 'glass', quantity: '1 glass' },
        { name: 'Roasted Foxnuts', icon: 'bowl', quantity: '1 cup' }
      ]
    },
    {
      id: 'fri-m6',
      title: 'Dinner',
      time: '8:00 PM',
      nodeType: 'night',
      nodeColor: '#1E293B',
      tag: 'Gentle Khichdi',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Carrot & Moong Khichdi', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  saturday: [
    {
      id: 'sat-m1',
      title: 'Early Morning',
      time: '7:00 AM',
      nodeType: 'sun',
      nodeColor: '#F59E0B',
      tag: 'Morning Hydration',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'sat-m2',
      title: 'Breakfast',
      time: '8:30 AM',
      nodeType: 'sunrise',
      nodeColor: '#EA580C',
      tag: 'Carb & Fiber',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Vegetable Upma', icon: 'plate', quantity: '1 bowl' }
      ]
    },
    {
      id: 'sat-m3',
      title: 'Mid-morning snacks',
      time: '11:00 AM',
      nodeType: 'moon',
      nodeColor: '#16A34A',
      tag: 'Natural Sweetness',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Sweet Mango Puree', icon: 'banana', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'sat-m4',
      title: 'Lunch',
      time: '1:30 PM',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      tag: 'Weekend Special',
      image: '/assets/lunch.png',
      items: [
        { name: 'Jeera Rice & Dal', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Lauki (Bottle Gourd) Mash', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'sat-m5',
      title: 'Evening snacks',
      time: '5:30 PM',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      tag: 'Wholesome Refuel',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Cow Milk', icon: 'glass', quantity: '1 glass' },
        { name: 'Steamed Sweet Corn Mash', icon: 'bowl', quantity: '0.5 cup' }
      ]
    },
    {
      id: 'sat-m6',
      title: 'Dinner',
      time: '8:00 PM',
      nodeType: 'night',
      nodeColor: '#1E293B',
      tag: 'Soothing Sleep Prep',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Oats & Veggie Porridge', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  sunday: [
    {
      id: 'sun-m1',
      title: 'Early Morning',
      time: '7:00 AM',
      nodeType: 'sun',
      nodeColor: '#F59E0B',
      tag: 'Morning Nutrition',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Almond Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'sun-m2',
      title: 'Breakfast',
      time: '8:30 AM',
      nodeType: 'sunrise',
      nodeColor: '#EA580C',
      tag: 'Soft & Fluffy',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Soft Rice Idli', icon: 'plate', quantity: '2 pcs' },
        { name: 'Mild Sambar Soup', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'sun-m3',
      title: 'Mid-morning snacks',
      time: '11:00 AM',
      nodeType: 'moon',
      nodeColor: '#16A34A',
      tag: 'Fresh Fruit',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Banana Slice Mash', icon: 'banana', quantity: '1 pc' }
      ]
    },
    {
      id: 'sun-m4',
      title: 'Lunch',
      time: '1:30 PM',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      tag: 'Balanced Sunday Feast',
      image: '/assets/lunch.png',
      items: [
        { name: 'Panchmel Dal Khichdi', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Homemade Curd', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'sun-m5',
      title: 'Evening snacks',
      time: '5:30 PM',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      tag: 'Warm & Cozy',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Warm Milk', icon: 'glass', quantity: '1 glass' },
        { name: 'Wheat Pancake', icon: 'plate', quantity: '1 pc' }
      ]
    },
    {
      id: 'sun-m6',
      title: 'Dinner',
      time: '8:00 PM',
      nodeType: 'night',
      nodeColor: '#1E293B',
      tag: 'Easy Digest Supper',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Vegetable Dalia Khichdi', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ]
};

export const NutritionScreen = () => {
  const { currentKid, openModal, setActiveTab } = useApp();
  const [selectedDayKey, setSelectedDayKey] = useState('tuesday');
  const [isMealPreferencesOpen, setIsMealPreferencesOpen] = useState(true);

  const mealsList = MEAL_SCHEDULE_BY_DAY[selectedDayKey] || MEAL_SCHEDULE_BY_DAY.tuesday;
  const activeDayObj = WEEK_DAYS.find(w => w.key === selectedDayKey) || WEEK_DAYS[1];

  const renderTimelineNodeIcon = (nodeType) => {
    switch (nodeType) {
      case 'sun':
        return <Sun size={15} color="#FFFFFF" strokeWidth={2.5} />;
      case 'sunrise':
        return <Sunrise size={15} color="#FFFFFF" strokeWidth={2.5} />;
      case 'moon':
        return <Moon size={15} color="#FFFFFF" strokeWidth={2.5} />;
      case 'utensils':
        return <Utensils size={15} color="#FFFFFF" strokeWidth={2.5} />;
      case 'coffee':
        return <Coffee size={15} color="#FFFFFF" strokeWidth={2.5} />;
      case 'night':
      default:
        return <Moon size={15} color="#FFFFFF" strokeWidth={2.5} />;
    }
  };

  const renderPortionIcon = (iconType) => {
    switch (iconType) {
      case 'glass':
        return <GlassWater size={15} color="#056DB5" style={{ flexShrink: 0 }} />;
      case 'plate':
        return <span style={{ fontSize: '13px', lineHeight: 1 }}>🥣</span>;
      case 'cutlery':
        return <span style={{ fontSize: '12px', lineHeight: 1 }}>🍴</span>;
      case 'banana':
        return <span style={{ fontSize: '14px', lineHeight: 1 }}>🍌</span>;
      case 'bowl':
      default:
        return <span style={{ fontSize: '13px', lineHeight: 1 }}>🥣</span>;
    }
  };

  return (
    <div 
      className="screen-scroll-container" 
      style={{ 
        background: '#FAF9F7', 
        minHeight: '100%', 
        paddingBottom: '90px',
        overflowX: 'hidden'
      }}
    >
      {/* 1. Header Bar: Back Arrow + Child Banner */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px 12px',
          background: '#FFFFFF',
          borderBottom: '1px solid #EEF2F6',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: 'none',
              border: 'none',
              padding: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A'
            }}
            title="Back to Home"
          >
            <ArrowLeft size={22} color="#0F172A" />
          </button>

          {/* Child Profile Info (Clickable to switch kid) */}
          <div 
            onClick={() => openModal('kid-selector')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              cursor: 'pointer' 
            }}
          >
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '2px solid #056DB5',
                boxShadow: '0 2px 6px rgba(5, 109, 181, 0.15)',
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
                  fontSize: '15.5px', 
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
                  fontSize: '11px', 
                  color: '#64748B', 
                  margin: '1px 0 0 0',
                  fontWeight: '600' 
                }}
              >
                Age: {currentKid?.age || '1 yr 5 mos'} • Diet Plan
              </p>
            </div>
          </div>
        </div>

        {/* Veg Badge on Header */}
        <VegBadgeIcon width={17} />
      </div>

      {/* 2. Weekday-Only Selector Strip (Mon, Tue, Wed, Thu, Fri, Sat, Sun - NO DATES/MONTHS) */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '12px 16px',
          background: '#FAF9F7',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {WEEK_DAYS.map((d) => {
          const isSelected = selectedDayKey === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setSelectedDayKey(d.key)}
              style={{
                flex: '0 0 auto',
                padding: '9px 18px',
                borderRadius: '24px',
                border: isSelected ? 'none' : '1.5px solid #E2E8F0',
                background: isSelected 
                  ? 'linear-gradient(135deg, #056DB5 0%, #034D80 100%)' 
                  : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#475569',
                fontSize: '13px',
                fontWeight: isSelected ? '800' : '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isSelected 
                  ? '0 4px 14px rgba(5, 109, 181, 0.35)' 
                  : '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none'
              }}
            >
              {d.day}
            </button>
          );
        })}
      </div>

      {/* Main Section Content */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* 3. Meal Preferences Section with Animated Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Header Row: Title + Toggle Chevron */}
          <div 
            onClick={() => setIsMealPreferencesOpen(!isMealPreferencesOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '4px 2px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title={isMealPreferencesOpen ? "Collapse Meal Preferences" : "Expand Meal Preferences"}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 
                style={{ 
                  fontSize: '16.5px', 
                  fontWeight: '800', 
                  color: '#056DB5', 
                  margin: 0,
                  letterSpacing: '-0.2px' 
                }}
              >
                Meal Preferences
              </h3>

              <div 
                style={{ 
                  transform: isMealPreferencesOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                  transition: 'transform 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#056DB5'
                }}
              >
                <ChevronDown size={20} strokeWidth={2.4} />
              </div>
            </div>

            <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '600' }}>
              4 Tracked Tags
            </span>
          </div>

          {/* 4 Clean Preference Cards Matching Android Vectors */}
          {isMealPreferencesOpen && (
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px',
                animation: 'fadeIn 0.2s ease'
              }}
            >
              {/* Card 1: Likes (Banana) */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '5px solid #22C55E',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#ECFDF5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <LikesIcon size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>
                      Likes
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: '800', display: 'block', marginTop: '1px' }}>
                      Banana
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>

              {/* Card 2: Dislikes (Papaya) */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '5px solid #EF4444',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#FFF1F2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <DislikesIcon size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>
                      Dislikes
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: '800', display: 'block', marginTop: '1px' }}>
                      Papaya
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>

              {/* Card 3: Allergy Food */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '5px solid #F59E0B',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#FEF3C7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <AllergyFoodIcon size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>
                      Allergy Food
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: '800', display: 'block', marginTop: '1px' }}>
                      Not Specified
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>

              {/* Card 4: Medical Issues */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '5px solid #0077D7',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <MedicalIllIcon size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>
                      Medical Issues
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: '800', display: 'block', marginTop: '1px' }}>
                      Not Specified
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} color="#94A3B8" />
              </div>
            </div>
          )}
        </div>

        {/* 4. Selected Day's Meals Timeline Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', padding: '0 2px' }}>
            <div>
              <h3 
                style={{ 
                  fontSize: '17px', 
                  fontWeight: '800', 
                  color: '#0F172A', 
                  margin: 0,
                  letterSpacing: '-0.2px' 
                }}
              >
                {activeDayObj.fullName}'s Meal Plan
              </h3>
              <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0' }}>
                Balanced toddler nutrition planned by Dr. Ila B
              </p>
            </div>

            <span 
              style={{
                fontSize: '11.5px',
                fontWeight: '800',
                color: '#056DB5',
                background: '#E0F2FE',
                padding: '4px 10px',
                borderRadius: '12px'
              }}
            >
              {mealsList.length} Meals
            </span>
          </div>

          {/* Timeline Connector Container */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Vertical Connecting Line */}
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                bottom: '20px',
                left: '13px',
                width: '2px',
                background: '#E2E8F0',
                zIndex: 0
              }}
            />

            {/* Meal Items with Connected Nodes */}
            {mealsList.map((meal) => (
              <div 
                key={meal.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {/* Timeline Icon Node Badge */}
                <div 
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: meal.nodeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    flexShrink: 0,
                    marginTop: '16px'
                  }}
                >
                  {renderTimelineNodeIcon(meal.nodeType)}
                </div>

                {/* Meal Card */}
                <div 
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    borderRadius: '18px',
                    border: '1px solid #EEF2F6',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  {/* Card Header: Meal Title + Time Badge + Nutrition Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 
                        style={{ 
                          fontSize: '15px', 
                          fontWeight: '800', 
                          color: '#0F172A', 
                          margin: 0 
                        }}
                      >
                        {meal.title}
                      </h4>
                      {meal.time && (
                        <span 
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#056DB5',
                            background: '#F0F7FD',
                            padding: '2px 8px',
                            borderRadius: '8px'
                          }}
                        >
                          {meal.time}
                        </span>
                      )}
                    </div>
                    {meal.tag && (
                      <span 
                        style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          color: '#16A34A',
                          background: '#DCFCE7',
                          padding: '2px 8px',
                          borderRadius: '8px'
                        }}
                      >
                        {meal.tag}
                      </span>
                    )}
                  </div>

                  {/* Card Content Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Food Thumbnail */}
                    <img 
                      src={meal.image} 
                      alt={meal.title} 
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        background: '#FAF9F7',
                        flexShrink: 0,
                        border: '1px solid #F1F5F9'
                      }}
                      onError={(e) => {
                        e.target.src = '/assets/rice_bowl_1.png';
                      }}
                    />

                    {/* Food Items list on left & Portions on right */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {meal.items.map((item, idx) => (
                        <div 
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px'
                          }}
                        >
                          <span 
                            style={{ 
                              fontSize: '13px', 
                              fontWeight: '600', 
                              color: '#334155',
                              lineHeight: 1.3 
                            }}
                          >
                            {meal.items.length > 1 ? `• ${item.name}` : item.name}
                          </span>

                          <div 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '4px',
                              flexShrink: 0,
                              background: '#F8FAFC',
                              padding: '2px 8px',
                              borderRadius: '8px',
                              border: '1px solid #E2E8F0'
                            }}
                          >
                            {renderPortionIcon(item.icon)}
                            <span 
                              style={{ 
                                fontSize: '12px', 
                                fontWeight: '700', 
                                color: '#0F172A' 
                              }}
                            >
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* 5. Doctor Ila B's Advice Card */}
        <div style={{
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          borderRadius: '18px',
          padding: '14px 16px',
          border: '1px solid #BAE6FD',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginTop: '4px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#056DB5',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0369A1', margin: 0 }}>
              Dr. Ila B's Nutrition Tip
            </h4>
            <p style={{ fontSize: '12px', color: '#0C4A6E', margin: '3px 0 0', lineHeight: 1.4 }}>
              Offer small, frequent meals and ensure plenty of fresh water between food times. Avoid force feeding during teething phases.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
