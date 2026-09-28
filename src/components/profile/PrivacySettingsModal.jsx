import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, Lock, Smartphone, Cloud, Eye, Bell, Check } from 'lucide-react';

export const PrivacySettingsModal = () => {
  const { closeModal, showToast } = useApp();

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(true);
  const [shareRecordsWithClinic, setShareRecordsWithClinic] = useState(true);
  const [vaccineAlerts, setVaccineAlerts] = useState(true);
  const [doctorNotifications, setDoctorNotifications] = useState(true);

  const handleSave = () => {
    showToast("Privacy & security preferences updated");
    closeModal();
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <div
      onClick={onChange}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '20px',
        background: checked ? '#056DB4' : '#CBD5E1',
        padding: '2px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: checked ? 'flex-end' : 'flex-start'
      }}
    >
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  );

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Privacy & Security</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Device lock & health data protection</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Biometric Lock */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={18} color="#056DB4" />
              <div>
                <h5 style={{ fontSize: '13.5px', fontWeight: '700', color: '#012741' }}>Fingerprint / Biometric Lock</h5>
                <p style={{ fontSize: '11px', color: '#64748B' }}>Require authentication to open app</p>
              </div>
            </div>
            <ToggleSwitch checked={biometricEnabled} onChange={() => setBiometricEnabled(!biometricEnabled)} />
          </div>

          {/* Cloud Sync */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cloud size={18} color="#53BF9D" />
              <div>
                <h5 style={{ fontSize: '13.5px', fontWeight: '700', color: '#012741' }}>Encrypted Cloud Backup</h5>
                <p style={{ fontSize: '11px', color: '#64748B' }}>Safeguard growth & vaccine records</p>
              </div>
            </div>
            <ToggleSwitch checked={cloudBackup} onChange={() => setCloudBackup(!cloudBackup)} />
          </div>

          {/* Doctor access */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} color="#056DB4" />
              <div>
                <h5 style={{ fontSize: '13.5px', fontWeight: '700', color: '#012741' }}>Share Records with Dr. Ila B</h5>
                <p style={{ fontSize: '11px', color: '#64748B' }}>Allow pediatrician pre-consultation access</p>
              </div>
            </div>
            <ToggleSwitch checked={shareRecordsWithClinic} onChange={() => setShareRecordsWithClinic(!shareRecordsWithClinic)} />
          </div>

          {/* Notifications toggles */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={18} color="#F7931E" />
              <div>
                <h5 style={{ fontSize: '13.5px', fontWeight: '700', color: '#012741' }}>Vaccine & Flip Push Alerts</h5>
                <p style={{ fontSize: '11px', color: '#64748B' }}>Real-time reply & due reminders</p>
              </div>
            </div>
            <ToggleSwitch checked={vaccineAlerts} onChange={() => setVaccineAlerts(!vaccineAlerts)} />
          </div>

          <button
            onClick={handleSave}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '16px', marginTop: '10px' }}
          >
            <Check size={18} /> Save Privacy Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
