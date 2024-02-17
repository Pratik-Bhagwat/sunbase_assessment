const formContainer = document.querySelector(".form-container");
const componentContainers = document.querySelectorAll(".component-container");

function sortFormContainer(e) {
  const draggedComponent = document.querySelector(".isDragged");

  // getting the all the componet container element except the dragged one
  const siblings = [
    ...document.querySelectorAll(".component-container:not(isDragged)"),
  ];

  const nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  formContainer.insertBefore(draggedComponent, nextSibling);
}

formContainer.addEventListener("dragover", sortFormContainer);
