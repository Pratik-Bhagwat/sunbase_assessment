const asideBtns = document.querySelectorAll(".aside_btn");
const saveBtn = document.querySelector(".saveBtn");

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let randomNumber = (Math.random() * 16) | 0,
      v = c === "x" ? randomNumber : (randomNumber & 0x3) | 0x8;
    return v.toString(16);
  });
}

function createOptionsTag(options, selectTag) {
  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.innerText = optionValue;
    selectTag.appendChild(option);
  });
}

function createComponentContainer() {
  const div = document.createElement("div");
  div.setAttribute("id", generateUUID());
  div.setAttribute("draggable", true);
  div.classList.add("component-container");

  div.addEventListener("dragstart", (e) => {
    e.target.classList.add("isDragged");
  });

  div.addEventListener("dragend", (e) => {
    e.target.classList.remove("isDragged");
  });

  return div;
}

function createLabelWithDeleteButton() {
  const labelDeleteBtnDiv = document.createElement("div");
  labelDeleteBtnDiv.className = "labelDeleteBtn";

  const label = document.createElement("label");
  label.innerText = "Sample Label";
  label.classList.add("label");

  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteBtn";
  deleteButton.innerText = "🗑️";

  labelDeleteBtnDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.tagName === "BUTTON") {
      e.target.parentNode.parentNode.remove(e.target.parentNode);
    }
  });

  labelDeleteBtnDiv.append(label, deleteButton);

  return labelDeleteBtnDiv;
}

function logContainerDataAsJSON() {
  const componentDataJSON = [];

  const allComponents = document.querySelectorAll(".component-container");

  allComponents.forEach((component) => {
    const componentData = {};

    const comp = component.querySelector(".component");

    componentData.id = component.getAttribute("id");

    const type = comp.tagName.toLowerCase();
    componentData.type = type;

    let value = comp.value;
    componentData.value = value;
    const label = component.querySelector(".label").innerText;
    componentData.label = label;

    if (type === "select") {
      const options = [];
      const selectTagOptions = comp.options;

      for (let i = 0; i < selectTagOptions.length; i++) {
        options.push(selectTagOptions[i].value);
      }

      componentData.options = options;
    } else {
      const placeholder = comp.placeholder;
      componentData.placeholder = placeholder;
    }
    comp.value = type === "select" ? "none" : "";
    componentDataJSON.push(componentData);
  });

  console.log(JSON.stringify(componentDataJSON));

  console.log(componentDataJSON);
}

asideBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (formContainer?.children[0]?.tagName === "P") {
      formContainer.removeChild(formContainer.children[0]);
      formContainer.style.flexDirection = "column";
      formContainer.style.justifyContent = "flex-start";
      formContainer.style.alignItems = "flex-start";
    }
    const value = e.target.id;
    const div = createComponentContainer();
    const label = createLabelWithDeleteButton();

    if (value === "input") {
      const input = document.createElement("input");
      input.classList.add("input", "component");
      input.placeholder = "Enter here";

      div.append(label, input);
    } else if (value === "select") {
      const select = document.createElement("select");

      const defaultValue = document.createElement("option");
      defaultValue.setAttribute("value", "none");
      defaultValue.setAttribute("selected", "true");
      defaultValue.setAttribute("hidden", "true");
      defaultValue.innerText = "Please select a option";

      select.classList.add("select", "component");
      select.appendChild(defaultValue);

      createOptionsTag(["option1", "option2", "option3"], select);

      div.append(label, select);
    } else {
      const textarea = document.createElement("textarea");
      textarea.classList.add("textarea", "component");
      textarea.placeholder = "Enter a para here";

      div.append(label, textarea);
    }

    formContainer.appendChild(div);
  });
});

saveBtn.addEventListener("click", logContainerDataAsJSON);
