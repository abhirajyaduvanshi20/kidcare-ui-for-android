import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const isObject = typeof toastMessage === 'object';
  const text = isObject ? toastMessage.text || toastMessage.message : toastMessage;
  const type = isObject ? toastMessage.type || 'success' : 'success';

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={18} color="#F94C66" />;
      case 'info':
        return <Info size={18} color="#056DB4" />;
      case 'celebrate':
        return <Sparkles size={18} color="#F5DC91" />;
      case 'success':
      default:
        return <CheckCircle2 size={18} color="#53BF9D" />;
    }
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '80px',
      left: '16px',
      right: '16px',
      background: 'rgba(1, 39, 65, 0.94)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#FFFFFF',
      padding: '12px 16px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      boxShadow: '0 12px 32px rgba(1, 39, 65, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      zIndex: 200,
      animation: 'slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {getIcon()}
        </div>
        <span style={{ fontSize: '13px', fontWeight: '600', lineHeight: 1.3 }}>
          {text}
        </span>
      </div>
    </div>
  );
};

