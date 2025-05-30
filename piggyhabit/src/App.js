import React, { useState } from 'react';
import './App.css';

import PiggyBankDisplay from './PiggyBankDisplay';
import AddRemoveControls from './AddRemoveControls';
import SavingsGoal from './SavingsGoal';
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
          <SavingsGoal
            goalInput={goalInput}
            setGoalInput={setGoalInput}
            handleGoalChange={handleGoalChange}
            goal={goal}
            savings={savings}
            progress={progress}
            formatCurrency={formatCurrency}
            colors={colors}
          />

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
