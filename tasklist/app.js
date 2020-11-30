// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //load data from localstorage
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Delete task
  taskList.addEventListener('click', delteTask);
  clearBtn.addEventListener('click', clearTask);
  filter.addEventListener('keyup', filterTask);
}

//load data from localstorage
function getTasks(){
  let tasks;
  if(localStorage.getItem("tasks")===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(
    value => addItem(value)
  )
}
// create item element
function addItem(text){
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(text));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
}
// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }
  else{
    addItem(taskInput.value);

    //store in local storage
    storeInLS(taskInput.value);
  }
  // Clear input
  taskInput.value = '';

  e.preventDefault();
}
//save data in the localStorage
function storeInLS(task){
  let tasks;
  if(localStorage.getItem("tasks")===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
//Delete Task
function delteTask(e) {
  console.log(e.target);
  if (e.target.classList.contains('fa-remove')) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      //delte item in the localStorage
      let tasks=JSON.parse(localStorage.getItem("tasks"));
      //console.log(e.target.parentElement.parentElement.firstChild.textContent);
      const index=tasks.indexOf(e.target.parentElement.parentElement.firstChild.textContent);
      tasks.splice(index,1);
      localStorage.setItem("tasks",JSON.stringify(tasks));
    }
  }
}

//clear Task
function clearTask() {
  //taskList.innerHTML=" ";
  //faster way:loop
  let tasks = taskList.childNodes;
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    
  }
  //clear in the localStorage
  localStorage.removeItem("tasks");
}

//filter task
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      //console.log(typeof task.firstChild) object
      const item=task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text)!=-1){
        task.style.display='block';
      }else{
        task.style.display='none';
      }
    }
  );
}

