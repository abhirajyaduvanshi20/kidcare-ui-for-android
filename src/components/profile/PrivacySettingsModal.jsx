import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Phone } from 'lucide-react';

export const PrivacySettingsModal = () => {
  const { closeModal } = useApp();
  const [isDndOff, setIsDndOff] = useState(true);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: '#FAF9F7', 
        zIndex: 90, 
        display: 'flex', 
        flexDirection: 'column',
        animation: 'fadeIn 0.2s ease' 
      }}
    >
      {/* Android Sub-Screen Top Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px',
          background: '#FAF9F7',
          position: 'relative'
        }}
      >
        <button
          onClick={closeModal}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1E293B',
            zIndex: 2
          }}
          title="Back"
        >
          <ArrowLeft size={24} color="#1E293B" />
        </button>

        <h2 
          style={{ 
            position: 'absolute', 
            left: 0, 
            right: 0, 
            textAlign: 'center', 
            fontSize: '18px', 
            fontWeight: '700', 
            color: '#1E293B',
            margin: 0,
            pointerEvents: 'none'
          }}
        >
          Privacy Settings
        </h2>

        <div style={{ width: '24px' }} />
      </div>

      {/* Main Content: Call Preference Card */}
      <div style={{ padding: '0 16px 40px' }}>
        <div 
          style={{
            background: '#ECEFF5',
            borderRadius: '16px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div>
            <h4 
              style={{ 
                fontSize: '15px', 
                fontWeight: '700', 
                color: '#1E293B', 
                margin: '0 0 4px 0' 
              }}
            >
              Call Preference
            </h4>
            <p 
              style={{ 
                fontSize: '12px', 
                color: '#64748B', 
                margin: 0,
                lineHeight: 1.3 
              }}
            >
              {isDndOff 
                ? "DND is off. You're open to CarePartner calls." 
                : "DND is on. CarePartner calls are silenced."}
            </p>
          </div>

          {/* Android DND Pill Toggle Switch */}
          <div 
            onClick={() => setIsDndOff(!isDndOff)}
            style={{
              width: '54px',
              height: '30px',
              borderRadius: '20px',
              background: isDndOff ? '#80CBC4' : '#CBD5E1',
              padding: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isDndOff ? 'flex-end' : 'flex-start',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <div 
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDndOff ? '#004D40' : '#64748B'
              }}
            >
              <Phone size={12} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
