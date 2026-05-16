/* =========================================
   ExamSarthi – Auth Logic & Validation
   ========================================= */

'use strict';

// ── TAB SWITCHING ──────────────────────────────────────────
function switchTab(tab) {
  const loginForm   = document.getElementById('loginForm');
  const signupForm  = document.getElementById('signupForm');
  const loginTab    = document.getElementById('loginTab');
  const signupTab   = document.getElementById('signupTab');
  const indicator   = document.getElementById('tabIndicator');

  if (tab === 'login') {
    loginForm.classList.remove('d-none');
    signupForm.classList.add('d-none');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    indicator.classList.remove('right');
  } else {
    signupForm.classList.remove('d-none');
    loginForm.classList.add('d-none');
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    indicator.classList.add('right');
  }
  clearAllErrors();
}

// ── PASSWORD TOGGLE ────────────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.innerHTML = isHidden
    ? `<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>`
    : `<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`;
}

// ── VALIDATION HELPERS ─────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function setError(inputId, errId, msg) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  input.classList.add('is-error');
  input.classList.remove('is-success');
  err.textContent = msg;
}

function setSuccess(inputId, errId) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  input.classList.remove('is-error');
  input.classList.add('is-success');
  err.textContent = '';
}

function clearError(inputId, errId) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  input.classList.remove('is-error', 'is-success');
  err.textContent = '';
}

function clearAllErrors() {
  ['loginEmail','loginPassword','signupName','signupEmail','signupPassword','signupConfirm']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove('is-error', 'is-success'); }
    });
  ['loginEmailErr','loginPassErr','signupNameErr','signupEmailErr','signupPassErr','signupConfirmErr']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
}

// ── PASSWORD STRENGTH ──────────────────────────────────────
document.getElementById('signupPassword').addEventListener('input', function () {
  const val = this.value;
  let score = 0;
  if (val.length >= 8)             score++;
  if (/[A-Z]/.test(val))          score++;
  if (/[0-9]/.test(val))          score++;
  if (/[^A-Za-z0-9]/.test(val))   score++;

  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  const configs = [
    { w: '0%',    bg: '',           text: '',            color: '' },
    { w: '25%',   bg: '#ef4444',    text: 'Weak',        color: '#ef4444' },
    { w: '50%',   bg: '#f97316',    text: 'Fair',        color: '#f97316' },
    { w: '75%',   bg: '#eab308',    text: 'Good',        color: '#eab308' },
    { w: '100%',  bg: '#22c55e',    text: 'Strong 🎉',   color: '#22c55e' },
  ];
  const cfg = configs[val.length === 0 ? 0 : score];
  fill.style.width      = cfg.w;
  fill.style.background = cfg.bg;
  label.textContent     = cfg.text;
  label.style.color     = cfg.color;
});

// ── LIVE INLINE VALIDATION ─────────────────────────────────
function attachLiveValidation(inputId, errId, validatorFn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('blur', () => {
    const result = validatorFn(input.value);
    if (result) setError(inputId, errId, result);
    else         setSuccess(inputId, errId);
  });
  input.addEventListener('input', () => {
    if (input.classList.contains('is-error')) {
      const result = validatorFn(input.value);
      if (!result) setSuccess(inputId, errId);
      else document.getElementById(errId).textContent = result;
    }
  });
}

attachLiveValidation('loginEmail', 'loginEmailErr', v =>
  !v.trim() ? 'Email is required.' : !isValidEmail(v) ? 'Enter a valid email address.' : '');

attachLiveValidation('loginPassword', 'loginPassErr', v =>
  !v ? 'Password is required.' : v.length < 6 ? 'Minimum 6 characters required.' : '');

attachLiveValidation('signupName', 'signupNameErr', v =>
  !v.trim() ? 'Full name is required.' : v.trim().length < 2 ? 'Name must be at least 2 characters.' : '');

attachLiveValidation('signupEmail', 'signupEmailErr', v =>
  !v.trim() ? 'Email is required.' : !isValidEmail(v) ? 'Enter a valid email address.' : '');

