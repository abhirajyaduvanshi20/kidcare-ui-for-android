import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft } from 'lucide-react';

const POLICY_SECTIONS = [
  {
    title: "Information We Collect",
    text: "We collect basic personal details such as parent or guardian name, contact information, and child profile details to provide healthcare services."
  },
  {
    title: "Health Data",
    text: "Health-related information including growth data, vaccination records, and appointment history is securely stored."
  },
  {
    title: "How We Use Your Data",
    text: "Your data is used only to manage appointments, track health records, and improve app services."
  },
  {
    title: "Data Protection",
    text: "We follow standard security practices to protect your information from unauthorized access."
  },
  {
    title: "Your Rights",
    text: "You may request access, correction, or deletion of your data by contacting our support team."
  }
];

export const PrivacyPolicyModal = () => {
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
          Privacy Policy
        </h2>

        <div style={{ width: '24px' }} />
      </div>

      {/* Main Content List */}
      <div 
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 16px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Intro text */}
        <p 
          style={{ 
            fontSize: '13px', 
            color: '#475569', 
            lineHeight: 1.45,
            margin: '4px 0 10px',
            padding: '0 4px'
          }}
        >
          Your privacy is important to us. This Privacy Policy explains how Dr ILA Kids Wellbeing collects, uses, and protects your information while using the KidCare app.
        </p>

        {/* 5 White Rounded Cards */}
        {POLICY_SECTIONS.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <h4 
              style={{ 
                fontSize: '14.5px', 
                fontWeight: '700', 
                color: '#1E293B', 
                margin: '0 0 6px 0',
                lineHeight: 1.3 
              }}
            >
              {section.title}
            </h4>
            <p 
              style={{ 
                fontSize: '13px', 
                color: '#475569', 
                margin: 0,
                lineHeight: 1.45 
              }}
            >
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
