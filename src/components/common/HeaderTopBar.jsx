import React from 'react';
import { useApp } from '../../context/AppContext';
import { KidCareVectorLogo, DatePickerIcon } from './AndroidIcons';
import { Bell } from 'lucide-react';

export const HeaderTopBar = () => {
  const { openModal, unreadCount } = useApp();

  return (
    <header 
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}
    >
      {/* Official KidCare Vector Logo (vector.xml: 144x24dp) */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <KidCareVectorLogo width={140} height={24} />
      </div>

      {/* Right Row: Appointment DatePicker Button + Notification Bell (Matches TopBarApp.kt) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Datepicker / Appointment Icon */}
        <button
          onClick={() => openModal('new-appointment')}
          style={{
            background: 'none',
            border: 'none',
            padding: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'transform 0.1s ease'
          }}
          title="Book Appointment"
        >
          <DatePickerIcon size={34} />
        </button>

        {/* Notifications Icon (tinted with PrimaryBlue #056DB5) */}
        <button
          onClick={() => openModal('notifications')}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            color: '#056DB5'
          }}
          title="Notification Center"
        >
          <Bell size={28} color="#056DB5" />
          {unreadCount > 0 && (
            <span 
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#F94C66',
                border: '2px solid #FFFFFF'
              }} 
            />
          )}
        </button>
      </div>
    </header>
  );
};
