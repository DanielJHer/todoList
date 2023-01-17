// retrieve porject list or empty array
const projectList = JSON.parse(localStorage.getItem('projectList')) || '[]';

// retrieve id from local storage
const id = Number(localStorage.getItem('currentId')) || 0;

export default { projectList, id };
