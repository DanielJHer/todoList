const addTask = () => {
  console.log("working");

  // hides itself and then renders a form
  // that form takes input and then creates object which appends into DOM
};

const createToDos = () => {
  const addTaskDiv = document.querySelector(".addTaskDiv");
  addTaskDiv.addEventListener("click", addTask);
};

export default createToDos;
