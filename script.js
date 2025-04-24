document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    addButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);
    loadTasks();

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            taskList.innerHTML = storedTasks;
            addEventListenersToTasks();
        }
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(listItem);
            saveTasks();
            taskInput.value = '';
            addEventListenersToTaskItem(listItem);
        }
    }

    function handleTaskActions(event) {
        const target = event.target;
        if (target.classList.contains('delete-button')) {
            target.parentElement.remove();
            saveTasks();
        } else if (target.classList.contains('task-text')) {
            target.classList.toggle('completed');
            saveTasks();
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', taskList.innerHTML);
    }

    function addEventListenersToTasks() {
        const listItems = taskList.querySelectorAll('li');
        listItems.forEach(item => {
            addEventListenersToTaskItem(item);
        });
    }

    function addEventListenersToTaskItem(listItem) {
        const taskTextSpan = listItem.querySelector('.task-text');
        const deleteButton = listItem.querySelector('.delete-button');

        if (taskTextSpan) {
            taskTextSpan.addEventListener('click', () => {
                taskTextSpan.classList.toggle('completed');
                saveTasks();
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                listItem.remove();
                saveTasks();
            });
        }
    }
});