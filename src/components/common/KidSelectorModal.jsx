import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Plus, UserPlus, Heart, X } from 'lucide-react';

export const KidSelectorModal = () => {
  const { kids, currentKidId, switchKid, closeModal, openModal } = useApp();

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Select Child</h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>Manage your children's medical profiles</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Kids List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {kids.map((kid) => {
            const isSelected = kid.id === currentKidId;
            return (
              <div
                key={kid.id}
                onClick={() => {
                  switchKid(kid.id);
                  closeModal();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: isSelected ? '#EBF4FA' : '#F8FAFC',
                  border: isSelected ? '2px solid #056DB4' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}>
                    <img 
                      src={kid.photo || "/assets/kid1_1.png"} 
                      alt={kid.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/kid1_1.png";
                      }}
                    />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#012741' }}>{kid.name}</h4>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>
                      {kid.gender} • {kid.age} • Blood: <span style={{ fontWeight: '600', color: '#056DB4' }}>{kid.bloodGroup}</span>
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#056DB4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : (
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>Select</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Kid Button */}
        <button
          onClick={() => {
            closeModal();
            openModal('add-kid');
          }}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', borderRadius: '16px' }}
        >
          <UserPlus size={18} />
          Add Another Child Profile
        </button>
      </div>
    </div>
  );
};
