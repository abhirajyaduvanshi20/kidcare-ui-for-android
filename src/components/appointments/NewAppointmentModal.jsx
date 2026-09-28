import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SYMPTOMS_LIST } from '../../data/initialData';
import { X, ChevronRight, ChevronLeft, Calendar, Clock, Video, MapPin, Check, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NewAppointmentModal = () => {
  const { closeModal, currentKid, bookAppointment, modalData } = useApp();

  const [isFollowUp, setIsFollowUp] = useState(() => modalData?.isFollowUp || false);
  const [step, setStep] = useState(1); // 1: Child & Mode -> 2: Symptoms -> 3: Date & Slot -> 4: Confirmed
  const [consultMode, setConsultMode] = useState('Online Video Consultation');
  const [followUpReason, setFollowUpReason] = useState('Post-Treatment Clinical Review & Progress Check');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Fever / High Temperature']);
  const [customSymptom, setCustomSymptom] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-09-28');
  const [selectedTime, setSelectedTime] = useState('03:00 PM');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const timeSlots = [
    { slot: '09:30 AM', period: 'Morning' },
    { slot: '11:00 AM', period: 'Morning' },
    { slot: '03:00 PM', period: 'Afternoon' },
    { slot: '04:30 PM', period: 'Afternoon' },
    { slot: '06:00 PM', period: 'Evening' },
    { slot: '07:15 PM', period: 'Evening' }
  ];

  const followUpReasonsList = [
    'Post-Treatment Clinical Review & Progress Check',
    'Post-Viral Fever Recovery & Lung Sound Check',
    'Skin Eczema / Allergy Response Evaluation',
    'Antibiotic / Medication Course Completion Check',
    'Routine Growth & Nutrition Progress Check'
  ];

  const toggleSymptom = (symName) => {
    if (selectedSymptoms.includes(symName)) {
      setSelectedSymptoms(prev => prev.filter(s => s !== symName));
    } else {
      setSelectedSymptoms(prev => [...prev, symName]);
    }
  };

  const handleAddCustomSymptom = (e) => {
    e.preventDefault();
    if (!customSymptom.trim()) return;
    if (!selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
    }
    setCustomSymptom('');
  };

  const handleConfirmBooking = () => {
    const apt = bookAppointment({
      date: selectedDate,
      time: selectedTime,
      mode: consultMode,
      type: isFollowUp ? 'FOLLOW_UP' : 'UPCOMING',
      followUpReason: isFollowUp ? followUpReason : undefined,
      symptoms: selectedSymptoms,
      notes: notes || (isFollowUp ? `Follow-up on: ${followUpReason}` : "Pediatric consultation requested.")
    });
    setConfirmedBooking(apt);
    setStep(4);
    
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '94%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="sheet-handle" />

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#056DB4', textTransform: 'uppercase' }}>
              {step < 4 ? `Step ${step} of 3` : 'Booking Confirmed'}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>
              {step === 1 && "Select Consultation Mode"}
              {step === 2 && "Select Symptoms & Reasons"}
              {step === 3 && "Choose Date & Time Slot"}
              {step === 4 && "Appointment Confirmed!"}
            </h3>
          </div>

          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Step 1: Mode & Doctor */}
        {step === 1 && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Doctor Card Banner */}
            <div style={{
              background: '#F0F7FC',
              borderRadius: '18px',
              padding: '14px',
              border: '1.5px solid #D9ECF8',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #056DB4' }}>
                <img src="/assets/dr_ila_b.png" alt="Dr. Ila B" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#012741' }}>Dr. Ila B</h4>
                <p style={{ fontSize: '11px', color: '#056DB4', fontWeight: '600' }}>Senior Pediatrician (MBBS, MD Pediatrics)</p>
                <p style={{ fontSize: '11px', color: '#64748B' }}>15+ Years Experience • 98% Positive Feedback</p>
              </div>
            </div>

            {/* Consultation Type Selector */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                Consultation Type
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                background: '#F1F5F9',
                padding: '4px',
                borderRadius: '14px'
              }}>
                <button
                  type="button"
                  onClick={() => setIsFollowUp(false)}
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    border: 'none',
                    background: !isFollowUp ? '#FFFFFF' : 'transparent',
                    color: !isFollowUp ? '#056DB4' : '#64748B',
                    fontWeight: !isFollowUp ? '800' : '600',
                    fontSize: '12px',
                    cursor: 'pointer',
                    boxShadow: !isFollowUp ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  Standard Visit
                </button>
                <button
                  type="button"
                  onClick={() => setIsFollowUp(true)}
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isFollowUp ? '#047857' : 'transparent',
                    color: isFollowUp ? '#FFFFFF' : '#64748B',
                    fontWeight: isFollowUp ? '800' : '600',
                    fontSize: '12px',
                    cursor: 'pointer',
                    boxShadow: isFollowUp ? '0 2px 6px rgba(4,120,87,0.2)' : 'none'
                  }}
                >
                  Follow-Up Review
                </button>
              </div>
            </div>

            {/* If Follow-Up selected, show follow-up reason picker */}
            {isFollowUp && (
              <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', padding: '12px', borderRadius: '14px' }}>
                <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#065F46', display: 'block', marginBottom: '6px' }}>
                  Select Follow-Up Objective:
                </label>
                <select
                  value={followUpReason}
                  onChange={(e) => setFollowUpReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: '1px solid #86EFAC',
                    background: '#FFFFFF',
                    fontSize: '12px',
                    color: '#065F46',
                    fontWeight: '600'
                  }}
                >
                  {followUpReasonsList.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Consultation Mode Options */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                Select Mode of Consultation
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                  onClick={() => setConsultMode('Online Video Consultation')}
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    border: consultMode.includes('Video') ? '2px solid #056DB4' : '1px solid #E2E8F0',
                    background: consultMode.includes('Video') ? '#EBF4FA' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#53BF9D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Video size={20} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '14px', fontWeight: '800', color: '#012741' }}>Online Video Consultation</h5>
                      <p style={{ fontSize: '11.5px', color: '#64748B' }}>Live face-to-face HD call inside KidCare app</p>
                    </div>
                  </div>
                  {consultMode.includes('Video') && <Check size={18} color="#056DB4" strokeWidth={3} />}
                </div>

                <div
                  onClick={() => setConsultMode('In-Clinic Hospital Visit')}
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    border: !consultMode.includes('Video') ? '2px solid #056DB4' : '1px solid #E2E8F0',
                    background: !consultMode.includes('Video') ? '#EBF4FA' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#F7931E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '14px', fontWeight: '800', color: '#012741' }}>In-Clinic Visit</h5>
                      <p style={{ fontSize: '11.5px', color: '#64748B' }}>KidCare Pediatrics Hospital, Center Clinic</p>
                    </div>
                  </div>
                  {!consultMode.includes('Video') && <Check size={18} color="#056DB4" strokeWidth={3} />}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '16px', marginTop: '10px' }}
            >
              Continue to Symptoms <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Symptoms Selector */}
        {step === 2 && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '12.5px', color: '#64748B' }}>
              Select all symptoms observed in {currentKid.name.split(' ')[0]} to prepare the clinical notes for Dr. Ila B.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              maxHeight: '260px',
              overflowY: 'auto',
              paddingRight: '2px'
            }}>
              {SYMPTOMS_LIST.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.name);
                return (
                  <div
                    key={sym.id}
                    onClick={() => toggleSymptom(sym.name)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #056DB4' : '1px solid #E2E8F0',
                      background: isSelected ? '#EBF4FA' : '#F8FAFC',
                      color: isSelected ? '#056DB4' : '#334155',
                      fontWeight: isSelected ? '700' : '500',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{sym.icon}</span>
                    <span style={{ lineHeight: 1.2 }}>{sym.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Custom Symptom input */}
            <form onSubmit={handleAddCustomSymptom} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Other specific symptom / reason..."
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
              <button
                type="submit"
                style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '0 14px', borderRadius: '12px', fontWeight: '700', fontSize: '12px', color: '#056DB4' }}
              >
                + Add
              </button>
            </form>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
                style={{ flex: 0.4, padding: '12px', borderRadius: '14px' }}
              >
                <ChevronLeft size={16} /> Back
              </button>

              <button
                onClick={() => setStep(3)}
                disabled={selectedSymptoms.length === 0}
                className="btn-primary"
                style={{ flex: 1, padding: '12px', borderRadius: '14px' }}
              >
                Select Date & Time <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date & Slot Selection */}
        {step === 3 && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Date Input */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Preferred Consultation Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  color: '#012741'
                }}
              />
            </div>

            {/* Time Slots Grid */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                Available Doctor Slots
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {timeSlots.map((ts, idx) => {
                  const isSelected = selectedTime === ts.slot;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTime(ts.slot)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #53BF9D' : '1px solid #E2E8F0',
                        background: isSelected ? '#E8F8F3' : '#F8FAFC',
                        color: isSelected ? '#047857' : '#334155',
                        fontWeight: isSelected ? '800' : '600',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div>{ts.slot}</div>
                      <span style={{ fontSize: '9.5px', color: '#94A3B8', textTransform: 'uppercase' }}>{ts.period}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Parent Note (Optional)
              </label>
              <textarea
                placeholder="Any specific questions for Dr. Ila B during this appointment..."
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => setStep(2)}
                className="btn-secondary"
                style={{ flex: 0.4, padding: '12px', borderRadius: '14px' }}
              >
                <ChevronLeft size={16} /> Back
              </button>

              <button
                onClick={handleConfirmBooking}
                className="btn-green"
                style={{ flex: 1, padding: '12px', borderRadius: '14px', fontWeight: '800' }}
              >
                Confirm Appointment & Token
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Booking Confirmed Screen */}
        {step === 4 && confirmedBooking && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', padding: '10px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#E8F8F3',
              color: '#3AA17E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(83, 191, 157, 0.35)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#012741' }}>
                Appointment Confirmed!
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                Your token ID is <strong style={{ color: '#056DB4' }}>{confirmedBooking.bookingCode}</strong>
              </p>
            </div>

            {/* Summary card */}
            <div style={{
              width: '100%',
              background: '#F8FAFC',
              borderRadius: '18px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '12.5px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Doctor:</span>
                <strong style={{ color: '#012741' }}>Dr. Ila B (Pediatrician)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Child:</span>
                <strong style={{ color: '#012741' }}>{confirmedBooking.kidName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Date & Time:</span>
                <strong style={{ color: '#056DB4' }}>{confirmedBooking.date} at {confirmedBooking.time}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Mode:</span>
                <strong style={{ color: '#53BF9D' }}>{confirmedBooking.mode}</strong>
              </div>
            </div>

            {/* Pre checkup instructions from Android strings */}
            <div style={{
              width: '100%',
              background: '#FFFBEB',
              borderRadius: '14px',
              padding: '12px',
              border: '1px solid #FDE68A',
              textAlign: 'left',
              fontSize: '11.5px',
              color: '#92400E'
            }}>
              <strong>Pre-Check-Up Instructions:</strong> Collect details about your child's medical history, including previous illnesses, allergies, medications, and any recent health changes.
            </div>

            <button
              onClick={closeModal}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '16px', marginTop: '8px' }}
            >
              Done / Return to Appointments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
