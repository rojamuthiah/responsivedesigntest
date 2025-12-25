console.log("modal.js loaded");

let editingIndex = null;

/* =========================
   OPEN / CLOSE MODAL
========================= */
function openModal() {
  const modal = document.getElementById("appointmentModal");
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("appointmentModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

window.openModal = openModal;
window.closeModal = closeModal;

/* =========================
   EDIT BUTTON HANDLER
========================= */
document.addEventListener("click", e => {
  const editBtn = e.target.closest(".edit-btn");
  if (!editBtn) return;

  editingIndex = Number(editBtn.dataset.index);
  const appt = window.appointmentsStore[editingIndex];
  const modal = document.getElementById("appointmentModal");
  if (!modal) return;

  const selects = modal.querySelectorAll("select.field-input");
  const dateInput = modal.querySelector("input[type='date']");
  const timeInput = modal.querySelector("input[type='time']");
  const reasonInput = modal.querySelector(".reason-input");

  selects[0].value = appt.patient;
  selects[1].value = appt.doctor;
  selects[2].value = appt.hospital;
  selects[3].value = appt.specialty;
  dateInput.value = appt.date;
  timeInput.value = appt.time;
  reasonInput.value = appt.reason || "";

  openModal();
});

/* =========================
   SAVE HANDLER
========================= */
document.addEventListener("click", e => {
  const saveBtn = e.target.closest(".btn-primary");
  if (!saveBtn) return;

  const modal = document.getElementById("appointmentModal");
  if (!modal || !modal.classList.contains("active")) return;

  e.preventDefault();

  const selects = modal.querySelectorAll("select.field-input");
  const dateInput = modal.querySelector("input[type='date']");
  const timeInput = modal.querySelector("input[type='time']");
  const reasonInput = modal.querySelector(".reason-input");

  const appointment = {
    patient: selects[0].value,
    doctor: selects[1].value,
    hospital: selects[2].value,
    specialty: selects[3].value,
    date: dateInput.value,
    time: timeInput.value,
    reason: reasonInput.value
  };

  if (!appointment.patient || !appointment.doctor || !appointment.date || !appointment.time) {
    alert("Please fill all required fields");
    return;
  }

  /* =========================
     SAVE TO GLOBAL STORE
  ========================= */
  if (editingIndex !== null) {
    window.appointmentsStore[editingIndex] = appointment;
    editingIndex = null;
  } else {
    window.appointmentsStore.push(appointment);
  }

  /* =========================
     UPDATE UI
  ========================= */
  if (typeof window.renderCalendar === "function") {
    window.renderCalendar();
  }

  if (typeof window.renderDashboard === "function") {
    window.renderDashboard();
  }

  /* =========================
     CLOSE & RESET
  ========================= */
  closeModal();

  selects.forEach(s => (s.selectedIndex = 0));
  dateInput.value = "";
  timeInput.value = "";
  reasonInput.value = "";
});
