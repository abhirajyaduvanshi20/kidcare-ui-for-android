import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_LIST = [
  {
    question: "How do I book an appointment for my child?",
    answer: "Tap the appointment calendar icon in the top bar or go to the 'Appoint' tab to select your preferred date, time, and consultation mode."
  },
  {
    question: "What is DND (Do Not Disturb) in Call Preferences?",
    answer: "Enabling DND pauses non-urgent incoming calls from our CarePartner team while keeping urgent health alerts and appointment reminders active."
  },
  {
    question: "Where can I see my child's prescriptions?",
    answer: "Navigate to the 'Pres' tab to view doctor prescriptions, pathology lab reports, and radiology scans with download options."
  },
  {
    question: "Can I manage multiple children in one account?",
    answer: "Yes, tap the child profile icon on the top left of any screen to switch between your children or add a new child profile."
  },
  {
    question: "How do I update my child's vaccination records?",
    answer: "Open the Vaccination tracker from the Home screen or Child Profile to mark administered doses and upload vaccination certificates."
  },
  {
    question: "Why should I update my child's growth chart?",
    answer: "Regularly logging height, weight, and head circumference helps Dr. Ila B track your child's percentile curves according to WHO standards."
  }
];

export const FaqModal = () => {
  const { closeModal } = useApp();
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

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
          FAQs
        </h2>

        <div style={{ width: '24px' }} />
      </div>

      {/* FAQs Accordion Cards List */}
      <div 
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 16px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {FAQ_LIST.map((faq, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              style={{
                background: '#ECEFF5',
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              <div
                onClick={() => toggleAccordion(idx)}
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#1E293B',
                    margin: 0,
                    lineHeight: 1.35
                  }}
                >
                  {faq.question}
                </h4>

                <div style={{ color: '#475569', flexShrink: 0 }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isExpanded && (
                <div 
                  style={{ 
                    padding: '0 18px 16px', 
                    fontSize: '13px', 
                    color: '#475569', 
                    lineHeight: 1.5 
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
