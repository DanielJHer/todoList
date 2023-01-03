const renderHomePage = () => {
  // Selecting DOM elements
  const addTaskDiv = document.querySelector(".addTaskDiv");
  const inputForm = document.querySelector(".inputForm");
  const inputText = document.querySelector(".inputText");
  const submitBtn = document.querySelector(".submitBtn");
  const cancelBtn = document.querySelector(".cancelBtn");
  const textArea = document.querySelector(".textArea");
  const inputDate = document.querySelector(".inputDate");
  const priority = document.getElementsByName("priority");

  // array that stores tasks
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

  const findPriority = (elements) => {
    elements.map((e) => (e.checked ? e.value : ""));
  };

  const processTaskInput = () => {
    let title = inputText.value;
    let description = textArea.value;
    let dueDate = inputDate.value;
    let priority = findPriority(priority);

    const newTaskObject = createTaskObject(
      title,
      description,
      dueDate,
      priority
    );

    tasklist.push(newTaskObject);
    console.log(taskList);
  };

  // event listeners
  addTaskDiv.addEventListener("click", (e) => {
    toggleHide();
  });

  submitBtn.addEventListener("click", (e) => {
    processTaskInput();
    toggleHide();
  });

  cancelBtn.addEventListener("click", (e) => {
    toggleHide();
  });
};

export default renderHomePage;
