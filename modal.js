document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("appointmentModal");
    if (!modal) return;
  
    const saveBtn = modal.querySelector(".btn-primary");
  
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      const selects = modal.querySelectorAll("select.field-input");
      const dateInput = modal.querySelector("input[type='date']");
      const timeInput = modal.querySelector("input[type='time']");
  
      const formData = {
        patient: selects[0].value,
        doctor: selects[1].value,
        hospital: selects[2].value,
        specialty: selects[3].value,
        date: dateInput.value,
        time: timeInput.value
      };
  
      console.log("Appointment Data:", formData);
  
      // Required validation (simple as requested)
      if (!formData.patient || !formData.doctor || !formData.date || !formData.time) {
        alert("Please fill in all required fields");
        return;
      }
  
      // ✅ Final behavior you asked for
      alert("Thank you! Appointment saved successfully");
  
      // Optional reset (safe)
      selects.forEach(s => s.selectedIndex = 0);
      dateInput.value = "";
      timeInput.value = "";
    });
  });
  