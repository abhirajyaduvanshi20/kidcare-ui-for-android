import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle, 
  Clock, 
  Send, 
  Shield, 
  Download, 
  Share2, 
  Eye, 
  MoreHorizontal, 
  Heart 
} from 'lucide-react';

export const FlipDetailModal = () => {
  const { closeModal, modalData, currentKid, openModal, showToast } = useApp();
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [showDocMenu, setShowDocMenu] = useState(false);

  if (!modalData) return null;

  const flip = modalData;

  const handleSendFollowUp = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplies(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Parent',
        text: replyText,
        time: 'Just now'
      }
    ]);
    setReplyText('');
  };

  // Default MMR document attachment matching user screenshot
  const attachments = (flip.attachments && flip.attachments.length > 0) 
    ? flip.attachments 
    : [
        {
          type: "PDF",
          name: "MMR Booster Care Guide.pdf",
          size: "1.2 MB",
          pages: 3
        }
      ];

  const handleViewDocument = (att) => {
    openModal('document-viewer', {
      name: att.name || "MMR Booster Care Guide.pdf",
      title: att.name || "MMR Booster Care Guide.pdf",
      size: att.size || "1.2 MB",
      type: att.type || "PDF",
      pages: att.pages || 3,
      returnModal: 'flip-detail',
      returnModalData: flip
    });
  };

  const handleDownloadDocument = (att, e) => {
    e?.stopPropagation?.();
    const docName = att.name || "MMR Booster Care Guide.pdf";
    showToast(`Downloading "${docName}"...`);
    const element = document.createElement("a");
    const file = new Blob([
      `KidCare Clinical Document\nTitle: ${docName}\nChild: ${flip.kidName || currentKid.name}\nDate: ${new Date(flip.createdDate || Date.now()).toLocaleDateString()}\n\nDoctor Guidelines:\n- Low fever (<100 F) is a normal immune reaction within 48h.\n- Paracetamol (Calpol) 1.2 ml SOS.\n- Keep child hydrated and monitor.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = docName.endsWith('.pdf') ? docName.replace('.pdf', '.txt') : `${docName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareDocument = (att, e) => {
    e?.stopPropagation?.();
    const docName = att.name || "MMR Booster Care Guide.pdf";
    if (navigator.share) {
      navigator.share({
        title: docName,
        text: `KidCare Medical Guide for ${flip.kidName || currentKid.name}: ${docName}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      showToast(`Link to "${docName}" copied!`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '94%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="sheet-handle" />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '8px',
              background: flip.type === 'EMERGENCY' ? '#FFF2E6' : '#EBF4FA',
              color: flip.type === 'EMERGENCY' ? '#E36A00' : '#056DB4',
              textTransform: 'uppercase'
            }}>
              {flip.type ? flip.type.replace('_', ' ') : 'ASK QUESTION'}
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              • {new Date(flip.createdDate || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <button 
            onClick={closeModal}
            style={{ 
              background: '#F1F5F9', 
              border: 'none', 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Conversation Content */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px' }}>
          {/* Query Question Box */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '18px',
            padding: '16px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  background: '#056DB4', 
                  color: '#FFFFFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '11px', 
                  fontWeight: '700' 
                }}>
                  {flip.kidName ? flip.kidName[0] : 'R'}
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#012741', margin: 0 }}>
                    {flip.kidName || 'Reyansh Sharma'} (Parent Query)
                  </h4>
                </div>
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: flip.statusColor || '#53BF9D',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle size={13} /> {flip.status || 'Answered'}
              </span>
            </div>

            <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#012741', lineHeight: 1.3, marginBottom: '6px' }}>
              {flip.title}
            </h3>

            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
              {flip.description}
            </p>

            {/* Attached Documents & Images Section */}
            <div style={{ marginTop: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '8px' }}>
                Attached Documents & Images ({attachments.length})
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {attachments.map((att, i) => (
                  <div 
                    key={i} 
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      padding: '10px 12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      display: 'flex',
                      gap: '12px',
                      position: 'relative'
                    }}
                  >
                    {/* Document Mini Thumbnail on Left */}
                    <div 
                      onClick={() => handleViewDocument(att)}
                      style={{
                        width: '64px',
                        height: '76px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #FFF1F2 0%, #E0F2FE 100%)',
                        border: '1px solid #CBD5E1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        overflow: 'hidden',
                        position: 'relative',
                        padding: '4px'
                      }}
                      title="Click to view document"
                    >
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#FFE4E6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '3px'
                      }}>
                        <Heart size={13} color="#E11D48" fill="#E11D48" />
                      </div>
                      <div style={{
                        fontSize: '7.5px',
                        fontWeight: '800',
                        color: '#0A2540',
                        textAlign: 'center',
                        lineHeight: 1.1
                      }}>
                        MMR Guide
                      </div>
                      <span style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: '#056DB4',
                        color: '#FFFFFF',
                        fontSize: '7px',
                        fontWeight: '800',
                        textAlign: 'center',
                        padding: '1px 0'
                      }}>
                        PDF
                      </span>
                    </div>

                    {/* Document Details & Actions on Right */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      {/* Title & Three-dot menu row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div 
                          onClick={() => handleViewDocument(att)}
                          style={{ cursor: 'pointer', flex: 1, paddingRight: '4px' }}
                        >
                          <h4 style={{
                            fontSize: '13px',
                            fontWeight: '700',
                            color: '#012741',
                            margin: 0,
                            lineHeight: 1.25
                          }}>
                            {att.name || "MMR Booster Care Guide.pdf"}
                          </h4>
                          <p style={{
                            fontSize: '11px',
                            color: '#64748B',
                            margin: '3px 0 0 0',
                            fontWeight: '500'
                          }}>
                            {att.type || 'PDF'} • {att.size || '1.2 MB'}
                          </p>
                        </div>

                        {/* Three-dot menu button */}
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => setShowDocMenu(prev => !prev)}
                            style={{
                              background: '#F1F5F9',
                              border: 'none',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#64748B'
                            }}
                            title="More options"
                          >
                            <MoreHorizontal size={15} />
                          </button>

                          {/* Context Menu Dropdown */}
                          {showDocMenu && (
                            <div style={{
                              position: 'absolute',
                              right: 0,
                              top: '32px',
                              background: '#FFFFFF',
                              borderRadius: '12px',
                              padding: '6px',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                              border: '1px solid #E2E8F0',
                              zIndex: 40,
                              minWidth: '150px'
                            }}>
                              <button
                                onClick={() => {
                                  setShowDocMenu(false);
                                  handleViewDocument(att);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '8px 10px',
                                  background: 'none',
                                  border: 'none',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  color: '#012741',
                                  textAlign: 'left',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  cursor: 'pointer',
                                  borderRadius: '8px'
                                }}
                              >
                                <Eye size={14} color="#056DB4" /> View full document
                              </button>

                              <button
                                onClick={(e) => {
                                  setShowDocMenu(false);
                                  handleDownloadDocument(att, e);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '8px 10px',
                                  background: 'none',
                                  border: 'none',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  color: '#012741',
                                  textAlign: 'left',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  cursor: 'pointer',
                                  borderRadius: '8px'
                                }}
                              >
                                <Download size={14} color="#056DB4" /> Download file
                              </button>

                              <button
                                onClick={(e) => {
                                  setShowDocMenu(false);
                                  handleShareDocument(att, e);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '8px 10px',
                                  background: 'none',
                                  border: 'none',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  color: '#012741',
                                  textAlign: 'left',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  cursor: 'pointer',
                                  borderRadius: '8px'
                                }}
                              >
                                <Share2 size={14} color="#056DB4" /> Share link
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Three Direct Action Buttons (Download, Share, View) */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        marginTop: '8px',
                        paddingTop: '6px',
                        borderTop: '1px solid #F1F5F9'
                      }}>
                        {/* 1. Download Option */}
                        <button
                          onClick={(e) => handleDownloadDocument(att, e)}
                          style={{
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#056DB4',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            padding: '2px 4px',
                            borderRadius: '6px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#EBF4FA'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                        >
                          <Download size={14} strokeWidth={2.4} />
                          <span>Download</span>
                        </button>

                        {/* 2. Share Option */}
                        <button
                          onClick={(e) => handleShareDocument(att, e)}
                          style={{
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#056DB4',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            padding: '2px 4px',
                            borderRadius: '6px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#EBF4FA'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                        >
                          <Share2 size={14} strokeWidth={2.4} />
                          <span>Share</span>
                        </button>

                        {/* 3. View Option */}
                        <button
                          onClick={() => handleViewDocument(att)}
                          style={{
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#056DB4',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            padding: '2px 4px',
                            borderRadius: '6px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#EBF4FA'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                        >
                          <Eye size={14} strokeWidth={2.4} />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Doctor Verified Response */}
          {flip.doctorReply ? (
            <div style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
              borderRadius: '18px',
              padding: '16px',
              border: '1.5px solid #86EFAC',
              boxShadow: '0 4px 14px rgba(83, 191, 157, 0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #53BF9D',
                  flexShrink: 0
                }}>
                  <img 
                    src={flip.doctorReply.doctorAvatar || "/assets/dr_ila_b.png"} 
                    alt={flip.doctorReply.doctorName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#065F46', margin: 0 }}>
                      {flip.doctorReply.doctorName}
                    </h4>
                    <span style={{
                      background: '#10B981',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: '800',
                      padding: '1px 6px',
                      borderRadius: '10px'
                    }}>
                      VERIFIED DOCTOR
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#047857', margin: '2px 0 0 0' }}>
                    {flip.doctorReply.doctorRole} • {new Date(flip.doctorReply.replyDate || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '13.5px', color: '#064E3B', lineHeight: 1.5, fontWeight: '500', margin: 0 }}>
                {flip.doctorReply.text}
              </p>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#047857' }}>
                <Shield size={13} />
                <span>Digitally signed & verified by KidCare Pediatric Clinical Team</span>
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFBEB', border: '1px dashed #F59E0B', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
              <Clock size={20} color="#D97706" style={{ margin: '0 auto 6px' }} />
              <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#92400E', margin: 0 }}>Awaiting Doctor's Review</h5>
              <p style={{ fontSize: '11.5px', color: '#B45309', marginTop: '2px', margin: 0 }}>
                Dr. Ila B usually replies within 2-4 hours for non-emergency flips.
              </p>
            </div>
          )}

          {/* Follow-up comments stream */}
          {replies.map((rep) => (
            <div key={rep.id} style={{
              background: '#EBF4FA',
              border: '1px solid #BAE6FD',
              borderRadius: '14px',
              padding: '10px 14px',
              alignSelf: 'flex-end',
              maxWidth: '85%'
            }}>
              <span style={{ fontSize: '10px', color: '#056DB4', fontWeight: '700' }}>You ({rep.time})</span>
              <p style={{ fontSize: '13px', color: '#012741', marginTop: '2px', margin: 0 }}>{rep.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom Follow-up Input */}
        <form onSubmit={handleSendFollowUp} style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Type follow-up note for doctor..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: '14px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none',
              background: '#FFFFFF'
            }}
          />
          <button
            type="submit"
            style={{ 
              padding: '0 16px', 
              borderRadius: '14px',
              background: '#056DB4',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
