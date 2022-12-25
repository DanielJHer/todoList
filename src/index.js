import "./styles/styles.css";
import createToDos from "./modules/createtodos";

// add event listeners for click -> open form -> event listener for when form is submitted -> take info and render into dom

const runPage = (() => {
  createToDos();
})();
