import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Sun, 
  Sunrise, 
  Moon, 
  Utensils, 
  Coffee,
  GlassWater
} from 'lucide-react';

const WEEK_DAYS = [
  { key: 'monday', day: 'Mon', date: '12' },
  { key: 'tuesday', day: 'Tue', date: '13' },
  { key: 'wednesday', day: 'Wed', date: '14' },
  { key: 'thursday', day: 'Thu', date: '15' },
  { key: 'friday', day: 'Fri', date: '16' },
  { key: 'saturday', day: 'Sat', date: '17' },
  { key: 'sunday', day: 'Sun', date: '18' }
];

const MEAL_SCHEDULE_BY_DAY = {
  tuesday: [
    {
      id: 'tue-m1',
      title: 'Early Morning',
      nodeType: 'sun',
      nodeColor: '#FBBF24',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'tue-m2',
      title: 'Breakfast',
      nodeType: 'sunrise',
      nodeColor: '#F97316',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Sooji Chilla', icon: 'plate', quantity: '1 pcs' },
        { name: 'Tomato Chutney', icon: 'cutlery', quantity: '1 tbsp' }
      ]
    },
    {
      id: 'tue-m3',
      title: 'Mid-morning snacks',
      nodeType: 'moon',
      nodeColor: '#22C55E',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Banana', icon: 'banana', quantity: '1 pcs' }
      ]
    },
    {
      id: 'tue-m4',
      title: 'Lunch',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Veg Rice Khichdi', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Aloo Chokha', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Curd(cow milk)', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'tue-m5',
      title: 'Evening snacks',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '1 glass' },
        { name: 'Oats Pancake', icon: 'plate', quantity: '1 pc' }
      ]
    },
    {
      id: 'tue-m6',
      title: 'Dinner',
      nodeType: 'night',
      nodeColor: '#1E293B',
      image: '/assets/lunch.png',
      items: [
        { name: 'Daliya Khichdi', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Aloo Chokha', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  monday: [
    {
      id: 'mon-m1',
      title: 'Early Morning',
      nodeType: 'sun',
      nodeColor: '#FBBF24',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Warm Almond Milk', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'mon-m2',
      title: 'Breakfast',
      nodeType: 'sunrise',
      nodeColor: '#F97316',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Soft Wheat Toast', icon: 'plate', quantity: '2 pcs' },
        { name: 'Boiled Egg / Paneer', icon: 'cutlery', quantity: '1 pc' }
      ]
    },
    {
      id: 'mon-m3',
      title: 'Mid-morning snacks',
      nodeType: 'moon',
      nodeColor: '#22C55E',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Apple Puree', icon: 'bowl', quantity: '1 bowl' }
      ]
    },
    {
      id: 'mon-m4',
      title: 'Lunch',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      image: '/assets/lunch.png',
      items: [
        { name: 'Moong Dal Khichdi', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Spinach Mash', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'mon-m5',
      title: 'Evening snacks',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Cow Milk', icon: 'glass', quantity: '1 glass' },
        { name: 'Makhana Snack', icon: 'bowl', quantity: '1 cup' }
      ]
    },
    {
      id: 'mon-m6',
      title: 'Dinner',
      nodeType: 'night',
      nodeColor: '#1E293B',
      image: '/assets/lunch.png',
      items: [
        { name: 'Vegetable Dalia', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  wednesday: [
    {
      id: 'wed-m1',
      title: 'Early Morning',
      nodeType: 'sun',
      nodeColor: '#FBBF24',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'wed-m2',
      title: 'Breakfast',
      nodeType: 'sunrise',
      nodeColor: '#F97316',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Ragi Idli', icon: 'plate', quantity: '2 pcs' },
        { name: 'Coconut Dip', icon: 'cutlery', quantity: '1 tbsp' }
      ]
    },
    {
      id: 'wed-m3',
      title: 'Mid-morning snacks',
      nodeType: 'moon',
      nodeColor: '#22C55E',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Mashed Pear', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'wed-m4',
      title: 'Lunch',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Curd Rice Mash', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Pumpkin Puree', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'wed-m5',
      title: 'Evening snacks',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '1 glass' },
        { name: 'Whole Grain Biscuit', icon: 'plate', quantity: '2 pcs' }
      ]
    },
    {
      id: 'wed-m6',
      title: 'Dinner',
      nodeType: 'night',
      nodeColor: '#1E293B',
      image: '/assets/lunch.png',
      items: [
        { name: 'Soft Rice Khichdi', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ],
  thursday: [
    {
      id: 'thu-m1',
      title: 'Early Morning',
      nodeType: 'sun',
      nodeColor: '#FBBF24',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '0.5 glass' }
      ]
    },
    {
      id: 'thu-m2',
      title: 'Breakfast',
      nodeType: 'sunrise',
      nodeColor: '#F97316',
      image: '/assets/glass_full_fresh_milk_1.png',
      items: [
        { name: 'Poha with Veggies', icon: 'plate', quantity: '1 bowl' }
      ]
    },
    {
      id: 'thu-m3',
      title: 'Mid-morning snacks',
      nodeType: 'moon',
      nodeColor: '#22C55E',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Papaya Cubes', icon: 'banana', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'thu-m4',
      title: 'Lunch',
      nodeType: 'utensils',
      nodeColor: '#056DB5',
      image: '/assets/rice_bowl_1.png',
      items: [
        { name: 'Rice & Yellow Dal', icon: 'bowl', quantity: '0.5 bowl' },
        { name: 'Aloo Bharta', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    },
    {
      id: 'thu-m5',
      title: 'Evening snacks',
      nodeType: 'coffee',
      nodeColor: '#8B5CF6',
      image: '/assets/lentil_salad.png',
      items: [
        { name: 'Milk (cow)', icon: 'glass', quantity: '1 glass' },
        { name: 'Suji Rusk', icon: 'plate', quantity: '1 pc' }
      ]
    },
    {
      id: 'thu-m6',
      title: 'Dinner',
      nodeType: 'night',
      nodeColor: '#1E293B',
      image: '/assets/lunch.png',
      items: [
        { name: 'Lentil Veggie Soup', icon: 'bowl', quantity: '0.5 bowl' }
      ]
    }
  ]
};

export const NutritionScreen = () => {
  const { currentKid, openModal, setActiveTab } = useApp();
  const [selectedDayKey, setSelectedDayKey] = useState('tuesday');

  const mealsList = MEAL_SCHEDULE_BY_DAY[selectedDayKey] || MEAL_SCHEDULE_BY_DAY.tuesday;

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
        return <GlassWater size={17} color="#056DB5" style={{ flexShrink: 0 }} />;
      case 'plate':
        return <span style={{ fontSize: '14px', lineHeight: 1 }}>🥣</span>;
      case 'cutlery':
        return <span style={{ fontSize: '13px', lineHeight: 1 }}>🍴</span>;
      case 'banana':
        return <span style={{ fontSize: '15px', lineHeight: 1 }}>🍌</span>;
      case 'bowl':
      default:
        return <span style={{ fontSize: '14px', lineHeight: 1 }}>🥣</span>;
    }
  };

  return (
    <div 
      className="screen-scroll-container" 
      style={{ 
        background: '#FAF9F7', 
        minHeight: '100%', 
        paddingBottom: '85px' 
      }}
    >
      {/* 1. Top Header Row: Back Arrow + Child Avatar + Name & Age + Calendar Icon */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px 12px',
          background: '#FAF9F7'
        }}
      >
        <button
          onClick={() => setActiveTab('home')}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1E293B'
          }}
          title="Back to Home"
        >
          <ArrowLeft size={24} color="#1E293B" />
        </button>

        {/* Child Profile Details */}
        <div 
          onClick={() => openModal('kid-selector')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            cursor: 'pointer' 
          }}
        >
          <div 
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '2px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
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
                fontSize: '17px', 
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
                fontSize: '12px', 
                color: '#64748B', 
                margin: '3px 0 0 0',
                fontWeight: '500' 
              }}
            >
              {currentKid?.age || '2 years 8 months'}
            </p>
          </div>
        </div>

        {/* Calendar / Appointment Button */}
        <button
          onClick={() => openModal('new-appointment')}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A'
          }}
          title="View Appointments"
        >
          <CalendarIcon size={24} color="#0F172A" />
        </button>
      </div>

      {/* 2. Weekly Calendar Selector Pills Row */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '4px 16px 16px',
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
                minWidth: '58px',
                padding: '10px 6px',
                borderRadius: '16px',
                border: isSelected ? 'none' : '1px solid #E2E8F0',
                background: isSelected ? '#0077D7' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#64748B',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                boxShadow: isSelected 
                  ? '0 4px 12px rgba(0, 119, 215, 0.35)' 
                  : '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'all 0.18s ease'
              }}
            >
              <span 
                style={{ 
                  fontSize: '11px', 
                  fontWeight: isSelected ? '700' : '600',
                  color: isSelected ? '#FFFFFF' : '#64748B' 
                }}
              >
                {d.day}
              </span>
              <span 
                style={{ 
                  fontSize: '15px', 
                  fontWeight: '800',
                  color: isSelected ? '#FFFFFF' : '#0F172A' 
                }}
              >
                {d.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Section Content */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* 3. Meal Preferences Vibrant Blue Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #0080E6 0%, #005BBB 100%)',
            borderRadius: '20px',
            padding: '16px 16px 18px',
            boxShadow: '0 6px 20px rgba(0, 91, 187, 0.25)',
            color: '#FFFFFF'
          }}
        >
          {/* Header Row */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '14px' 
            }}
          >
            <h3 
              style={{ 
                fontSize: '16px', 
                fontWeight: '800', 
                color: '#FFFFFF', 
                margin: 0,
                letterSpacing: '-0.2px' 
              }}
            >
              Meal Preferences
            </h3>

            {/* VEG Badge */}
            <span 
              style={{
                background: '#FFFFFF',
                color: '#16A34A',
                fontSize: '10.5px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '8px',
                letterSpacing: '0.4px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
              }}
            >
              VEG
            </span>
          </div>

          {/* 4 Circular Preference Items in a Row */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '6px',
              textAlign: 'center' 
            }}
          >
            {/* Item 1: Likes */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontSize: '24px' }}>🍌</span>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                Likes
              </span>
              <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: '800', marginTop: '1px' }}>
                Banana
              </span>
            </div>

            {/* Item 2: Dislikes */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontSize: '24px' }}>🥭</span>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                Dislikes
              </span>
              <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: '800', marginTop: '1px' }}>
                Papaya
              </span>
            </div>

            {/* Item 3: Allergy Food */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontSize: '22px' }}>🌾</span>
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', fontWeight: '500', whiteSpace: 'nowrap' }}>
                Allergy Food
              </span>
              <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginTop: '1px', whiteSpace: 'nowrap' }}>
                Not Specified
              </span>
            </div>

            {/* Item 4: Medical Issues */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontSize: '22px' }}>👨‍⚕️</span>
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', fontWeight: '500', whiteSpace: 'nowrap' }}>
                Medical Issues
              </span>
              <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginTop: '1px', whiteSpace: 'nowrap' }}>
                Not Specified
              </span>
            </div>

          </div>
        </div>

        {/* 4. Today's Meals Timeline Section */}
        <div>
          <h3 
            style={{ 
              fontSize: '18px', 
              fontWeight: '800', 
              color: '#0F172A', 
              margin: '0 0 14px 4px',
              letterSpacing: '-0.2px' 
            }}
          >
            Today's Meals
          </h3>

          {/* Timeline Connector Container */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Vertical Line */}
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
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
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
                  {/* Card Header: Meal Title + Chevron */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 
                      style={{ 
                        fontSize: '16px', 
                        fontWeight: '800', 
                        color: '#0F172A', 
                        margin: 0 
                      }}
                    >
                      {meal.title}
                    </h4>
                    <ChevronRight size={18} color="#94A3B8" />
                  </div>

                  {/* Card Content Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Food Thumbnail */}
                    <img 
                      src={meal.image} 
                      alt={meal.title} 
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        background: '#FAF9F7',
                        flexShrink: 0
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
                              gap: '5px',
                              flexShrink: 0 
                            }}
                          >
                            {renderPortionIcon(item.icon)}
                            <span 
                              style={{ 
                                fontSize: '13px', 
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

      </div>
    </div>
  );
};
