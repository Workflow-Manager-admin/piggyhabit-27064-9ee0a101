import React, { useState } from 'react';
import './App.css';

import PiggyBankDisplay from './PiggyBankDisplay';
import AddRemoveControls from './AddRemoveControls';
import SavingsGoalsManager from './SavingsGoal';
import TransactionHistory from './TransactionHistory';

// PUBLIC_INTERFACE
function App() {
  // State management for savings, goal, and history
  const [savings, setSavings] = useState(0);
  const [goal, setGoal] = useState(100); // Default goal
  const [history, setHistory] = useState([]);
  const [addAmount, setAddAmount] = useState('');
  const [removeAmount, setRemoveAmount] = useState('');
  const [goalInput, setGoalInput] = useState(goal);

  // Savings Goals Feature State
  const [goals, setGoals] = useState([]); // Always an array
  const [selectedGoalId, setSelectedGoalId] = useState(null);

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
    // Accept only positive numbers with at most two decimals
    const value = parseFloat(addAmount);
    if (
      !isNaN(value) &&
      value > 0 &&
      // Check: at most two decimal digits (for realistic amounts)
      /^\d+(\.\d{1,2})?$/.test(addAmount.trim())
    ) {
      setSavings(prev => prev + value);
      setHistory(prev => [
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
          <PiggyBankDisplay
            savings={savings}
            formatCurrency={formatCurrency}
            colors={colors}
          />

          {/* Controls Section */}
          <AddRemoveControls
            addAmount={addAmount}
            setAddAmount={setAddAmount}
            handleAddSavings={handleAddSavings}
            removeAmount={removeAmount}
            setRemoveAmount={setRemoveAmount}
            handleRemoveSavings={handleRemoveSavings}
            savings={savings}
            colors={colors}
          />

          {/* Goal & Progress Section */}
          <section>
            <div style={{marginBottom: 18}}>
              {/* Simple progress/legacy goal if you wish; or just SavingsGoalsManager for now */}
              <form
                aria-label="Set Savings Goal"
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
              >
                <label htmlFor="goal-input" className="savings-goal-label" style={{fontSize:'1.12rem', color:colors.secondary, marginBottom: 6}}>Savings Goal (Quick set)</label>
                <div style={{display:'flex', alignItems:'center', gap:8, width:'100%'}}>
                  <input
                    id="goal-input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter savings goal"
                    value={goalInput}
                    onChange={e => setGoalInput(e.target.value)}
                    style={{
                      borderRadius: '6px',
                      border: `1px solid ${colors.primary}60`,
                      background: '#232323',
                      color: '#fff',
                      fontSize: '1.1rem',
                      padding: '7.5px 10px',
                      outline: 'none',
                      width: '120px',
                      marginRight: '10px'
                    }}
                  />
                  <button className="btn" type="submit" style={{
                    borderRadius: '6px',
                    background: colors.primary,
                    color: '#222',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    padding: '7px 12px',
                    minWidth: '70px'
                  }}>Set Goal</button>
                </div>
                <div className="savings-goal-bar-container" style={{
                  width:'100%',
                  background:'#232323',
                  borderRadius:'8px',
                  overflow:'hidden',
                  height:'18px',
                  margin: '12px 0',
                  border: '1.5px solid #FBC02D22'
                }}>
                  <div className="savings-goal-bar" style={{
                    background: colors.primary,
                    width: `${progress}%`,
                    height: '100%',
                    transition: 'width 0.45s cubic-bezier(0.77,0,0.18,1)'
                  }}/>
                </div>
                <div className="savings-goal-info" style={{
                  width:'100%',
                  display:'flex',
                  justifyContent:'space-between',
                  color:colors.primary,
                  fontSize:'0.98rem',
                  fontWeight:500,
                  letterSpacing:'0.1px',
                  marginTop:'-3px'
                }}>
                  <span>${formatCurrency(savings)}</span>
                  <span>{progress.toFixed(1)}%</span>
                  <span>Goal: ${formatCurrency(goal)}</span>
                </div>
              </form>
            </div>
            {/* Modern: goals feature */}
            <SavingsGoalsManager
              goals={goals}
              setGoals={setGoals}
              selectedGoalId={selectedGoalId}
              setSelectedGoalId={setSelectedGoalId}
              colors={colors}
              formatCurrency={formatCurrency}
              savings={savings}
            />
          </section>

          {/* Transaction History */}
          <TransactionHistory
            history={history}
            colors={colors}
            formatCurrency={formatCurrency}
          />

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
