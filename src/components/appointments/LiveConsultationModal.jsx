import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, MessageSquare, Shield, Send, Check, FileText, Camera, Volume2 } from 'lucide-react';

export const LiveConsultationModal = () => {
  const { closeModal, modalData, currentKid, addPrescriptionRecord } = useApp();

  const apt = modalData;
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Ila B', text: `Hello! I'm reviewing ${currentKid.name}'s recent symptoms and temperature chart.` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [prescriptionGenerated, setPrescriptionGenerated] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'You', text: inputMessage }
    ]);
    setInputMessage('');

    // Simulate doctor quick reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'Dr. Ila B', text: 'Understood. I am adding paracetamol drops and saline nasal spray to the digital prescription vault.' }
      ]);
    }, 1200);
  };

  const handleGeneratePrescription = () => {
    addPrescriptionRecord({
      title: `Live Consultation Prescription (${new Date().toLocaleDateString()})`,
      doctor: "Dr. Ila B",
      diagnosis: "Post-consultation acute viral symptom relief",
      medicines: [
        { name: "Calpol 100mg/ml Paediatric Drops", dosage: "1.2ml SOS", duration: "3 days", instructions: "Give if temperature > 100 F" },
        { name: "Nasoclear Saline Drops", dosage: "2 drops in each nostril", duration: "5 days", instructions: "Before feeds and sleep" }
      ]
    });
    setPrescriptionGenerated(true);
  };

  return (
    <div className="modal-fullscreen" style={{ background: '#07131F', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Top Video Call Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(7, 19, 31, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F94C66', animation: 'pulseGlow 1.5s infinite' }} />
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '800' }}>Dr. Ila B (Pediatrician)</h4>
            <p style={{ fontSize: '11px', color: '#53BF9D', fontWeight: '600' }}>Live Video Consultation • {formatDuration(callDuration)}</p>
          </div>
        </div>

        <button
          onClick={() => setShowChat(!showChat)}
          style={{
            background: showChat ? '#056DB4' : 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#FFFFFF',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <MessageSquare size={14} />
          <span>Chat</span>
        </button>
      </div>

      {/* Main Video View Area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d2235' }}>
        {/* Doctor Video Feed */}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img 
            src="/assets/dr_ilab_highres.jpg" 
            alt="Doctor Feed"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95)' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/dr_ila_b.png";
            }}
          />

          {/* Doctor Info Floating Badge */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(1, 39, 65, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '8px 14px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Volume2 size={16} color="#53BF9D" />
            <span style={{ fontSize: '12px', fontWeight: '700' }}>Dr. Ila B (Speaking)</span>
          </div>
        </div>

        {/* Local Picture-in-Picture (Parent & Child camera) */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '110px',
          height: '150px',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.6)',
          background: '#1E293B',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          zIndex: 20
        }}>
          {!isVideoOff ? (
            <img 
              src={currentKid?.photo || "/assets/kid1_1.png"} 
              alt="Child Camera"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: '#94A3B8' }}>
              <VideoOff size={24} />
            </div>
          )}
          <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: '700' }}>
            {currentKid.name.split(' ')[0]}
          </span>
        </div>

        {/* Live In-Call Chat Drawer */}
        {showChat && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'rgba(7, 19, 31, 0.95)',
            backdropFilter: 'blur(16px)',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 30,
            animation: 'slideUp 0.25s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800' }}>Live Consultation Chat</h4>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>Close</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  background: msg.sender === 'You' ? '#056DB4' : 'rgba(255,255,255,0.12)',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  fontSize: '12.5px'
                }}>
                  <strong style={{ fontSize: '10px', color: '#53BF9D', display: 'block' }}>{msg.sender}</strong>
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Message doctor..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 14px', borderRadius: '12px' }}>
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Prescription Generator Banner */}
      <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={16} color="#53BF9D" />
          <span style={{ fontSize: '12px', color: '#E2E8F0' }}>
            {prescriptionGenerated ? "Prescription saved to Records tab!" : "Generate Live Rx from Dr. Ila B"}
          </span>
        </div>

        {!prescriptionGenerated ? (
          <button
            onClick={handleGeneratePrescription}
            style={{ background: '#53BF9D', color: '#FFFFFF', border: 'none', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
          >
            + Save Prescription
          </button>
        ) : (
          <span style={{ fontSize: '11px', color: '#53BF9D', fontWeight: '700' }}>✓ Saved</span>
        )}
      </div>

      {/* Bottom In-Call Control Bar */}
      <div style={{
        padding: '18px 24px 28px',
        background: '#07131F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: isMuted ? '#F94C66' : 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
        </button>

        {/* End Call Button */}
        <button
          onClick={closeModal}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#F94C66',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(249, 76, 102, 0.45)'
          }}
          title="End Video Consultation"
        >
          <PhoneOff size={28} />
        </button>

        {/* Video Toggle Button */}
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: isVideoOff ? '#F94C66' : 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title={isVideoOff ? "Turn Video ON" : "Turn Video OFF"}
        >
          {isVideoOff ? <VideoOff size={22} /> : <VideoIcon size={22} />}
        </button>
      </div>
    </div>
  );
};
