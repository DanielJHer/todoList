import storeObject from "./Storage";

const renderHomePage = () => {
  // Selecting DOM elements
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

  // Rendering functions
  const toggleHide = () => {
    addTaskDiv.classList.add("hide");
    inputForm.classList.remove("hide");
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

  // getting user input to create object
  const processTaskInput = () => {
    // gather user input
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

    // locally store object
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList.push(newTaskObject);
    localStorage.setItem("taskList", JSON.stringify(taskList));
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
