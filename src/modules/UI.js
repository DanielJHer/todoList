// import { projectList, id } from './Storage';

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
  const projectNameInput = document.querySelector('.projectNameInput');
  const projectSubmitBtn = document.querySelector('.projectSubmitBtn');
  const projectCancelBtn = document.querySelector('.projectCancelBtn');

  // retrieve project list or empty array
  let projectList = JSON.parse(localStorage.getItem('projectList') || '[]');

  // function that stores to local
  const storeToLocal = () => {
    localStorage.setItem('projectList', JSON.stringify(projectList));
  };

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
  const createProjectObject = (projectId, name) => ({
    projectId,
    name,
  });

  // process project input
  const processProjectInput = () => {
    const projectName = projectNameInput.value;

    // conditionals
    if (projectName === '') alert('Please enter a name!');

    const newProjectObject = createProjectObject(null, projectName);

    // add to local storage
    projectList.push(newProjectObject);
    storeToLocal();

    // render to DOM
    renderProject(projectList);
  };

  // renders project object into DOM
  const renderProject = (projectList) => {
    projectListDiv.innerHTML = '';
    projectList.forEach((project) => {
      projectListDiv.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="projects">
        <p>${project.name}<p>
        </div>
        `
      );
    });
  };

  // creating tasks with factory functions
  const createTaskObject = (
    projectId,
    index,
    title,
    description,
    dueDate,
    priority
  ) => ({
    projectId,
    index,
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
