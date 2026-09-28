import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Syringe, Sparkles, ChevronRight, Scale, Ruler, HeartPulse, Plus } from 'lucide-react';

export const KidCarousel = () => {
  const { kids, currentKid, switchKid, openModal } = useApp();
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // BMI Calculation
  const heightInMeters = (currentKid.height || 80) / 100;
  const bmi = (currentKid.weight / (heightInMeters * heightInMeters)).toFixed(1);

  return (
    <div style={{ padding: '16px 18px 8px' }}>
      {/* Active Kid Card with 3D Flip capability */}
      <div 
        className="card-glass"
        style={{
          borderRadius: '26px',
          background: currentKid.gradient || 'linear-gradient(135deg, #056DB4 0%, #012741 100%)',
          padding: '20px',
          color: '#FFFFFF',
          boxShadow: '0 12px 30px -5px rgba(5, 109, 180, 0.45)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background ambient watermarks */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none'
        }} />

        {/* Top Row: Avatar, Name, Age, Blood Group */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div 
              onClick={() => openModal('edit-profile')}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '18px',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '2.5px solid rgba(255,255,255,0.85)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
              title="Click to view/edit child profile"
            >
              <img 
                src={currentKid.photo || "/assets/kid1_1.png"} 
                alt={currentKid.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/kid1_1.png";
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.3px' }}>
                  {currentKid.name}
                </h2>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(4px)'
                }}>
                  {currentKid.bloodGroup}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
                {currentKid.gender} • {currentKid.age} (DOB: {currentKid.dob})
              </p>
            </div>
          </div>

          <button
            onClick={() => openModal('kid-selector')}
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '20px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backdropFilter: 'blur(6px)'
            }}
          >
            Switch <ChevronRight size={14} />
          </button>
        </div>

        {/* Metrics Grid: Weight, Height, Head Circ, BMI */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          background: 'rgba(0, 0, 0, 0.22)',
          padding: '12px 10px',
          borderRadius: '16px',
          backdropFilter: 'blur(8px)',
          marginBottom: '14px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', fontWeight: '600' }}>Weight</span>
            <p style={{ fontSize: '15px', fontWeight: '800', color: '#F5DC91', marginTop: '2px' }}>
              {currentKid.weight} <span style={{ fontSize: '10px', fontWeight: '500' }}>kg</span>
            </p>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', fontWeight: '600' }}>Height</span>
            <p style={{ fontSize: '15px', fontWeight: '800', color: '#53BF9D', marginTop: '2px' }}>
              {currentKid.height} <span style={{ fontSize: '10px', fontWeight: '500' }}>cm</span>
            </p>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', fontWeight: '600' }}>Head</span>
            <p style={{ fontSize: '15px', fontWeight: '800', color: '#EBF4FA', marginTop: '2px' }}>
              {currentKid.headCircumference || 46.5} <span style={{ fontSize: '10px', fontWeight: '500' }}>cm</span>
            </p>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', fontWeight: '600' }}>BMI</span>
            <p style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>
              {bmi}
            </p>
          </div>
        </div>

        {/* Bottom Status Row & Quick Growth Update CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#53BF9D',
              boxShadow: '0 0 8px #53BF9D'
            }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' }}>
              Primary Doctor: {currentKid.doctor || "Dr. Ila B"}
            </span>
          </div>

          <button
            onClick={() => openModal('growth-chart')}
            style={{
              background: 'linear-gradient(135deg, #53BF9D 0%, #3AA17E 100%)',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '14px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 3px 10px rgba(83, 191, 157, 0.4)'
            }}
          >
            <TrendingUp size={14} /> View Chart
          </button>
        </div>
      </div>
    </div>
  );
};
