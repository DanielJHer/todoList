const createTask = (content) => {
  const newTask = document.createElement("div");
  newTask.innerText = content;

  const taskHeader = document.querySelector(".taskHeader");
  taskHeader.appendChild(newTask);
};

const createToDos = () => {
  const addTaskDiv = document.querySelector(".addTaskDiv");
  const inputForm = document.querySelector(".inputForm");
  const inputText = document.querySelector(".inputText");

  addTaskDiv.addEventListener("click", (e) => {
    addTaskDiv.classList.add("hide");
    inputForm.classList.remove("hide");
  });

  const submitBtn = document.querySelector(".submitBtn");
  submitBtn.addEventListener("click", (e) => {
    const inputContent = inputText.value;
    inputText.value = "";
    createTask(inputContent);
    inputForm.classList.add("hide");
    addTaskDiv.classList.remove("hide");
  });

  const cancelBtn = document.querySelector(".cancelBtn");
  cancelBtn.addEventListener("click", (e) => {
    inputForm.classList.add("hide");
    addTaskDiv.classList.remove("hide");
  });
};

export default createToDos;
