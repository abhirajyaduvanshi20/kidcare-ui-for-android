import React from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, AlertTriangle, ThumbsUp, Calendar, ArrowRight, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export const FlipCardSection = () => {
  const { flips, currentKid, openModal } = useApp();

  const flipTypes = [
    {
      type: 'ASK_QUESTION',
      title: 'Ask a Question',
      icon: HelpCircle,
      colors: ['#1E73B8', '#0F5FA5'],
      gradient: 'linear-gradient(135deg, #1E73B8 0%, #0F5FA5 100%)',
      desc: 'Non-urgent doctor query'
    },
    {
      type: 'EMERGENCY',
      title: 'Emergency',
      icon: AlertTriangle,
      colors: ['#F7931E', '#E36A00'],
      gradient: 'linear-gradient(135deg, #F7931E 0%, #E36A00 100%)',
      desc: 'Priority urgent symptom'
    },
    {
      type: 'FEEDBACK',
      title: 'Feedback Flip',
      icon: ThumbsUp,
      colors: ['#B24592', '#8E2DE2'],
      gradient: 'linear-gradient(135deg, #B24592 0%, #8E2DE2 100%)',
      desc: 'Treatment response'
    },
    {
      type: 'ROUTINE_CHECK',
      title: 'Routine Update',
      icon: Calendar,
      colors: ['#5BBF9B', '#3AA17E'],
      gradient: 'linear-gradient(135deg, #5BBF9B 0%, #3AA17E 100%)',
      desc: 'Milestones & habits'
    }
  ];

  const kidFlips = flips.filter(f => f.kidId === currentKid.id);

  return (
    <div style={{ padding: '10px 18px 16px' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#012741' }}>Instant Flip Consultations</h3>
          <p style={{ fontSize: '11px', color: '#64748B' }}>Direct doctor query cards with quick response</p>
        </div>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#056DB4', background: '#EBF4FA', padding: '3px 8px', borderRadius: '10px' }}>
          4 Types
        </span>
      </div>

      {/* 4 Flip Type Action Buttons (Matching Android rounded gradient cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {flipTypes.map((ft) => {
          const IconComp = ft.icon;
          return (
            <div
              key={ft.type}
              onClick={() => openModal('create-flip', { type: ft.type })}
              style={{
                background: ft.gradient,
                borderRadius: '20px',
                padding: '12px 14px',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <IconComp size={18} color="#FFFFFF" />
              </div>

              <div style={{ overflow: 'hidden' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ft.title}
                </h4>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ft.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Flips Stream */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Active Flips for {currentKid.name.split(' ')[0]}</h4>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>{kidFlips.length} total</span>
        </div>

        {kidFlips.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', textAlign: 'center', border: '1px dashed #CBD5E1' }}>
            <p style={{ fontSize: '12px', color: '#64748B' }}>No flips sent yet. Tap any button above to ask Dr. Ila B a question!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {kidFlips.map((flip) => {
              const isAnswered = flip.status === 'Answered';
              return (
                <div
                  key={flip.id}
                  onClick={() => openModal('flip-detail', flip)}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#056DB4';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      background: flip.type === 'EMERGENCY' ? '#FFF2E6' : flip.type === 'FEEDBACK' ? '#F6ECFB' : '#EBF4FA',
                      color: flip.type === 'EMERGENCY' ? '#E36A00' : flip.type === 'FEEDBACK' ? '#8E2DE2' : '#056DB4',
                      textTransform: 'uppercase'
                    }}>
                      {flip.type.replace('_', ' ')}
                    </span>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: flip.statusColor || '#53BF9D',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {isAnswered ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {flip.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#012741', lineHeight: 1.3, marginBottom: '4px' }}>
                    {flip.title}
                  </h4>

                  <p style={{ fontSize: '12px', color: '#64748B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {flip.description}
                  </p>

                  {flip.doctorReply && (
                    <div style={{
                      marginTop: '10px',
                      background: '#F8FAFC',
                      borderLeft: '3px solid #53BF9D',
                      padding: '8px 10px',
                      borderRadius: '4px 8px 8px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <img 
                        src={flip.doctorReply.doctorAvatar || "/assets/dr_ila_b.png"} 
                        alt="Doctor"
                        style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <p style={{ fontSize: '11px', color: '#334155', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <strong style={{ color: '#012741' }}>{flip.doctorReply.doctorName}:</strong> {flip.doctorReply.text}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
