import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  Video, 
  MapPin, 
  ChevronRight, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  Calendar
} from 'lucide-react';

// Pixel-perfect Double Clipboard Empty State Illustration from Android App
const ClipboardEmptyIllustration = () => (
  <svg 
    width="160" 
    height="160" 
    viewBox="0 0 160 160" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ margin: '0 auto 16px' }}
  >
    {/* Back Clipboard (Tilted left with dashed border) */}
    <g transform="rotate(-12 70 80)">
      {/* Board */}
      <rect x="34" y="25" width="72" height="100" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Top Blue Clip */}
      <rect x="55" y="18" width="30" height="14" rx="3" fill="#0077D7" />
      <circle cx="70" cy="22" r="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    </g>

    {/* Front Clipboard (Centered) */}
    <g>
      {/* Board */}
      <rect x="44" y="32" width="76" height="104" rx="8" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.8" />
      {/* Light Grey Note Sheet inside */}
      <rect x="52" y="45" width="60" height="82" rx="4" fill="#E2E8F0" />
      {/* Top Blue Clip */}
      <rect x="64" y="24" width="36" height="15" rx="3" fill="#0077D7" />
      <circle cx="82" cy="29" r="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    </g>
  </svg>
);

export const AppointmentsScreen = () => {
  const { appointments, currentKid, openModal } = useApp();
  const [activeTab, setActiveTab] = useState('Upcoming'); // 'Upcoming' | 'Completed' | 'Cancelled'

  const tabs = ['Upcoming', 'Completed', 'Cancelled'];

  // Filter appointments for current kid and selected tab
  const kidAppointments = appointments.filter(apt => {
    const matchesKid = apt.kidId === currentKid?.id || !apt.kidId;
    if (!matchesKid) return false;

    if (activeTab === 'Upcoming') {
      return apt.type === 'UPCOMING' || apt.type === 'FOLLOW_UP';
    }
    if (activeTab === 'Completed') {
      return apt.type === 'COMPLETED';
    }
    if (activeTab === 'Cancelled') {
      return apt.type === 'CANCELLED';
    }
    return false;
  });

  return (
    <div 
      style={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        background: '#FFFFFF'
      }}
    >
      {/* Scrollable Container */}
      <div 
        className="screen-scroll-container" 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          background: '#FFFFFF',
          paddingBottom: '85px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* 1. Child Info Row: Avatar + Name (Sourav Mishra / currentKid.name) */}
        <div 
          style={{
            padding: '16px 16px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: '#FFFFFF'
          }}
        >
          <button
            onClick={() => openModal('kid-selector')}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
              overflow: 'hidden',
              flexShrink: 0
            }}
            title="Switch Kid"
          >
            {currentKid?.photo ? (
              <img 
                src={currentKid.photo} 
                alt={currentKid.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#F1F5F9' }} />
            )}
          </button>

          <div style={{ flex: 1 }}>
            <h2 
              style={{ 
                fontSize: '17.5px', 
                fontWeight: '700', 
                color: '#1E293B',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              {currentKid?.name || 'Sourav Mishra'}
            </h2>
          </div>
        </div>

        {/* 2. Three Clean Underline Tabs (Upcoming | Completed | Cancelled) */}
        <div 
          style={{
            display: 'flex',
            borderBottom: '1px solid #CBD5E1',
            background: '#FFFFFF'
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '12px 6px',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #056DB5' : '3px solid transparent',
                  color: '#056DB5',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '600',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                  outline: 'none'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 3. Main Content: Empty State OR Appointments Stream */}
        <div style={{ flex: 1, padding: '24px 16px 20px', display: 'flex', flexDirection: 'column' }}>
          
          {kidAppointments.length === 0 ? (
            /* Empty State Matching Exact Screenshots */
            <div 
              style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 16px 20px'
              }}
            >
              <ClipboardEmptyIllustration />

              <h3 
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '800', 
                  color: '#1E293B', 
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.2px' 
                }}
              >
                No appointments.
              </h3>

              <p 
                style={{ 
                  fontSize: '13.5px', 
                  color: '#334155', 
                  margin: 0,
                  maxWidth: '280px',
                  lineHeight: 1.4,
                  fontWeight: '500'
                }}
              >
                {activeTab === 'Upcoming' && "You don't have a doctor's appointment scheduled at the moment."}
                {activeTab === 'Completed' && "No Completed Appointments"}
                {activeTab === 'Cancelled' && "No Cancelled Appointments"}
              </p>
            </div>
          ) : (
            /* Appointments Card List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {kidAppointments.map((apt) => {
                const isUpcoming = apt.type === 'UPCOMING';
                const isFollowUp = apt.type === 'FOLLOW_UP';
                const isCompleted = apt.type === 'COMPLETED';
                const isCancelled = apt.type === 'CANCELLED';

                return (
                  <div
                    key={apt.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '18px',
                      padding: '14px 16px',
                      border: isFollowUp ? '1.5px solid #A7F3D0' : '1px solid #E2E8F0',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    {/* Doctor Info Row & Status Tag */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '1.5px solid #CBD5E1',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={apt.doctorAvatar || "/assets/dr_ila_b.png"} 
                            alt={apt.doctor || "Doctor"}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/assets/nurse.png';
                            }}
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', margin: 0 }}>
                              {apt.doctor || 'Dr. Ila Binaykia'}
                            </h4>
                            {isFollowUp && (
                              <span 
                                style={{
                                  background: '#E8F8F3',
                                  color: '#047857',
                                  fontSize: '9.5px',
                                  fontWeight: '800',
                                  padding: '2px 6px',
                                  borderRadius: '6px'
                                }}
                              >
                                FOLLOW-UP
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '12px', color: '#056DB5', margin: '2px 0 0 0', fontWeight: '600' }}>
                            {apt.specialty || 'Senior Pediatrician'}
                          </p>
                        </div>
                      </div>

                      <span 
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          background: isUpcoming ? '#E8F8F3' : isFollowUp ? '#E6FFFA' : isCompleted ? '#EBF4FA' : '#FDE8EC',
                          color: isUpcoming ? '#3AA17E' : isFollowUp ? '#0D9488' : isCompleted ? '#056DB5' : '#F94C66'
                        }}
                      >
                        {apt.status || (isUpcoming ? 'Confirmed' : isCompleted ? 'Completed' : 'Cancelled')}
                      </span>
                    </div>

                    {/* Follow-up Note */}
                    {apt.followUpReason && (
                      <div 
                        style={{
                          background: '#F0FDF4',
                          border: '1px solid #BBF7D0',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '11.5px',
                          color: '#166534',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <RotateCcw size={13} color="#166534" />
                        <span><strong>Follow-up Goal:</strong> {apt.followUpReason}</span>
                      </div>
                    )}

                    {/* Date, Time & Consultation Mode */}
                    <div 
                      style={{
                        background: '#F8FAFC',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#334155'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="#056DB5" />
                        <strong style={{ color: '#0F172A' }}>{apt.timestamp || `${apt.date}, ${apt.time}`}</strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B' }}>
                        {apt.mode?.includes('Video') ? <Video size={14} color="#53BF9D" /> : <MapPin size={14} color="#F7931E" />}
                        <span>{apt.mode?.includes('Video') ? 'Online Video' : 'In-Clinic'}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                      {(isUpcoming || isFollowUp) && apt.mode?.includes('Video') && (
                        <button
                          onClick={() => openModal('live-consultation', apt)}
                          className="btn-primary"
                          style={{ flex: 1, padding: '9px 12px', borderRadius: '12px', fontSize: '12.5px', fontWeight: '700' }}
                        >
                          <Video size={15} /> Join Video Call
                        </button>
                      )}

                      <button
                        onClick={() => openModal('appointment-detail', apt)}
                        style={{
                          flex: (isUpcoming || isFollowUp) && apt.mode?.includes('Video') ? 0.6 : 1,
                          background: '#F1F5F9',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '9px 12px',
                          color: '#056DB5',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* 4. Bottom Fixed Action Button: "New Appointment" */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px',
          background: 'linear-gradient(to top, #FFFFFF 90%, rgba(255,255,255,0))',
          zIndex: 30
        }}
      >
        <button
          onClick={() => openModal('new-appointment')}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: '24px',
            border: 'none',
            background: '#0077D7',
            color: '#FFFFFF',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 119, 215, 0.35)',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          New Appointment
        </button>
      </div>

    </div>
  );
};
