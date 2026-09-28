import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Shield, HelpCircle, PhoneCall, FileText, Bell, LogOut, ChevronRight, UserPlus } from 'lucide-react';

export const ProfileScreen = () => {
  const { parent, kids, currentKid, openModal, switchKid, logout } = useApp();

  const menuSections = [
    {
      title: 'Health & Account',
      items: [
        { id: 'edit-profile', label: 'Parent & Account Info', icon: User, desc: 'Name, phone, emergency contact', color: '#056DB4' },
        { id: 'notifications', label: 'Notification Center', icon: Bell, desc: 'Vaccine & consultation alerts', color: '#F7931E' },
        { id: 'privacy-settings', label: 'Privacy & Security Settings', icon: Shield, desc: 'Biometric lock, cloud data sync', color: '#53BF9D' }
      ]
    },
    {
      title: 'Support & Legal',
      items: [
        { id: 'faq', label: 'Frequently Asked Questions', icon: HelpCircle, desc: 'Common queries on flips & consultations', color: '#8E2DE2' },
        { id: 'help-support', label: '24/7 Pediatric Help & Support', icon: PhoneCall, desc: 'Contact Dr. Ila B clinic team', color: '#056DB4' },
        { id: 'privacy-policy', label: 'Privacy Policy & Terms', icon: FileText, desc: 'Data protection & HIPAA compliance', color: '#64748B' }
      ]
    }
  ];

  const parentInitials = parent && parent.name
    ? parent.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'P';

  return (
    <div className="screen-scroll-container">
      {/* Top Banner with Parent Info (Matches Android ProfileScreen.kt) */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #056DB5 0%, #012741 100%)',
          padding: '24px 18px 24px',
          color: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          {/* Parent Initials Avatar */}
          <div 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#53BF9D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2.5px solid #FFFFFF',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              fontSize: '22px',
              fontWeight: '700',
              color: '#FFFFFF'
            }}
          >
            {parentInitials}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '19px', fontWeight: '700' }}>{parent ? parent.name : 'Parent Account'}</h2>
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  background: 'rgba(255,255,255,0.25)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}
              >
                {parent ? parent.relation : 'Parent'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
              {parent ? parent.phone : '+91 9876543210'}{parent && parent.city ? ` • ${parent.city}` : ''}
            </p>
          </div>
        </div>

        {/* Managed Kids Row */}
        <div 
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            padding: '12px 14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.3px' }}>
              Registered Children ({kids.length})
            </span>
            <button
              onClick={() => openModal('add-kid')}
              style={{
                background: 'rgba(255,255,255,0.22)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <UserPlus size={12} /> + Add Child
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
            {kids.map((k) => {
              const isSelected = k.id === currentKid.id;
              return (
                <div
                  key={k.id}
                  onClick={() => switchKid(k.id)}
                  style={{
                    background: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.18)',
                    color: isSelected ? '#056DB5' : '#FFFFFF',
                    padding: '8px 14px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                  }}
                >
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img 
                      src={k.photo || '/assets/kid1_1.png'} 
                      alt={k.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/kid1_1.png';
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>{k.name.split(' ')[0]}</span>
                  {isSelected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#056DB5' }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Settings Sections */}
      <div style={{ padding: '18px 18px 40px' }}>
        {menuSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '22px' }}>
            <h3 
              style={{
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: '#64748B',
                marginBottom: '10px',
                paddingLeft: '4px'
              }}
            >
              {section.title}
            </h3>

            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {section.items.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => openModal(item.id)}
                    style={{
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: i < section.items.length - 1 ? '1px solid #F1F5F9' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div 
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: item.color + '14',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconComponent size={20} color={item.color} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', lineHeight: 1.2 }}>
                          {item.label}
                        </h4>
                        <p style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ChevronRight size={16} color="#94A3B8" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout / Switch Account Button */}
        <button
          onClick={logout}
          style={{
            width: '100%',
            background: '#FEE2E2',
            color: '#DC2626',
            border: 'none',
            borderRadius: '16px',
            padding: '14px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.2s ease',
            marginTop: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#FECACA'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#FEE2E2'}
        >
          <LogOut size={16} /> Switch Account / Logout
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: '#94A3B8' }}>
          KidCare Android • Pediatric Wellness System
        </div>
      </div>
    </div>
  );
};
