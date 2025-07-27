// Register firebase-messaging service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Firebase messaging SW registered:", registration);
    })
    .catch((err) => {
      console.error("❌ Service Worker registration failed:", err);
    });
}
