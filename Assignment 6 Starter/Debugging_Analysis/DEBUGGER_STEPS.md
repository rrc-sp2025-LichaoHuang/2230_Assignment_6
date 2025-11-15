# Debugging Analysis — Assignment 6

**Name:** Lichao Huang  
**Date:** 11/14/2025  

---

## Breakpoint 1 — Submit a blank name

**Location:**
if (!username) {
    alert("Please enter your name before submitting.");
}
**Purpose:**
To verify that the program correctly prevents form submission when the username field is empty and displays an appropriate alert message.
**Screenshots:**  
- `breakpoint1_before.png`: 
- `breakpoint1_after.png`:

**Observation:**  
The program correctly detects the empty username, blocks the submission process, and shows an alert. This prevents saving a score without a valid player name.

---

## Breakpoint 2 — Submit a valid name

**Location:**const existingCookie = getCookie("username");
**Purpose:**
To confirm that when a valid username is entered:

    The username cookie is correctly created (if not already existing).

    The score is successfully saved into localStorage.

    The score table updates and displays the new entry properly.

**Screenshots:**  
- `breakpoint2_before.png`:
- `breakpoint2_after.png`:

**Observation:**  
The program behaves correctly when given a valid username. A cookie is stored, the score is logged in localStorage, and the table updates without issues.

---

## Breakpoint 3 — Check talent selection

**Location:** const selectedOption = document.querySelector(`input[name="answer${i}"]:checked`);
**Purpose:** 
To inspect whether the score calculation accurately detects which option is selected and correctly increments the score when the option has data-correct="true".

**Screenshots:**  
- `breakpoint3_before.png`:
- `breakpoint3_after.png`:

**Observation:**  
The score calculation works correctly. Each selected answer is properly detected, and correct answers increment the score. This confirms that the scoring logic is functioning as intended.

---

**Files included in this analysis folder:**  
- `breakpoint_1_before.png`  
- `breakpoint_1_after.png`  
- `breakpoint_2_before.png`  
- `breakpoint_2_after.png`  
- `breakpoint_3_before.png`  
- `breakpoint_3_after.png`  
- `DEBUGGER_STEPS.md` 