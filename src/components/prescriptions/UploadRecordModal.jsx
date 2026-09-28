import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Camera, Paperclip, Upload, Check, FileText, Activity } from 'lucide-react';

export const UploadRecordModal = () => {
  const { closeModal, currentKid, addPrescriptionRecord } = useApp();

  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('PRESCRIPTION');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctor, setDoctor] = useState('Dr. Ila B');
  const [diagnosis, setDiagnosis] = useState('');
  const [hasFile, setHasFile] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addPrescriptionRecord({
      title,
      fileType: docType,
      date,
      doctor: doctor || "Consultant Doctor",
      diagnosis: diagnosis || "General Medical Report",
      medicines: [],
      fileUrl: "/assets/pdf_logo_tp.png"
    });
    closeModal();
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Upload Medical Record</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>For {currentKid.name} • Secure Health Vault</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Document Type Chips */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Document Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {['PRESCRIPTION', 'PATHOLOGY', 'RADIOLOGY'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDocType(t)}
                  style={{
                    padding: '8px',
                    borderRadius: '12px',
                    border: docType === t ? '2px solid #056DB4' : '1px solid #E2E8F0',
                    background: docType === t ? '#EBF4FA' : '#F8FAFC',
                    color: docType === t ? '#056DB4' : '#64748B',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Document Title
            </label>
            <input
              type="text"
              placeholder="e.g. Pediatric Blood Panel / Routine Prescription"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14px' }}
            />
          </div>

          {/* Date & Doctor */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Record Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Doctor / Clinic
              </label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Diagnosis / Notes */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Diagnosis / Summary
            </label>
            <input
              type="text"
              placeholder="e.g. Mild throat viral congestion"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14px' }}
            />
          </div>

          {/* File Attachment / Camera Scan */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Attach PDF / Camera Photo
            </label>
            <div
              onClick={() => setHasFile(!hasFile)}
              style={{
                border: hasFile ? '2px solid #53BF9D' : '1.5px dashed #CBD5E1',
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: hasFile ? '#E8F8F3' : '#FAF9F7'
              }}
            >
              <Camera size={22} color={hasFile ? "#3AA17E" : "#64748B"} style={{ margin: '0 auto 6px' }} />
              <p style={{ fontSize: '12.5px', fontWeight: '700', color: hasFile ? '#065F46' : '#334155' }}>
                {hasFile ? "✓ Document Scan Captured (sample_report.pdf)" : "Tap to Scan Document or Select PDF"}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '16px', marginTop: '6px' }}
          >
            <Upload size={18} /> Upload to Medical Vault
          </button>
        </form>
      </div>
    </div>
  );
};
