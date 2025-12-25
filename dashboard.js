
const appointments = [
    {
        patient: "Henry James",
        doctor: "James Marry",
        hospital: "Salus Center (General Hospital)",
        specialty: "Dermatology",
        date: "18/12/2025",
        time: "12:00 AM - 12:15 AM"
    },
    {
        patient: "Henry James",
        doctor: "James Marry",
        hospital: "Ultracare (General Hospital)",
        specialty: "Dermatology",
        date: "18/12/2025",
        time: "12:00 AM - 12:15 AM"
    }
];

function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    appointments.forEach(item => {
        const row = document.createElement("div");
        row.className = "table-row";

        row.innerHTML = `
            <a class="link">${item.patient}</a>
            <a class="link">${item.doctor}</a>
            <div>${item.hospital}</div>
            <div>${item.specialty}</div>
            <div>${item.date}</div>
            <a class="link">${item.time}</a>
            <div class="actions">

                <!-- EDIT SVG -->
                <svg width="18" height="17" viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 15H17.5V16.25H0V15ZM14.625 4.375C15.125 3.875 15.125 3.125 14.625 2.625L12.375 0.375C11.875 -0.125 11.125 -0.125 10.625 0.375L1.25 9.75V13.75H5.25L14.625 4.375ZM11.5 1.25L13.75 3.5L11.875 5.375L9.625 3.125L11.5 1.25ZM2.5 12.5V10.25L8.75 4L11 6.25L4.75 12.5H2.5Z"
                          fill="#2C7BEF"/>
                </svg>

                <!-- DELETE SVG -->
                <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="#E23D28"/>
                </svg>

            </div>
        `;
        tableBody.appendChild(row);
    });

    for (let i = 0; i < 6; i++) {
        const empty = document.createElement("div");
        empty.className = "empty-row";
        tableBody.appendChild(empty);
    }
}

renderTable();
