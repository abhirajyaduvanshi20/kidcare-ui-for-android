import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SYMPTOMS_PAIRS, SYMPTOMS_LIST } from '../../data/initialData';
import { 
  X, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Video, 
  MapPin, 
  Check, 
  CheckCircle2, 
  Calendar, 
  Clock 
} from 'lucide-react';

export const NewAppointmentModal = () => {
  const { closeModal, currentKid, bookAppointment, modalData } = useApp();

  const [isFollowUp, setIsFollowUp] = useState(() => modalData?.isFollowUp || false);
  const [step, setStep] = useState(1); // 1: Mode -> 2: Symptoms -> 3: Date & Slot -> 4: Confirmed
  const [consultMode, setConsultMode] = useState('Online Video Consultation');
  const [followUpReason, setFollowUpReason] = useState('Post-Treatment Clinical Review & Progress Check');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Fever', 'Cough']);
  const [selectedDate, setSelectedDate] = useState('2026-09-30');
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

  const toggleSymptom = (symName) => {
    if (selectedSymptoms.includes(symName)) {
      setSelectedSymptoms(prev => prev.filter(s => s !== symName));
    } else {
      setSelectedSymptoms(prev => [...prev, symName]);
    }
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
        style={{ 
          maxHeight: '94%', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#FFFFFF',
          padding: '16px 18px 20px'
        }}
      >
        <div className="sheet-handle" />

        {/* ========================================================
            STEP 1: SELECT CONSULTATION MODE (Screenshot 2 Match)
           ======================================================== */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#056DB5', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                  STEP 1 OF 3
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginTop: '1px' }}>
                  Select Consultation Mode
                </h3>
              </div>

              <button 
                onClick={closeModal}
                style={{ 
                  background: '#F1F5F9', 
                  border: 'none', 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer' 
                }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>

            {/* Step 1 Scrolling Body */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px' }}>
              
              {/* Child Card with + Regular Visit Badge */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1.5px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #056DB5' }}>
                    <img 
                      src={currentKid.photo || "/assets/kid1_1.png"} 
                      alt={currentKid.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/kid1_1.png'; }}
                    />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>{currentKid.name}</h4>
                    <p style={{ fontSize: '11px', color: '#64748B' }}>Age: {currentKid.age} • Doctor: Dr. Ila B</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFollowUp(prev => !prev)}
                  style={{
                    background: isFollowUp ? '#E8F8F3' : '#F8FAFC',
                    color: isFollowUp ? '#047857' : '#334155',
                    border: isFollowUp ? '1px solid #53BF9D' : '1px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '5px 10px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {isFollowUp ? "✓ Follow-up" : "+ Regular Visit"}
                </button>
              </div>

              {/* Doctor Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1.5px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #E2E8F0' }}>
                  <img 
                    src="/assets/dr_ila_b.png" 
                    alt="Dr. Ila B" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>Dr. Ila B</h4>
                  <p style={{ fontSize: '11.5px', color: '#056DB5', fontWeight: '700' }}>Senior Pediatrician & Child Specialist</p>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>KidCare Pediatrics & Wellness Center</p>
                </div>
              </div>

              {/* Consultation Modes Selector */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                  Select Consultation Type
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Video Consultation */}
                  <div
                    onClick={() => setConsultMode('Online Video Consultation')}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '16px',
                      border: consultMode === 'Online Video Consultation' ? '2px solid #056DB5' : '1px solid #E2E8F0',
                      background: consultMode === 'Online Video Consultation' ? '#F0F7FD' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#056DB5',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Video size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>Video Consultation</h4>
                        <p style={{ fontSize: '11.5px', color: '#64748B' }}>Secure HD video call from home</p>
                      </div>
                    </div>

                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: consultMode === 'Online Video Consultation' ? '2px solid #056DB5' : '2px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#056DB5'
                    }}>
                      {consultMode === 'Online Video Consultation' && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>

                  {/* In-Clinic Visit */}
                  <div
                    onClick={() => setConsultMode('In-Clinic Physical Visit')}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '16px',
                      border: consultMode === 'In-Clinic Physical Visit' ? '2px solid #056DB5' : '1px solid #E2E8F0',
                      background: consultMode === 'In-Clinic Physical Visit' ? '#F0F7FD' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#F1F5F9',
                        color: '#056DB5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>In-Clinic Physical Visit</h4>
                        <p style={{ fontSize: '11.5px', color: '#64748B' }}>Pediatric Clinic, Bengaluru</p>
                      </div>
                    </div>

                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: consultMode === 'In-Clinic Physical Visit' ? '2px solid #056DB5' : '2px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#056DB5'
                    }}>
                      {consultMode === 'In-Clinic Physical Visit' && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Next Step Button */}
            <div style={{ marginTop: '16px', paddingTop: '10px' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  width: '100%',
                  background: '#056DB5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(5, 109, 181, 0.35)'
                }}
              >
                Next Step <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: SYMPTOMS CHECKLIST (Screenshot 3 Match)
           ======================================================== */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Top Bar: Back Arrow + Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0F172A'
                  }}
                  title="Back"
                >
                  <ArrowLeft size={22} color="#0F172A" />
                </button>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  Symptoms
                </h3>
              </div>

              <button 
                onClick={closeModal}
                style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>

            {/* Step 2 Scrolling Body */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '2px' }}>
              
              {/* Booking Appointment For Banner */}
              <div style={{
                background: '#E2E8F0',
                borderRadius: '14px',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '11px', color: '#475569', fontWeight: '600' }}>
                  Booking Appointment For
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFFFFF', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={currentKid.photo || "/assets/kid1_1.png"} 
                      alt={currentKid.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/kid1_1.png'; }}
                    />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#1E293B' }}>
                    {currentKid.name}
                  </span>
                </div>
              </div>

              {/* Select Symptoms Title */}
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', marginTop: '2px' }}>
                Select Symptoms:
              </span>

              {/* 2-Column Symptoms Checklist Card matching Screenshot 3 */}
              <div style={{
                background: '#EAEFF5',
                borderRadius: '16px',
                padding: '14px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {SYMPTOMS_PAIRS.map((pair, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    
                    {/* Left Column Item */}
                    <div 
                      onClick={() => toggleSymptom(pair.left)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: selectedSymptoms.includes(pair.left) ? '2px solid #056DB5' : '1.8px solid #475569',
                        background: selectedSymptoms.includes(pair.left) ? '#056DB5' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {selectedSymptoms.includes(pair.left) && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                      </div>
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: selectedSymptoms.includes(pair.left) ? '700' : '500', 
                        color: selectedSymptoms.includes(pair.left) ? '#056DB5' : '#334155',
                        lineHeight: '1.25'
                      }}>
                        {pair.left}
                      </span>
                    </div>

                    {/* Right Column Item */}
                    {pair.right && (
                      <div 
                        onClick={() => toggleSymptom(pair.right)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          cursor: 'pointer',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: selectedSymptoms.includes(pair.right) ? '2px solid #056DB5' : '1.8px solid #475569',
                          background: selectedSymptoms.includes(pair.right) ? '#056DB5' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {selectedSymptoms.includes(pair.right) && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                        </div>
                        <span style={{ 
                          fontSize: '12px', 
                          fontWeight: selectedSymptoms.includes(pair.right) ? '700' : '500', 
                          color: selectedSymptoms.includes(pair.right) ? '#056DB5' : '#334155',
                          lineHeight: '1.25'
                        }}>
                          {pair.right}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Continue Button */}
            <div style={{ marginTop: '14px', paddingTop: '8px' }}>
              <button
                type="button"
                onClick={() => setStep(3)}
                style={{
                  width: '100%',
                  background: '#056DB5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(5, 109, 181, 0.35)'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: DATE & TIME SLOT SELECTION
           ======================================================== */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0F172A'
                  }}
                  title="Back"
                >
                  <ArrowLeft size={22} color="#0F172A" />
                </button>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#056DB5', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                    STEP 3 OF 3
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Select Date & Time Slot
                  </h3>
                </div>
              </div>

              <button 
                onClick={closeModal}
                style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>

            {/* Step 3 Scrolling Body */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px' }}>
              
              {/* Selected Summary Card */}
              <div style={{
                background: '#F0F7FD',
                borderRadius: '14px',
                padding: '12px 14px',
                border: '1px solid #BAE6FD',
                fontSize: '12px',
                color: '#0369A1',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px'
              }}>
                <div><strong>Child:</strong> {currentKid.name}</div>
                <div><strong>Mode:</strong> {consultMode}</div>
                <div><strong>Selected Symptoms:</strong> {selectedSymptoms.join(', ') || 'None selected'}</div>
              </div>

              {/* Consultation Date */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B', display: 'block', marginBottom: '6px' }}>
                  Consultation Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#0F172A',
                    outline: 'none',
                    background: '#FFFFFF'
                  }}
                />
              </div>

              {/* Available Time Slots */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                  Available Time Slots
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {timeSlots.map((ts) => {
                    const isSelected = selectedTime === ts.slot;
                    return (
                      <button
                        key={ts.slot}
                        type="button"
                        onClick={() => setSelectedTime(ts.slot)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '14px',
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

              {/* Notes / Comments */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B', display: 'block', marginBottom: '6px' }}>
                  Additional Notes for Doctor (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe child's symptoms duration, diet, behavior, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    resize: 'none',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Bottom Confirm Button */}
            <div style={{ marginTop: '14px', paddingTop: '10px' }}>
              <button
                type="button"
                onClick={handleConfirmBooking}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #53BF9D 0%, #3AA17E 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(83, 191, 157, 0.35)'
                }}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: CONFIRMATION SUMMARY
           ======================================================== */}
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
              <div><strong>Symptoms:</strong> {confirmedBooking.symptoms?.join(', ') || 'General consultation'}</div>
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
    </div>
  );
};
