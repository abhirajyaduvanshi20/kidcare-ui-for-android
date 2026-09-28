import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

export const PrivacyPolicyModal = () => {
  const { closeModal } = useApp();

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '88%', display: 'flex', flexDirection: 'column' }}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Privacy Policy & Terms</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Healthcare data security & consent</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', fontSize: '12.5px', color: '#334155', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
          <div style={{ background: '#E8F8F3', padding: '12px 14px', borderRadius: '14px', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#047857" />
            <span style={{ fontSize: '12px', color: '#065F46', fontWeight: '700' }}>
              HIPAA Compliant & End-to-End Encrypted Health Records
            </span>
          </div>

          <section>
            <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#012741', marginBottom: '4px' }}>
              1. Child Health Data Protection
            </h4>
            <p>
              KidCare is committed to protecting the privacy of minors and parents. All growth charts, vaccination batch numbers, and medical consultation notes are stored in an encrypted vault compliant with digital healthcare guidelines.
            </p>
          </section>

          <section>
            <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#012741', marginBottom: '4px' }}>
              2. Doctor Consultation & Flips
            </h4>
            <p>
              Flip queries and live video consultations are conducted directly with verified pediatricians (Dr. Ila B and clinical associates). Medical opinions provided on Flips are based on parent-reported symptoms and digital attachments.
            </p>
          </section>

          <section>
            <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#012741', marginBottom: '4px' }}>
              3. Data Retention & Sharing
            </h4>
            <p>
              Your child's health records are never sold to third parties or advertisers. Records are only accessed by your consulting pediatric team to provide continuum of care.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
