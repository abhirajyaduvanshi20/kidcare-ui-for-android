import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WEEKLY_NUTRITION_PLAN } from '../../data/initialData';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Download, 
  Sparkles, 
  Droplets,
  Calendar,
  AlertTriangle,
  Plus,
  Minus,
  Check,
  Flame,
  Award,
  Heart
} from 'lucide-react';

export const NutritionScreen = () => {
  const { currentKid, showToast } = useApp();
  const [selectedDay, setSelectedDay] = useState('monday');
  const [isMealPreferencesExpanded, setIsMealPreferencesExpanded] = useState(true);
  
  // Hydration state with localStorage sync per kid
  const hydrationStorageKey = `kidcare_water_${currentKid.id}`;
  const [waterGlasses, setWaterGlasses] = useState(() => {
    const saved = localStorage.getItem(hydrationStorageKey);
    return saved !== null ? parseInt(saved, 10) : 5;
  });

  // Meal eaten tracking state per kid and day
  const mealsStorageKey = `kidcare_eaten_meals_${currentKid.id}`;
  const [eatenMeals, setEatenMeals] = useState(() => {
    const saved = localStorage.getItem(mealsStorageKey);
    return saved ? JSON.parse(saved) : { monday: [0, 1], tuesday: [0] };
  });

  // Favorite meals
  const [favoriteMeals, setFavoriteMeals] = useState({});

  useEffect(() => {
    localStorage.setItem(hydrationStorageKey, waterGlasses.toString());
  }, [waterGlasses, hydrationStorageKey]);

  useEffect(() => {
    localStorage.setItem(mealsStorageKey, JSON.stringify(eatenMeals));
  }, [eatenMeals, mealsStorageKey]);

  const dailyWaterGoal = 8; // 8 cups = ~1600ml recommended for toddlers / kids
  const hydrationPercent = Math.min(100, Math.round((waterGlasses / dailyWaterGoal) * 100));

  const handleAddWater = () => {
    if (waterGlasses < 12) {
      const nextVal = waterGlasses + 1;
      setWaterGlasses(nextVal);
      if (nextVal === dailyWaterGoal) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
        showToast({ text: `🎉 Amazing! Daily hydration goal reached (${nextVal}/${dailyWaterGoal} cups)!`, type: 'celebrate' });
      } else {
        showToast({ text: `Logged 1 cup of water (+200 ml). Total: ${nextVal}/${dailyWaterGoal}`, type: 'info' });
      }
    }
  };

  const handleMinusWater = () => {
    if (waterGlasses > 0) {
      setWaterGlasses(prev => prev - 1);
    }
  };

  const toggleMealEaten = (dayKey, mealIndex, mealTitle) => {
    setEatenMeals(prev => {
      const currentDayEaten = prev[dayKey] || [];
      const isAlreadyEaten = currentDayEaten.includes(mealIndex);
      const updated = isAlreadyEaten
        ? currentDayEaten.filter(idx => idx !== mealIndex)
        : [...currentDayEaten, mealIndex];

      if (!isAlreadyEaten && updated.length === 4) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast({ text: `🌟 All 4 meals completed for ${dayKey.toUpperCase()}! Great nutrition balance!`, type: 'celebrate' });
      } else if (!isAlreadyEaten) {
        showToast({ text: `✓ Marked "${mealTitle}" as eaten!`, type: 'success' });
      }

      return {
        ...prev,
        [dayKey]: updated
      };
    });
  };

  const toggleFavorite = (mealKey) => {
    setFavoriteMeals(prev => {
      const nextState = { ...prev, [mealKey]: !prev[mealKey] };
      showToast({ 
        text: nextState[mealKey] ? "Added meal to Child's Favorites ❤️" : "Removed from Favorites", 
        type: 'info' 
      });
      return nextState;
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

  const currentPlan = WEEKLY_NUTRITION_PLAN[selectedDay] || WEEKLY_NUTRITION_PLAN.monday;
  const currentDayEatenList = eatenMeals[selectedDay] || [];

  // Determine veg / non-veg status icon from kid preferences
  const vegStatus = currentKid.allergies?.includes('Eggetarian') 
    ? 'Eggetarian' 
    : (currentKid.allergies?.some(a => a.toLowerCase().includes('lactose') || a.toLowerCase().includes('peanut')) ? 'Veg' : 'Veg');

  return (
    <div className="screen-scroll-container" style={{ background: '#FAF9F7' }}>
      {/* Top Profile Header (Android NutritionScreen Row) */}
      <div style={{
        background: '#FFFFFF',
        padding: '16px 18px 12px',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid #056DB4',
            flexShrink: 0,
            background: '#F1F5F9',
            boxShadow: '0 3px 10px rgba(5, 109, 180, 0.15)'
          }}>
            <img 
              src={currentKid.photo || "/assets/kid1_1.png"} 
              alt={currentKid.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/assets/kid1_1.png'; }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#012741', lineHeight: 1.2 }}>
              {currentKid.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span style={{ fontSize: '12px', color: '#056DB4', fontWeight: '700' }}>
                {currentKid.age} • Blood Group: {currentKid.bloodGroup}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Doctor Badge */}
        <div style={{
          background: '#E8F8F3',
          border: '1px solid #A7F3D0',
          padding: '6px 10px',
          borderRadius: '12px',
          textAlign: 'right'
        }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#047857', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
            <CheckCircle2 size={12} color="#047857" /> Published
          </span>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#012741' }}>
            Dr. Ila B
          </span>
        </div>
      </div>

      {/* Weekday Suggestion Chips (Android LazyRow of ElevatedSuggestionChip) */}
      <div style={{
        background: '#FFFFFF',
        padding: '10px 14px 12px',
        borderBottom: '1px solid #E2E8F0',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {daysOfWeek.map((d) => {
            const isSelected = selectedDay === d.key;
            const dayMealsEaten = (eatenMeals[d.key] || []).length;
            return (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '18px',
                  border: isSelected ? '1px solid #056DB4' : '1px solid #E2E8F0',
                  background: isSelected ? '#056DB4' : '#F5F5F5',
                  color: isSelected ? '#FFFFFF' : '#056DB4',
                  fontSize: '12px',
                  fontWeight: isSelected ? '800' : '600',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 10px rgba(5, 109, 180, 0.25)' : 'none',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{d.label}</span>
                {dayMealsEaten > 0 && (
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: '800',
                    background: isSelected ? '#53BF9D' : '#E2E8F0',
                    color: isSelected ? '#FFFFFF' : '#047857',
                    padding: '1px 5px',
                    borderRadius: '8px'
                  }}>
                    {dayMealsEaten}/4
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Interactive Hydration Water Tracker Card */}
        <div style={{
          background: 'linear-gradient(135deg, #EBF4FA 0%, #D8EDFA 100%)',
          borderRadius: '18px',
          padding: '14px 16px',
          border: '1.5px solid #BAE6FD',
          boxShadow: '0 4px 14px rgba(5, 109, 180, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: '#056DB4',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Droplets size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#012741' }}>
                  Daily Hydration Tracker
                </h4>
                <p style={{ fontSize: '11px', color: '#056DB4', fontWeight: '600' }}>
                  Target: {dailyWaterGoal} Cups (~1,600 ml)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleMinusWater}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#056DB4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: '800'
                }}
                title="Decrease 1 cup"
              >
                <Minus size={14} />
              </button>

              <span style={{ fontSize: '15px', fontWeight: '800', color: '#012741', minWidth: '38px', textAlign: 'center' }}>
                {waterGlasses}/{dailyWaterGoal}
              </span>

              <button
                onClick={handleAddWater}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#056DB4',
                  border: 'none',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: '800',
                  boxShadow: '0 2px 6px rgba(5, 109, 180, 0.3)'
                }}
                title="Log 1 cup of water"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Hydration Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.8)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              width: `${hydrationPercent}%`,
              height: '100%',
              background: hydrationPercent >= 100 ? '#10B981' : 'linear-gradient(90deg, #38BDF8 0%, #056DB4 100%)',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Quick Glass Indicators */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            {Array.from({ length: dailyWaterGoal }).map((_, idx) => {
              const isFilled = idx < waterGlasses;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    const target = idx + 1;
                    setWaterGlasses(target);
                    if (target === dailyWaterGoal) {
                      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
                      showToast({ text: `🎉 Hydration target reached (${target}/${dailyWaterGoal})!`, type: 'celebrate' });
                    } else {
                      showToast({ text: `Water intake updated to ${target} cups.`, type: 'info' });
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    fontSize: '15px',
                    opacity: isFilled ? 1 : 0.35,
                    transform: isFilled ? 'scale(1.08)' : 'scale(0.95)',
                    transition: 'all 0.2s ease'
                  }}
                  title={`Set to ${idx + 1} glasses`}
                >
                  💧
                </div>
              );
            })}
          </div>
        </div>

        {/* Meal Preferences Expandable Card */}
        <div style={{
          background: '#FAF9F7',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          overflow: 'hidden'
        }}>
          {/* Card Header */}
          <div 
            onClick={() => setIsMealPreferencesExpanded(!isMealPreferencesExpanded)}
            style={{
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: '#FAF9F7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#056DB4' }}>
                Meal Preferences & Dietary Profile
              </span>
              <span style={{
                fontSize: '10.5px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '8px',
                background: '#E8F8F3',
                color: '#047857',
                border: '1px solid #A7F3D0'
              }}>
                {vegStatus}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                {isMealPreferencesExpanded ? 'Hide' : 'Show'}
              </span>
              {isMealPreferencesExpanded ? <ChevronUp size={18} color="#056DB4" /> : <ChevronDown size={18} color="#056DB4" />}
            </div>
          </div>

          {/* Expandable Content: 4 SmallCards */}
          {isMealPreferencesExpanded && (
            <div style={{ padding: '0 10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Likes SmallCard */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '8px 12px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{ width: '32%', textAlign: 'center', borderRight: '1px solid #E2E8F0', paddingRight: '8px' }}>
                  <span style={{ fontSize: '16px' }}>💚</span>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#056DB4' }}>Likes</div>
                </div>
                <div style={{ width: '68%', paddingLeft: '12px', fontSize: '12px', color: '#000000', fontWeight: '500' }}>
                  Fresh fruit purée, moong dal rice, warm spiced milk, ragi porridge
                </div>
              </div>

              {/* Dislikes SmallCard */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '8px 12px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{ width: '32%', textAlign: 'center', borderRight: '1px solid #E2E8F0', paddingRight: '8px' }}>
                  <span style={{ fontSize: '16px' }}>💔</span>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#056DB4' }}>Dislikes</div>
                </div>
                <div style={{ width: '68%', paddingLeft: '12px', fontSize: '12px', color: '#000000', fontWeight: '500' }}>
                  Spicy peppers, bitter gourd, overly hard crunchy solids
                </div>
              </div>

              {/* Allergy Food SmallCard */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '8px 12px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{ width: '32%', textAlign: 'center', borderRight: '1px solid #E2E8F0', paddingRight: '8px' }}>
                  <span style={{ fontSize: '16px' }}>⚠️</span>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#F94C66' }}>Allergy Food</div>
                </div>
                <div style={{ width: '68%', paddingLeft: '12px', fontSize: '12px', color: '#991B1B', fontWeight: '700' }}>
                  {currentKid.allergies && currentKid.allergies.length > 0 ? currentKid.allergies.join(', ') : 'None Reported'}
                </div>
              </div>

              {/* Medical Issues SmallCard */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '8px 12px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{ width: '32%', textAlign: 'center', borderRight: '1px solid #E2E8F0', paddingRight: '8px' }}>
                  <span style={{ fontSize: '16px' }}>🩺</span>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#056DB4' }}>Medical Status</div>
                </div>
                <div style={{ width: '68%', paddingLeft: '12px', fontSize: '12px', color: '#000000', fontWeight: '500' }}>
                  {currentKid.illnesses && currentKid.illnesses.length > 0 ? currentKid.illnesses.join(', ') : 'Healthy Growth Track'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Day Theme & Calorie Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #056DB4 0%, #012741 100%)',
          borderRadius: '18px',
          padding: '16px',
          color: '#FFFFFF',
          boxShadow: '0 6px 18px rgba(5, 109, 180, 0.22)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10.5px', color: '#53BF9D', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Published Plan • {currentPlan.dayName}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginTop: '2px' }}>
                {currentPlan.dayTheme}
              </h3>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Target</span>
              <p style={{ fontSize: '14px', fontWeight: '800', color: '#F7931E' }}>{currentPlan.totalCalories}</p>
            </div>
          </div>

          {/* Meals Completed Tally */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.22)',
            borderRadius: '12px',
            padding: '8px 12px',
            marginTop: '12px',
            fontSize: '11.5px'
          }}>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>
              Today's Meals Logged: <strong>{currentDayEatenList.length} of 4</strong>
            </span>
            <span style={{ color: currentDayEatenList.length === 4 ? '#53BF9D' : '#F5DC91', fontWeight: '800' }}>
              {currentDayEatenList.length === 4 ? 'All Meals Done! 🏆' : `${Math.round((currentDayEatenList.length / 4) * 100)}% Completed`}
            </span>
          </div>

          <div style={{
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            fontSize: '11.5px',
            color: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={14} color="#53BF9D" style={{ flexShrink: 0 }} />
            <span><strong>Doctor Tip:</strong> {currentPlan.dailyTip}</span>
          </div>
        </div>

        {/* 4 Published FeedCards with Interactive "Mark Eaten" check and Favorites */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentPlan.meals.map((meal, index) => {
            const isEaten = currentDayEatenList.includes(index);
            const mealKey = `${selectedDay}_${index}`;
            const isFav = !!favoriteMeals[mealKey];

            return (
              <div
                key={meal.id || index}
                style={{
                  background: isEaten ? '#DCEFD8' : '#E4C25D',
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: isEaten 
                    ? '0 4px 12px rgba(83, 191, 157, 0.25)' 
                    : '0 4px 12px rgba(228, 194, 93, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  border: isEaten ? '1.5px solid #86EFAC' : '1px solid transparent',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {/* Left Column: Thumbnail Image */}
                  <div style={{
                    width: '32%',
                    height: '95px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    flexShrink: 0,
                    position: 'relative'
                  }}>
                    <img 
                      src={meal.image || "/assets/rice_bowl_1.png"} 
                      alt={meal.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/rice_bowl_1.png'; }}
                    />
                    
                    {/* Favorite Heart Button on Image */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(mealKey);
                      }}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(255,255,255,0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={13} color={isFav ? '#E11D48' : '#64748B'} fill={isFav ? '#E11D48' : 'none'} />
                    </button>
                  </div>

                  {/* Right Column: Title, Calories, Ingredients */}
                  <div style={{ width: '68%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#000000', lineHeight: 1.2 }}>
                        {meal.timeSlot}
                      </h4>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: '800',
                        background: '#012741',
                        color: '#FFFFFF',
                        padding: '2px 6px',
                        borderRadius: '6px'
                      }}>
                        {meal.calories}
                      </span>
                    </div>

                    <p style={{ fontSize: '11.5px', color: '#2B2B2B', fontWeight: '600', marginBottom: '6px' }}>
                      {meal.title}
                    </p>

                    {/* Food items bullet list */}
                    <div style={{
                      background: 'rgba(255,255,255,0.7)',
                      borderRadius: '10px',
                      padding: '6px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px'
                    }}>
                      {meal.ingredients && meal.ingredients.slice(0, 3).map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#000000' }}>
                          <span style={{ fontWeight: '500' }}>• {item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Macro & Pediatric Tip row + "Mark as Eaten" Action */}
                <div style={{
                  background: 'rgba(255,255,255,0.94)',
                  borderRadius: '12px',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', gap: '8px', color: '#012741', fontWeight: '700' }}>
                    <span>P: <strong style={{ color: '#056DB4' }}>{meal.protein}</strong></span>
                    <span>C: <strong style={{ color: '#047857' }}>{meal.carbs}</strong></span>
                    <span>F: <strong style={{ color: '#C2410C' }}>{meal.fats}</strong></span>
                  </div>

                  {/* Toggle Eaten Button */}
                  <button
                    onClick={() => toggleMealEaten(selectedDay, index, meal.title)}
                    style={{
                      background: isEaten ? '#047857' : '#FFFFFF',
                      color: isEaten ? '#FFFFFF' : '#047857',
                      border: '1.5px solid #047857',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '10.5px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    {isEaten ? <Check size={12} strokeWidth={3} /> : null}
                    {isEaten ? 'Eaten ✓' : 'Mark Eaten'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons: PDF & Share */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
          <button
            onClick={() => showToast({ text: `📄 Exporting Dr. Ila B's ${currentPlan.dayName} Diet Chart PDF...`, type: 'info' })}
            className="btn-secondary"
            style={{ flex: 1, padding: '12px', borderRadius: '14px', fontSize: '12.5px', fontWeight: '700' }}
          >
            <Download size={15} /> Download PDF
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `KidCare Diet Plan for ${currentKid.name}`,
                  text: `Weekly Diet Plan (${currentPlan.dayName}: ${currentPlan.dayTheme}) - ${currentPlan.totalCalories}`
                }).catch(() => {});
              } else {
                showToast({ text: "Diet plan link copied & shared to caregiver! 📲", type: 'success' });
              }
            }}
            className="btn-primary"
            style={{ flex: 1, padding: '12px', borderRadius: '14px', fontSize: '12.5px', fontWeight: '700' }}
          >
            <Share2 size={15} /> Share Diet Plan
          </button>
        </div>
      </div>
    </div>
  );
};



