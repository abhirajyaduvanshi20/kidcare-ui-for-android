import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HomeTabIcon, 
  AppointmentTabIcon, 
  NutritionTabIcon, 
  PrescriptionTabIcon, 
  ProfileTabIcon 
} from './AndroidIcons';

export const BottomNavBar = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    { id: 'home', label: 'Home', Icon: HomeTabIcon },
    { id: 'appointments', label: 'Appoint', Icon: AppointmentTabIcon },
    { id: 'nutrition', label: 'Nutri', Icon: NutritionTabIcon },
    { id: 'prescriptions', label: 'Pres', Icon: PrescriptionTabIcon },
    { id: 'profile', label: 'Profile', Icon: ProfileTabIcon }
  ];

  return (
    <nav 
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        height: '62px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'sticky',
        bottom: 0,
        zIndex: 40,
        padding: '0 4px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.03)'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.Icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 0',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30px'
              }}
            >
              <IconComponent 
                size={tab.id === 'prescriptions' ? 22 : 26} 
                color={isActive ? '#056DB5' : '#64748B'} 
                active={isActive}
              />
            </div>
            
            <span 
              style={{
                fontSize: '11px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#056DB5' : '#64748B',
                marginTop: '2px',
                letterSpacing: '-0.2px'
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
