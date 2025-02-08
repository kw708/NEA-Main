const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        // alert("You must write something!")
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Use textContent
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = "";
        saveData();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save when checking/unchecking
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); // Save when deleting
    }
}, false);

function saveData() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks)); // Save as JSON
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("data")) || []; // Get tasks or empty array
    listContainer.innerHTML = ""; // Clear existing list
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

showTask();