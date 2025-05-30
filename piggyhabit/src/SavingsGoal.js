import React from 'react';

// PUBLIC_INTERFACE
function SavingsGoal({
  goalInput,
  setGoalInput,
  handleGoalChange,
  goal,
  savings,
  progress,
  formatCurrency,
  colors,
}) {
  return (
    <form
      onSubmit={handleGoalChange}
      style={{
        background: '#181818',
        borderRadius: '10px',
        padding: '16px 16px 20px 16px',
        marginBottom: '1.8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 1px 8px 0 rgba(0,0,0,0.10)',
      }}
      aria-label="Set Savings Goal"
    >
      <div
        className="savings-goal-label"
        style={{
          fontSize: '1.12rem',
          color: colors.secondary,
          marginBottom: 6,
        }}
      >
        Savings Goal:
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 340,
          gap: 6,
          marginBottom: 10,
        }}
      >
        <input
          type="number"
          inputMode="decimal"
          min="1"
          step="1"
          value={goalInput}
          onChange={e => setGoalInput(e.target.value)}
          aria-label="Set savings goal"
          style={{
            flex: '4 1 140px',
            borderRadius: '6px',
            border: `1px solid ${colors.primary}60`,
            background: '#232323',
            color: '#fff',
            fontSize: '1.08rem',
            padding: '7.5px 10px',
            outline: 'none',
          }}
        />
        <button
          className="btn"
          style={{
            borderRadius: '6px',
            background: colors.primary,
            color: '#222',
            fontWeight: 600,
            fontSize: '1.02rem',
            padding: '8.5px 14px',
          }}
          type="submit"
          disabled={parseFloat(goalInput) < 1}
        >
          Set Goal
        </button>
      </div>
      <div
        className="savings-goal-bar-container"
        style={{
          width: '100%',
          background: '#232323',
          borderRadius: '8px',
          overflow: 'hidden',
          height: '18px',
          margin: '12px 0',
          border: `1.5px solid ${colors.primary}22`,
        }}
      >
        <div
          className="savings-goal-bar"
          style={{
            background: colors.primary,
            width: `${progress}%`,
            height: '100%',
            transition: 'width 0.45s cubic-bezier(0.77,0,0.18,1)',
          }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Goal progress"
          role="progressbar"
        />
      </div>
      <div
        className="savings-goal-info"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#fff',
          fontSize: '0.98rem',
          fontWeight: 500,
          letterSpacing: '0.1px',
          marginTop: '-3px',
        }}
      >
        <span>${formatCurrency(savings)}</span>
        <span>{progress.toFixed(1)}%</span>
        <span>Goal: ${formatCurrency(goal)}</span>
      </div>
    </form>
  );
}

export default SavingsGoal;
