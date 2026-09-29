import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronLeft, 
  X, 
  Download, 
  Share2, 
  Printer, 
  Thermometer, 
  Smile, 
  Utensils, 
  Sparkles, 
  Droplet, 
  Clock, 
  AlertTriangle, 
  Wind, 
  HelpCircle,
  CheckCircle2,
  Heart,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Pill,
  PhoneCall
} from 'lucide-react';

export const DocumentViewerModal = () => {
  const { closeModal, modalData, currentKid, showToast, openModal } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const doc = modalData || {
    name: "MMR Booster Care Guide.pdf",
    title: "MMR Booster Care Guide.pdf",
    size: "1.2 MB",
    type: "PDF",
    pages: 3
  };

  const fileName = doc.name || doc.title || "MMR Booster Care Guide.pdf";
  const fileSize = doc.size || "1.2 MB";
  const fileType = doc.type || "PDF";

  const handleDownload = () => {
    showToast(`Downloading "${fileName}" (${fileSize})...`);
    // Create simulated file download
    const element = document.createElement("a");
    const file = new Blob([
      `KidCare Pediatric Care Document\nDocument: ${fileName}\nChild: ${currentKid.name}\nDate: 25 Sept 2026\nVerified by: Dr. Ila B (Senior Pediatrician)\n\nMMR Booster Care Guidelines:\n1. Low fever (<100 F) is normal within 48h.\n2. Paracetamol (Calpol) 1.2 ml SOS.\n3. Keep hydrated and monitor.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName.endsWith('.pdf') ? fileName.replace('.pdf', '.txt') : `${fileName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: fileName,
        text: `KidCare Clinical Care Document for ${currentKid.name}: ${fileName}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      showToast("Document link copied to clipboard!");
    }
  };

  const handlePrint = () => {
    showToast(`Sending "${fileName}" to printer...`);
    window.print();
  };

  const handleBack = () => {
    if (doc.returnModal) {
      openModal(doc.returnModal, doc.returnModalData);
    } else {
      closeModal();
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={closeModal}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 0
      }}
    >
      <div 
        className="modal-sheet animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '96%',
          height: '94%',
          width: '100%',
          maxWidth: '430px',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 14px 18px',
          background: '#EAF0F6',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Top sheet handle */}
        <div 
          style={{ 
            width: '42px', 
            height: '4px', 
            borderRadius: '4px', 
            background: '#CBD5E1', 
            margin: '0 auto 10px' 
          }} 
        />

        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          padding: '0 4px'
        }}>
          {/* Back button */}
          <button
            onClick={handleBack}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#012741',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Back"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Center Title & Subtitle */}
          <div style={{ textAlign: 'center', flex: 1, padding: '0 8px' }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: '800',
              color: '#012741',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {fileName}
            </h3>
            <p style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#64748B',
              marginTop: '1px'
            }}>
              {fileSize} • {fileType}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Close"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* Document Preview Canvas Area */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2px 0 8px',
            position: 'relative'
          }}
        >
          {/* Document Sheet Card */}
          <div 
            style={{
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px 14px 18px',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Pink Wave Background Accent */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #F43F5E 0%, #FB7185 50%, #38BDF8 100%)'
              }}
            />

            {/* PAGE 1: MMR Booster Care Guide Overview */}
            {currentPage === 1 && (
              <>
                {/* Header with cute baby illustration & KidCare logo */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '4px'
                }}>
                  {/* Left baby & syringe illustration */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #FFE4E6 0%, #E0F2FE 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                      {/* Cute Baby SVG */}
                      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                        {/* Baby Face */}
                        <circle cx="32" cy="30" r="22" fill="#FCD34D" />
                        {/* Baby Hair Tuft */}
                        <path d="M30 8 C32 4, 36 6, 34 10" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
                        {/* Cheeks */}
                        <circle cx="21" cy="34" r="3.5" fill="#F87171" opacity="0.6" />
                        <circle cx="43" cy="34" r="3.5" fill="#F87171" opacity="0.6" />
                        {/* Eyes */}
                        <circle cx="24" cy="28" r="2.8" fill="#1E293B" />
                        <circle cx="40" cy="28" r="2.8" fill="#1E293B" />
                        <circle cx="25" cy="27" r="0.9" fill="#FFFFFF" />
                        <circle cx="41" cy="27" r="0.9" fill="#FFFFFF" />
                        {/* Smile */}
                        <path d="M28 36 Q32 40 36 36" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" fill="none" />
                        {/* Baby bib */}
                        <path d="M20 48 Q32 58 44 48" fill="#38BDF8" />
                        {/* Syringe floating */}
                        <rect x="42" y="12" width="5" height="14" rx="1.5" transform="rotate(30 42 12)" fill="#38BDF8" opacity="0.9" />
                        <line x1="45" y1="9" x2="48" y2="14" stroke="#0284C7" strokeWidth="2" />
                      </svg>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: '15px',
                        fontWeight: '800',
                        color: '#0A2540',
                        lineHeight: 1.2,
                        margin: 0
                      }}>
                        MMR Booster<br />Care Guide
                      </h4>
                      <p style={{
                        fontSize: '10.5px',
                        color: '#64748B',
                        margin: '2px 0 0 0',
                        fontWeight: '500'
                      }}>
                        Quick information for Parents
                      </p>
                    </div>
                  </div>

                  {/* KidCare Heart Logo on Right */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#F8FAFC',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0284C7 0%, #EC4899 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}>
                      <Heart size={11} fill="#FFFFFF" />
                    </div>
                    <div style={{ lineHeight: 1 }}>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#0284C7' }}>Kid</span>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#EC4899' }}>Care</span>
                    </div>
                  </div>
                </div>

                {/* Section 1: Common Reactions */}
                <div style={{
                  background: '#FFF1F2',
                  borderRadius: '16px',
                  padding: '10px 12px 12px',
                  border: '1px solid #FFE4E6'
                }}>
                  <h5 style={{
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: '#BE123C',
                    margin: '0 0 8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span>Common Reactions</span>
                  </h5>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '6px',
                    textAlign: 'center'
                  }}>
                    {/* Mild fever */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FDA4AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#E11D48',
                        marginBottom: '4px'
                      }}>
                        <Thermometer size={18} />
                      </div>
                      <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#881337', lineHeight: 1.15 }}>
                        Mild fever
                      </span>
                    </div>

                    {/* Irritability */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FDA4AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#E11D48',
                        marginBottom: '4px'
                      }}>
                        <Smile size={18} style={{ transform: 'rotate(180deg)' }} />
                      </div>
                      <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#881337', lineHeight: 1.15 }}>
                        Irritability
                      </span>
                    </div>

                    {/* Reduced appetite */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FDA4AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#E11D48',
                        marginBottom: '4px'
                      }}>
                        <Utensils size={16} />
                      </div>
                      <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#881337', lineHeight: 1.15 }}>
                        Reduced appetite
                      </span>
                    </div>

                    {/* Mild rash */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FDA4AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#E11D48',
                        marginBottom: '4px'
                      }}>
                        <Sparkles size={16} />
                      </div>
                      <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#881337', lineHeight: 1.15 }}>
                        Mild rash
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 2: What You Can Do */}
                <div style={{
                  background: '#FFF5F5',
                  borderRadius: '16px',
                  padding: '10px 12px 12px',
                  border: '1px solid #FED7D7'
                }}>
                  <h5 style={{
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: '#C53030',
                    margin: '0 0 8px 0'
                  }}>
                    What You Can Do
                  </h5>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '6px',
                    textAlign: 'center'
                  }}>
                    {/* Paracetamol */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FEB2B2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#E53E3E',
                        marginBottom: '4px'
                      }}>
                        <Thermometer size={18} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '600', color: '#4A5568', lineHeight: 1.2 }}>
                        Give paracetamol if fever &gt;100°F
                      </span>
                    </div>

                    {/* Hydration */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FEB2B2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284C7',
                        marginBottom: '4px'
                      }}>
                        <Droplet size={18} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '600', color: '#4A5568', lineHeight: 1.2 }}>
                        Keep child hydrated
                      </span>
                    </div>

                    {/* Sponge */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FEB2B2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0D9488',
                        marginBottom: '4px'
                      }}>
                        <Wind size={18} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '600', color: '#4A5568', lineHeight: 1.2 }}>
                        Sponge with lukewarm water
                      </span>
                    </div>

                    {/* Monitor */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #FEB2B2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D97706',
                        marginBottom: '4px'
                      }}>
                        <Clock size={18} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '600', color: '#4A5568', lineHeight: 1.2 }}>
                        Monitor for 48 hours
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 3: When to Contact Doctor */}
                <div style={{
                  background: '#E0F2FE',
                  borderRadius: '16px',
                  padding: '10px 12px 12px',
                  border: '1px solid #BAE6FD'
                }}>
                  <h5 style={{
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: '#0369A1',
                    margin: '0 0 8px 0'
                  }}>
                    When to Contact Doctor
                  </h5>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '6px',
                    textAlign: 'center'
                  }}>
                    {/* High fever */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #7DD3FC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284C7',
                        marginBottom: '4px'
                      }}>
                        <Thermometer size={18} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '700', color: '#075985', lineHeight: 1.2 }}>
                        High fever (&gt;102°F)
                      </span>
                    </div>

                    {/* Severe irritability */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #7DD3FC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284C7',
                        marginBottom: '4px'
                      }}>
                        <Smile size={18} style={{ transform: 'rotate(180deg)' }} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '700', color: '#075985', lineHeight: 1.2 }}>
                        Severe irritability
                      </span>
                    </div>

                    {/* Breathing difficulty */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #7DD3FC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284C7',
                        marginBottom: '4px'
                      }}>
                        <Wind size={18} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '700', color: '#075985', lineHeight: 1.2 }}>
                        Breathing difficulty
                      </span>
                    </div>

                    {/* Any unusual symptoms */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1.5px solid #7DD3FC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284C7',
                        marginBottom: '4px'
                      }}>
                        <AlertTriangle size={18} />
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '700', color: '#075985', lineHeight: 1.2 }}>
                        Any unusual symptoms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Note & KidCare Branding */}
                <div style={{
                  borderTop: '1px dashed #E2E8F0',
                  paddingTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '9.5px',
                  color: '#64748B'
                }}>
                  <span style={{ maxWidth: '75%', lineHeight: 1.3 }}>
                    Note: These are general guidelines. Follow your doctor's specific advice.
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Heart size={12} color="#EC4899" fill="#EC4899" />
                    <strong style={{ color: '#0284C7', fontSize: '10px' }}>KidCare</strong>
                  </div>
                </div>
              </>
            )}

            {/* PAGE 2: Dosage Chart & Paracetamol Guide */}
            {currentPage === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#0284C7', textTransform: 'uppercase' }}>Page 2 of 3</span>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#012741', margin: '2px 0 0 0' }}>
                      Calpol / Paracetamol Dosage
                    </h4>
                  </div>
                  <Pill size={24} color="#056DB4" />
                </div>

                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '10px',
                  border: '1px solid #E2E8F0',
                  fontSize: '11.5px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Child's Current Weight:</span>
                    <strong style={{ color: '#012741' }}>{currentKid.weight || 11.2} kg ({currentKid.age || '1 yr 5 mos'})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px dashed #CBD5E1', borderBottom: '1px dashed #CBD5E1' }}>
                    <span style={{ color: '#64748B' }}>Calculated Dosage (15mg/kg):</span>
                    <strong style={{ color: '#166534', fontSize: '13px' }}>1.2 ml to 1.5 ml (SOS)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ color: '#64748B' }}>Minimum Interval:</span>
                    <strong style={{ color: '#056DB4' }}>4 to 6 hours (Max 4x/day)</strong>
                  </div>
                </div>

                <div style={{ background: '#FEF3C7', padding: '10px 12px', borderRadius: '12px', border: '1px solid #FDE68A', fontSize: '11px', color: '#92400E', lineHeight: 1.4 }}>
                  <strong>Important Dosage Rules:</strong>
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    <li>Use the dropper/measuring syringe provided with bottle.</li>
                    <li>Do not give ibuprofen without pediatrician clearance.</li>
                    <li>Offer breast milk / formula / water frequently to stay hydrated.</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#059669', background: '#F0FDF4', padding: '8px 10px', borderRadius: '10px' }}>
                  <ShieldCheck size={16} />
                  <span>Approved for {currentKid.name} by Dr. Ila B</span>
                </div>
              </div>
            )}

            {/* PAGE 3: 48-Hour Recovery Log & Emergency Contacts */}
            {currentPage === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#0284C7', textTransform: 'uppercase' }}>Page 3 of 3</span>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#012741', margin: '2px 0 0 0' }}>
                      48-Hour Care Timeline & SOS
                    </h4>
                  </div>
                  <Clock size={24} color="#F7931E" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px' }}>
                  <div style={{ display: 'flex', gap: '8px', background: '#F8FAFC', padding: '8px 10px', borderRadius: '10px' }}>
                    <span style={{ fontWeight: '800', color: '#056DB4', minWidth: '45px' }}>0 - 12h:</span>
                    <span style={{ color: '#334155' }}>Mild tenderness at injection site. Apply cool compress if sore.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', background: '#F8FAFC', padding: '8px 10px', borderRadius: '10px' }}>
                    <span style={{ fontWeight: '800', color: '#F7931E', minWidth: '45px' }}>12 - 36h:</span>
                    <span style={{ color: '#334155' }}>Peak immune reaction window; low fever & mild fussiness may occur.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', background: '#F8FAFC', padding: '8px 10px', borderRadius: '10px' }}>
                    <span style={{ fontWeight: '800', color: '#10B981', minWidth: '45px' }}>36 - 48h:</span>
                    <span style={{ color: '#334155' }}>Fever naturally subsides; normal energy & appetite return.</span>
                  </div>
                </div>

                <div style={{
                  background: '#EFF6FF',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#1E40AF', margin: 0 }}>KidCare 24/7 Helpline</h5>
                    <p style={{ fontSize: '10.5px', color: '#3B82F6', margin: '2px 0 0 0' }}>Instant doctor connect available</p>
                  </div>
                  <a 
                    href="tel:1800-KID-CARE" 
                    style={{
                      background: '#2563EB',
                      color: '#FFFFFF',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <PhoneCall size={12} /> Call Clinic
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Page Navigation Pill (< 1 / 3 >) */}
          <div style={{
            margin: '10px auto 4px',
            background: '#334155',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 1 ? '#64748B' : '#FFFFFF',
                cursor: currentPage === 1 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title="Previous Page"
            >
              <ChevronLeft size={16} strokeWidth={2.8} />
            </button>

            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === totalPages ? '#64748B' : '#FFFFFF',
                cursor: currentPage === totalPages ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title="Next Page"
            >
              <ChevronRight size={16} strokeWidth={2.8} />
            </button>
          </div>
        </div>

        {/* Bottom Action Buttons Row (Download, Share, Print) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr 1.2fr',
          gap: '8px',
          marginTop: '6px'
        }}>
          {/* 1. Primary Download Button */}
          <button
            onClick={handleDownload}
            style={{
              background: 'linear-gradient(135deg, #056DB4 0%, #034E84 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '12px 14px',
              fontWeight: '700',
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(5, 109, 180, 0.35)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Download size={16} strokeWidth={2.4} />
            <span>Download</span>
          </button>

          {/* 2. Secondary Share Button */}
          <button
            onClick={handleShare}
            style={{
              background: '#DCE8F5',
              color: '#056DB4',
              border: 'none',
              borderRadius: '16px',
              padding: '12px 10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#CFE0F2'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#DCE8F5'}
          >
            <Share2 size={16} strokeWidth={2.2} />
            <span>Share</span>
          </button>

          {/* 3. Tertiary Print Button */}
          <button
            onClick={handlePrint}
            style={{
              background: '#DCE8F5',
              color: '#056DB4',
              border: 'none',
              borderRadius: '16px',
              padding: '12px 10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#CFE0F2'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#DCE8F5'}
          >
            <Printer size={16} strokeWidth={2.2} />
            <span>Print</span>
          </button>
        </div>

      </div>
    </div>
  );
};
