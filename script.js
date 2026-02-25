const form = document.getElementById('reportForm');
const msg = document.getElementById('msg');
const records = document.getElementById('records');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const res = await fetch('/submit-report', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();
    msg.innerText = data.message;
    form.reset();
    loadReports();
});

async function loadReports() {
    const res = await fetch('/get-reports');
    const data = await res.json();

    records.innerHTML = "";

    data.forEach(r => {
        records.innerHTML += `
            <div class="record">
                <p><b>Name:</b> ${r.name}</p>
                <p><b>Location:</b> ${r.location}</p>
                <p><b>Description:</b> ${r.description}</p>
                <p><b>Time:</b> ${r.time}</p>
            </div>
        `;
    });
}

function checkPenalty() {
    const fine = document.getElementById('violation').value;
    const result = document.getElementById('result');

    if (!fine) {
        result.innerText = "Please select violation.";
        return;
    }

    result.innerText = "Penalty Amount: ₹ " + fine;
}

function toggleBox(id) {
    const box = document.getElementById(id);
    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

loadReports();