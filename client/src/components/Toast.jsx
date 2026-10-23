import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'info': return 'ℹ';
      default: return '✓';
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{getIcon()}</span>
          <span>{message}</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.2rem',
          }}
          aria-label="Dismiss toast"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
