chrome.runtime.onMessageExternal.addListener((message) => {
  const delay = parseInt(message.delay, 10);
  const squared = Math.pow(delay, 2);
  const display = squared.toFixed(2);

  // These sinks parse strings. `delay` is definitely a number/NaN, so neither
  // receives executable source text or HTML markup.
  eval(delay);
  $("#out").html(`<span>${display}</span>`);

  // This is deliberately retained: a page-controlled number may still change
  // extension scheduling/resource use even though it cannot inject code.
  chrome.alarms.create("refresh", {
    delayInMinutes: delay,
    periodInMinutes: delay,
  });
});
