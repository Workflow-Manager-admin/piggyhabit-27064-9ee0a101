import React from 'react';

// PUBLIC_INTERFACE
function TransactionHistory({ history, colors, formatCurrency }) {
  return (
    <section
      className="transaction-history"
      aria-label="Transaction History"
      style={{
        background: '#222',
        borderRadius: '14px',
        padding: '17px 12px 17px 18px',
        minHeight: '120px',
        maxHeight: '256px',
        overflowY: 'auto',
        boxShadow: '0 1px 8px 0 rgba(0,0,0,0.10)',
      }}
    >
      <div
        className="transaction-history-title"
        style={{
          color: colors.primary,
          fontWeight: 600,
          fontSize: '1.13rem',
          marginBottom: '8px',
          letterSpacing: '0.1px',
        }}
      >
        Transaction History
      </div>
      {history.length === 0 ? (
        <div
          className="transaction-empty"
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontStyle: 'italic',
            padding: '10px 0',
          }}
        >
          No transactions added yet.
        </div>
      ) : (
        <ul
          className="transaction-history-list"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {history.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 0',
                borderBottom:
                  idx < history.length - 1 ? '1px dotted #393939' : 'none',
                color: item.type === 'add' ? colors.accent : '#EF5350',
                fontWeight: item.type === 'add' ? 500 : 600,
                fontSize: '1.04rem',
              }}
            >
              <span>
                {item.type === 'add' ? '+' : '–'}${formatCurrency(item.amount)}
                <span
                  className="transaction-meta"
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.65)',
                    marginLeft: '1.2em',
                  }}
                >
                  {item.timestamp.toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </span>
              <span
                className={[
                  'transaction-type-badge',
                  item.type === 'remove' ? 'remove' : '',
                ].join(' ')}
                style={{
                  fontSize: '0.97rem',
                  fontWeight: 400,
                  background: item.type === 'add'
                    ? '#388E3C44'
                    : '#EF535037',
                  color: item.type === 'add' ? colors.accent : '#EF5350',
                  borderRadius: '6px',
                  padding: '1.5px 8px',
                  minWidth: '58px',
                  textAlign: 'center',
                  marginLeft: '10px',
                }}
              >
                {item.type === 'add' ? 'Savings' : 'Withdrawal'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TransactionHistory;
