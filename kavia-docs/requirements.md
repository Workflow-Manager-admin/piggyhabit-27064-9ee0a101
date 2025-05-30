# PiggyHabit Main Container – Requirements Document

## 1. Overview

PiggyHabit is a single-page, front-end web application designed to simulate a digital piggy bank for motivation and habit-building. Users can track manual savings, withdrawals, view transaction history, and set personal savings goals. The solution targets users who want a simple, visual way to reinforce their savings habits, with no real money processed by the app.

## 2. Product & User Requirements

### 2.1 User Stories

- As a user, I want to add an amount to my digital piggy bank, so I can see my savings grow.
- As a user, I want to remove an amount from my piggy bank, simulating spending or withdrawal.
- As a user, I want to view my full transaction (savings and withdrawals) history to reflect on my saving habits.
- As a user, I want to set a savings goal and monitor my progress towards it, including visual motivation (progress bar).

### 2.2 Core Features & Functional Requirements

1. **Add Savings:**  
   - Interface to enter and add a numeric savings amount to the total.
   - Updates the savings total and transaction history upon each addition.
2. **Remove Savings:**  
   - Interface to enter and remove a numeric amount from the savings total.
   - Disallows removal exceeding current total savings.
   - Updates the savings total and transaction history upon each withdrawal.
3. **Savings History:**  
   - Chronological display (latest first) of all transactions, clearly marked as savings or withdrawals with date/time.
   - Accessible within the main container; may appear as a scrollable list or a dedicated section.
4. **Set Savings Goal & Track Progress:**  
   - Field/input for user to set/change their savings goal at any time.
   - Visual indicator (progress bar) shows percentage toward goal.
   - Current savings, goal, and percentage displayed prominently.

## 3. UX/UI & Visual Design Requirements

### 3.1 Layout Structure

- **Header/Top Section:**  
  Piggy bank icon with current total savings in prominent typography.
- **Controls Section (under header):**  
  Add Savings and Remove Savings forms or controls, side-by-side or stacked depending on screen width.
- **Goal & Progress Section (below controls):**  
  Savings goal input and a progress bar clearly indicating progress (with amount and percentage).
- **History Section (bottom/last):**  
  Transaction history as a scrollable area.

### 3.2 UI Elements & Styles

- **Theme:**  
  Dark theme predominates; minimal, clean style.
- **Primary Color:** `#FBC02D` (yellow).
- **Secondary Color:** `#FFF9C4` (light yellow).
- **Accent Color:** `#388E3C` (green).
- **Additional:**  
  Body/background uses dark shades; text is white or semi-transparent white for secondary elements.
  Interactive elements, such as buttons, are designed with rounded corners and vivid color for visibility.

### 3.3 Accessibility

- Contrasting colors for clarity in dark mode.
- Sufficient color contrast for users with visual impairments.
- Keyboard navigation should be supported for all controls.

## 4. Architectural and Technical Requirements

### 4.1 Technology Stack

- **Frontend:** React JS (functional components, hooks)
- **Language:** JavaScript (ES6+) only
- **Styling:** Vanilla CSS (no framework); use CSS files only (e.g., App.css)
- **Data Storage:** All data is local, in-memory; there is no backend or persistence (refresh clears data).
- **App Structure:**  
  Single container/component structure, with all logic and styling in `App.js` and `App.css` as per plan.
- **No dependencies** beyond base React and vanilla CSS.

### 4.2 Constraints & Assumptions

- No backend, API, or database integration.
- Everything runs in memory; no local storage, cookies, or offline persistence.
- Works on modern browsers; minimum CSS fallback for edge case support is required.
- Application is responsive and mobile-friendly, adjusting layout for different screen sizes.
- Piggy bank icon can be a Unicode character, SVG, or a simple image as needed (plan assumes no explicit design mockups/assets).

## 5. User Flows

### 5.1 Add or Remove Savings

1. User opens the app, views the current savings and piggy bank icon at top.
2. User enters an amount to add/remove and clicks the corresponding button.
3. App validates the amount (cannot remove more than current savings).
4. App updates savings total and history instantly.

### 5.2 Set Savings Goal

1. User enters a new goal value in the goal input field.
2. App updates the progress bar and percentage toward the goal.

### 5.3 View History

1. User scrolls down to the history section.
2. Transactions are listed chronologically, with amount, type (add/remove), and timestamp.

## 6. Open Issues and Future Extensions

- **Persistence:**  
  No in-memory state persists after page reload; future work may explore browser storage.
- **Categories/Notes:**  
  MVP does not capture transaction categories or user notes.
- **Multi-user or authentication:**  
  Out of scope for this release.
- **App icons and branding:**  
  Current design is minimalist; custom branding could be enhanced in future releases.

## 7. Summary

The PiggyHabit main container is a lean, user-centric savings tracker with clear visual feedback, minimal controls, and a modern, dark-themed interface. MVP targets immediate responsiveness, habit formation, and motivational reinforcement, with a clear path for future feature growth.

---

Document created for engineering and UI implementation as per provided plan and requirements.

