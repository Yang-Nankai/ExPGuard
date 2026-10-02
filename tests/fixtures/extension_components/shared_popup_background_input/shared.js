const tasks = [];

function saveTask() {
  const input = document.getElementById("task");
  const value = input.value;
  tasks.push(value);
  chrome.storage.local.set({ tasks });
}

document.getElementById("save").addEventListener("click", saveTask);
