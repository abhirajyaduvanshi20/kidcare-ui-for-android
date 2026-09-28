import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  PhoneCall, 
  Trash2, 
  RotateCcw,
  CalendarPlus,
  Share2,
  Phone
} from 'lucide-react';

export const AppointmentDetailModal = () => {
  const { closeModal, modalData, cancelAppointment, openModal, showToast } = useApp();
  const [showCallPrompt, setShowCallPrompt] = useState(false);

  if (!modalData) return null;
  const apt = modalData;
  const isUpcoming = apt.type === 'UPCOMING';
  const isFollowUp = apt.type === 'FOLLOW_UP';
  const canJoin = isUpcoming || isFollowUp;

  const handleExportCalendar = () => {
    // Generate .ics calendar download / trigger
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KidCare Pediatrics//EN
BEGIN:VEVENT
SUMMARY:Doctor Consultation with ${apt.doctor} for ${apt.kidName}
DESCRIPTION:Pediatric Consultation (${apt.mode}) - Token: ${apt.bookingCode}\\nNotes: ${apt.notes || 'Routine check'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `KidCare_Appointment_${apt.bookingCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast({ text: "📅 Appointment added to your device Calendar!", type: 'celebrate' });
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '92%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: isFollowUp ? '#047857' : '#056DB4', textTransform: 'uppercase' }}>
              Token: {apt.bookingCode} {isFollowUp && '• Follow-Up'}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>
              {isFollowUp ? 'Follow-Up Consultation' : 'Appointment Details'}
            </h3>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Doctor Info Card */}
          <div style={{
            background: isFollowUp 
              ? 'linear-gradient(135deg, #047857 0%, #012741 100%)' 
              : 'linear-gradient(135deg, #056DB4 0%, #012741 100%)',
            borderRadius: '20px',
            padding: '16px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: isFollowUp ? '0 6px 20px rgba(4, 120, 87, 0.25)' : '0 6px 20px rgba(5, 109, 180, 0.25)'
          }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.8)', flexShrink: 0 }}>
              <img src={apt.doctorAvatar || "/assets/dr_ila_b.png"} alt={apt.doctor} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '800' }}>{apt.doctor}</h4>
              <p style={{ fontSize: '12px', color: '#53BF9D', fontWeight: '700' }}>{apt.specialty}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>{apt.hospital}</p>
            </div>
          </div>

          {/* Follow-up Note banner */}
          {apt.followUpReason && (
            <div style={{
              background: '#F0FDF4',
              border: '1.5px solid #BBF7D0',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <RotateCcw size={18} color="#047857" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#065F46' }}>
                  Follow-Up Review Target
                </h5>
                <p style={{ fontSize: '11.5px', color: '#047857', marginTop: '2px' }}>
                  {apt.followUpReason}
                </p>
                {apt.notes && (
                  <p style={{ fontSize: '11.5px', color: '#166534', marginTop: '4px', fontStyle: 'italic' }}>
                    "{apt.notes}"
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Timing & Child */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '16px',
            padding: '14px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '12.5px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Child:</span>
              <strong style={{ color: '#012741' }}>{apt.kidName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Scheduled:</span>
              <strong style={{ color: '#056DB4' }}>{apt.timestamp}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Consultation Mode:</span>
              <strong style={{ color: '#53BF9D' }}>{apt.mode}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Status:</span>
              <strong style={{ color: (isUpcoming || isFollowUp) ? '#3AA17E' : '#64748B' }}>{apt.status}</strong>
            </div>
          </div>

          {/* Symptoms Recorded */}
          {apt.symptoms && apt.symptoms.length > 0 && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Symptoms & Clinical Discussion Focus
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {apt.symptoms.map((s, i) => (
                  <span key={i} style={{ background: '#EBF4FA', color: '#056DB4', padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Utility Actions (Calendar & Clinic Call) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={handleExportCalendar}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '10px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#056DB4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <CalendarPlus size={15} /> Add to Calendar
            </button>

            <button
              onClick={() => {
                showToast({ text: "📞 Dialing KidCare Clinic Reception (+91 800-KID-CARE)...", type: 'info' });
              }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '10px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Phone size={15} /> Call Clinic Desk
            </button>
          </div>

          {/* Notes & Pre checkup */}
          {apt.guidelines && (
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '14px', padding: '12px' }}>
              <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#065F46', marginBottom: '6px' }}>Pre-Check-Up Instructions</h5>
              <ul style={{ paddingLeft: '18px', fontSize: '11.5px', color: '#047857', lineHeight: 1.5 }}>
                {apt.guidelines.map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            {canJoin && (
              <button
                onClick={() => {
                  closeModal();
                  openModal('live-consultation', apt);
                }}
                className="btn-green"
                style={{ width: '100%', padding: '14px', borderRadius: '16px', fontWeight: '800' }}
              >
                <Video size={18} /> {isFollowUp ? 'Join Follow-Up Video Call' : 'Join Live Video Consultation'}
              </button>
            )}

            {canJoin && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    closeModal();
                    openModal('new-appointment', { isFollowUp: isFollowUp, prefillDate: apt.date });
                  }}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '11px', borderRadius: '14px', fontSize: '12px', fontWeight: '700' }}
                >
                  <RotateCcw size={14} /> Reschedule
                </button>

                <button
                  onClick={() => {
                    cancelAppointment(apt.id);
                    closeModal();
                  }}
                  style={{
                    background: '#FDE8EC',
                    border: 'none',
                    color: '#F94C66',
                    padding: '11px 16px',
                    borderRadius: '14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                >
                  <Trash2 size={14} /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


