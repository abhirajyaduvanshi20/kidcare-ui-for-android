import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Camera, Send, AlertTriangle, HelpCircle, ThumbsUp, Calendar, Trash2 } from 'lucide-react';

export const CreateFlipModal = () => {
  const { closeModal, modalData, addFlip, currentKid } = useApp();
  
  const selectedType = modalData?.type || 'ASK_QUESTION';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const flipTypeInfo = {
    ASK_QUESTION: { title: 'Ask a Question', icon: HelpCircle, gradient: 'linear-gradient(135deg, #1E73B8 0%, #0F5FA5 100%)' },
    EMERGENCY: { title: 'Emergency Query', icon: AlertTriangle, gradient: 'linear-gradient(135deg, #F7931E 0%, #E36A00 100%)' },
    FEEDBACK: { title: 'Treatment Feedback', icon: ThumbsUp, gradient: 'linear-gradient(135deg, #B24592 0%, #8E2DE2 100%)' },
    ROUTINE_CHECK: { title: 'Routine Milestone', icon: Calendar, gradient: 'linear-gradient(135deg, #5BBF9B 0%, #3AA17E 100%)' }
  };

  const currentTypeConfig = flipTypeInfo[selectedType] || flipTypeInfo.ASK_QUESTION;
  const TypeIcon = currentTypeConfig.icon;

  const handleAttachDemoPhoto = () => {
    setAttachedFiles(prev => [
      ...prev,
      { name: `symptom_photo_${Date.now().toString().slice(-4)}.jpg`, url: '/assets/ss.png', type: 'image' }
    ]);
  };

  const handleRemovePhoto = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
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
        attachments: attachedFiles
      });
      setIsSubmitting(false);
      closeModal();
    }, 400);
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '92%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="sheet-handle" />

        {/* Top Header with Selected Flip Type */}
        <div style={{
          background: currentTypeConfig.gradient,
          margin: '-20px -20px 16px -20px',
          padding: '18px 20px',
          borderRadius: '28px 28px 0 0',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TypeIcon size={20} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '800' }}>{currentTypeConfig.title}</h3>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>For {currentKid.name} • Dr. Ila B</p>
            </div>
          </div>

          <button 
            onClick={closeModal}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFFFFF' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Clean Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, overflowY: 'auto' }}>
          {/* Query Title */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Subject / Title
            </label>
            <input
              type="text"
              placeholder="e.g. Mild fever after vaccination shot"
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

          {/* Query Description */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Detailed Message & Symptoms
            </label>
            <textarea
              placeholder="Describe symptoms, temperature, duration, current feeding/sleep condition..."
              rows={5}
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

          {/* Attachments Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                Attachments (Optional)
              </label>
              <button
                type="button"
                onClick={handleAttachDemoPhoto}
                style={{
                  background: '#EBF4FA',
                  border: 'none',
                  color: '#056DB4',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Camera size={13} /> + Attach Photo
              </button>
            </div>

            {attachedFiles.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {attachedFiles.map((file, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px'
                  }}>
                    <span style={{ color: '#012741', fontWeight: '600' }}>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(i)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={handleAttachDemoPhoto}
                style={{
                  border: '1.5px dashed #CBD5E1',
                  borderRadius: '12px',
                  padding: '14px',
                  textAlign: 'center',
                  color: '#64748B',
                  fontSize: '12px',
                  cursor: 'pointer',
                  background: '#FAF9F7'
                }}
              >
                Tap to attach photo or medical report
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Send size={16} />
              {isSubmitting ? 'Sending Flip...' : 'Send Flip to Dr. Ila B'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
