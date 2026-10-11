
const $ = id => document.getElementById(id);

let guestName = "";
let destination = "FUTURE";

function showStep(step) {
  ["step1", "step2", "step3", "step4"].forEach(id => {
    $(id).classList.add("hidden");
  });
  $(step).classList.remove("hidden");
}

const form = $("inviteForm");

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    guestName = $("guestName").value.trim();
    if (!guestName) return;

    $("helloTitle").textContent = "Hello, " + guestName + ".";
    showStep("step2");
  });
}

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", function() {
    destination = this.dataset.choice;

    $("chosenTime").textContent =
      "Destination selected: " + destination + ". Enter the secret code.";

    $("accessCode").value = "";
    $("codeMessage").textContent = "";
    showStep("step3");
  });
});

$("unlockBtn").addEventListener("click", function() {
  if ($("accessCode").value.trim() !== "2026") {
    $("codeMessage").textContent = "Incorrect code. Try 2026.";
    return;
  }

  $("welcomeText").textContent =
    "Welcome, " + guestName + ". Your journey into the " +
    destination.toLowerCase() + " begins now.";

  showStep("step4");
});

$("accessCode").addEventListener("keydown", function(event) {
  if (event.key === "Enter") $("unlockBtn").click();
});

$("rsvpBtn").addEventListener("click", function() {
  $("rsvpMessage").textContent =
    "Your RSVP is noted in this preview. See you there!";

  $("rsvpBtn").textContent = "CONFIRMED ✓";
});

$("calendarBtn").addEventListener("click", function() {
  const eventText = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "DTSTART:20261121T183000",
    "SUMMARY:Time Capsule Invitation",
    "LOCATION:The Observatory - 21st Floor",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const file = new Blob([eventText], {
    type: "text/calendar;charset=utf-8"
  });

  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "time-capsule-invitation.ics";
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
