// Extension-owned code remains analyzed even when its bundled jQuery file is
// ignored.  The `.on()` summary must reach this handler.
$(document).on("click.audit", function (event) {
  chrome.bookmarks.create({ title: "event", url: event.target.value });
});
