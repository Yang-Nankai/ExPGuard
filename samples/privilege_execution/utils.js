// utils.js
export function addBmk(title, url) {
  // SINK 2: Privilege Escalation
  chrome.bookmarks.create({ title: title, url: url }, (newBookmark) => {
    console.log("书签已创建:", newBookmark);
  });
}