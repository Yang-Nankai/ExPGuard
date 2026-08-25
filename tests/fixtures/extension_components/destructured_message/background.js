// `msg` is an opaque tainted value: the analyzer has no concrete ObjectDef for
// it, only the knowledge that an external page controls it. Each handler below
// takes the payload apart with a different structural operation; all of them
// must keep the taint alive down to chrome.bookmarks.create.

// 1. object pattern over a variable
chrome.runtime.onMessageExternal.addListener(function (msg) {
  const { url } = msg;
  chrome.bookmarks.create({ title: "a", url: url });
});

// 2. object pattern directly in the parameter position
chrome.runtime.onMessageExternal.addListener(function ({ url }) {
  chrome.bookmarks.create({ title: "b", url: url });
});

// 3. nested destructuring
chrome.runtime.onMessageExternal.addListener(function (msg) {
  const { payload: { target } } = msg;
  chrome.bookmarks.create({ title: "c", url: target });
});

// 4. array pattern
chrome.runtime.onMessageExternal.addListener(function (msg) {
  const [first] = msg.items;
  chrome.bookmarks.create({ title: "d", url: first });
});
