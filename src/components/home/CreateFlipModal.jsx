import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bold, Italic, Underline, List, Paperclip, Camera, Send, AlertTriangle, HelpCircle, ThumbsUp, Calendar } from 'lucide-react';

export const CreateFlipModal = () => {
  const { closeModal, modalData, addFlip, currentKid, kids, switchKid } = useApp();
  
  const initialType = modalData?.type || 'ASK_QUESTION';
  const [selectedType, setSelectedType] = useState(initialType);
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

  const handleAttachDemoPhoto = () => {
    setAttachedFiles(prev => [
      ...prev,
      { name: `symptom_photo_${Date.now().toString().slice(-4)}.jpg`, url: '/assets/ss.png', type: 'image' }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter both a title and description for Dr. Ila B.");
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
    }, 600);
  };

  const currentTypeConfig = flipTypeInfo[selectedType] || flipTypeInfo.ASK_QUESTION;
  const TypeIcon = currentTypeConfig.icon;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '92%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="sheet-handle" />

        {/* Header with selected Flip Gradient */}
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
              <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Create Flip Card</h3>
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

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, overflowY: 'auto' }}>
          {/* Flip Type Selector Chips */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Flip Category
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {Object.keys(flipTypeInfo).map((typeKey) => {
                const isCurrent = selectedType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => setSelectedType(typeKey)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '12px',
                      border: isCurrent ? '2px solid #056DB4' : '1px solid #E2E8F0',
                      background: isCurrent ? '#EBF4FA' : '#F8FAFC',
                      color: isCurrent ? '#056DB4' : '#64748B',
                      fontSize: '12px',
                      fontWeight: isCurrent ? '700' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {flipTypeInfo[typeKey].title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Child Selector */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Child Profile
            </label>
            <select
              value={currentKid.id}
              onChange={(e) => switchKid(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                color: '#012741',
                fontWeight: '600',
                background: '#FFFFFF'
              }}
            >
              {kids.map(k => (
                <option key={k.id} value={k.id}>
                  {k.name} ({k.age}, {k.bloodGroup})
                </option>
              ))}
            </select>
          </div>

          {/* Query Title */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Title / Summary
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
                outline: 'none'
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
                outline: 'none'
              }}
            />
          </div>

          {/* Attachments Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                Attachments (Photos, Reports, Thermometer)
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
                  padding: '4px 8px',
                  borderRadius: '8px',
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {attachedFiles.map((file, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#F1F5F9',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#334155'
                  }}>
                    <Paperclip size={13} />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                    >
                      <X size={12} />
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
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: '#FAF9F7'
                }}
              >
                <p style={{ fontSize: '12px', color: '#64748B' }}>Tap to capture or attach photo / lab report</p>
              </div>
            )}
          </div>

          {/* Submit CTA */}
          <div style={{ marginTop: '10px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '16px' }}
            >
              <Send size={18} />
              {isSubmitting ? 'Sending Flip to Doctor...' : 'Send Flip to Dr. Ila B'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
