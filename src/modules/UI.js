import storeObject from "./Storage";

const renderHomePage = () => {
  // Selecting DOM elements
  const taskHeader = document.querySelector(".taskHeader");
  const addTaskDiv = document.querySelector(".addTaskDiv");
  const inputForm = document.querySelector(".inputForm");
  const inputText = document.querySelector(".inputText");
  const submitBtn = document.querySelector(".submitBtn");
  const cancelBtn = document.querySelector(".cancelBtn");
  const textArea = document.querySelector(".textArea");
  const inputDate = document.querySelector(".inputDate");
  const priorityList = document.getElementsByName("priority");
  const addProjectDiv = document.querySelector(".addProjectDiv");

  // array that stores tasks as objects
  let taskList = [];

  // Rendering form
  const toggleHide = () => {
    addTaskDiv.classList.toggle("hide");
    inputForm.classList.toggle("hide");
  };

  // creating tasks with factory functions
  const createTaskObject = (title, description, dueDate, priority) => {
    return {
      title,
      description,
      dueDate,
      priority,
    };
  };

  // finding priority
  const findPriority = (nodeList) => {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].checked === true) {
        return nodeList[i].value;
      }
    }
  };

  // process input -> stores object -> renders to DOM
  const processTaskInput = (e) => {
    // gathers user input
    const title = inputText.value;
    const description = textArea.value;
    const dueDate = inputDate.value;
    const priority = findPriority(priorityList);

    // creates new object using factory function
    const newTaskObject = createTaskObject(
      title,
      description,
      dueDate,
      priority
    );

    // locally stores objects
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList.push(newTaskObject);
    localStorage.setItem("taskList", JSON.stringify(taskList));

    // renders task into DOM
    renderTask(title, description, dueDate, priority);
  };

  const renderTask = (title, description, dueDate, priority) => {
    taskHeader.insertAdjacentHTML(
      "afterEnd",
      `
      <div class="tasks">
      <p>Title:${title} Description:${description} Due Date:${dueDate} Priority:${priority}<p>
      </div>
      `
    );
  };

  // event listeners
  addTaskDiv.addEventListener("click", (e) => {
    toggleHide();
    inputText.focus();
  });

  submitBtn.addEventListener("click", (e) => {
    processTaskInput();
    toggleHide();
  });

  cancelBtn.addEventListener("click", (e) => {
    toggleHide();
  });

  addProjectDiv.addEventListener("click", (e) => {});
};

export default renderHomePage;
