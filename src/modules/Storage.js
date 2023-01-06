const storeObject = () => {
  localStorage.setItem("taskList", JSON.stringify(taskList));
};

export default storeObject;
