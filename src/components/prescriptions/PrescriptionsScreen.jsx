import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Eye, Download, Calendar, Pill } from 'lucide-react';

export const PrescriptionsScreen = () => {
  const { prescriptions, currentKid, openModal, addPrescriptionRecord, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('Prescription'); // 'Prescription' | 'Pathology' | 'Radiology'
  const [isDoctorExpanded, setIsDoctorExpanded] = useState(true);
  const [showUploadSheet, setShowUploadSheet] = useState(false);

  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const tabs = ['Prescription', 'Pathology', 'Radiology'];

  const typeMap = {
    'Prescription': 'PRESCRIPTION',
    'Pathology': 'PATHOLOGY',
    'Radiology': 'RADIOLOGY'
  };

  const kidPrescriptions = prescriptions.filter(p => {
    const matchesKid = p.kidId === currentKid.id || !p.kidId;
    const matchesType = p.fileType === typeMap[activeTab];
    return matchesKid && matchesType;
  });

  const handleCameraClick = () => {
    setShowUploadSheet(false);
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleAttachFileClick = () => {
    setShowUploadSheet(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e, source) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const newTitle = `${activeTab} - ${file.name.replace(/\.[^/.]+$/, "")}`;
    addPrescriptionRecord({
      title: newTitle,
      fileType: typeMap[activeTab],
      date: new Date().toISOString().split('T')[0],
      doctor: 'Dr. Ila Binaykia',
      diagnosis: source === 'camera' ? 'Scanned Document' : 'Uploaded File Attachment',
      medicines: [],
      fileUrl: '/assets/pdf_logo_tp.png',
      downloadName: file.name
    });

    showToast(`Uploaded "${file.name}" to ${activeTab}`);
  };

  return (
    <div 
      style={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        background: '#FFFFFF'
      }}
    >
      {/* Hidden File Inputs for Native Camera and File Picker */}
      <input 
        type="file" 
        ref={cameraInputRef} 
        accept="image/*" 
        capture="environment" 
        style={{ display: 'none' }} 
        onChange={(e) => handleFileSelected(e, 'camera')}
      />
      <input 
        type="file" 
        ref={fileInputRef} 
        accept=".pdf,image/*,.doc,.docx" 
        style={{ display: 'none' }} 
        onChange={(e) => handleFileSelected(e, 'file')}
      />

      {/* Scrollable Screen Content */}
      <div 
        className="screen-scroll-container" 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          background: '#FFFFFF',
          paddingBottom: '90px' 
        }}
      >

      {/* 1. Child Info Row: Avatar + Name (Sourav Mishra / currentKid.name) */}
      <div 
        style={{
          padding: '16px 16px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#FFFFFF'
        }}
      >
        <button
          onClick={() => openModal('kid-selector')}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            overflow: 'hidden',
            flexShrink: 0
          }}
          title="Switch Kid"
        >
          {currentKid.photo ? (
            <img 
              src={currentKid.photo} 
              alt={currentKid.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#F1F5F9' }} />
          )}
        </button>

        <div style={{ flex: 1 }}>
          <h2 
            style={{ 
              fontSize: '17.5px', 
              fontWeight: '700', 
              color: '#1E293B',
              margin: 0,
              lineHeight: 1.2
            }}
          >
            {currentKid.name || 'Sourav Mishra'}
          </h2>
        </div>
      </div>

      {/* 2. Three Clean Underline Tabs (Prescription | Pathology | Radiology) */}
      <div 
        style={{
          display: 'flex',
          borderBottom: '1px solid #CBD5E1',
          background: '#FFFFFF'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px 6px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid #056DB5' : '3px solid transparent',
                color: '#056DB5',
                fontSize: '14px',
                fontWeight: isActive ? '700' : '600',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
                outline: 'none'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3. Main Body: Doctor Header (Dr. Ila Binaykia) & Documents */}
      <div style={{ padding: '16px 16px 80px', flex: 1 }}>
        
        {/* Doctor Header Row */}
        <div 
          onClick={() => setIsDoctorExpanded(!isDoctorExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '4px 0',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div 
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              flexShrink: 0
            }}
          >
            <img 
              src="/assets/dr_ila_b.png" 
              alt="Dr. Ila Binaykia" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/nurse.png';
              }}
            />
          </div>

          <h3 
            style={{ 
              fontSize: '15px', 
              fontWeight: '700', 
              color: '#056DB5',
              margin: 0
            }}
          >
            Dr. Ila Binaykia
          </h3>
        </div>

        {/* Prescription Cards List */}
        {isDoctorExpanded && (
          <div style={{ marginTop: '12px' }}>
            {kidPrescriptions.length === 0 ? (
              <div 
                style={{
                  padding: '30px 16px',
                  textAlign: 'center',
                  color: '#94A3B8',
                  fontSize: '13px'
                }}
              >
                {/* Clean area ready for documents or upload */}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {kidPrescriptions.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '14px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', margin: 0 }}>
                          {doc.title}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '11.5px', color: '#64748B' }}>
                          <Calendar size={12} color="#056DB5" />
                          <span>{doc.date}</span>
                        </div>
                      </div>

                      <span 
                        style={{
                          fontSize: '10.5px',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          background: '#EBF4FA',
                          color: '#056DB5'
                        }}
                      >
                        {doc.fileType}
                      </span>
                    </div>

                    {doc.diagnosis && (
                      <div style={{ background: '#F8FAFC', padding: '6px 10px', borderRadius: '8px', fontSize: '12px', color: '#334155' }}>
                        <strong>Diagnosis:</strong> {doc.diagnosis}
                      </div>
                    )}

                    {doc.medicines && doc.medicines.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {doc.medicines.map((m, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '11px',
                              background: '#F0FDF4',
                              color: '#166534',
                              border: '1px solid #BBF7D0',
                              padding: '2px 6px',
                              borderRadius: '6px',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Pill size={10} /> {m.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '8px', marginTop: '2px' }}>
                      <button
                        onClick={() => openModal('prescription-viewer', doc)}
                        className="btn-primary"
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', fontSize: '12px' }}
                      >
                        <Eye size={13} /> View Document
                      </button>

                      <button
                        onClick={() => showToast(`Downloading ${doc.downloadName || 'document.pdf'}...`)}
                        style={{
                          background: '#F1F5F9',
                          border: 'none',
                          color: '#056DB5',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Download Document"
                      >
                        <Download size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* End Scrollable Content */}
      </div>

      {/* 4. Floating Action Button (FAB) on Bottom Right - Contained inside Mobile Frame */}
      <button
        onClick={() => setShowUploadSheet(true)}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#056DB5',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 4px 18px rgba(5, 109, 181, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 50,
          transition: 'transform 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Upload Record"
      >
        <Plus size={28} strokeWidth={2.4} color="#FFFFFF" />
      </button>

      {/* 5. Bottom Sheet for Camera / Attach File - Contained inside Mobile Frame */}
      {showUploadSheet && (
        <div 
          onClick={() => setShowUploadSheet(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#F8FAFC',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '16px 24px 36px',
              width: '100%',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Grab Handle */}
            <div 
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '4px',
                background: '#475569',
                margin: '0 auto 28px'
              }}
            />

            {/* Action Buttons Row */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                maxWidth: '280px',
                margin: '0 auto'
              }}
            >
              {/* Option 1: Camera */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleCameraClick}
              >
                <div 
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: '#F89E28',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(248, 158, 40, 0.3)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {/* Camera SVG Vector from Android (camera_icon.xml) */}
                  <svg 
                    width="32" 
                    height="28" 
                    viewBox="0 0 27 22" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M17.782 12.762C17.782 15.153 15.836 17.099 13.445 17.099C11.054 17.099 9.109 15.153 9.109 12.762C9.109 10.37 11.054 8.425 13.445 8.425C15.836 8.425 17.782 10.371 17.782 12.762ZM26.89 6.604V18.921C26.89 20.563 25.559 21.895 23.917 21.895H2.973C1.331 21.895 0 20.563 0 18.921V6.604C0 4.962 1.331 3.631 2.973 3.631H6.631V2.602C6.631 1.165 7.795 0 9.232 0H17.658C19.095 0 20.259 1.165 20.259 2.602V3.63H23.917C25.559 3.631 26.89 4.962 26.89 6.604ZM20.012 12.762C20.012 9.141 17.066 6.195 13.445 6.195C9.825 6.195 6.879 9.141 6.879 12.762C6.879 16.383 9.825 19.329 13.445 19.329C17.066 19.329 20.012 16.383 20.012 12.762Z" 
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
                <span 
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#1E293B',
                    marginTop: '10px'
                  }}
                >
                  Camera
                </span>
              </div>

              {/* Option 2: Attach File */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleAttachFileClick}
              >
                <div 
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: '#38C1A6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(56, 193, 166, 0.3)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {/* Document / Attach File SVG Vector */}
                  <svg 
                    width="30" 
                    height="30" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
                    <line x1="8" y1="8" x2="16" y2="8" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="8" y1="16" x2="13" y2="16" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <span 
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#1E293B',
                    marginTop: '10px'
                  }}
                >
                  Attach File
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
