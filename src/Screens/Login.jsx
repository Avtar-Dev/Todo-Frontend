// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const userLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("data", res);

//       if (res.ok && data.token) {
//         localStorage.setItem("token", data.token);
//         navigate("/todo");
//       } else {
//         alert(data.msg);
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//     }
//   };
//   return (
//     <>
//       <div>
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={userLogin}>Login</button>
//       </div>
//       <div>
//         <p>
//           Or
//           <button onClick={() => navigate("/signup")}>SignUp</button>
//         </p>
//       </div>
//     </>
//   );
// };

// export default Login;

// src/components/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user"; // ✅ Import the API function

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password); // ✅ Call the API

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/todo");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <div>
        <p>
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
