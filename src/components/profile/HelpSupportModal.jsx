import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

export const HelpSupportModal = () => {
  const { closeModal } = useApp();

  return (
    <div 
      className="modal-fullscreen"
      style={{ 
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#FAF9F7', 
        zIndex: 120, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
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
          Help & Support
        </h2>

        <div style={{ width: '24px' }} />
      </div>

      {/* Main Content Area */}
      <div 
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 16px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        {/* Intro text */}
        <p 
          style={{ 
            fontSize: '13.5px', 
            color: '#475569', 
            lineHeight: 1.45,
            margin: '4px 0 10px',
            padding: '0 4px'
          }}
        >
          You can get in touch with us through the platforms below. Our support team will reach out to you as soon as possible.
        </p>

        {/* Card 1: Customer Support */}
        <div 
          style={{
            background: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '18px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <h3 
            style={{ 
              fontSize: '15px', 
              fontWeight: '700', 
              color: '#1E293B', 
              margin: 0 
            }}
          >
            Customer Support
          </h3>

          {/* Contact Number */}
          <a
            href="tel:+919771438787"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textDecoration: 'none'
            }}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#DCE5EF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#056DB5',
                flexShrink: 0
              }}
            >
              <Phone size={18} />
            </div>

            <div>
              <span style={{ fontSize: '11.5px', color: '#64748B', display: 'block' }}>
                Contact Number
              </span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', display: 'block', marginTop: '2px' }}>
                +919771438787
              </span>
            </div>
          </a>

          {/* Email Address */}
          <a
            href="mailto:carepartner@healthpointranchi.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textDecoration: 'none'
            }}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#DCE5EF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#056DB5',
                flexShrink: 0
              }}
            >
              <Mail size={18} />
            </div>

            <div>
              <span style={{ fontSize: '11.5px', color: '#64748B', display: 'block' }}>
                Email Address
              </span>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#1E293B', display: 'block', marginTop: '2px', wordBreak: 'break-all' }}>
                carepartner@healthpointranchi.com
              </span>
            </div>
          </a>
        </div>

        {/* Card 2: Social Media */}
        <div 
          style={{
            background: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '18px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <h3 
            style={{ 
              fontSize: '15px', 
              fontWeight: '700', 
              color: '#1E293B', 
              margin: 0 
            }}
          >
            Social Media
          </h3>

          <a
            href="https://instagram.com/drilakidswellbeing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textDecoration: 'none'
            }}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#FCE4EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden'
              }}
            >
              <img 
                src="/assets/instagram_icon.png" 
                alt="Instagram" 
                style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            <div>
              <span style={{ fontSize: '11.5px', color: '#64748B', display: 'block' }}>
                Instagram
              </span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', display: 'block', marginTop: '2px' }}>
                @drilakidswellbeing
              </span>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};
