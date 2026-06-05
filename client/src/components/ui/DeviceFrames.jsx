import React from 'react'

export const LaptopFrame = ({ children, style, className }) => {
  return (
    <div className={`laptop-frame ${className || ''}`} style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '800px', 
      margin: '0 auto',
      ...style 
    }}>
      <div style={{ 
        position: 'relative', 
        paddingBottom: '60%', 
        background: '#1A1C23', 
        borderRadius: '16px 16px 0 0', 
        border: '12px solid #2C2F36',
        borderBottom: 'none',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }}>
        {/* Screen Content */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'hidden', background: 'var(--bg)' }}>
          {children}
        </div>
      </div>
      {/* Keyboard Base */}
      <div style={{ 
        height: '24px', 
        background: 'linear-gradient(to bottom, #4A4D55, #2C2F36)', 
        borderRadius: '0 0 16px 16px',
        position: 'relative',
        width: '110%',
        left: '-5%',
        borderTop: '2px solid #5A5D65',
        boxShadow: '0 10px 20px rgba(0,0,0,0.6)'
      }}>
         <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '8px', background: '#222', borderRadius: '0 0 8px 8px' }}></div>
      </div>
    </div>
  )
}

export const PhoneFrame = ({ children, style, className }) => {
  return (
    <div className={`phone-frame ${className || ''}`} style={{ 
      position: 'relative', 
      width: '300px', 
      height: '600px',
      margin: '0 auto',
      background: '#1A1C23', 
      borderRadius: '40px', 
      border: '12px solid #2C2F36',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 2px #4A4D55',
      overflow: 'hidden',
      ...style 
    }}>
      {/* Notch */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '140px', height: '24px', background: '#2C2F36', borderRadius: '0 0 16px 16px', zIndex: 10 }}></div>
      {/* Screen Content */}
      <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'var(--bg)' }}>
        {children}
      </div>
      {/* Home Indicator */}
      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', zIndex: 10 }}></div>
    </div>
  )
}

export const TabletFrame = ({ children, style, className }) => {
  return (
    <div className={`tablet-frame ${className || ''}`} style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '1024px', 
      aspectRatio: '4/3',
      margin: '0 auto',
      background: '#1A1C23', 
      borderRadius: '24px', 
      border: '16px solid #2C2F36',
      boxShadow: '0 24px 48px rgba(0,0,0,0.6), inset 0 0 0 2px #4A4D55',
      overflow: 'hidden',
      ...style 
    }}>
      {/* Screen Content */}
      <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'var(--bg)' }}>
        {children}
      </div>
    </div>
  )
}
