import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Plus, Download, Eye, ShieldCheck, Search, Filter, Stethoscope, Activity, FileCheck } from 'lucide-react';

export const PrescriptionsScreen = () => {
  const { prescriptions, currentKid, openModal } = useApp();
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const kidPrescriptions = prescriptions.filter(p => p.kidId === currentKid.id || !p.kidId);

  const filteredPrescriptions = kidPrescriptions.filter(doc => {
    const matchesType = selectedType === 'ALL' || doc.fileType === selectedType;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const docTypes = [
    { id: 'ALL', label: 'All Records' },
    { id: 'PRESCRIPTION', label: 'Prescriptions' },
    { id: 'PATHOLOGY', label: 'Pathology & Blood' },
    { id: 'RADIOLOGY', label: 'Radiology / X-Ray' }
  ];

  return (
    <div className="screen-scroll-container">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #012741 0%, #056DB4 100%)',
        padding: '20px 18px 24px',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Medical Records Vault</h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
              Prescriptions & Reports for {currentKid.name}
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

        {/* Filter Horizontal Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {docTypes.map((dt) => (
            <button
              key={dt.id}
              onClick={() => setSelectedType(dt.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: selectedType === dt.id ? '800' : '600',
                border: 'none',
                background: selectedType === dt.id ? '#FFFFFF' : 'rgba(255,255,255,0.18)',
                color: selectedType === dt.id ? '#012741' : '#FFFFFF',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(4px)'
              }}
            >
              {dt.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 18px' }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FFFFFF',
          padding: '10px 14px',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px'
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

        {/* Document Cards */}
        {filteredPrescriptions.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '22px',
            padding: '32px 20px',
            textAlign: 'center',
            border: '1px dashed #CBD5E1'
          }}>
            <FileText size={36} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#012741' }}>No documents found</h4>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
              Upload clinical prescriptions or diagnostic reports.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredPrescriptions.map((doc) => {
              const isRx = doc.fileType === 'PRESCRIPTION';
              const isPath = doc.fileType === 'PATHOLOGY';
              const isRad = doc.fileType === 'RADIOLOGY';

              return (
                <div
                  key={doc.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '22px',
                    padding: '16px',
                    border: '1px solid #EEF2F6',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: isRx ? '#EBF4FA' : isPath ? '#E8F8F3' : '#FFF2E6',
                        color: isRx ? '#056DB4' : isPath ? '#3AA17E' : '#E36A00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {isRx ? <FileText size={22} /> : isPath ? <Activity size={22} /> : <FileCheck size={22} />}
                      </div>

                      <div>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          color: isRx ? '#056DB4' : isPath ? '#3AA17E' : '#E36A00',
                          textTransform: 'uppercase'
                        }}>
                          {doc.fileType}
                        </span>
                        <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#012741', lineHeight: 1.2 }}>
                          {doc.title}
                        </h4>
                      </div>
                    </div>

                    <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>
                      {doc.date}
                    </span>
                  </div>

                  {/* Doctor & Diagnosis info */}
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    fontSize: '12px',
                    color: '#334155'
                  }}>
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ color: '#64748B' }}>Doctor:</span> <strong>{doc.doctor}</strong> ({doc.specialty})
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Diagnosis:</span> <strong>{doc.diagnosis}</strong>
                    </div>
                  </div>

                  {/* Medicines preview */}
                  {doc.medicines && doc.medicines.length > 0 && (
                    <div style={{ fontSize: '11.5px', color: '#475569' }}>
                      <strong>{doc.medicines.length} Prescribed Medications:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {doc.medicines.map((m, i) => (
                          <span key={i} style={{ background: '#F1F5F9', padding: '2px 8px', borderRadius: '8px' }}>
                            {m.name.split('(')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                    <button
                      onClick={() => openModal('prescription-viewer', doc)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '10px', borderRadius: '12px', fontSize: '12.5px', fontWeight: '700' }}
                    >
                      <Eye size={15} /> View Full Document & Rx
                    </button>

                    <button
                      onClick={() => alert(`Downloading ${doc.downloadName || 'document.pdf'}...`)}
                      style={{
                        background: '#F1F5F9',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        color: '#056DB4',
                        cursor: 'pointer'
                      }}
                      title="Download PDF"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
