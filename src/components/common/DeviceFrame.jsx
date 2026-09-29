import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, BatteryMedium, Signal, Smartphone, Maximize2, RotateCcw, LogIn, LogOut } from 'lucide-react';

export const DeviceFrame = ({ children }) => {
  const { isDeviceFrameEnabled, setIsDeviceFrameEnabled, isAuthenticated, logout, login } = useApp();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`device-frame-wrapper ${isDeviceFrameEnabled ? '' : 'frame-off'}`}>
      {/* Top Floating Controls on desktop/browser */}
      <div 
        className="dev-floating-controls"
        style={{
          position: 'fixed',
          top: '12px',
          zIndex: 999,
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '6px 14px',
          borderRadius: '30px',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#E2E8F0',
          fontSize: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#53BF9D' }}></span>
          <span>KidCare React (Android)</span>
        </div>

        {/* Quick Auth Switcher */}
        {isAuthenticated ? (
          <button
            onClick={logout}
            style={{
              background: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '14px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Go to Login & Code Screen"
          >
            <LogOut size={12} /> Go to Login Screen
          </button>
        ) : (
          <button
            onClick={login}
            style={{
              background: '#056DB5',
              color: '#FFFFFF',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '14px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Bypass Login"
          >
            <LogIn size={12} /> Skip to Home
          </button>
        )}

        <button
          onClick={() => setIsDeviceFrameEnabled(!isDeviceFrameEnabled)}
          style={{
            background: isDeviceFrameEnabled ? '#056DB5' : 'rgba(255,255,255,0.1)',
            color: '#FFFFFF',
            border: 'none',
            padding: '4px 10px',
            borderRadius: '14px',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {isDeviceFrameEnabled ? <Smartphone size={13} /> : <Maximize2 size={13} />}
          {isDeviceFrameEnabled ? 'Android Frame ON' : 'Fullscreen'}
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          style={{
            background: 'transparent',
            color: '#94A3B8',
            border: 'none',
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}
          title="Reset sample data and go to Login screen"
        >
          <RotateCcw size={12} /> Reset Data
        </button>
      </div>

      {/* The Android App Viewport */}
      <div 
        className={isDeviceFrameEnabled ? "app-viewport" : "app-viewport fullscreen-mode"} 
        style={!isDeviceFrameEnabled ? { maxWidth: '500px', height: '100vh', maxHeight: '100vh', borderRadius: 0, boxShadow: 'none' } : {}}
      >
        {/* Android Status Bar */}
        <div className="android-status-bar">
          <span>{currentTime || '09:41'}</span>
          <div className="status-bar-icons">
            <Signal size={14} />
            <Wifi size={14} />
            <BatteryMedium size={16} />
          </div>
        </div>

        {/* The active application contents */}
        {children}
      </div>
    </div>
  );
};
