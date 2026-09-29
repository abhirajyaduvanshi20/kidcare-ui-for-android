import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  ShieldCheck, 
  Bell, 
  FileText, 
  Headphones, 
  HelpCircle, 
  ChevronRight, 
  Phone,
  CheckCircle2
} from 'lucide-react';

export const ProfileScreen = () => {
  const { parent, openModal } = useApp();
  const [isDndOff, setIsDndOff] = useState(true);

  const menuItems = [
    { 
      id: 'edit-profile', 
      label: 'Parent Profile',
      icon: User,
      iconColor: '#056DB5',
      iconBg: '#EBF4FA'
    },
    { 
      id: 'privacy-settings', 
      label: 'Privacy Settings',
      icon: ShieldCheck,
      iconColor: '#53BF9D',
      iconBg: '#E8F8F3'
    },
    { 
      id: 'notifications', 
      label: 'Notifications',
      icon: Bell,
      iconColor: '#F7931E',
      iconBg: '#FFF2E6'
    },
    { 
      id: 'privacy-policy', 
      label: 'Privacy Policy',
      icon: FileText,
      iconColor: '#056DB5',
      iconBg: '#EBF4FA'
    },
    { 
      id: 'help-support', 
      label: 'Help and Support',
      icon: Headphones,
      iconColor: '#8E2DE2',
      iconBg: '#F6ECFB'
    },
    { 
      id: 'faq', 
      label: 'FAQs',
      icon: HelpCircle,
      iconColor: '#3AA17E',
      iconBg: '#E8F8F3'
    }
  ];

  const parentName = parent?.name || 'Priya Sharma';
  const rawPhone = parent?.phone ? parent.phone.replace(/[^0-9]/g, '').slice(-10) : '919876543210';
  const displayPhone = rawPhone.length === 10 ? `+91 ${rawPhone.slice(0, 5)} ${rawPhone.slice(5)}` : rawPhone;

  return (
    <div 
      className="screen-scroll-container" 
      style={{ 
        background: '#FAF9F7', 
        minHeight: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '16px 16px 85px'
      }}
    >
      {/* 1. Parent Info Header with Premium Gradient Ring */}
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px 18px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 16px rgba(5, 109, 180, 0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '14px'
        }}
      >
        <div 
          style={{
            position: 'relative',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            padding: '2.5px',
            background: 'linear-gradient(135deg, #056DB5 0%, #53BF9D 100%)',
            boxShadow: '0 4px 12px rgba(5, 109, 180, 0.2)',
            flexShrink: 0
          }}
        >
          <div 
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF'
            }}
          >
            <img 
              src="/assets/parent_profile_photo.png" 
              alt={parentName} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/kid_meditating_mat_2.png';
              }}
            />
          </div>

          <div 
            style={{
              position: 'absolute',
              bottom: '-1px',
              right: '-1px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#53BF9D',
              border: '2px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <CheckCircle2 size={12} strokeWidth={3} />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h2 
              style={{ 
                fontSize: '18px', 
                fontWeight: '800', 
                color: '#012741', 
                margin: 0,
                lineHeight: 1.2 
              }}
            >
              {parentName}
            </h2>
            <span 
              style={{
                background: '#EBF4FA',
                color: '#056DB5',
                fontSize: '10px',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '8px',
                letterSpacing: '0.2px'
              }}
            >
              PRIMARY
            </span>
          </div>

          <p 
            style={{ 
              fontSize: '13px', 
              color: '#64748B', 
              fontWeight: '600', 
              margin: '3px 0 0 0',
              letterSpacing: '0.2px'
            }}
          >
            {displayPhone}
          </p>
        </div>
      </div>

      {/* 2. Call Preference Card */}
      <div 
        style={{
          background: isDndOff ? 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)' : '#FFFFFF',
          borderRadius: '20px',
          padding: '16px 18px',
          border: isDndOff ? '1.5px solid #A7F3D0' : '1px solid #E2E8F0',
          boxShadow: isDndOff ? '0 4px 16px rgba(83, 191, 157, 0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '14px',
          transition: 'all 0.25s ease'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
            <h4 
              style={{ 
                fontSize: '15px', 
                fontWeight: '800', 
                color: '#012741',
                margin: 0 
              }}
            >
              Call Preference
            </h4>
            <span 
              style={{
                fontSize: '9.5px',
                fontWeight: '800',
                padding: '1px 6px',
                borderRadius: '6px',
                background: isDndOff ? '#D1FAE5' : '#F1F5F9',
                color: isDndOff ? '#065F46' : '#64748B'
              }}
            >
              {isDndOff ? 'OPEN' : 'DND ON'}
            </span>
          </div>

          <p 
            style={{ 
              fontSize: '11.5px', 
              color: '#64748B', 
              margin: 0,
              lineHeight: 1.35 
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
            background: isDndOff ? '#53BF9D' : '#CBD5E1',
            padding: '3px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isDndOff ? 'flex-end' : 'flex-start',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isDndOff ? '0 2px 8px rgba(83, 191, 157, 0.35)' : 'none',
            flexShrink: 0
          }}
        >
          <div 
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDndOff ? '#047857' : '#94A3B8'
            }}
          >
            <Phone size={12} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Menu Card */}
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '22px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 18px rgba(5, 109, 180, 0.04)',
          overflow: 'hidden'
        }}
      >
        {menuItems.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => openModal(item.id)}
              style={{
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderBottom: idx < menuItems.length - 1 ? '1px solid #F1F5F9' : 'none',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '11px',
                    background: item.iconBg,
                    color: item.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={18} strokeWidth={2.2} />
                </div>

                <span 
                  style={{ 
                    fontSize: '14.5px', 
                    fontWeight: '700', 
                    color: '#1E293B', 
                    letterSpacing: '-0.1px' 
                  }}
                >
                  {item.label}
                </span>
              </div>

              <ChevronRight size={18} color="#94A3B8" />
            </div>
          );
        })}
      </div>

      {/* 4. Footer Version Info */}
      <div 
        style={{ 
          textAlign: 'center', 
          marginTop: 'auto', 
          paddingTop: '24px', 
          fontSize: '11.5px', 
          color: '#94A3B8', 
          fontWeight: '500' 
        }}
      >
        © KidCare 2026 &nbsp;•&nbsp; Version: 8.8
      </div>

    </div>
  );
};
