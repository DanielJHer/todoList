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
  const editForm = document.querySelector('.editForm');
  const editInputText = document.querySelector('.editInputText');
  const editSubmitBtn = document.querySelector('.editSubmitBtn');
  const editCancelBtn = document.querySelector('.editCancelBtn');
  const editTextArea = document.querySelector('.editTextArea');
  const editInputDate = document.querySelector('.editInputDate');
  const taskEditId = document.querySelector('.taskEditId');

  // render priority nodelist
  const renderPriorityCheck = (selectedTaskObject) => {
    for (let i = 0; i < priorityList.length; i++) {
      if (priorityList[i].value === selectedTaskObject.priority)
        priorityList[i].checked = true;
    }
  };

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
        <div class="tasks" data-task=${task.taskId}>
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
      btn.addEventListener('click', (e) => {
        addTaskDiv.classList.add('hide');
        // find selected task object
        const selectedTaskDiv = e.target.closest('div');
        const selectedTask = selectedTaskDiv.getAttribute('data-task');
        const selectedTaskObject = projectList[
          findCurrentProjectId()
        ].taskList.find((task) => task.taskId == selectedTask);

        // render task form with selected task object
        taskListDiv.innerHTML = '';
        editForm.classList.remove('hide');
        editInputText.value = selectedTaskObject.title;
        editTextArea.value = selectedTaskObject.description;
        renderPriorityCheck(selectedTaskObject);
        editInputDate.value = selectedTaskObject.dueDate;
        taskEditId.value = selectedTaskObject;
        console.log(selectedTaskObject);
      })
    );

    taskDeleteBtns.forEach((btn) =>
      btn.addEventListener('click', (e) => {
        // finds the selected task
        const selectedTaskDiv = e.target.closest('div');
        const selectedTask = selectedTaskDiv.getAttribute('data-task');

        // deletes task objects from local storage
        projectList[findCurrentProjectId()].taskList = projectList[
          findCurrentProjectId()
        ].taskList.filter((task) => task.taskId != selectedTask);
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
  let defaultTaskId = Number(localStorage.getItem('currentTaskId')) || 0;

  // selects projects
  const selected = (element) => {
    element.classList.add('selected');
  };

  // function that stores projectList to local
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

  // process editing task object form
  const processEditingTask = () => {
    // gets input data
    const projectId = findCurrentProjectId();
    const taskId = defaultTaskId;
    const title = editInputText.value;
    const description = editTextArea.value;
    const dueDate = editInputDate.value;
    const priority = findPriority(priorityList);
    const selectedTaskObject = taskEditId.value;

    const newEditedTaskObject = createTaskObject(
      projectId,
      taskId,
      title,
      description,
      dueDate,
      priority
    );

    // locates the task index and then replaces it with new task object
    const taskIndex =
      projectList[projectId].taskList.indexOf(selectedTaskObject);
    projectList[projectId].taskList.splice(taskIndex, 1, newEditedTaskObject);
    storeToLocal();

    // renders new task into DOM
    renderTask(projectList[projectId].taskList);
    editForm.classList.add('hide');
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
    localStorage.setItem('currentTaskId', (defaultTaskId += 1));
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

  editCancelBtn.addEventListener('click', () => {
    console.log('hi');
  });

  editSubmitBtn.addEventListener('click', () => {
    processEditingTask();

    console.log('hey');
  });

  projectSubmitBtn.addEventListener('click', () => {
    processProjectInput();
    toggleHideProject();
    addTaskDiv.classList.remove('hide');
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
