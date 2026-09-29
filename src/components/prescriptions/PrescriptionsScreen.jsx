import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Plus, Download, Eye, Search } from 'lucide-react';

export const PrescriptionsScreen = () => {
  const { prescriptions, currentKid, openModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const kidPrescriptions = prescriptions.filter(p => p.kidId === currentKid.id || !p.kidId);

  const filteredPrescriptions = kidPrescriptions.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="screen-scroll-container" style={{ background: '#FAF9F7' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #056DB5 0%, #012741 100%)',
        padding: '20px 18px 24px',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Prescriptions</h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
              Medical Records for {currentKid.name}
            </p>
          </div>

          <button
            onClick={() => openModal('upload-record')}
            className="btn-green"
            style={{ padding: '8px 14px', borderRadius: '14px', fontSize: '12px', fontWeight: '700' }}
          >
            <Plus size={15} /> Upload Doc
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 18px 40px' }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FFFFFF',
          padding: '10px 14px',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search diagnosis, medicine, doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>

        {/* Prescription Cards List */}
        {filteredPrescriptions.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '36px 20px',
            textAlign: 'center',
            border: '1px dashed #CBD5E1',
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
          }}>
            <FileText size={36} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#012741' }}>No Prescriptions Found</h4>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', marginBottom: '16px' }}>
              Upload pediatric prescriptions or doctor notes to keep records organized.
            </p>
            <button
              onClick={() => openModal('upload-record')}
              className="btn-primary"
              style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '12px' }}
            >
              <Plus size={14} /> Upload Prescription
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredPrescriptions.map((doc) => (
              <div
                key={doc.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '16px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                {/* Top header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: '#EBF4FA',
                      color: '#056DB5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#012741', lineHeight: 1.2 }}>
                        {doc.title}
                      </h4>
                      <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        Doctor: <strong>{doc.doctor}</strong>
                      </p>
                    </div>
                  </div>

                  <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {doc.date}
                  </span>
                </div>

                {/* Diagnosis Box */}
                {doc.diagnosis && (
                  <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', color: '#334155' }}>
                    <strong>Diagnosis:</strong> {doc.diagnosis}
                  </div>
                )}

                {/* Prescribed medicines list */}
                {doc.medicines && doc.medicines.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {doc.medicines.map((m, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '11px',
                          background: '#EBF4FA',
                          color: '#056DB5',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontWeight: '600'
                        }}
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                  <button
                    onClick={() => openModal('prescription-viewer', doc)}
                    className="btn-primary"
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '12px', fontSize: '12px' }}
                  >
                    <Eye size={14} /> View Full Rx
                  </button>

                  <button
                    onClick={() => alert(`Downloading ${doc.downloadName || 'prescription.pdf'}...`)}
                    style={{
                      background: '#F1F5F9',
                      border: 'none',
                      color: '#056DB5',
                      padding: '9px 14px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Download PDF"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
