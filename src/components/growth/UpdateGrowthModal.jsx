import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Scale, Ruler, Activity, Check, Calendar } from 'lucide-react';

export const UpdateGrowthModal = () => {
  const { closeModal, currentKid, addGrowthLog } = useApp();

  const [weight, setWeight] = useState(currentKid.weight || 11.2);
  const [height, setHeight] = useState(currentKid.height || 82.5);
  const [headCirc, setHeadCirc] = useState(currentKid.headCircumference || 46.8);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addGrowthLog({
      date,
      ageMonth: 18,
      weight: parseFloat(weight),
      height: parseFloat(height),
      headCircumference: parseFloat(headCirc),
      note: notes || "Recorded via App"
    });
    closeModal();
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Log Growth Metrics</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>For {currentKid.name} • Updates WHO charts</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Measurement Date */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Measurement Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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

          {/* Weight Input */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Weight (kg)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                step="0.05"
                min="1"
                max="80"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#056DB4'
                }}
              />
              <span style={{ position: 'absolute', right: '14px', top: '14px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>
                kg
              </span>
            </div>
          </div>

          {/* Height Input */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Height / Length (cm)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                step="0.1"
                min="30"
                max="200"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#53BF9D'
                }}
              />
              <span style={{ position: 'absolute', right: '14px', top: '14px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>
                cm
              </span>
            </div>
          </div>

          {/* Head Circumference */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Head Circumference (Optional, cm)
            </label>
            <input
              type="number"
              step="0.1"
              value={headCirc}
              onChange={(e) => setHeadCirc(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Notes / Checkup Context
            </label>
            <input
              type="text"
              placeholder="e.g. 18-month routine checkup with Dr. Ila B"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '16px', marginTop: '6px' }}
          >
            <Check size={18} /> Save & Recalculate Percentile
          </button>
        </form>
      </div>
    </div>
  );
};
