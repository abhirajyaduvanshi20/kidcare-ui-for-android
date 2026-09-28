import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, CheckCheck, Video, Syringe, MessageSquare, TrendingUp, ChevronRight } from 'lucide-react';

export const NotificationCenterModal = () => {
  const { closeModal, notifications, markNotificationAsRead, markAllNotificationsAsRead, openModal, setActiveTab } = useApp();

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    closeModal();
    if (notif.actionRoute === 'appointments') {
      setActiveTab('appointments');
    } else if (notif.actionRoute === 'flips') {
      setActiveTab('home');
    } else if (notif.actionRoute === 'vaccines') {
      openModal('vaccines');
    } else if (notif.actionRoute === 'growth') {
      openModal('growth-chart');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'appointment': return <Video size={16} color="#056DB4" />;
      case 'vaccine': return <Syringe size={16} color="#F7931E" />;
      case 'flip': return <MessageSquare size={16} color="#53BF9D" />;
      case 'growth': return <TrendingUp size={16} color="#8E2DE2" />;
      default: return <Bell size={16} color="#056DB4" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90%', display: 'flex', flexDirection: 'column' }}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Notifications</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Alerts, reminders & doctor updates</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={markAllNotificationsAsRead}
              style={{
                background: '#EBF4FA',
                border: 'none',
                color: '#056DB4',
                fontSize: '11px',
                fontWeight: '700',
                padding: '5px 10px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCheck size={13} /> Mark all read
            </button>

            <button 
              onClick={closeModal}
              style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={16} color="#64748B" />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#94A3B8' }}>
              <Bell size={36} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
              <p style={{ fontSize: '13px' }}>No new notifications.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                style={{
                  background: notif.read ? '#FFFFFF' : '#F0F7FC',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  border: notif.read ? '1px solid #E2E8F0' : '1.5px solid #BAE6FD',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: notif.read ? '#F1F5F9' : '#EBF4FA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {getIcon(notif.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#012741' }}>
                      {notif.title}
                    </h4>
                    <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>{notif.timestamp}</span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.35 }}>
                    {notif.body}
                  </p>
                </div>

                {!notif.read && (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#056DB4', flexShrink: 0, marginTop: '8px' }} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
