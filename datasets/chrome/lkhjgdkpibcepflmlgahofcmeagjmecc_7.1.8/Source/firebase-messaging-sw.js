// The following are eslint rules
/*global importScripts firebase clients*/

console.log("registered worker");
console.log("VERSION:7.1.8");
importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js");

const config = {
  apiKey: "AIzaSyBSzODAAGclyzBl6iucJ_MpLXqfCwMjOqc",
  authDomain: "scener-firebase.firebaseapp.com",
  databaseURL: "https://scener-firebase.firebaseio.com",
  projectId: "scener-firebase",
  storageBucket: "scener-firebase.appspot.com",
  messagingSenderId: "65489620417",
  appId: "1:65489620417:web:89ad6a32f30234f3",
};

firebase.initializeApp(config);

console.log(self);

self.addEventListener("push", function (e) {
  // Skip if event is our own custom event
  console.log("[firebase-messaging-sw.js] message ", e, e.data.json());

  // if (e.custom) return;

  // Create a new event to dispatch

  let data = e.data.json().notification;
  let extra = e.data.json().data;
  // Stop event propagation
  // e.stopImmediatePropagation();
  console.log(data);
  let notificationOptions = {
    body: data.body,
    icon: extra && extra.image && extra.image.indexOf("default") == -1 ? extra.image : "./ScenerIcon_128.png",
    data: extra,
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(self.registration.showNotification(data.title, notificationOptions));
    }, 0);
  });
});

self.addEventListener("notificationclick", (event) => {
  console.log("clicked!", event);
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url.indexOf("chrome-extension://") != -1) {
          console.log(client);
          let ev = {
            ...event.notification.data,
            name: "notificationclick",
          };
          return client.postMessage(ev);
        }
      }
    })
  );
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function ({ data }) {
  console.log("[firebase-messaging-sw.js] Received background message ", data.json());
  // Customize notification here

  // let data = JSON.parse(payload.data.default).data;
  console.log("service-worker", data);
  let notificationOptions = {
    body: data.body,
    iconUrl: "./ScenerIcon_128.png",
  };
  return self.registration.showNotification(data.title, notificationOptions);
});

messaging.onTokenRefresh(function (token) {
  messaging
    .getToken()
    .then((refreshedToken) => {
      console.log("Token refreshed.", refreshedToken);
    })
    .catch((err) => {
      console.log("Unable to retrieve refreshed authToken ", err);
    });
});
