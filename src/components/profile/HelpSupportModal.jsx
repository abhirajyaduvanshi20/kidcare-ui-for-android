import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, Mail, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export const HelpSupportModal = () => {
  const { closeModal, showToast } = useApp();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setSubmitted(true);
    showToast("Support ticket raised successfully! Our team will respond shortly.");
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90%', display: 'flex', flexDirection: 'column' }}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>24/7 Pediatric Support</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Help desk & urgent clinic helpline</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Quick Helpline Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <a
              href="tel:+918001234567"
              style={{
                textDecoration: 'none',
                background: '#EBF4FA',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                border: '1px solid #BAE6FD'
              }}
            >
              <Phone size={20} color="#056DB4" />
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '800', color: '#012741' }}>Emergency Helpline</h5>
                <p style={{ fontSize: '11px', color: '#056DB4', fontWeight: '700' }}>1800-123-4567</p>
              </div>
            </a>

            <a
              href="mailto:care@kidcareapp.com"
              style={{
                textDecoration: 'none',
                background: '#E8F8F3',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                border: '1px solid #A7F3D0'
              }}
            >
              <Mail size={20} color="#3AA17E" />
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '800', color: '#012741' }}>Email Clinical Desk</h5>
                <p style={{ fontSize: '11px', color: '#3AA17E', fontWeight: '700' }}>care@kidcareapp.com</p>
              </div>
            </a>
          </div>

          {/* Raise Support Ticket Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#012741', marginBottom: '8px' }}>
              Raise a Support Query / Ticket
            </h4>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '16px', background: '#F0FDF4', borderRadius: '12px', border: '1px solid #86EFAC' }}>
                <CheckCircle2 size={32} color="#166534" style={{ margin: '0 auto 6px' }} />
                <h5 style={{ fontSize: '14px', fontWeight: '800', color: '#166534' }}>Ticket Received!</h5>
                <p style={{ fontSize: '12px', color: '#15803D', marginTop: '2px' }}>
                  A pediatrician care representative will connect with you in 15-30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <input
                    type="text"
                    placeholder="Subject (e.g. Video call audio issue, Vaccination record update)"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Describe your issue or question in detail..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px', resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', borderRadius: '14px', fontSize: '13px' }}
                >
                  <Send size={15} /> Submit Support Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
