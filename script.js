document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("applicationForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let application = {
                name: document.getElementById("name").value.trim(),
                dob: document.getElementById("dob").value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("phone").value.trim(),
                address: document.getElementById("address").value.trim(),
                seeType: document.getElementById("seeType").value,
                seeScore: document.getElementById("seeScore").value,
                plusTwoType: document.getElementById("plusTwoType").value,
                plusTwoScore: document.getElementById("plusTwoScore").value,
                cmat: document.getElementById("cmat").value,
                program: document.getElementById("program").value
            };

            let data = JSON.parse(localStorage.getItem("applications")) || [];
            data.push(application);
            localStorage.setItem("applications", JSON.stringify(data));

            alert("Application Submitted and Saved!");
            form.reset();
        });
    }

    let clearBtn = document.getElementById("clearData");
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            if (confirm("Delete all records from storage?")) {
                localStorage.removeItem("applications");
                loadApplications();
            }
        });
    }

    loadApplications();
});

function updatePlaceholder(inputId, type) {
    let input = document.getElementById(inputId);
    if (type === "GPA") {
        input.placeholder = "Enter GPA (0-4)";
        input.max = "4";
    } else {
        input.placeholder = "Enter Percentage (0-100)";
        input.max = "100";
    }
}

function loadApplications() {
    let tableBody = document.querySelector("#applicationsTable tbody");
    if (!tableBody) return;

    let data = JSON.parse(localStorage.getItem("applications")) || [];
    tableBody.innerHTML = "";

    data.forEach((app, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.dob}</td>
            <td>${app.gender}</td>
            <td>${app.phone}</td>
            <td>${app.email}</td>
            <td>${app.address}</td>
            <td>${app.seeScore} (${app.seeType})</td>
            <td>${app.plusTwoScore} (${app.plusTwoType})</td>
            <td>${app.cmat}</td>
            <td>${app.program}</td>
            <td><button onclick="deleteRow(${index})" class="btn-delete">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteRow(index) {
    let data = JSON.parse(localStorage.getItem("applications")) || [];
    if (confirm("Delete this specific record?")) {
        data.splice(index, 1);
        localStorage.setItem("applications", JSON.stringify(data));
        loadApplications();
    }
}
