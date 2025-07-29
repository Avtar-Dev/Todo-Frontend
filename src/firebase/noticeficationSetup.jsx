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

// useFCMToken.js

// import { useEffect, useRef } from "react";
// import { getToken } from "firebase/messaging";
// import axios from "axios";
// import { messaging } from "./firebase"; // your Firebase instance

// const useFCMToken = (userId) => {
//   const hasRequestedToken = useRef(false); // ✅ prevent double-call from StrictMode

//   useEffect(() => {
//     if (hasRequestedToken.current) return;
//     hasRequestedToken.current = true;

//     const requestPermissionAndGetToken = async () => {
//       try {
//         const permission = await Notification.requestPermission();
//         if (permission === "granted") {
//           const currentToken = await getToken(messaging, {
//             vapidKey:
//               "BBTExTCv0DU5F1XlwxZu1MhTfCWPC70cz0sxr47mYkLS6tZpoiwzueiDUO-HelS-XbuJrrN7bpM50KMo03T-pro",
//           });

//           console.log("✅ FCM Token:", currentToken);

//           await axios.post("http://localhost:3000/user/save-fcm-token", {
//             userId,
//             fcmToken: currentToken, // ✅ FIXED
//           });
//         } else {
//           console.warn("❌ Notification permission denied");
//         }
//       } catch (err) {
//         console.error("❌ Error getting FCM token:", err);
//       }
//     };

//     requestPermissionAndGetToken();
//   }, [userId]);
// };

// export default useFCMToken;