attachLiveValidation('signupPassword', 'signupPassErr', v =>
  !v ? 'Password is required.' : v.length < 8 ? 'Password must be at least 8 characters.' : '');

attachLiveValidation('signupConfirm', 'signupConfirmErr', v => {
  const pass = document.getElementById('signupPassword').value;
  return !v ? 'Please confirm your password.' : v !== pass ? 'Passwords do not match.' : '';
});

// ── BUTTON LOADING STATE ───────────────────────────────────
function setLoading(btnId, loading) {
  const btn   = document.getElementById(btnId);
  const label = btn.querySelector('.btn-label');
  const loader = btn.querySelector('.btn-loader');
  btn.disabled = loading;
  label.classList.toggle('d-none', loading);
  loader.classList.toggle('d-none', !loading);
}

// ── TOAST ──────────────────────────────────────────────────
function showToast(msg) {
  const wrap = document.getElementById('toastWrap');
  document.getElementById('toastMsg').textContent = msg;
  wrap.classList.add('show');
  setTimeout(() => wrap.classList.remove('show'), 3200);
}

// ── LOGIN SUBMIT ───────────────────────────────────────────
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  let hasError = false;

  const email    = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email.trim()) {
    setError('loginEmail', 'loginEmailErr', 'Email is required.'); hasError = true;
  } else if (!isValidEmail(email)) {
    setError('loginEmail', 'loginEmailErr', 'Enter a valid email address.'); hasError = true;
  } else { setSuccess('loginEmail', 'loginEmailErr'); }

  if (!password) {
    setError('loginPassword', 'loginPassErr', 'Password is required.'); hasError = true;
  } else if (password.length < 6) {
    setError('loginPassword', 'loginPassErr', 'Minimum 6 characters required.'); hasError = true;
  } else { setSuccess('loginPassword', 'loginPassErr'); }

  if (hasError) return;

  setLoading('loginBtn', true);
  // Simulate API call
  await new Promise(r => setTimeout(r, 1500));
  setLoading('loginBtn', false);

  showToast('Login successful! Redirecting…');
  setTimeout(() => {
    // In production, redirect to dashboard
    // window.location.href = '/dashboard';
    console.log('Redirect to dashboard');
  }, 1800);
});

// ── SIGNUP SUBMIT ──────────────────────────────────────────
document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  let hasError = false;

  const name     = document.getElementById('signupName').value;
  const email    = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirm  = document.getElementById('signupConfirm').value;

  if (!name.trim()) {
    setError('signupName', 'signupNameErr', 'Full name is required.'); hasError = true;
  } else if (name.trim().length < 2) {
    setError('signupName', 'signupNameErr', 'Name must be at least 2 characters.'); hasError = true;
  } else { setSuccess('signupName', 'signupNameErr'); }

  if (!email.trim()) {
    setError('signupEmail', 'signupEmailErr', 'Email is required.'); hasError = true;
  } else if (!isValidEmail(email)) {
    setError('signupEmail', 'signupEmailErr', 'Enter a valid email address.'); hasError = true;
  } else { setSuccess('signupEmail', 'signupEmailErr'); }

  if (!password) {
    setError('signupPassword', 'signupPassErr', 'Password is required.'); hasError = true;
  } else if (password.length < 8) {
    setError('signupPassword', 'signupPassErr', 'Password must be at least 8 characters.'); hasError = true;
  } else { setSuccess('signupPassword', 'signupPassErr'); }

  if (!confirm) {
    setError('signupConfirm', 'signupConfirmErr', 'Please confirm your password.'); hasError = true;
  } else if (confirm !== password) {
    setError('signupConfirm', 'signupConfirmErr', 'Passwords do not match.'); hasError = true;
  } else { setSuccess('signupConfirm', 'signupConfirmErr'); }

  if (hasError) return;

  setLoading('signupBtn', true);
  await new Promise(r => setTimeout(r, 1600));
  setLoading('signupBtn', false);

  showToast('Account created! Welcome to ExamSarthi 🎉');
  setTimeout(() => {
    switchTab('login');
    document.getElementById('loginEmail').value = email;
  }, 2000);
});
