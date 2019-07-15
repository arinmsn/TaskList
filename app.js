const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear Tasks event 
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
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

    taskInput.value = '';

    e.preventDefault();
};

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log(e.target)
        if(confirm('Are you positive?')) {
            e.target.parentElement.parentElement.remove();
        }   
    }
}

function clearTasks() {
    // Solution #1
    // taskList.innerHTML = '';

    // Solution #2 (faster)
    // While there is still a list
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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