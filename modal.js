/* =========================
   MODAL FORM SUBMISSION
========================= */

// Handle form submission (you can customize this)
document.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("btn-primary") && 
        e.target.closest(".modal")) {
      e.preventDefault();
      
      // Get form values
      const modal = document.getElementById("appointmentModal");
      if (modal) {
        const selects = modal.querySelectorAll("select.field-input");
        const dateInput = modal.querySelector("input[type='date']");
        const timeInput = modal.querySelector("input[type='time']");
        const reasonInput = modal.querySelector(".reason-input");
        
        const formData = {
          patient: selects[0]?.value || "",
          doctor: selects[1]?.value || "",
          hospital: selects[2]?.value || "",
          specialty: selects[3]?.value || "",
          date: dateInput?.value || "",
          time: timeInput?.value || "",
          reason: reasonInput?.value || ""
        };
        
        console.log("Appointment Data:", formData);
        
        // Validate form
        if (!formData.patient || !formData.doctor || !formData.date || !formData.time) {
          alert("Please fill in all required fields!");
          return;
        }
        
        // Show success message
        alert("Appointment scheduled successfully!");
        
        // Close modal and reset form
        if (typeof window.closeModal === 'function') {
          window.closeModal();
        }
        
        setTimeout(() => {
          selects.forEach(select => select.selectedIndex = 0);
          if (dateInput) dateInput.value = "";
          if (timeInput) timeInput.value = "";
          if (reasonInput) reasonInput.value = "";
        }, 300);
      }
    }
  });