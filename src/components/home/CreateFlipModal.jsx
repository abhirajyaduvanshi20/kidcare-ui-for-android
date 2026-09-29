import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Paperclip, 
  Send, 
  X, 
  Image as ImageIcon,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const CreateFlipModal = () => {
  const { closeModal, modalData, addFlip, currentKid, showToast } = useApp();
  
  const selectedType = modalData?.type || 'FEEDBACK'; // default or passed
  const [sentiment, setSentiment] = useState('Happy'); // 'Sad' | 'Happy' | 'Great'
  const [feedbackNote, setFeedbackNote] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form for standard question / flip types if not feedback
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUploadImageMock = () => {
    setAttachedImage('/assets/ss.png');
    showToast('Photo attached: image_attachment.jpg');
  };

  const handleRemoveImage = () => {
    setAttachedImage(null);
  };

  const handleSendFeedback = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      addFlip({
        type: 'FEEDBACK',
        title: `Care Partner Experience: ${sentiment}`,
        description: feedbackNote || `Parent shared "${sentiment}" rating for Care Partner consultation. Status: ${getSentimentQuote()}`,
        sentiment: sentiment,
        attachments: attachedImage ? [{ name: 'attached_image.png', url: attachedImage, type: 'image' }] : []
      });
      setIsSubmitting(false);
      showToast('Flip feedback submitted successfully!');
      closeModal();
    }, 400);
  };

  const handleSendGeneralFlip = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter a title and message for Dr. Ila B.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addFlip({
        type: selectedType,
        title,
        description,
        attachments: attachedImage ? [{ name: 'attached_image.png', url: attachedImage, type: 'image' }] : []
      });
      setIsSubmitting(false);
      showToast('Flip sent successfully!');
      closeModal();
    }, 400);
  };

  const getSentimentQuote = () => {
    if (sentiment === 'Happy') return 'Glad things went well 🙂';
    if (sentiment === 'Great') return 'Glad things went well 😄';
    return "We're sorry things didn't go as expected 🙁";
  };

  const getSentimentColor = () => {
    if (sentiment === 'Happy') return '#EAB308';
    if (sentiment === 'Great') return '#16A34A';
    return '#EA580C';
  };

  // If type is FEEDBACK or CarePartner rating (matches Screenshot 1)
  if (selectedType === 'FEEDBACK') {
    return (
      <div 
        className="modal-fullscreen"
        style={{
          position: 'absolute',
          inset: 0,
          background: '#FAF9F7',
          zIndex: 130,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.2s ease'
        }}
      >
        {/* Top App Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px',
          background: '#FAF9F7',
          position: 'relative'
        }}>
          <button
            onClick={closeModal}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1E293B',
              zIndex: 2
            }}
            title="Back"
          >
            <ArrowLeft size={24} color="#1E293B" />
          </button>

          <h2 style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '700',
            color: '#1E293B',
            margin: 0,
            pointerEvents: 'none'
          }}>
            Send Flip
          </h2>

          <div style={{ width: '24px' }} />
        </div>

        {/* Center Section with Emojis (Screenshot 1 Match) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 24px',
          gap: '28px'
        }}>
          {/* Question Text */}
          <h3 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#1E293B',
            textAlign: 'center',
            letterSpacing: '-0.2px'
          }}>
            How was your experience with Care Partner?
          </h3>

          {/* 3 Emoji Face Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px'
          }}>
            {/* 1. Sad */}
            <div 
              onClick={() => setSentiment('Sad')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F77737',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: sentiment === 'Sad' ? '0 0 24px rgba(247, 119, 55, 0.5)' : 'none',
                transform: sentiment === 'Sad' ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}>
                {/* SVG Sad Face */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  {/* Eyes */}
                  <circle cx="14" cy="17" r="2.8" fill="#1E293B" />
                  <circle cx="26" cy="17" r="2.8" fill="#1E293B" />
                  {/* Straight / Neutral line mouth */}
                  <line x1="14" y1="26" x2="26" y2="26" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: sentiment === 'Sad' ? '700' : '500',
                color: '#1E293B'
              }}>
                Sad
              </span>
            </div>

            {/* 2. Happy (Center) */}
            <div 
              onClick={() => setSentiment('Happy')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: '#F5BA31',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: sentiment === 'Happy' ? '0 0 30px rgba(245, 186, 49, 0.65)' : 'none',
                transform: sentiment === 'Happy' ? 'scale(1.12)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}>
                {/* SVG Happy Face */}
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                  {/* Eyes */}
                  <circle cx="16" cy="19" r="3" fill="#1E293B" />
                  <circle cx="30" cy="19" r="3" fill="#1E293B" />
                  {/* Smile mouth */}
                  <path d="M16 26C18 31 28 31 30 26" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: sentiment === 'Happy' ? '800' : '500',
                color: '#1E293B'
              }}>
                Happy
              </span>
            </div>

            {/* 3. Great */}
            <div 
              onClick={() => setSentiment('Great')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#6BBF59',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: sentiment === 'Great' ? '0 0 24px rgba(107, 191, 89, 0.5)' : 'none',
                transform: sentiment === 'Great' ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}>
                {/* SVG Great Face with squinted happy eyes */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  {/* Squint Eyes ^ ^ */}
                  <path d="M11 18C13 15 16 15 18 18" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  <path d="M22 18C24 15 27 15 29 18" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  {/* Big Smile */}
                  <path d="M14 24C16 29 24 29 26 24" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="#1E293B" />
                </svg>
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: sentiment === 'Great' ? '700' : '500',
                color: '#1E293B'
              }}>
                Great
              </span>
            </div>
          </div>

          {/* Sentiment Message Quote */}
          <div style={{
            fontSize: '16px',
            fontWeight: '800',
            color: getSentimentColor(),
            textAlign: 'center',
            minHeight: '26px'
          }}>
            {getSentimentQuote()}
          </div>

          {/* If image is attached, show preview */}
          {attachedImage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0'
            }}>
              <ImageIcon size={16} color="#056DB5" />
              <span style={{ fontSize: '12px', color: '#334155' }}>image_attachment.jpg</span>
              <button
                onClick={handleRemoveImage}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}
              >
                <Trash2 size={14} color="#EF4444" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Bar matching Screenshot 1 */}
        <div style={{
          padding: '16px 18px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#FAF9F7'
        }}>
          {/* Upload Image Pill Button */}
          <button
            onClick={handleUploadImageMock}
            style={{
              flex: 1,
              background: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '30px',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              color: '#334155',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <Paperclip size={18} color="#475569" />
            <span>Upload Image</span>
          </button>

          {/* Send Circular Button */}
          <button
            onClick={handleSendFeedback}
            disabled={isSubmitting}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#056DB5',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(5, 109, 181, 0.4)',
              flexShrink: 0
            }}
            title="Send Flip"
          >
            <Send size={20} color="#FFFFFF" style={{ marginLeft: '2px' }} />
          </button>
        </div>

      </div>
    );
  }

  // General Flip (Ask a question / Routine milestone / Emergency)
  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '92%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="sheet-handle" />

        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>
            {selectedType === 'EMERGENCY' ? 'Emergency Flip' : 'Ask Dr. Ila B'}
          </h3>

          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSendGeneralFlip} style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, overflowY: 'auto' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Subject / Title
            </label>
            <input
              type="text"
              placeholder="e.g. Query about recent fever or diet..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                outline: 'none',
                color: '#012741'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Message
            </label>
            <textarea
              placeholder="Describe child's symptoms, duration, current feeding condition..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                color: '#012741'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '14px', marginTop: '8px' }}
          >
            <Send size={16} /> Send Flip
          </button>
        </form>
      </div>
    </div>
  );
};
