const ftList = document.getElementById("ft_list");
const submitBtn = document.getElementById("submit");

let isLoading = false;

function saveTasksToCookie() {
    if (isLoading) return;
    const tasks = [];
    ftList.querySelectorAll("div").forEach(taskDiv => {
        tasks.push(taskDiv.textContent);
    });
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/; expires=" + expires;
}

function getTasksFromCookie() {
    const cookies = document.cookie.split("; ");
    const taskCookie = cookies.find(row => row.startsWith("tasks="));
    if (!taskCookie) return [];
    try {
        return JSON.parse(decodeURIComponent(taskCookie.split("=")[1])) || [];
    } catch {
        return [];
    }
}

function loadTasksFromCookie() {
    isLoading = true;
    ftList.innerHTML = "";
    const tasks = getTasksFromCookie();

    tasks.forEach(task => addTask(task, { position: "append" }));

    isLoading = false;
    saveTasksToCookie();
}

function addTask(task, opts = { position: "prepend" }) {
    const newTask = document.createElement("div");
    newTask.textContent = task;

    newTask.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this task?")) {
            newTask.remove();
            saveTasksToCookie();
        }
    });

    if (opts.position === "append") {
        ftList.appendChild(newTask);
    } else {
        ftList.prepend(newTask);
    }

    saveTasksToCookie();
}

submitBtn.addEventListener("click", () => {
    const task = prompt("Enter a new task:");
    if (task && task.trim() !== "") {
        addTask(task.trim(), { position: "prepend" });
    }
});

window.onload = loadTasksFromCookie;
