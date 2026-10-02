// `prev` is one iteration behind `cur`, so it only becomes tainted on the
// *second* pass through the body. A single-pass (back-edge-free) CFG reports
// nothing here.

// 1. while loop, unknown guard
chrome.runtime.onMessageExternal.addListener(function (msg) {
  let prev = "";
  let cur = "";
  while (msg.more) {
    prev = cur;
    cur = msg.url;
  }
  chrome.bookmarks.create({ title: "a", url: prev });
});

// 2. for loop with a constant-true guard — the loop-exit edge must stay live
//    even though `i < 3` folds to true, or everything after the loop dies.
chrome.runtime.onMessageExternal.addListener(function (msg) {
  let prev = "";
  let cur = "";
  for (let i = 0; i < 3; i++) {
    prev = cur;
    cur = msg.url;
  }
  chrome.bookmarks.create({ title: "b", url: prev });
});

// 3. accumulator inside the body reaches the sink after the loop
chrome.runtime.onMessageExternal.addListener(function (msg) {
  let acc = "";
  let i = 0;
  while (i < 3) {
    acc = acc + msg.url;
    i = i + 1;
  }
  chrome.bookmarks.create({ title: "c", url: acc });
});
