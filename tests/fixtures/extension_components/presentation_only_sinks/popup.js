chrome.runtime.onMessageExternal.addListener((message) => {
  const value = message.value;

  // .val() and .text() do not parse HTML; Action title/badge APIs only render
  // extension-owned presentation state.
  $("#field").val(value);
  $("#label").text(value);
  chrome.action.setBadgeText({ text: value });
  chrome.action.setTitle({ title: value });
});
