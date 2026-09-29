import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Syringe, Utensils, Calendar } from 'lucide-react';

export const QuickActions = () => {
  const { openModal, setActiveTab, vaccines, currentKid } = useApp();

  const dueVaccines = vaccines ? vaccines.filter(v => v.status === 'DUE' && v.kidId === currentKid?.id).length : 1;
  const currentWeightFormatted = currentKid?.weight ? `${Number(currentKid.weight).toFixed(2)} kg` : '5.00 kg';

  const actions = [
    {
      id: 'growth',
      title: 'Growth Chart',
      subtitle: 'WHO Percentiles',
      badge: currentWeightFormatted,
      badgeBg: '#E0F2FE',
      badgeColor: '#0369A1',
      icon: TrendingUp,
      iconBg: '#0077D7',
      onClick: () => openModal('growth-chart')
    },
    {
      id: 'vaccines',
      title: 'Vaccinations',
      subtitle: dueVaccines > 0 ? `${dueVaccines} Due Soon` : 'Up to Date',
      badge: dueVaccines > 0 ? 'Action Due' : 'All Clear',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      icon: Syringe,
      iconBg: '#10B981',
      onClick: () => openModal('vaccines')
    },
    {
      id: 'nutrition',
      title: 'Nutrition Plan',
      subtitle: 'Meals & Calorie Guide',
      badge: '4 Meals',
      badgeBg: '#FFEDD5',
      badgeColor: '#C2410C',
      icon: Utensils,
      iconBg: '#F97316',
      onClick: () => setActiveTab('nutrition')
    },
    {
      id: 'appointment',
      title: 'Consult Doctor',
      subtitle: 'Dr. Ila B (Video/Clinic)',
      badge: 'Instant Book',
      badgeBg: '#F3E8FF',
      badgeColor: '#7E22CE',
      icon: Calendar,
      iconBg: '#8B5CF6',
      onClick: () => setActiveTab('appointments')
    }
  ];

  return (
    <div style={{ padding: '6px 16px 14px' }}>
      
      {/* Header Row: Title + Active Monitoring link */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '12px' 
        }}
      >
        <h3 
          style={{ 
            fontSize: '16.5px', 
            fontWeight: '800', 
            color: '#0F172A', 
            margin: 0,
            letterSpacing: '-0.2px' 
          }}
        >
          Core Health Trackers
        </h3>

        <span 
          style={{ 
            fontSize: '12px', 
            color: '#0077D7', 
            fontWeight: '700',
            cursor: 'pointer' 
          }}
        >
          Active Monitoring
        </span>
      </div>

      {/* 2x2 Grid Cards matching Image 1 */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}
      >
        {actions.map((act) => {
          const IconComponent = act.icon;
          return (
            <div
              key={act.id}
              onClick={act.onClick}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '14px 12px 14px',
                border: '1px solid #EEF2F6',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '114px',
                boxSizing: 'border-box',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 119, 215, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
              }}
            >
              {/* Top Row: Rounded Icon + Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div 
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: act.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0
                  }}
                >
                  <IconComponent size={20} strokeWidth={2.4} color="#FFFFFF" />
                </div>

                <span 
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '10px',
                    background: act.badgeBg,
                    color: act.badgeColor,
                    letterSpacing: '-0.1px'
                  }}
                >
                  {act.badge}
                </span>
              </div>

              {/* Bottom Row: Title + Subtitle */}
              <div>
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#0F172A', 
                    margin: 0,
                    lineHeight: 1.2 
                  }}
                >
                  {act.title}
                </h4>
                <p 
                  style={{ 
                    fontSize: '11px', 
                    color: '#64748B', 
                    margin: '3px 0 0 0', 
                    fontWeight: '500',
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}
                >
                  {act.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
