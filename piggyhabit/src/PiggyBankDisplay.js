import React from 'react';

// PUBLIC_INTERFACE
function PiggyBankDisplay({ savings, formatCurrency, colors }) {
  return (
    <div
      className="piggy-summary"
      style={{
        background: '#232323',
        borderRadius: '20px',
        padding: '32px 20px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 20px 0 rgba(0,0,0,0.12)',
        marginBottom: '2rem',
      }}
    >
      <div
        className="piggy-emoji"
        style={{
          fontSize: '5rem',
          color: colors.primary,
          textShadow: '0 2px 8px #0004',
          marginBottom: 12,
        }}
        role="img"
        aria-label="Piggy bank"
      >
        🐖
      </div>
      <div
        className="savings-total"
        style={{
          fontSize: '2rem',
          fontWeight: 600,
          color: colors.primary,
          marginBottom: 4,
          letterSpacing: '0.5px',
        }}
      >
        ${formatCurrency(savings)}
      </div>
      <div
        className="savings-label"
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '1.05rem',
          marginBottom: '2px',
        }}
      >
        Current Savings
      </div>
    </div>
  );
}

export default PiggyBankDisplay;
