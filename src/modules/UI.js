import { projectList, id } from './Storage';

/* eslint-disable consistent-return */
const renderHomePage = () => {
  // Selecting DOM elements
  const addTaskDiv = document.querySelector('.addTaskDiv');
  const inputForm = document.querySelector('.inputForm');
  const inputText = document.querySelector('.inputText');
  const submitBtn = document.querySelector('.submitBtn');
  const cancelBtn = document.querySelector('.cancelBtn');
  const textArea = document.querySelector('.textArea');
  const inputDate = document.querySelector('.inputDate');
  const priorityList = document.getElementsByName('priority');
  const addProjectDiv = document.querySelector('.addProjectDiv');
  const taskListDiv = document.querySelector('.taskListDiv');
  const projectListDiv = document.querySelector('.projectListDiv');
  const inputProjectForm = document.querySelector('.inputProjectForm');
  const projectName = document.querySelector('.projectName');
  const projectSubmitBtn = document.querySelector('.projectSubmitBtn');
  const projectCancelBtn = document.querySelector('.projectCancelBtn');

  // toggle task forms
  const toggleHide = () => {
    addTaskDiv.classList.toggle('hide');
    inputForm.classList.toggle('hide');
  };

  // toggle project forms
  const toggleHideProject = () => {
    addProjectDiv.classList.toggle('hide');
    inputProjectForm.classList.toggle('hide');
  };

  // create project object with factory functions
  // const createProjectObject = (projectId) => ({
  //   return { projectId };
  // });

  // process project input
  const processProjectInput = () => {
    const projectId = projectName.value;
  };

  // creating tasks with factory functions
  const createTaskObject = (title, description, dueDate, priority) => ({
    title,
    description,
    dueDate,
    priority,
  });

  // finding priority
  const findPriority = (nodeList) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].checked === true) return nodeList[i].value;
    }
  };

  // process input -> stores object -> renders to DOM
  const processTaskInput = () => {
    // gathers user input
    const title = inputText.value;
    const description = textArea.value;
    const dueDate = inputDate.value;
    const priority = findPriority(priorityList);

    // conditionals
    if (
      title.length === 0 ||
      description.length === 0 ||
      dueDate.length === 0 ||
      priority.length === 0
    ) {
      alert('Please complete all fields');
      return;
    }

    // creates new object using factory function
    const newTaskObject = createTaskObject(
      title,
      description,
      dueDate,
      priority
    );

    // locally stores objects
    const taskList = JSON.parse(localStorage.getItem('taskList') || '[]');
    taskList.push(newTaskObject);
    localStorage.setItem('taskList', JSON.stringify(taskList));

    // renders task into DOM
    renderTask(taskList);
  };

  // renders task object into DOM
  const renderTask = (taskList) => {
    taskListDiv.innerHTML = '';
    taskList.forEach((task) => {
      taskListDiv.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="tasks">
        <p>Title:${task.title} Description:${task.description} Due Date:${task.dueDate} Priority:${task.priority}<p>
        </div>
        `
      );
    });
  };

  // renders local storage into dom
  const taskList = JSON.parse(localStorage.getItem('taskList') || '[]');
  renderTask(taskList);

  // event listeners
  addTaskDiv.addEventListener('click', () => {
    toggleHide();
    inputText.focus();
  });

  submitBtn.addEventListener('click', () => {
    processTaskInput();
    toggleHide();
  });

  cancelBtn.addEventListener('click', () => {
    toggleHide();
  });

  addProjectDiv.addEventListener('click', () => {
    toggleHideProject();
  });

  projectSubmitBtn.addEventListener('click', () => {
    processProjectInput();
    toggleHideProject();
  });

  projectCancelBtn.addEventListener('click', () => {
    toggleHideProject();
  });
};

export default renderHomePage;
