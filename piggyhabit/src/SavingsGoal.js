import React, { useState } from 'react';

// Field helpers
function defaultGoal() {
  return {
    id: Date.now() + Math.random().toString(36).slice(2),
    title: '',
    target: '',
    notes: '',
    category: '',
    reminder: '',
    priority: 0,
    saved: 0,
    created: new Date(),
  };
}

// PUBLIC_INTERFACE
function SavingsGoalsManager({
  goals,
  setGoals,
  selectedGoalId,
  setSelectedGoalId,
  updateGoalSaved,
  colors,
  formatCurrency,
  savings,
}) {
  const [editingGoal, setEditingGoal] = useState(null); // null or goal obj being edited
  const [newGoal, setNewGoal] = useState(defaultGoal());
  const [editDraft, setEditDraft] = useState(null);

  // Priority helpers
  const orderedGoals = [...goals].sort((a, b) => a.priority - b.priority);

  // PUBLIC_INTERFACE
  function handleGoalFieldChange(e, goalObj, setGoalObj) {
    const { name, value } = e.target;
    setGoalObj({ ...goalObj, [name]: value });
  }

  function addGoal(e) {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;
    setGoals(prev => [
      ...prev,
      {
        ...newGoal,
        target: parseFloat(newGoal.target),
        priority: prev.length,
        saved: 0,
        created: new Date(),
      },
    ]);
    setNewGoal(defaultGoal());
  }

  function startEdit(goal) {
    setEditingGoal(goal.id);
    setEditDraft({ ...goal });
  }

  function saveEditGoal(e) {
    e.preventDefault();
    setGoals(goals =>
      goals.map(g =>
        g.id === editingGoal
          ? {
              ...g,
              ...editDraft,
              target: parseFloat(editDraft.target),
            }
          : g
      )
    );
    setEditingGoal(null);
    setEditDraft(null);
  }

  function cancelEdit() {
    setEditingGoal(null);
    setEditDraft(null);
  }

  function deleteGoal(goalId) {
    setGoals(goals => {
      const filtered = goals.filter(g => g.id !== goalId);
      // Re-assign priorities to keep sort order valid
      return filtered.map((g, idx) => ({ ...g, priority: idx }));
    });
    if (selectedGoalId === goalId) setSelectedGoalId(null);
  }

  function moveGoal(goalId, direction) {
    // direction: -1 (up), 1 (down)
    setGoals(goals => {
      const idx = goals.findIndex(g => g.id === goalId);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= goals.length) return goals;
      const reordered = [...goals];
      [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];
      return reordered.map((g, i) => ({ ...g, priority: i }));
    });
  }

  // Goal progress helper
  function goalProgress(goal) {
    if (!goal.target || goal.target === 0) return 0;
    return Math.min((goal.saved / goal.target) * 100, 100);
  }

  return (
    <section style={{
      background: '#181818',
      borderRadius: '10px',
      padding: '16px 12px',
      marginBottom: '2rem',
      boxShadow: '0 1px 8px 0 rgba(0,0,0,0.10)',
    }}>
      <div
        className="savings-goal-label"
        style={{
          fontSize: '1.12rem',
          color: colors.secondary,
          marginBottom: 8,
        }}
      >
        Savings Goals
      </div>
      <form onSubmit={addGoal} style={{display: 'flex', flexWrap:'wrap', gap:8, alignItems:'flex-end', marginBottom:16}}>
        <input
          type="text"
          name="title"
          placeholder="Goal name"
          required
          value={newGoal.title}
          onChange={e => handleGoalFieldChange(e, newGoal, setNewGoal)}
          style={{
            flex: '2 1 90px',
            borderRadius: '6px',
            border: `1px solid ${colors.primary}60`,
            background: '#232323',
            color: '#fff',
            fontSize: '1.04rem',
            padding: '7.5px 10px',
            outline: 'none',
          }}
        />
        <input
          type="number"
          name="target"
          placeholder="Target ($)"
          min="1"
          required
          value={newGoal.target}
          onChange={e => handleGoalFieldChange(e, newGoal, setNewGoal)}
          style={{
            flex: '1 1 75px',
            borderRadius: '6px',
            border: `1px solid ${colors.primary}60`,
            background: '#232323',
            color: '#fff',
            fontSize: '1.04rem',
            padding: '7.5px 8px',
            outline: 'none',
            marginLeft:4
          }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newGoal.category}
          onChange={e => handleGoalFieldChange(e, newGoal, setNewGoal)}
          style={{
            flex: '1 1 70px',
            borderRadius: '6px',
            border: `1px solid ${colors.primary}60`,
            background: '#232323',
            color: '#fff',
            fontSize: '1.01rem',
            padding: '7px 7px',
            outline: 'none',
            marginLeft:4
          }}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={newGoal.notes}
          onChange={e => handleGoalFieldChange(e, newGoal, setNewGoal)}
          style={{
            flex: '2 1 90px',
            borderRadius: '6px',
            border: `1px solid ${colors.primary}60`,
            background: '#232323',
            color: '#fff',
            fontSize: '1.01rem',
            padding: '7px 7px',
            outline: 'none',
            marginLeft:4
          }}
        />
        <input
          type="text"
          name="reminder"
          placeholder="e.g. Every Friday"
          value={newGoal.reminder}
          onChange={e => handleGoalFieldChange(e, newGoal, setNewGoal)}
          style={{
            flex: '1 1 110px',
            borderRadius: '6px',
            border: `1px solid ${colors.primary}60`,
            background: '#232323',
            color: '#fff',
            fontSize: '1.01rem',
            padding: '7px 7px',
            outline: 'none',
            marginLeft:4
          }}
        />
        <button
          className="btn"
          type="submit"
          style={{
            borderRadius: '6px',
            background: colors.primary,
            color: '#222',
            fontWeight: 600,
            fontSize: '1.07rem',
            padding:'8px 16px',
            marginLeft:8,
            minWidth: '98px',
          }}>
          Add Goal
        </button>
      </form>
      
      <div style={{marginBottom:8, color:colors.primary, fontWeight:600, fontSize:'1.04rem'}}>Your Goals</div>
      {orderedGoals.length === 0 && 
        <div style={{ color: '#ccc', fontStyle:'italic', padding:'8px'}}>No savings goals set.</div>
      }
      <ul style={{ listStyle:'none', padding:0, margin:0, maxHeight:200, overflowY:'auto' }}>
      {orderedGoals.map((goal, idx) => (
        <li key={goal.id} style={{
          borderRadius:8, marginBottom:8, background:selectedGoalId===goal.id ? colors.secondary+'15' : '#1a1a1a',
          border:'1.5px solid '+(selectedGoalId===goal.id ? colors.primary+'99':'#232323'),
          boxShadow: '0 1px 8px 0 rgba(0,0,0,0.07)', padding:10,
          display:'flex', flexDirection:'column', gap:8,
        }}>
          <div style={{display:'flex',alignItems:'center',gap:12, justifyContent:'space-between'}}>
            <input type="radio" checked={selectedGoalId === goal.id}
              onChange={()=>setSelectedGoalId(goal.id)}
              aria-label={`Choose ${goal.title}`}
              style={{accentColor:colors.primary, marginRight:4}}
            />
            <strong style={{flex:'3 1 90px',color:colors.primary}}>{goal.title}</strong>
            <span style={{color:'#fff', fontSize:'1.02rem'}}>
              Goal: ${formatCurrency(goal.target)} 
            </span>
            <button style={{background:'transparent',border:'none',color:colors.primary,fontSize:'1.04rem', cursor:'pointer'}} onClick={()=>moveGoal(goal.id, -1)} aria-label="Move goal up" disabled={idx === 0}>&uarr;</button>
            <button style={{background:'transparent',border:'none',color:colors.primary,fontSize:'1.04rem', cursor:'pointer'}} onClick={()=>moveGoal(goal.id,1)} aria-label="Move goal down" disabled={idx === orderedGoals.length-1}>&darr;</button>
            <button style={{background: 'none', border:'none', color:'#aaa', fontSize:'1.14rem',cursor:'pointer'}} onClick={()=>startEdit(goal)} aria-label={`Edit goal: ${goal.title}`}>✏️</button>
            <button style={{background: 'none', border:'none', color:'#e44444', fontSize:'1.09rem',marginLeft:2,cursor:'pointer'}} onClick={()=>deleteGoal(goal.id)} aria-label={`Delete goal: ${goal.title}`}>🗑</button>
          </div>
          {editingGoal === goal.id ? (
            <form onSubmit={saveEditGoal} style={{display:'flex', gap:8,alignItems:'center'}}>
              <input
                type="text"
                name="title"
                value={editDraft?.title}
                onChange={e => handleGoalFieldChange(e, editDraft, d => setEditDraft(d))}
                style={{
                  flex: '1 1 90px', borderRadius: '6px', border: `1px solid ${colors.primary}60`, background: '#232323', color: '#fff', fontSize: '1.04rem', padding: '7.5px 8px', outline: 'none',
                }}
                required
              />
              <input
                type="number"
                name="target"
                min="1"
                value={editDraft?.target}
                onChange={e => handleGoalFieldChange(e, editDraft, d => setEditDraft(d))}
                style={{
                  flex: '0 1 56px', borderRadius: '6px', border: `1px solid ${colors.primary}60`, background: '#232323', color: '#fff', fontSize: '1.04rem', padding: '7.5px 8px', outline: 'none',
                }}
                required
              />
              <input
                type="text"
                name="category"
                value={editDraft?.category}
                onChange={e => handleGoalFieldChange(e, editDraft, d => setEditDraft(d))}
                placeholder="Category"
                style={{
                  flex: '1 1 64px', borderRadius: '6px', border: `1px solid ${colors.primary}60`, background: '#232323', color: '#fff', fontSize: '1.01rem', padding: '7px 7px', outline: 'none',
                }}
              />
              <input
                type="text"
                name="reminder"
                value={editDraft?.reminder}
                onChange={e => handleGoalFieldChange(e, editDraft, d => setEditDraft(d))}
                placeholder="Reminder"
                style={{
                  flex: '1 1 80px', borderRadius: '6px', border: `1px solid ${colors.primary}60`, background: '#232323', color: '#fff', fontSize: '1.01rem', padding: '7px 7px', outline: 'none',
                }}
              />
              <input
                type="text"
                name="notes"
                value={editDraft?.notes}
                onChange={e => handleGoalFieldChange(e, editDraft, d => setEditDraft(d))}
                placeholder="Notes"
                style={{
                  flex: '2 1 100px', borderRadius: '6px', border: `1px solid ${colors.primary}60`, background: '#232323', color: '#fff', fontSize: '1.01rem', padding: '7px 7px', outline: 'none',
                }}
              />
              <button className="btn" style={{
                borderRadius: '6px', background: colors.accent, color: '#fff', fontWeight: 600, fontSize: '0.99rem',padding:'8px'
              }} type="submit">Save</button>
              <button style={{background:'none', color:'#aaa', border:'none',padding:'8px',fontSize:'1.05rem',cursor:'pointer'}} onClick={cancelEdit} type="button">Cancel</button>
            </form>
          ) : (
            <>
              <div style={{display:'flex',alignItems:'center',gap:18, marginTop:-2}}>
                <span style={{color:colors.accent,fontWeight:600}}>Saved: ${formatCurrency(goal.saved||0)}</span>
                <span style={{color:'#aaa',fontSize:'1.01rem'}}>Category: <b>{goal.category||'-'}</b></span>
                <span style={{color:'#aaa',fontSize:'0.98rem'}}>Reminder: {goal.reminder||'-'}</span>
              </div>
              <div style={{fontSize:'0.99rem', color:'#bbbbbb', margin:'3px 0'}}>{goal.notes}</div>
              <div className="savings-goal-bar-container" style={{
                width:'100%', background:'#232323', borderRadius:'8px', overflow:'hidden', height:'15px', border:`1.5px solid ${colors.primary}22`
              }}>
                <div className="savings-goal-bar" style={{
                  background: colors.primary,
                  width: `${goalProgress(goal)}%`,
                  height:'100%',
                  transition: 'width 0.45s cubic-bezier(0.77,0,0.18,1)'
                }}
                  aria-valuenow={goalProgress(goal)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Goal progress"
                  role="progressbar"
                />
              </div>
              <div style={{
                width:'100%',display:'flex',justifyContent:'space-between',color:'#fff',fontSize:'0.96rem',fontWeight:500,letterSpacing:'0.09px',marginTop:'-1.5px'
              }}>
                <span>${formatCurrency(goal.saved||0)}</span>
                <span>{goalProgress(goal).toFixed(1)}%</span>
                <span>Goal: ${formatCurrency(goal.target)}</span>
              </div>
            </>
          )}
        </li>
      ))}
      </ul>
    </section>
  );
}

export default SavingsGoalsManager;
