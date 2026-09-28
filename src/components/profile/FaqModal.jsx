import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQS } from '../../data/initialData';
import { X, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqModal = () => {
  const { closeModal } = useApp();
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '88%', display: 'flex', flexDirection: 'column' }}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Frequently Asked Questions</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Everything about KidCare app & consultations</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  border: isExpanded ? '1.5px solid #056DB4' : '1px solid #E2E8F0',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: isExpanded ? '#056DB4' : '#012741' }}>
                    {faq.question}
                  </h4>
                  {isExpanded ? <ChevronUp size={16} color="#056DB4" /> : <ChevronDown size={16} color="#64748B" />}
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 16px 14px', fontSize: '12.5px', color: '#475569', lineHeight: 1.5, borderTop: '1px solid #EEF2F6', paddingTop: '10px' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
