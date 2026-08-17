import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, CheckCircle2, Info, Sparkles, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem',
      maxWidth: '380px',
      width: '100%',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => {
        let icon = <Info size={18} color="var(--primary-500)" />;
        let borderLeft = '4px solid var(--primary-500)';
        
        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} color="var(--emerald-500)" />;
          borderLeft = '4px solid var(--emerald-500)';
        } else if (toast.type === 'warning' || toast.type === 'critical') {
          icon = <AlertCircle size={18} color="var(--rose-500)" />;
          borderLeft = '4px solid var(--rose-500)';
        } else if (toast.type === 'ai') {
          icon = <Sparkles size={18} color="#8B5CF6" />;
          borderLeft = '4px solid #8B5CF6';
        }

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderLeft: borderLeft,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              animation: 'slideUp 200ms ease-out'
            }}
          >
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              {icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: 'var(--text-dim)',
                padding: '2px',
                borderRadius: '4px'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
