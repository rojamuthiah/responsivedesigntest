console.log("dashboard.js loaded");

let filteredAppointments = null;

/* =========================
   RENDER DASHBOARD
========================= */
function renderDashboard() {
  const tableBody = document.getElementById("tableBody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  const data =
    filteredAppointments !== null
      ? filteredAppointments
      : window.appointmentsStore;

  data.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "table-row";

    row.innerHTML = `
      <a class="link">${item.patient}</a>
      <a class="link">${item.doctor}</a>
      <div>${item.hospital}</div>
      <div>${item.specialty}</div>
      <div>${formatDate(item.date)}</div>
      <a class="link">${formatTime(item.time)}</a>
      <div class="actions">
        <svg class="edit-btn" data-index="${index}" width="18" height="17" viewBox="0 0 18 17">
          <path d="M0 15H17.5V16.25H0V15ZM14.625 4.375L5.25 13.75H1.25V9.75L10.625 0.375L14.625 4.375Z"
                fill="#2C7BEF"/>
        </svg>
      </div>
    `;

    tableBody.appendChild(row);
  });

  for (let i = data.length; i < 6; i++) {
    const empty = document.createElement("div");
    empty.className = "empty-row";
    tableBody.appendChild(empty);
  }
}

/* =========================
   SEARCH (PATIENT + DOCTOR)
========================= */
document.addEventListener("input", e => {
  if (!e.target.classList.contains("filter-input")) return;

  const inputs = document.querySelectorAll(".filter-input");
  const patientQ = inputs[0].value.toLowerCase();
  const doctorQ = inputs[1].value.toLowerCase();

  filteredAppointments = window.appointmentsStore.filter(a =>
    a.patient.toLowerCase().includes(patientQ) &&
    a.doctor.toLowerCase().includes(doctorQ)
  );

  renderDashboard();
});

/* =========================
   HELPERS
========================= */
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function formatTime(time24) {
  const [h, m] = time24.split(":");
  let hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour}:${m} ${ampm}`;
}

/* =========================
   EXPOSE
========================= */
window.renderDashboard = renderDashboard;
renderDashboard();
