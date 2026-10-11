
const form = document.getElementById('inviteForm');
const nameInput = document.getElementById('guestName');
const panel = document.getElementById('invitePanel');
const choiceArea = document.getElementById('choiceArea');
const codeArea = document.getElementById('codeArea');
let guestName = '';

if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    guestName = nameInput.value.trim();

    if (!guestName) return;

    form.classList.add('hidden');
    document.getElementById('panelKicker').textContent =
      'STEP 02 / TIME SELECTION';

    document.getElementById('panelTitle').textContent =
      `Hello, ${guestName}.`;

    document.getElementById('panelCopy').textContent =
      'Choose the past or the future to continue.';

    choiceArea.classList.remove('hidden');
  });
}

document.querySelectorAll('.choice').forEach(function(button) {
  button.addEventListener('click', function() {
    choiceArea.classList.add('hidden');
    codeArea.classList.remove('hidden');

    document.getElementById('panelKicker').textContent =
      'STEP 03 / ACCESS CODE';

    document.getElementById('panelTitle').textContent =
      'One final step.';

    document.getElementById('panelCopy').textContent =
      'Enter the secret code: 2026';
  });
});

document.getElementById('unlockBtn').addEventListener('click', function() {
  const code = document.getElementById('accessCode').value.trim();

  if (code !== '2026') {
    document.getElementById('codeMessage').textContent =
      'Incorrect code. Try 2026.';
    return;
  }

  document.getElementById('welcomeTitle').textContent =
    `You're invited, ${guestName}!`;

  panel.classList.add('hidden');
  document.getElementById('invitation').classList.remove('hidden');
});

document.getElementById('rsvpBtn').addEventListener('click', function() {
  document.getElementById('rsvpMessage').textContent =
    'Your RSVP is noted in this preview!';
});

document.getElementById('calendarBtn').addEventListener('click', function() {
  const eventText =
    'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n' +
    'DTSTART:20261121T183000\n' +
    'SUMMARY:Time Capsule Invitation\n' +
    'LOCATION:The Observatory - 21st Floor\n' +
    'END:VEVENT\nEND:VCALENDAR';

  const file = new Blob([eventText], { type: 'text/calendar' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'invitation.ics';
  link.click();

  URL.revokeObjectURL(url);
});
