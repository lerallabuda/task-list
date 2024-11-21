// Array to hold all lists with their tasks
let lists = [];
 
// Function to create a new list
function createList() {
    const listNameInput = document.getElementById("list-name-input");
    const listName = listNameInput.value.trim();
 
    if (listName === "") {
        alert("Please enter a list name!");
        return;
    }
 
    // Create a new list object
    const newList = {
        name: listName,
        tasks: []
    };
 
    // Add the new list to the global lists array
    lists.push(newList);
 
    // Clear the input field
    listNameInput.value = "";
 
    // Show task input section for the newly created list
    renderTaskSection();
}
 
// Function to render the task section for the current list
function renderTaskSection() {
    const taskSection = document.getElementById("task-section");
 
    // Clear the task section
    taskSection.innerHTML = "";
 
    // Create a task list for each list
    lists.forEach((list, index) => {
        const listDiv = document.createElement("div");
        listDiv.classList.add("task");
 
        const listName = document.createElement("h3");
        listName.textContent = list.name;
        listDiv.appendChild(listName);
 
        // Task input section for the current list
        const taskInputContainer = document.createElement("div");
        taskInputContainer.classList.add("input-container2");
 
        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.placeholder = "Enter task";
        taskInput.id = `task-input-${index}`;
 
        const addButton = document.createElement("button");
        addButton.textContent = "Add Task";
        addButton.onclick = () => addTask(index);
 
        taskInputContainer.appendChild(taskInput);
        taskInputContainer.appendChild(addButton);
 
        listDiv.appendChild(taskInputContainer);
 
        // List of tasks for the current list
        const taskList = document.createElement("div");
 
        list.tasks.forEach((task, taskIndex) => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-item");
 
            const taskTitle = document.createElement("span");
            taskTitle.textContent = task.name;
 
            // Create a checkbox for task completion
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.onchange = () => toggleTaskCompletion(index, taskIndex);
 
            // Create delete button for task
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete");
            deleteButton.onclick = () => deleteTask(index, taskIndex);
 
            const taskActions = document.createElement("div");
            taskActions.appendChild(checkbox);
            taskActions.appendChild(deleteButton);
 
            taskDiv.appendChild(taskTitle);
            taskDiv.appendChild(taskActions);
            taskList.appendChild(taskDiv);
        });
 
        listDiv.appendChild(taskList);
 
        // Button to delete the entire list
        const deleteListButton = document.createElement("button");
        deleteListButton.textContent = "Delete List";
        deleteListButton.classList.add("delete-list");
        deleteListButton.onclick = () => deleteList(index);
 
        listDiv.appendChild(deleteListButton);
 
        taskSection.appendChild(listDiv);
    });
}
 
// Function to add a task to a list
function addTask(listIndex) {
    const taskInput = document.getElementById(`task-input-${listIndex}`);
    const taskName = taskInput.value.trim();
 
    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }
 
    // Add the new task to the respective list
    lists[listIndex].tasks.push({
        name: taskName,
        completed: false
    });
 
    // Clear the input field
    taskInput.value = "";
 
    // Re-render the task section
    renderTaskSection();
}
 
// Function to toggle the completion status of a task
function toggleTaskCompletion(listIndex, taskIndex) {
    lists[listIndex].tasks[taskIndex].completed = !lists[listIndex].tasks[taskIndex].completed;
    renderTaskSection();
}
 
// Function to delete a task
function deleteTask(listIndex, taskIndex) {
    lists[listIndex].tasks.splice(taskIndex, 1);
    renderTaskSection();
}
 
// Function to delete a list
function deleteList(listIndex) {
    // Remove the list from the global lists array
    lists.splice(listIndex, 1);
    renderTaskSection();
}