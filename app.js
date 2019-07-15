const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear Tasks event 
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
            // Create 'li' element
        const li = document.createElement('li');

        // Side note: Materalize ul has 'collection' 
        // and li's under it 'collection-item' class
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // Append 'li' to 'ul'
        taskList.appendChild(li);
        // console.log(li);
    });
}

// Add task 
function addTask(e){
    if (taskInput.value === '') {
        alert('Please, add a task');
    }

    // Create 'li' element
    const li = document.createElement('li');

    // Side note: Materalize ul has 'collection' 
    // and li's under it 'collection-item' class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append 'li' to 'ul'
    taskList.appendChild(li);
    // console.log(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
};

// Store Task (local storage)
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log(e.target)
        if(confirm('Are you positive?')) {
            // Remove from DOM
            e.target.parentElement.parentElement.remove();

            // Remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }   
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // Solution #1
    // taskList.innerHTML = '';

    // Solution #2 (faster)
    // While there is still a list
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from local storage
    clearTasksFromLocalStorage();
}

// Clear all tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text)
    // querySelectorAll returns a node list so 
    // we can use forEach
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}