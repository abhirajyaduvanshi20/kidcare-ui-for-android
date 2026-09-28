import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { KidCareMainLogo, KidCareEmblemLogo, WhatsAppIcon } from '../common/AndroidIcons';
import { ArrowLeft } from 'lucide-react';

export const LoginScreen = () => {
  const { login, showToast } = useApp();
  const [screen, setScreen] = useState('welcome'); // 'welcome' | 'code'
  const [codeValue, setCodeValue] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (screen === 'code' && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [screen]);

  const handleDigitChange = (index, value) => {
    // Only accept single digit
    const cleaned = value.replace(/[^0-9]/g, '');
    const newCode = [...codeValue];
    
    if (cleaned.length > 0) {
      newCode[index] = cleaned[cleaned.length - 1];
      setCodeValue(newCode);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      newCode[index] = '';
      setCodeValue(newCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!codeValue[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pasted) {
      const newCode = ['', '', '', '', '', ''];
      for (let i = 0; i < pasted.length; i++) {
        newCode[i] = pasted[i];
      }
      setCodeValue(newCode);
      const nextIdx = Math.min(pasted.length, 5);
      if (inputRefs.current[nextIdx]) {
        inputRefs.current[nextIdx].focus();
      }
    }
  };

  const fullCode = codeValue.join('');
  const isCodeComplete = fullCode.length > 0;

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login();
      showToast('Verification Success');
    }, 300);
  };

  const handleQuickDemo = () => {
    setCodeValue(['1', '2', '3', '4', '5', '6']);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login();
      showToast('Verification Success');
    }, 500);
  };

  const openWhatsApp = () => {
    const url = "https://api.whatsapp.com/send?phone=919771438787&text=Hi,%0AI%20have%20installed%20the%20KidCare%20app%20and%20would%20need%20help%20setting%20it%20up%20with%20a%20login%20code.";
    window.open(url, '_blank');
  };

  // Screen 1: Welcome Screen (Matches LoginScreen.kt)
  if (screen === 'welcome') {
    return (
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#056DB5',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px'
        }}
      >
        {/* Background Image with 0.6 Alpha (kidcare_background_image_png.png) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/assets/kidcare_background_image_png.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* Top spacer */}
        <div style={{ height: '40px', zIndex: 2 }} />

        {/* Center: Official KidCare Main White Vector Logo */}
        <div 
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          <KidCareMainLogo width={220} height={145} />
        </div>

        {/* Bottom: Enter Login Code Button (Black container, rounded 10.dp, padding bottom ~100px) */}
        <div 
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '90px'
          }}
        >
          <button
            onClick={() => setScreen('code')}
            style={{
              background: '#000000',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '14px 36px',
              fontSize: '18px',
              fontWeight: 350,
              letterSpacing: '0.49px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              transition: 'transform 0.15s ease, background 0.2s ease',
              textAlign: 'center'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            &nbsp;&nbsp;&nbsp;Enter Login Code&nbsp;&nbsp;&nbsp;
          </button>
        </div>
      </div>
    );
  }

  // Screen 2: Login Code Screen (Matches LoginCodeScreen in LoginScreen.kt)
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px 20px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >
      {/* Top Back Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <button
          onClick={() => setScreen('welcome')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            color: '#1E293B',
            borderRadius: '50%'
          }}
          title="Back to Welcome"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Center Form Section */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '340px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* KidCare Emblem Logo (kidcarelogo.xml: 120x80dp) */}
        <div style={{ marginBottom: '20px' }}>
          <KidCareEmblemLogo width={120} height={70} />
        </div>

        {/* Title */}
        <h1 
          style={{
            fontSize: '28px',
            fontWeight: 400,
            color: '#1E293B',
            margin: '0 0 10px 0',
            letterSpacing: '-0.2px'
          }}
        >
          Enter Login Code
        </h1>

        {/* Subtitle */}
        <p 
          style={{
            fontSize: '15px',
            fontWeight: 400,
            color: '#475569',
            letterSpacing: '0.32px',
            lineHeight: 1.45,
            margin: '0 0 28px 0',
            padding: '0 10px'
          }}
        >
          Enter the login code shared by KidCare team.
        </p>

        {/* 6 Digit Input Boxes */}
        <form onSubmit={handleVerify} style={{ width: '100%' }}>
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '26px'
            }}
            onPaste={handlePaste}
          >
            {codeValue.map((char, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={char}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  width: '42px',
                  height: '52px',
                  border: char ? '2px solid #056DB5' : '1px solid #CBD5E1',
                  borderRadius: '8px',
                  background: char ? '#F0F7FC' : '#FFFFFF',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#056DB5',
                  outline: 'none',
                  transition: 'all 0.15s ease'
                }}
              />
            ))}
          </div>

          {/* Verify Button (PrimaryBlue, full width 80%) */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '85%',
              background: '#056DB5',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '24px',
              padding: '13px 20px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isLoading ? 'wait' : 'pointer',
              transition: 'background 0.2s ease, transform 0.1s ease',
              boxShadow: '0 4px 14px rgba(5, 109, 181, 0.35)',
              marginBottom: '16px'
            }}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          {/* Quick Demo Fill Helper */}
          <div>
            <button
              type="button"
              onClick={handleQuickDemo}
              style={{
                background: '#EBF4FA',
                border: '1px dashed #056DB5',
                color: '#056DB5',
                borderRadius: '16px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Demo Auto-Fill (123456)
            </button>
          </div>
        </form>
      </div>

      {/* Floating Trouble / WhatsApp Action Row (Matches FloatingActionButton in LoginCodeScreen) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #F1F5F9',
          marginTop: '20px'
        }}
      >
        <span style={{ fontSize: '13.5px', color: '#475569', fontWeight: 500 }}>
          Having trouble connecting?
        </span>
        <button
          type="button"
          onClick={openWhatsApp}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.15s ease'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Connect on WhatsApp (+91 9771438787)"
        >
          <WhatsAppIcon size={38} />
        </button>
      </div>
    </div>
  );
};
