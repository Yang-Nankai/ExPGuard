chrome.storage.local.get("heaven_grok_status", (result) => {
  document.querySelector("#status").innerHTML = result.heaven_grok_status;
});

chrome.storage.local.get("dashboard", (result) => {
  const data = result.dashboard;
  const score = typeof data.score === "number" ? data.score : 0;
  document.querySelector("#safe").innerHTML =
    `<b>${score.toFixed(2)}</b> / ${data.taskCount} / ${data.tasks.length} / ${new Date(data.updated).toLocaleString()}`;
  document.querySelector("#raw").innerHTML = data.title;
});
