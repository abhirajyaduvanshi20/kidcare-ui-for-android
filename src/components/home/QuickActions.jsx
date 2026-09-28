import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Syringe, Utensils, CalendarPlus, QrCode, Share2 } from 'lucide-react';

export const QuickActions = () => {
  const { openModal, setActiveTab, vaccines, currentKid } = useApp();

  const dueVaccines = vaccines.filter(v => v.status === 'DUE' && v.kidId === currentKid.id).length;

  const actions = [
    {
      id: 'growth',
      title: 'Growth Chart',
      subtitle: 'WHO Percentiles',
      badge: `${currentKid.weight} kg`,
      badgeColor: '#EBF4FA',
      badgeTextColor: '#056DB4',
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #056DB4 0%, #034E82 100%)',
      onClick: () => openModal('growth-chart')
    },
    {
      id: 'vaccines',
      title: 'Vaccinations',
      subtitle: dueVaccines > 0 ? `${dueVaccines} Due Soon` : 'Up to Date',
      badge: dueVaccines > 0 ? 'Action Due' : 'All Clear',
      badgeColor: dueVaccines > 0 ? '#FEF3C7' : '#E8F8F3',
      badgeTextColor: dueVaccines > 0 ? '#D97706' : '#3AA17E',
      icon: Syringe,
      gradient: 'linear-gradient(135deg, #53BF9D 0%, #2A8868 100%)',
      onClick: () => openModal('vaccines')
    },
    {
      id: 'nutrition',
      title: 'Nutrition Plan',
      subtitle: 'Meals & Calorie Guide',
      badge: '4 Meals',
      badgeColor: '#FFF2E6',
      badgeTextColor: '#E36A00',
      icon: Utensils,
      gradient: 'linear-gradient(135deg, #F7931E 0%, #C95D00 100%)',
      onClick: () => setActiveTab('nutrition')
    },
    {
      id: 'appointment',
      title: 'Consult Doctor',
      subtitle: 'Dr. Ila B (Video/Clinic)',
      badge: 'Instant Book',
      badgeColor: '#F6ECFB',
      badgeTextColor: '#8E2DE2',
      icon: CalendarPlus,
      gradient: 'linear-gradient(135deg, #B24592 0%, #7622C9 100%)',
      onClick: () => openModal('new-appointment')
    }
  ];

  return (
    <div style={{ padding: '8px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#012741' }}>Core Health Trackers</h3>
        <span style={{ fontSize: '12px', color: '#056DB4', fontWeight: '600' }}>Active Monitoring</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
      }}>
        {actions.map((act) => {
          const IconComponent = act.icon;
          return (
            <div
              key={act.id}
              onClick={act.onClick}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '14px',
                border: '1px solid #EEF2F6',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '112px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(5, 109, 180, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.04)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: act.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                }}>
                  <IconComponent size={20} />
                </div>

                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '3px 7px',
                  borderRadius: '10px',
                  background: act.badgeColor,
                  color: act.badgeTextColor
                }}>
                  {act.badge}
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#012741', lineHeight: 1.2 }}>
                  {act.title}
                </h4>
                <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
