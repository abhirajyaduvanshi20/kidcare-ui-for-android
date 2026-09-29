import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WEEKLY_NUTRITION_PLAN } from '../../data/initialData';
import { 
  CheckCircle2, 
  Check, 
  Utensils, 
  ShieldCheck 
} from 'lucide-react';

export const NutritionScreen = () => {
  const { currentKid, showToast } = useApp();
  const [selectedDay, setSelectedDay] = useState('monday');

  // Meal eaten tracking state per kid and day
  const mealsStorageKey = `kidcare_eaten_meals_${currentKid.id}`;
  const [eatenMeals, setEatenMeals] = useState(() => {
    const saved = localStorage.getItem(mealsStorageKey);
    return saved ? JSON.parse(saved) : { monday: [0, 1], tuesday: [0] };
  });

  useEffect(() => {
    localStorage.setItem(mealsStorageKey, JSON.stringify(eatenMeals));
  }, [eatenMeals, mealsStorageKey]);

  const toggleMealEaten = (dayKey, mealIndex, mealTitle) => {
    setEatenMeals(prev => {
      const currentDayEaten = prev[dayKey] || [];
      const isAlreadyEaten = currentDayEaten.includes(mealIndex);
      const updated = isAlreadyEaten
        ? currentDayEaten.filter(idx => idx !== mealIndex)
        : [...currentDayEaten, mealIndex];

      if (!isAlreadyEaten) {
        showToast(`Marked "${mealTitle}" as completed`);
      }

      return {
        ...prev,
        [dayKey]: updated
      };
    });
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Monday', short: 'Mon' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { key: 'thursday', label: 'Thursday', short: 'Thu' },
    { key: 'friday', label: 'Friday', short: 'Fri' },
    { key: 'saturday', label: 'Saturday', short: 'Sat' },
    { key: 'sunday', label: 'Sunday', short: 'Sun' }
  ];

  const planData = (WEEKLY_NUTRITION_PLAN && WEEKLY_NUTRITION_PLAN[selectedDay]) 
    || (WEEKLY_NUTRITION_PLAN && WEEKLY_NUTRITION_PLAN.monday) 
    || { dayName: 'Monday', meals: [] };

  const mealsList = planData.meals || [];
  const currentDayEatenList = eatenMeals[selectedDay] || [];

  return (
    <div className="screen-scroll-container" style={{ background: '#FAF9F7' }}>
      {/* Brand Header Banner matching KidCare theme */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #056DB5 0%, #012741 100%)',
          padding: '20px 18px 22px',
          color: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.2px' }}>Diet & Nutrition Plan</h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
              Pediatric Meal Guide for {currentKid.name} ({currentKid.age})
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            padding: '6px 12px',
            borderRadius: '14px',
            textAlign: 'right',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#53BF9D', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
              <CheckCircle2 size={12} color="#53BF9D" /> Dr. Ila B
            </span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#FFFFFF' }}>
              Verified Plan
            </span>
          </div>
        </div>

        {/* Day of Week Selector Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {daysOfWeek.map((d) => {
            const isSelected = selectedDay === d.key;
            const countEaten = (eatenMeals[d.key] || []).length;
            const totalForDay = WEEKLY_NUTRITION_PLAN?.[d.key]?.meals?.length || 4;

            return (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '16px',
                  border: 'none',
                  background: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.18)',
                  color: isSelected ? '#056DB5' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: isSelected ? '800' : '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{d.short}</span>
                {countEaten > 0 && (
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: '800',
                    background: isSelected ? '#53BF9D' : 'rgba(255,255,255,0.3)',
                    color: '#FFFFFF',
                    padding: '1px 5px',
                    borderRadius: '8px'
                  }}>
                    {countEaten}/{totalForDay}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '16px 18px 40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Daily Summary & Meals Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Utensils size={16} color="#056DB5" />
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#012741' }}>
              {planData.dayName || daysOfWeek.find(d => d.key === selectedDay)?.label} Meals
            </h3>
          </div>
          <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '600' }}>
            {currentDayEatenList.length} of {mealsList.length} Completed
          </span>
        </div>

        {/* Daily Tip if present */}
        {planData.dailyTip && (
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '14px',
            padding: '10px 14px',
            fontSize: '12px',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} color="#166534" style={{ flexShrink: 0 }} />
            <span><strong>Doctor Tip:</strong> {planData.dailyTip}</span>
          </div>
        )}

        {/* Meal Cards */}
        {mealsList.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '24px',
            textAlign: 'center',
            color: '#64748B',
            border: '1px dashed #CBD5E1'
          }}>
            No meals scheduled for this day.
          </div>
        ) : (
          mealsList.map((meal, idx) => {
            const isEaten = currentDayEatenList.includes(idx);
            const ingredients = meal.ingredients || meal.items || [];
            const timeDisplay = meal.timeSlot || meal.time || `Meal ${idx + 1}`;

            return (
              <div
                key={meal.id || idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '16px',
                  border: isEaten ? '1.5px solid #53BF9D' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Meal Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      background: isEaten ? '#E8F8F3' : '#F1F5F9',
                      color: isEaten ? '#047857' : '#056DB5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '13px',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#012741', lineHeight: 1.2 }}>
                        {meal.title}
                      </h4>
                      <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', display: 'block' }}>
                        {timeDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Eaten Toggle Button */}
                  <button
                    onClick={() => toggleMealEaten(selectedDay, idx, meal.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      border: isEaten ? 'none' : '1px solid #CBD5E1',
                      background: isEaten ? '#53BF9D' : '#FFFFFF',
                      color: isEaten ? '#FFFFFF' : '#475569',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    <Check size={13} strokeWidth={isEaten ? 3 : 2} />
                    {isEaten ? 'Completed' : 'Mark Done'}
                  </button>
                </div>

                {/* Subtitle / Description if present */}
                {meal.subtitle && (
                  <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                    {meal.subtitle}
                  </p>
                )}

                {/* Ingredients / Items List */}
                {ingredients.length > 0 && (
                  <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '10px 12px' }}>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>
                      {ingredients.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nutrients footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: '#64748B',
                  paddingTop: '4px',
                  borderTop: '1px solid #F1F5F9',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {meal.calories && <span><strong>Calories:</strong> {meal.calories}</span>}
                  {meal.protein && <span><strong>Protein:</strong> {meal.protein}</span>}
                  {meal.carbs && <span><strong>Carbs:</strong> {meal.carbs}</span>}
                  {meal.fats && <span><strong>Fats:</strong> {meal.fats}</span>}
                </div>
              </div>
            );
          })
        )}

        {/* Doctor's Pediatric Nutrition Notes */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          padding: '16px',
          border: '1px solid #E2E8F0',
          marginTop: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ShieldCheck size={18} color="#53BF9D" />
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#012741' }}>
              Dietary Precautions & Pediatric Advice
            </h4>
          </div>
          <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
            Ensure consistent iron and calcium intake with green veggies and dairy. Avoid added sugar and excessive salt. Keep meals colorful and texture-appropriate for child's age group.
          </p>
        </div>

      </div>
    </div>
  );
};
