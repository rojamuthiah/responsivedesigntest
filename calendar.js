console.log("calendar.js loaded");

let current = new Date();

/**
 * Calendar reads from the shared global store
 * store.js must be loaded before this file
 */
const appointments = window.appointmentsStore;

/* =========================
   CALENDAR RENDER
========================= */
function renderCalendar() {
  const calendarDays = document.getElementById("calendarDays");
  const currentDateLabel = document.getElementById("currentDateLabel");

  if (!calendarDays || !currentDateLabel) return;

  calendarDays.innerHTML = "";

  currentDateLabel.innerText = current.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startDate = new Date(firstOfMonth);
  startDate.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());

  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    if (cellDate.getMonth() !== month) {
      dayDiv.classList.add("other-month");
    }

    const today = new Date();
    if (cellDate.toDateString() === today.toDateString()) {
      dayDiv.classList.add("today");
    }

    const dateStr =
      cellDate.getFullYear() +
      "-" +
      String(cellDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(cellDate.getDate()).padStart(2, "0");

    const label =
      cellDate.getDate() === 1
        ? cellDate.toLocaleDateString("en-US", { month: "short" }) + " 1"
        : cellDate.getDate();

    dayDiv.innerHTML = `<div class="day-number">${label}</div>`;

    appointments
      .filter(a => a.date === dateStr)
      .forEach(a => {
        dayDiv.innerHTML += `
          <div class="appointment">
            <div class="appointment-text">
              ${a.patient} (${a.doctor}) ${formatTime(a.time)}
            </div>
          </div>
        `;
      });

    calendarDays.appendChild(dayDiv);
  }
}

/* =========================
   NAVIGATION
========================= */
function prevMonth() {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
}

function goToday() {
  current = new Date();
  renderCalendar();
}

/* =========================
   APPOINTMENT API (FROM MODAL)
========================= */
window.addAppointment = function ({ date }) {
  // Jump calendar to appointment month
  current = new Date(date);
  renderCalendar();
};

/* =========================
   HELPERS
========================= */
function formatTime(time24) {
  if (!time24) return "";
  const [h, m] = time24.split(":");
  let hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour}:${m} ${ampm}`;
}

/* =========================
   INIT
========================= */
window.renderCalendar = renderCalendar;
