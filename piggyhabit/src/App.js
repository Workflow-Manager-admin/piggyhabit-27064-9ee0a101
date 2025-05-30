import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // State management for savings, goal, and history
  const [savings, setSavings] = useState(0);
  const [goal, setGoal] = useState(100); // Default goal
  const [history, setHistory] = useState([]);
  const [addAmount, setAddAmount] = useState('');
  const [removeAmount, setRemoveAmount] = useState('');
  const [goalInput, setGoalInput] = useState(goal);

  // Colors - as per requirements
  const colors = {
    primary: '#FBC02D',
    secondary: '#FFF9C4',
    accent: '#388E3C'
  };

  // Helpers
  const formatCurrency = (amount) =>
    Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // PUBLIC_INTERFACE
  function handleAddSavings(e) {
    e.preventDefault();
    const value = parseFloat(addAmount);
    if (!isNaN(value) && value > 0) {
      setSavings((prev) => prev + value);
      setHistory((prev) => [
        { type: 'add', amount: value, timestamp: new Date() },
        ...prev,
      ]);
      setAddAmount('');
    }
  }

  // PUBLIC_INTERFACE
  function handleRemoveSavings(e) {
    e.preventDefault();
    const value = parseFloat(removeAmount);
    if (!isNaN(value) && value > 0) {
      if (value > savings) return; // Don't allow removing more than total
      setSavings((prev) => prev - value);
      setHistory((prev) => [
        { type: 'remove', amount: value, timestamp: new Date() },
        ...prev,
      ]);
      setRemoveAmount('');
    }
  }

  // PUBLIC_INTERFACE
  function handleGoalChange(e) {
    e.preventDefault();
    const value = parseFloat(goalInput);
    if (!isNaN(value) && value > 0) {
      setGoal(value);
    }
  }

  // Progress calculation
  const progress = goal > 0 ? Math.min((savings / goal) * 100, 100) : 0;

  // Keyboard accessibility: pressing Enter submits forms
  // UI Components
  return (
    <div className="app" style={{ background: '#181818', minHeight: '100vh', color: '#fff' }}>
      <nav className="navbar" style={{ background: '#181818', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="logo" style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <span className="logo-symbol" aria-label="Piggy bank" style={{ color: colors.primary, fontSize: '2rem', marginRight: '0.5rem' }}>
              🐷
            </span>
            PiggyHabit
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ maxWidth: '500px', marginTop: '110px', marginBottom: '40px' }}>
          {/* Piggy bank + Savings Summary */}
          <div style={{
            background: '#232323',
            borderRadius: '20px',
            padding: '32px 20px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 2px 20px 0 rgba(0,0,0,0.12)',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '5rem', color: colors.primary, textShadow: '0 2px 8px #0004', marginBottom: 12 }} role="img" aria-label="Piggy bank">
              🐖
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: colors.primary,
              marginBottom: 4,
              letterSpacing: '0.5px'
            }}>
              ${formatCurrency(savings)}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: '2px' }}>
              Current Savings
            </div>
          </div>

          {/* Controls Section */}
          <form
            onSubmit={handleAddSavings}
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}
            aria-label="Add Savings"
          >
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              placeholder="Add amount"
              aria-label="Amount to add"
              value={addAmount}
              onChange={e => setAddAmount(e.target.value)}
              style={{
                flex: '3 1 120px',
                borderRadius: '6px',
                border: `1px solid ${colors.primary}60`,
                background: '#232323',
                color: '#fff',
                fontSize: '1.1rem',
                padding: '8px 10px',
                outline: 'none',
                marginBottom: '5px'
              }}
            />
            <button
              className="btn"
              style={{
                borderRadius: '6px',
                background: colors.primary,
                color: '#222',
                minWidth: '105px',
                fontWeight: 600,
                fontSize: '1.07rem'
              }}
              type="submit"
            >
              + Add
            </button>
          </form>
          <form
            onSubmit={handleRemoveSavings}
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}
            aria-label="Remove Savings"
          >
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              max={savings}
              placeholder="Remove amount"
              aria-label="Amount to remove"
              value={removeAmount}
              onChange={e => setRemoveAmount(e.target.value)}
              style={{
                flex: '3 1 120px',
                borderRadius: '6px',
                border: `1px solid ${colors.primary}60`,
                background: '#232323',
                color: '#fff',
                fontSize: '1.1rem',
                padding: '8px 10px',
                outline: 'none',
              }}
            />
            <button
              className="btn"
              style={{
                borderRadius: '6px',
                background: colors.accent,
                color: '#fff',
                minWidth: '105px',
                fontWeight: 600,
                fontSize: '1.07rem',
                opacity: (!removeAmount || parseFloat(removeAmount) > savings) ? 0.6 : 1.0,
              }}
              type="submit"
              disabled={!removeAmount || parseFloat(removeAmount) > savings}
            >
              – Remove
            </button>
          </form>

          {/* Goal & Progress Section */}
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
              boxShadow: '0 1px 8px 0 rgba(0,0,0,0.10)'
            }}
            aria-label="Set Savings Goal"
          >
            <div style={{
              fontSize: '1.12rem',
              color: colors.secondary,
              marginBottom: 6,
            }}>
              Savings Goal:
            </div>
            <div style={{ display: 'flex', width: '100%', maxWidth: 340, gap: 6, marginBottom: 10 }}>
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
                style={{ borderRadius: '6px', background: colors.primary, color: '#222', fontWeight: 600, fontSize: '1.02rem', padding: '8.5px 14px' }}
                type="submit"
                disabled={parseFloat(goalInput) < 1}
              >
                Set Goal
              </button>
            </div>
            <div style={{
              width: '100%',
              background: '#232323',
              borderRadius: '8px',
              overflow: 'hidden',
              height: '18px',
              margin: '12px 0',
              border: `1.5px solid ${colors.primary}22`
            }}>
              <div
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
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              color: '#fff',
              fontSize: '0.98rem',
              fontWeight: 500,
              letterSpacing: '0.1px',
              marginTop: '-3px'
            }}>
              <span>
                ${formatCurrency(savings)}
              </span>
              <span>{progress.toFixed(1)}%</span>
              <span>
                Goal: ${formatCurrency(goal)}
              </span>
            </div>
          </form>

          {/* Transaction History */}
          <section
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
            <div style={{
              color: colors.primary,
              fontWeight: 600,
              fontSize: '1.13rem',
              marginBottom: '8px',
              letterSpacing: '0.1px'
            }}>
              Transaction History
            </div>
            {history.length === 0 ? (
              <div style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', padding: '10px 0' }}>
                No transactions added yet.
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {history.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 0',
                      borderBottom: idx < history.length - 1 ? '1px dotted #393939' : 'none',
                      color: item.type === 'add' ? colors.accent : '#EF5350', // Green/add, red/remove
                      fontWeight: item.type === 'add' ? 500 : 600,
                      fontSize: '1.04rem',
                    }}>
                      <span>
                        {item.type === 'add' ? '+' : '–'}${formatCurrency(item.amount)}
                        <span style={{
                          fontSize: '0.92rem',
                          fontWeight: 400,
                          color: 'rgba(255,255,255,0.65)',
                          marginLeft: '1.2em'
                        }}>
                          {item.timestamp.toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </span>
                      <span style={{
                        fontSize: '0.97rem',
                        fontWeight: 400,
                        background: item.type === 'add' ? '#388E3C44' : '#EF535037',
                        color: item.type === 'add' ? colors.accent : '#EF5350',
                        borderRadius: '6px',
                        padding: '1.5px 8px',
                        minWidth: '58px',
                        textAlign: 'center',
                        marginLeft: '10px'
                      }}>
                        {item.type === 'add' ? 'Savings' : 'Withdrawal'}
                      </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <div style={{ height: 16 }} />
          <footer style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.97rem', textAlign: 'center', padding: '22px 0 10px 0' }}>
            PiggyHabit | <span style={{ color: colors.primary }}>MVP</span> &mdash; Simulated digital piggy bank for habit motivation.<br />
            No real money is processed or stored.
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
