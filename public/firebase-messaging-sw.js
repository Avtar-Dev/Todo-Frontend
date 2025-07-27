importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyApQXqP1q52kCrCNWsuqXl__RWLuRMHDx8",
  authDomain: "todo-app-9c08d.firebaseapp.com",
  projectId: "todo-app-9c08d",
  storageBucket: "todo-app-9c08d.appspot.com",
  messagingSenderId: "915932933202",
  appId: "1:915932933202:web:d0bdeec4f9dee9dd69438b",
  measurementId: "G-G7ZXWWYMCE",
});

const messaging = firebase.messaging(); // ✅ NO need to re-initialize App here

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
