import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Camera, Paperclip, Syringe, ShieldCheck } from 'lucide-react';

export const UpdateVaccineModal = () => {
  const { closeModal, modalData, markVaccineGiven, currentKid } = useApp();

  const vaccine = modalData;
  const [givenDate, setGivenDate] = useState(vaccine?.givenDate || new Date().toISOString().split('T')[0]);
  const [brand, setBrand] = useState(vaccine?.brand || '');
  const [batchNo, setBatchNo] = useState(vaccine?.batchNo || '');
  const [doctor, setDoctor] = useState(vaccine?.doctor || 'Dr. Ila B');
  const [notes, setNotes] = useState(vaccine?.notes || '');
  const [hasPhotoProof, setHasPhotoProof] = useState(!!vaccine?.certificateImage);

  if (!vaccine) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    markVaccineGiven(vaccine.id, {
      givenDate,
      brand: brand || vaccine.brand,
      batchNo: batchNo || 'BATCH-' + Math.floor(1000 + Math.random() * 9000),
      doctor,
      notes
    });
    closeModal();
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Record Vaccination</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>{vaccine.name} • {currentKid.name}</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Administered Date */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Administration Date
            </label>
            <input
              type="date"
              value={givenDate}
              onChange={(e) => setGivenDate(e.target.value)}
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

          {/* Vaccine Brand */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Vaccine Brand / Manufacturer
            </label>
            <input
              type="text"
              placeholder="e.g. Infanrix Hexa / Prevenar 13 / Havrix"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Batch Number */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Batch / Lot Number
            </label>
            <input
              type="text"
              placeholder="e.g. HEX-8991B"
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Administered By Doctor */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Administering Doctor / Clinic
            </label>
            <input
              type="text"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Certificate / Proof Photo */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Vaccination Card Photo / Certificate Proof
            </label>
            <button
              type="button"
              onClick={() => setHasPhotoProof(!hasPhotoProof)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: hasPhotoProof ? '2px solid #53BF9D' : '1.5px dashed #CBD5E1',
                background: hasPhotoProof ? '#E8F8F3' : '#FAF9F7',
                color: hasPhotoProof ? '#047857' : '#64748B',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Camera size={16} />
              {hasPhotoProof ? '✓ Certificate Photo Attached (Tap to change)' : 'Tap to Capture / Attach Hospital Card'}
            </button>
          </div>

          <button
            type="submit"
            className="btn-green"
            style={{ width: '100%', padding: '14px', borderRadius: '16px', marginTop: '6px' }}
          >
            <Check size={18} /> Confirm & Save Vaccination Record
          </button>
        </form>
      </div>
    </div>
  );
};
