window.addEventListener("run-script", (event) => {
  const fn = new Function(event.detail.script);
  fn();
});
