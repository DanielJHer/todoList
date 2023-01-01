const renderHomePage = () => {
  // Selecting DOM elements
  const addTaskDiv = document.querySelector(".addTaskDiv");
  const inputForm = document.querySelector(".inputForm");
  const inputText = document.querySelector(".inputText");
  const submitBtn = document.querySelector(".submitBtn");
  const cancelBtn = document.querySelector(".cancelBtn");
  const taskHeader = document.querySelector(".taskHeader");

  // Rendering functions
  const toggleHide = () => {
    addTaskDiv.classList.add("hide");
    inputForm.classList.remove("hide");
  };

  const createTaskObject = (title, description, dueDate, priority) => {
    return {
      title,
      description,
      dueDate,
      priority,
    };
  };

  const createTask = (content) => {
    const newTask = document.createElement("div");
    newTask.innerText = content;

    const newContent = createTaskObject(content);
    taskHeader.appendChild(newTask);
  };

  // event listeners
  addTaskDiv.addEventListener("click", (e) => {
    toggleHide();
  });

  submitBtn.addEventListener("click", (e) => {
    const inputContent = inputText.value;
    inputText.value = "";
    createTask(inputContent);
    toggleHide();
  });

  cancelBtn.addEventListener("click", (e) => {
    toggleHide();
  });
};

export default renderHomePage;
