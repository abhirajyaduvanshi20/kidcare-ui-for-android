import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, Share2, Printer, ShieldCheck, FileText, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export const PrescriptionViewerModal = () => {
  const { closeModal, modalData, currentKid } = useApp();

  if (!modalData) return null;
  const doc = modalData;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: doc.title,
        text: `KidCare Medical Record for ${currentKid.name} - ${doc.title}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert("Document link copied to clipboard!");
    }
  };

  return (
    <div className="modal-fullscreen">
      {/* Top Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} color="#012741" />
          </button>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#012741' }}>{doc.fileType} Viewer</h3>
            <p style={{ fontSize: '11px', color: '#64748B' }}>{currentKid.name} • {doc.date}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleShare}
            style={{ background: '#F1F5F9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#056DB4' }}
            title="Share Document"
          >
            <Share2 size={16} />
          </button>

          <button
            onClick={() => alert(`Downloading ${doc.downloadName || 'document.pdf'}...`)}
            className="btn-primary"
            style={{ padding: '8px 14px', borderRadius: '12px', fontSize: '12px' }}
          >
            <Download size={14} /> PDF
          </button>
        </div>
      </div>

      {/* Main Clinical Document Body */}
      <div style={{ flex: 1, padding: '20px 18px 40px', background: '#FAF9F7', overflowY: 'auto' }}>
        {/* Prescription Paper Canvas */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px 20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: '1px solid #E2E8F0',
          position: 'relative'
        }}>
          {/* Hospital / Clinic Header */}
          <div style={{ borderBottom: '2px solid #056DB4', paddingBottom: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#056DB4' }}>KidCare Pediatrics</h2>
                <p style={{ fontSize: '11.5px', color: '#64748B' }}>Center for Child Health, Growth & Immunization</p>
                <p style={{ fontSize: '11px', color: '#94A3B8' }}>Reg No: KC-HOSP-2024 • Bengaluru, India</p>
              </div>

              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #056DB4 0%, #53BF9D 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <FileText size={24} />
              </div>
            </div>
          </div>

          {/* Doctor & Patient Metadata Row */}
          <div style={{
            background: '#F8FAFC',
            padding: '12px 14px',
            borderRadius: '14px',
            marginBottom: '18px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            fontSize: '12px'
          }}>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>Doctor Name:</span>
              <strong style={{ color: '#012741' }}>{doc.doctor}</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>Patient (Child):</span>
              <strong style={{ color: '#012741' }}>{currentKid.name} ({currentKid.gender}, {currentKid.age})</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>Date of Consultation:</span>
              <strong style={{ color: '#012741' }}>{doc.date}</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>Blood Group / Weight:</span>
              <strong style={{ color: '#056DB4' }}>{currentKid.bloodGroup} • {currentKid.weight} kg</strong>
            </div>
          </div>

          {/* Diagnosis */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
              Primary Diagnosis / Clinical Findings
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#012741', marginTop: '4px' }}>
              {doc.diagnosis}
            </h4>
          </div>

          {/* Prescribed Medicines Schedule */}
          {doc.medicines && doc.medicines.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#056DB4', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Rx - Prescribed Medications
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {doc.medicines.map((med, idx) => (
                  <div key={idx} style={{
                    borderLeft: '3px solid #53BF9D',
                    background: '#F8FAFC',
                    padding: '10px 14px',
                    borderRadius: '4px 12px 12px 4px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h5 style={{ fontSize: '13.5px', fontWeight: '800', color: '#012741' }}>
                        {idx + 1}. {med.name}
                      </h5>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#056DB4', background: '#EBF4FA', padding: '2px 6px', borderRadius: '6px' }}>
                        {med.duration}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#334155', fontWeight: '600', marginTop: '2px' }}>
                      Dosage: <strong style={{ color: '#056DB4' }}>{med.dosage}</strong>
                    </p>
                    <p style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                      Instructions: {med.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pathology Lab Results Table */}
          {doc.labResults && doc.labResults.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#3AA17E', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Lab Test Parameters & Reference Ranges
              </span>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#F1F5F9', color: '#475569', textAlign: 'left' }}>
                    <th style={{ padding: '8px 10px', borderRadius: '8px 0 0 8px' }}>Test Parameter</th>
                    <th style={{ padding: '8px 10px' }}>Observed Value</th>
                    <th style={{ padding: '8px 10px' }}>Normal Range</th>
                    <th style={{ padding: '8px 10px', borderRadius: '0 8px 8px 0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.labResults.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '10px', fontWeight: '600', color: '#012741' }}>{r.test}</td>
                      <td style={{ padding: '10px', fontWeight: '700', color: '#056DB4' }}>{r.value}</td>
                      <td style={{ padding: '10px', color: '#64748B' }}>{r.range}</td>
                      <td style={{ padding: '10px', color: '#166534', fontWeight: '700' }}>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Doctor Advice / Notes */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '12px 14px', borderRadius: '12px', fontSize: '12px', color: '#92400E', marginBottom: '24px' }}>
            <strong>Diet & Care Advice:</strong> {doc.advice}
          </div>

          {/* Digital Signature & Footer */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#53BF9D' }}>
              <ShieldCheck size={16} />
              <span>Digitally Signed & Certified</span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontStyle: 'italic', fontSize: '16px', fontFamily: 'serif', color: '#056DB4', fontWeight: '700' }}>
                Dr. Ila B
              </div>
              <p style={{ fontSize: '10px', color: '#64748B' }}>Consultant Pediatrician</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
