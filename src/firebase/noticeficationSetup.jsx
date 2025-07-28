import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const NotificationSetup = () => {
  useEffect(() => {
    const requestPermissionAndGetToken = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BBTExTCv0DU5F1XlwxZu1MhTfCWPC70cz0sxr47mYkLS6tZpoiwzueiDUO-HelS-XbuJrrN7bpM50KMo03T-pro",
          });

          if (currentToken) {
            console.log("✅ FCM Token:", currentToken);
            // 👉 Optional: send token to backend here
          } else {
            console.warn(
              "⚠️ No token available. User may have blocked notifications."
            );
          }
        } else {
          console.warn("🔒 Notification permission not granted.");
        }
      } catch (err) {
        console.error("❌ Error getting FCM token:", err);
      }
    };

    requestPermissionAndGetToken();
  }, []);

  return null; // No UI
};

export default NotificationSetup;
