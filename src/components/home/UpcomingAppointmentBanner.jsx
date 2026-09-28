import React from 'react';
import { useApp } from '../../context/AppContext';
import { Video, Calendar, Clock, ChevronRight, UserCheck, RotateCcw } from 'lucide-react';

export const UpcomingAppointmentBanner = () => {
  const { appointments, currentKid, openModal } = useApp();

  const upcomingApt = appointments.find(a => (a.type === 'UPCOMING' || a.type === 'FOLLOW_UP') && a.kidId === currentKid.id) || 
                      appointments.find(a => a.type === 'UPCOMING' || a.type === 'FOLLOW_UP');

  if (!upcomingApt) return null;
  const isFollowUp = upcomingApt.type === 'FOLLOW_UP';

  return (
    <div style={{ padding: '4px 18px 12px' }}>
      <div 
        style={{
          background: isFollowUp 
            ? 'linear-gradient(135deg, #012741 0%, #047857 100%)' 
            : 'linear-gradient(135deg, #012741 0%, #056DB4 100%)',
          borderRadius: '22px',
          padding: '16px 18px',
          color: '#FFFFFF',
          boxShadow: isFollowUp ? '0 8px 24px rgba(4, 120, 87, 0.3)' : '0 8px 24px rgba(5, 109, 180, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#53BF9D',
              boxShadow: '0 0 8px #53BF9D'
            }} />
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#53BF9D' }}>
              {isFollowUp ? 'Scheduled Follow-Up' : 'Upcoming Consultation'}
            </span>
          </div>

          <span style={{
            fontSize: '11px',
            background: 'rgba(255,255,255,0.18)',
            padding: '2px 8px',
            borderRadius: '10px',
            fontWeight: '600'
          }}>
            {upcomingApt.bookingCode}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.8)',
            flexShrink: 0
          }}>
            <img 
              src={upcomingApt.doctorAvatar || "/assets/dr_ila_b.png"} 
              alt={upcomingApt.doctor}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '800' }}>{upcomingApt.doctor}</h4>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
              {upcomingApt.mode} • {upcomingApt.timestamp}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => openModal('live-consultation', upcomingApt)}
            className="btn-green"
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '14px',
              fontSize: '13px',
              fontWeight: '700'
            }}
          >
            <Video size={16} /> {isFollowUp ? 'Join Follow-Up Call' : 'Join Consultation'}
          </button>

          <button
            onClick={() => openModal('appointment-detail', upcomingApt)}
            style={{
              background: 'rgba(255,255,255,0.16)',
              border: 'none',
              borderRadius: '14px',
              padding: '10px 14px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Details <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

