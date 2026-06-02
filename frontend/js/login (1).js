/* =========================================
   ExamSarthi – Auth Logic & Validation
   ========================================= */

function switchTab(tab) {

  const loginForm =
  document.getElementById('loginForm');

  const signupForm =
  document.getElementById('signupForm');

  const loginTab =
  document.getElementById('loginTab');

  const signupTab =
  document.getElementById('signupTab');

  const indicator =
  document.getElementById('tabIndicator');

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
}

function togglePassword(inputId, btn) {

  const input =
  document.getElementById(inputId);

  const isHidden =
  input.type === 'password';

  input.type =
  isHidden ? 'text' : 'password';

  btn.innerHTML = isHidden

  ? `
    <svg width="17" height="17" fill="none"
    stroke="currentColor" stroke-width="1.8"
    viewBox="0 0 24 24">

      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>

      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>

      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  `

  : `
    <svg width="17" height="17" fill="none"
    stroke="currentColor" stroke-width="1.8"
    viewBox="0 0 24 24">

      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>

      <circle cx="12" cy="12" r="3"/>
    </svg>
  `;
}