let inp = document.getElementById("taskInp");
let addBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

// Load tasks from localStorage and display them
tasks.forEach(task => {
    let li = document.createElement("li");

    let inpCheckbox = document.createElement("input");
    inpCheckbox.type = "checkbox";
    inpCheckbox.checked = task.checked;   // Set the checkbox state

    let span = document.createElement("span");
    span.textContent = task.text; // Set the task text

    let delBtn = document.createElement("button");
    delBtn.className = "deleteBtn";

    li.appendChild(inpCheckbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
})

addBtn.addEventListener("click", function() {
    let li = document.createElement("li");
    let inpCheckbox = document.createElement("input");
    inpCheckbox.type = "checkbox";

    let span = document.createElement("span");
    span.textContent = inp.value.trim();

    // push the task to the tasks array and save to localStorage
    tasks.push({
        text: inp.value.trim(),
        checked: false   // Initial state is unchecked
    });
    localStorage.setItem("myTasks", JSON.stringify(tasks));    

    let delBtn = document.createElement("button");
    delBtn.className = "deleteBtn";

    if (inp.value.trim() === "") {
        alert("Please enter a task");
    } else {
        li.appendChild(inpCheckbox);
        li.appendChild(span)
        li.appendChild(delBtn);
        taskList.appendChild(li);
    }
    inp.value = "";
});

taskList.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
        let liRemove = e.target.parentNode;

        // remove the task from localStorage
        let span = liRemove.querySelector("span");

        tasks = tasks.filter(task => task.text !== span.textContent);  // Filter out the task to be deleted

        localStorage.setItem("myTasks", JSON.stringify(tasks));

        // remove the task from the list
        taskList.removeChild(liRemove);
    }

    // Update the checked status of the task
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        let clickedCheckbox = e.target;
        spanText = clickedCheckbox.nextElementSibling.textContent; // Get the text of the task

        // Find the task in the tasks array and update its checked status
        let updatedTasks = tasks.map(task => {
            if (spanText === task.text) {
                return {
                    ...task,  // copies all tasks as they are
                    checked: clickedCheckbox.checked  // updates the checked status
                }
            }
            return task;  // return the task as it is if it doesn't match
        })
        tasks = updatedTasks;  // Update the tasks array with the modified tasks
        localStorage.setItem("myTasks", JSON.stringify(tasks));  // Save the updated tasks array to localStorage
    }
})