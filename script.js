document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("applicationForm");

    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let dob = document.getElementById("dob").value;
            let email = document.getElementById("email").value.trim();
            let phone = document.getElementById("phone").value.trim();
            let address = document.getElementById("address").value.trim();
            let seeGpa = document.getElementById("seeGpa").value;
            let plusTwoGpa = document.getElementById("plusTwoGpa").value;
            let cmat = document.getElementById("cmat").value;
            let program = document.getElementById("program").value;
            let gender = document.querySelector('input[name="gender"]:checked')?.value;

            if(name == "" || email == "" || dob == "" || phone == "" || address == "" || seeGpa == "" || plusTwoGpa == "" || cmat == "" || !gender){
                alert("All fields are required");
                return false;
            }

            let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
            if(!emailPattern.test(email)){
                alert("Invalid email address");
                return false;
            }

            if(!/^\d{10}$/.test(phone)){
                alert("Phone number must be exactly 10 digits");
                return false;
            }

            let application = { name, dob, gender, email, phone, address, seeGpa, plusTwoGpa, cmat, program };
            let data = JSON.parse(localStorage.getItem("applications")) || [];
            data.push(application);
            localStorage.setItem("applications", JSON.stringify(data));

            alert("Application Submitted Successfully");
            form.reset();
        });
    }

    let clearBtn = document.getElementById("clearData");
    if (clearBtn) {
        clearBtn.addEventListener("click", function() {
            if (confirm("Are you sure you want to delete ALL records?")) {
                localStorage.removeItem("applications");
                loadApplications();
            }
        });
    }

    loadApplications();
});

function loadApplications(){
    let tableBody = document.querySelector("#applicationsTable tbody");
    if(!tableBody) return;

    let data = JSON.parse(localStorage.getItem("applications")) || [];
    tableBody.innerHTML = "";

    data.forEach((app, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.dob}</td>
            <td>${app.gender}</td>
            <td>${app.email}</td>
            <td>${app.phone}</td>
            <td>${app.address}</td>
            <td>${app.seeGpa}</td>
            <td>${app.plusTwoGpa}</td>
            <td>${app.cmat}</td>
            <td>${app.program}</td>
            <td>
                <button onclick="deleteRow(${index})" class="btn-delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteRow(index) {
    let data = JSON.parse(localStorage.getItem("applications")) || [];
    if (confirm("Delete this application?")) {
        data.splice(index, 1);
        localStorage.setItem("applications", JSON.stringify(data));
        loadApplications();
    }
}