import React from 'react';

// PUBLIC_INTERFACE
function AddRemoveControls({
  addAmount,
  setAddAmount,
  handleAddSavings,
  removeAmount,
  setRemoveAmount,
  handleRemoveSavings,
  savings,
  colors,
}) {
  return (
    <>
      <form
        onSubmit={handleAddSavings}
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '1rem',
          flexWrap: 'wrap',
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
            marginBottom: '5px',
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
            fontSize: '1.07rem',
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
          flexWrap: 'wrap',
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
            opacity:
              !removeAmount || parseFloat(removeAmount) > savings ? 0.6 : 1.0,
          }}
          type="submit"
          disabled={!removeAmount || parseFloat(removeAmount) > savings}
        >
          – Remove
        </button>
      </form>
    </>
  );
}

export default AddRemoveControls;
