import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarPlus, Video, MapPin, Clock, Calendar, ChevronRight, CheckCircle2, AlertCircle, XCircle, RotateCcw, Stethoscope, Sparkles, FileText } from 'lucide-react';

export const AppointmentsScreen = () => {
  const { appointments, currentKid, openModal } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('UPCOMING'); // 'UPCOMING' | 'FOLLOW_UP' | 'COMPLETED' | 'CANCELLED'

  const followUpCount = appointments.filter(apt => apt.type === 'FOLLOW_UP' && (apt.kidId === currentKid.id || true)).length;

  const filteredAppointments = appointments.filter(apt => {
    return apt.type === selectedFilter && (apt.kidId === currentKid.id || selectedFilter !== 'UPCOMING');
  });

  const filterTabs = [
    { key: 'UPCOMING', label: 'Upcoming' },
    { key: 'FOLLOW_UP', label: 'Follow-Up', badge: followUpCount > 0 ? followUpCount : null },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'CANCELLED', label: 'Cancelled' }
  ];

  return (
    <div className="screen-scroll-container">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #056DB4 0%, #012741 100%)',
        padding: '20px 18px 24px',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Doctor Appointments</h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
              Consultations & Follow-ups for {currentKid.name}
            </p>
          </div>

          <button
            onClick={() => openModal('new-appointment')}
            className="btn-green"
            style={{ padding: '8px 14px', borderRadius: '14px', fontSize: '12px', fontWeight: '700' }}
          >
            <CalendarPlus size={15} /> Book Visit
          </button>
        </div>

        {/* Filter Segmented Control with 4 tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'rgba(0,0,0,0.25)',
          padding: '4px',
          borderRadius: '16px',
          backdropFilter: 'blur(8px)',
          gap: '2px'
        }}>
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedFilter(tab.key)}
                style={{
                  padding: '8px 4px',
                  border: 'none',
                  borderRadius: '12px',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#056DB4' : 'rgba(255,255,255,0.85)',
                  fontWeight: isActive ? '800' : '600',
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span style={{
                    background: isActive ? '#056DB4' : '#53BF9D',
                    color: '#FFFFFF',
                    fontSize: '9.5px',
                    fontWeight: '800',
                    padding: '1px 5px',
                    borderRadius: '8px'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '16px 18px 40px' }}>
        {/* Appointment Cards Stream */}
        {filteredAppointments.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '22px',
            padding: '32px 20px',
            textAlign: 'center',
            border: '1px dashed #CBD5E1',
            boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
          }}>
            <Calendar size={36} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#012741' }}>
              No {selectedFilter === 'FOLLOW_UP' ? 'follow-up' : selectedFilter.toLowerCase()} appointments
            </h4>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', marginBottom: '16px' }}>
              {selectedFilter === 'FOLLOW_UP' 
                ? 'No pending follow-up visits requested for this child.' 
                : 'Schedule a pediatric visit or routine checkup with Dr. Ila B.'}
            </p>
            <button
              onClick={() => openModal('new-appointment', selectedFilter === 'FOLLOW_UP' ? { isFollowUp: true } : null)}
              className="btn-primary"
              style={{ padding: '10px 18px', borderRadius: '14px', fontSize: '13px' }}
            >
              <CalendarPlus size={15} /> {selectedFilter === 'FOLLOW_UP' ? 'Request Follow-up Slot' : 'Book Appointment'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredAppointments.map((apt) => {
              const isUpcoming = apt.type === 'UPCOMING';
              const isFollowUp = apt.type === 'FOLLOW_UP';
              const isCompleted = apt.type === 'COMPLETED';

              return (
                <div
                  key={apt.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '22px',
                    padding: '16px',
                    border: isFollowUp ? '1.5px solid #A7F3D0' : '1px solid #EEF2F6',
                    boxShadow: isFollowUp ? '0 6px 18px rgba(83, 191, 157, 0.12)' : '0 4px 16px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  {/* Doctor Info & Status */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: '2px solid #E2E8F0',
                        flexShrink: 0
                      }}>
                        <img 
                          src={apt.doctorAvatar || "/assets/dr_ila_b.png"} 
                          alt={apt.doctor}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#012741' }}>{apt.doctor}</h4>
                          {isFollowUp && (
                            <span style={{
                              background: '#E8F8F3',
                              color: '#047857',
                              fontSize: '10px',
                              fontWeight: '800',
                              padding: '2px 6px',
                              borderRadius: '6px'
                            }}>
                              FOLLOW-UP
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '11px', color: '#056DB4', fontWeight: '600' }}>{apt.specialty}</p>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      background: isUpcoming ? '#E8F8F3' : isFollowUp ? '#E6FFFA' : isCompleted ? '#EBF4FA' : '#FDE8EC',
                      color: isUpcoming ? '#3AA17E' : isFollowUp ? '#0D9488' : isCompleted ? '#056DB4' : '#F94C66'
                    }}>
                      {apt.status}
                    </span>
                  </div>

                  {/* Follow-up Reason & Previous Ref if applicable */}
                  {apt.followUpReason && (
                    <div style={{
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: '12px',
                      padding: '8px 12px',
                      fontSize: '11.5px',
                      color: '#166534',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <RotateCcw size={13} color="#166534" />
                      <span><strong>Follow-up Goal:</strong> {apt.followUpReason}</span>
                    </div>
                  )}

                  {/* Date, Time & Mode info box */}
                  <div style={{
                    background: '#F8FAFC',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#334155'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="#056DB4" />
                      <strong style={{ color: '#012741' }}>{apt.timestamp}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B' }}>
                      {apt.mode.includes('Video') ? <Video size={14} color="#53BF9D" /> : <MapPin size={14} color="#F7931E" />}
                      <span>{apt.mode.includes('Video') ? 'Online Video' : 'In-Clinic'}</span>
                    </div>
                  </div>

                  {/* Symptoms list */}
                  {apt.symptoms && apt.symptoms.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {apt.symptoms.map((sym, i) => (
                        <span key={i} style={{
                          fontSize: '11px',
                          background: '#F1F5F9',
                          color: '#475569',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontWeight: '600'
                        }}>
                          {sym}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                    {(isUpcoming || isFollowUp) && (
                      <button
                        onClick={() => openModal('live-consultation', apt)}
                        className="btn-green"
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '14px', fontSize: '13px', fontWeight: '700' }}
                      >
                        <Video size={16} /> {isFollowUp ? 'Join Follow-Up Call' : 'Join Video Call'}
                      </button>
                    )}

                    <button
                      onClick={() => openModal('appointment-detail', apt)}
                      style={{
                        flex: (isUpcoming || isFollowUp) ? 0.6 : 1,
                        background: '#F1F5F9',
                        border: 'none',
                        borderRadius: '14px',
                        padding: '10px',
                        color: '#334155',
                        fontSize: '12px',
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
  );
};

