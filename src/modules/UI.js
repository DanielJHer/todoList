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

  // renders project object into DOM
  const renderProject = (projectList) => {
    projectListDiv.innerHTML = '';
    projectList.forEach((project) => {
      projectListDiv.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="projects" data-project="${project.projectId}">
        <p>${project.name}</p>
        </div>
        `
      );
    });
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
        <button class='taskEditBtn'>Edit</button>
        <button class='taskDeleteBtn'>Delete</button>
        </div>
        `
      );
    });

    // adding event listeners for task buttons
    const taskEditBtns = document.querySelectorAll('.taskEditBtn');
    const taskDeleteBtns = document.querySelectorAll('.taskDeleteBtn');

    taskEditBtns.forEach((btn) =>
      btn.addEventListener('click', () => {
        // set the tasListDiv = '';
        // render task form of selected task
        // fill in task form with selected task data
        // submit will save into local storage
        // re-render taskListDiv with updated task data
      })
    );

    taskDeleteBtns.forEach((btn) =>
      btn.addEventListener('click', () => {
        // select task and return taskId
        const taskIndex = defaultTaskId;

        // find the index of selected task in array!

        // deletes task objects from local storage
        projectList[findCurrentProjectId()].taskList.splice(taskIndex, 1);
        storeToLocal();

        // renders updated taskList into DOM
        renderTask(projectList[findCurrentProjectId()].taskList);
      })
    );
  };

  // initial retrieve project list or empty array and render
  const projectList = JSON.parse(localStorage.getItem('projectList') || '[]');
  renderProject(projectList);
  addTaskDiv.classList.add('hide');

  // initial retrieve task index or default
  let defaultTaskId = Number(localStorage.getItem('currentIndex')) || 0;

  // selects projects
  const selected = (element) => {
    element.classList.add('selected');
  };

  // function that stores to local
  const storeToLocal = () => {
    localStorage.setItem('projectList', JSON.stringify(projectList));
    // localStorage.setItem('currentId', (id).toString());
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
  const createProjectObject = (projectId, name) => {
    const taskList = [];
    return {
      projectId,
      name,
      taskList,
    };
  };

  const findNextIndex = () => {
    const projectNodeList = document.querySelectorAll('.projects');
    return projectNodeList.length;
  };

  // process project input
  const processProjectInput = () => {
    const projectId = findNextIndex();
    const projectName = projectNameInput.value;

    // conditionals
    if (projectName === '') alert('Please enter a name!');

    const newProjectObject = createProjectObject(projectId, projectName);

    // add to local storage
    projectList.push(newProjectObject);
    storeToLocal();

    // render to DOM
    renderProject(projectList);
  };

  // creating tasks with factory functions
  const createTaskObject = (
    projectId,
    taskId,
    title,
    description,
    dueDate,
    priority
  ) => ({
    projectId,
    taskId,
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

  // find current project ID
  const findCurrentProjectId = () => {
    const selectedElement = document.querySelector('.selected');
    return selectedElement.getAttribute('data-project');
  };

  // process input -> stores object -> renders to DOM
  const processTaskInput = () => {
    // gathers user input
    const projectId = findCurrentProjectId();
    const taskId = defaultTaskId;
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
      projectId,
      taskId,
      title,
      description,
      dueDate,
      priority
    );

    // locally stores objects
    projectList[projectId].taskList.push(newTaskObject);
    storeToLocal();

    // renders task into DOM
    renderTask(projectList[projectId].taskList);

    // add to index for next task
    localStorage.setItem('currentTaskIndex', (defaultTaskId += 1));
  };

  // project selector
  const projects = document.querySelectorAll('.projects');
  const removeProjectSelectors = () => {
    projects.forEach((project) => project.classList.remove('selected'));
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

  projects.forEach((project) =>
    project.addEventListener('click', (e) => {
      removeProjectSelectors();
      selected(e.currentTarget);
      addTaskDiv.classList.remove('hide');
      renderTask(projectList[findCurrentProjectId()].taskList);
    })
  );
};

export default renderHomePage;
