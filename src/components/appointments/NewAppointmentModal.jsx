import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SYMPTOMS_LIST } from '../../data/initialData';
import { X, ChevronRight, ChevronLeft, Calendar, Clock, Video, MapPin, Check, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const NewAppointmentModal = () => {
  const { closeModal, currentKid, bookAppointment, modalData } = useApp();

  const [isFollowUp, setIsFollowUp] = useState(() => modalData?.isFollowUp || false);
  const [step, setStep] = useState(1); // 1: Mode -> 2: Symptoms -> 3: Date & Time -> 4: Confirmed
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
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#056DB5', textTransform: 'uppercase' }}>
              {step < 4 ? `Step ${step} of 3` : 'Booking Confirmed'}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>
              {step === 1 && (isFollowUp ? "Schedule Follow-up Visit" : "Select Consultation Mode")}
              {step === 2 && "Symptoms & Visit Reasons"}
              {step === 3 && "Select Date & Time Slot"}
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

        {/* Child Context Banner */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '14px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #E2E8F0',
          marginBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #056DB5' }}>
              <img 
                src={currentKid.photo || "/assets/kid1_1.png"} 
                alt={currentKid.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/assets/kid1_1.png'; }}
              />
            </div>
            <div>
              <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#012741' }}>{currentKid.name}</h4>
              <p style={{ fontSize: '11px', color: '#64748B' }}>Age: {currentKid.age} • Doctor: Dr. Ila B</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFollowUp(prev => !prev)}
            style={{
              background: isFollowUp ? '#E8F8F3' : '#F1F5F9',
              color: isFollowUp ? '#047857' : '#475569',
              border: isFollowUp ? '1px solid #53BF9D' : '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {isFollowUp ? "✓ Follow-up" : "+ Regular Visit"}
          </button>
        </div>

        {/* Step Content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '2px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* STEP 1: Mode & Doctor */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Doctor Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', overflow: 'hidden', border: '2px solid #E2E8F0' }}>
                  <img src="/assets/dr_ila_b.png" alt="Dr. Ila B" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#012741' }}>Dr. Ila B</h4>
                  <p style={{ fontSize: '11.5px', color: '#056DB5', fontWeight: '700' }}>Senior Pediatrician & Child Specialist</p>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>KidCare Pediatrics & Wellness Center</p>
                </div>
              </div>

              {/* Consultation Modes */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                  Select Consultation Type
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'Online Video Consultation', title: 'Video Consultation', desc: 'Secure HD video call from home', icon: Video, color: '#056DB5' },
                    { id: 'In-Clinic Physical Visit', title: 'In-Clinic Physical Visit', desc: 'Pediatric Clinic, Bengaluru', icon: MapPin, color: '#53BF9D' }
                  ].map((m) => {
                    const isSelected = consultMode === m.id;
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setConsultMode(m.id)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '14px',
                          border: isSelected ? '2px solid #056DB5' : '1px solid #E2E8F0',
                          background: isSelected ? '#EBF4FA' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: isSelected ? '#056DB5' : '#F1F5F9',
                            color: isSelected ? '#FFFFFF' : '#056DB5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#012741' }}>{m.title}</h4>
                            <p style={{ fontSize: '11.5px', color: '#64748B' }}>{m.desc}</p>
                          </div>
                        </div>

                        {isSelected && <CheckCircle2 size={18} color="#056DB5" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Follow-up Goal if Follow-up */}
              {isFollowUp && (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Follow-up Reason
                  </label>
                  <select
                    value={followUpReason}
                    onChange={(e) => setFollowUpReason(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      background: '#FFFFFF',
                      color: '#012741'
                    }}
                  >
                    {followUpReasonsList.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Symptoms */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                  Tap Symptoms / Concerns to Report
                </label>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {SYMPTOMS_LIST.map((sym) => {
                    const isSelected = selectedSymptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '12px',
                          border: isSelected ? '1.5px solid #056DB5' : '1px solid #E2E8F0',
                          background: isSelected ? '#056DB5' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : '#334155',
                          fontSize: '12px',
                          fontWeight: isSelected ? '700' : '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                        <span>{sym}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Symptom */}
              <form onSubmit={handleAddCustomSymptom} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Other symptom (e.g. Mild earache)..."
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#056DB5',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </form>

              {/* Additional notes */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Doctor Notes / Observations (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe since when symptoms appeared, child's mood, feeding, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    resize: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Date & Slot */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Consultation Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#012741'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                  Available Time Slots
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {timeSlots.map((ts) => {
                    const isSelected = selectedTime === ts.slot;
                    return (
                      <button
                        key={ts.slot}
                        type="button"
                        onClick={() => setSelectedTime(ts.slot)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #056DB5' : '1px solid #E2E8F0',
                          background: isSelected ? '#EBF4FA' : '#FFFFFF',
                          color: isSelected ? '#056DB5' : '#334155',
                          fontSize: '13px',
                          fontWeight: isSelected ? '800' : '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{ts.slot}</span>
                        <span style={{ fontSize: '10px', color: '#94A3B8' }}>{ts.period}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmed Confirmation */}
          {step === 4 && confirmedBooking && (
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              border: '1.5px solid #53BF9D',
              boxShadow: '0 4px 14px rgba(83, 191, 157, 0.15)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#E8F8F3',
                color: '#53BF9D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <CheckCircle2 size={32} />
              </div>

              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>
                Consultation Booked!
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', marginBottom: '16px' }}>
                Appointment ID: <strong>{confirmedBooking.id}</strong>
              </p>

              <div style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '12px 14px',
                textAlign: 'left',
                fontSize: '12.5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginBottom: '16px'
              }}>
                <div><strong>Doctor:</strong> {confirmedBooking.doctor} ({confirmedBooking.specialty})</div>
                <div><strong>Child:</strong> {currentKid.name}</div>
                <div><strong>Date & Time:</strong> {confirmedBooking.timestamp}</div>
                <div><strong>Mode:</strong> {confirmedBooking.mode}</div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', borderRadius: '14px', fontSize: '14px' }}
              >
                Done
              </button>
            </div>
          )}

        </div>

        {/* Step Navigation Buttons */}
        {step < 4 && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                style={{
                  background: '#F1F5F9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev + 1)}
                className="btn-primary"
                style={{ flex: 1, padding: '12px', borderRadius: '14px', fontSize: '13px' }}
              >
                Next Step <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="btn-green"
                style={{ flex: 1, padding: '12px', borderRadius: '14px', fontSize: '13px' }}
              >
                Confirm Appointment
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
