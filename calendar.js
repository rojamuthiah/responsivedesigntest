console.log("calendar.js loaded");

let current = new Date();
let selectedDate = null;

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

    const dateStr =
      cellDate.getFullYear() +
      "-" +
      String(cellDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(cellDate.getDate()).padStart(2, "0");

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    if (cellDate.getMonth() !== month) {
      dayDiv.classList.add("other-month");
    }

    if (cellDate.toDateString() === new Date().toDateString()) {
      dayDiv.classList.add("today");
    }

    dayDiv.innerHTML = `
      <div class="day-number">
        ${cellDate.getDate() === 1
          ? cellDate.toLocaleDateString("en-US", { month: "short" }) + " 1"
          : cellDate.getDate()}
      </div>
    `;

    // Click to select date
    dayDiv.addEventListener("click", () => {
      selectedDate = dateStr;
      updateCalendarOwner();
    });

    // Render ALL appointments for that day
    window.appointmentsStore
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

  updateCalendarOwner();
}

/* =========================
   CALENDAR OWNER (PATIENT NAMES)
========================= */
function updateCalendarOwner() {
  const ownerEl = document.querySelector(".calendar-owner");
  if (!ownerEl || !selectedDate) {
    if (ownerEl) ownerEl.style.display = "none";
    return;
  }

  const todaysAppointments = window.appointmentsStore.filter(
    a => a.date === selectedDate
  );

  if (todaysAppointments.length === 0) {
    ownerEl.style.display = "none";
    return;
  }

  const uniquePatients = [
    ...new Set(todaysAppointments.map(a => a.patient))
  ];

  ownerEl.innerText = uniquePatients.join(", ");
  ownerEl.style.display = "flex";
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
  selectedDate =
    current.getFullYear() +
    "-" +
    String(current.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(current.getDate()).padStart(2, "0");
  renderCalendar();
}

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
   EXPOSE
========================= */
window.renderCalendar = renderCalendar;
