import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Clock, Send, Paperclip, MessageCircle, AlertCircle, Share2, Shield } from 'lucide-react';

export const FlipDetailModal = () => {
  const { closeModal, modalData, currentKid } = useApp();
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);

  if (!modalData) return null;

  const flip = modalData;

  const handleSendFollowUp = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplies(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Parent',
        text: replyText,
        time: 'Just now'
      }
    ]);
    setReplyText('');
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '94%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="sheet-handle" />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '8px',
              background: flip.type === 'EMERGENCY' ? '#FFF2E6' : '#EBF4FA',
              color: flip.type === 'EMERGENCY' ? '#E36A00' : '#056DB4',
              textTransform: 'uppercase'
            }}>
              {flip.type.replace('_', ' ')}
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              • {new Date(flip.createdDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Scrollable Conversation Content */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px' }}>
          {/* Query Question Box */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '18px',
            padding: '16px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#056DB4', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                  {flip.kidName ? flip.kidName[0] : 'K'}
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#012741' }}>{flip.kidName} (Parent Query)</h4>
                </div>
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: flip.statusColor || '#53BF9D',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle size={13} /> {flip.status}
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#012741', lineHeight: 1.3, marginBottom: '6px' }}>
              {flip.title}
            </h3>

            <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
              {flip.description}
            </p>

            {/* Attachments */}
            {flip.attachments && flip.attachments.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>
                  Attached Documents & Images:
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {flip.attachments.map((att, i) => (
                    <div key={i} style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid #CBD5E1',
                      width: '90px',
                      height: '70px',
                      background: '#FFFFFF'
                    }}>
                      <img 
                        src={att.url || "/assets/ss.png"} 
                        alt="attachment"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Doctor Verified Response */}
          {flip.doctorReply ? (
            <div style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
              borderRadius: '18px',
              padding: '16px',
              border: '1.5px solid #86EFAC',
              boxShadow: '0 4px 14px rgba(83, 191, 157, 0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #53BF9D'
                }}>
                  <img 
                    src={flip.doctorReply.doctorAvatar || "/assets/dr_ila_b.png"} 
                    alt={flip.doctorReply.doctorName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#065F46' }}>
                      {flip.doctorReply.doctorName}
                    </h4>
                    <span style={{
                      background: '#10B981',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: '800',
                      padding: '1px 6px',
                      borderRadius: '10px'
                    }}>
                      VERIFIED DOCTOR
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#047857' }}>{flip.doctorReply.doctorRole} • {new Date(flip.doctorReply.replyDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>

              <p style={{ fontSize: '13.5px', color: '#064E3B', lineHeight: 1.5, fontWeight: '500' }}>
                {flip.doctorReply.text}
              </p>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#047857' }}>
                <Shield size={13} />
                <span>Digitally signed & verified by KidCare Pediatric Clinical Team</span>
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFBEB', border: '1px dashed #F59E0B', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
              <Clock size={20} color="#D97706" style={{ margin: '0 auto 6px' }} />
              <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#92400E' }}>Awaiting Doctor's Review</h5>
              <p style={{ fontSize: '11.5px', color: '#B45309', marginTop: '2px' }}>
                Dr. Ila B usually replies within 2-4 hours for non-emergency flips.
              </p>
            </div>
          )}

          {/* Follow-up comments stream */}
          {replies.map((rep) => (
            <div key={rep.id} style={{
              background: '#EBF4FA',
              border: '1px solid #BAE6FD',
              borderRadius: '14px',
              padding: '10px 14px',
              alignSelf: 'flex-end',
              maxWidth: '85%'
            }}>
              <span style={{ fontSize: '10px', color: '#056DB4', fontWeight: '700' }}>You ({rep.time})</span>
              <p style={{ fontSize: '13px', color: '#012741', marginTop: '2px' }}>{rep.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom Follow-up Input */}
        <form onSubmit={handleSendFollowUp} style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Type follow-up note for doctor..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: '14px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0 16px', borderRadius: '14px' }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
