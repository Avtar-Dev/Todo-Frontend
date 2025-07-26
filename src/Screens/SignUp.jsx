// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const userSign = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/user/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setName("");
//         setEmail("");
//         setPassword("");
//         alert("User Created Successfully");
//       } else {
//         alert("User already exists");
//       }
//       console.log("Response:", data);
//     } catch (error) {
//       console.error("Signup Error:", error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

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

//         <button onClick={userSign}>SignUp</button>
//       </div>
//       <div>
//         <p>
//           If you already have an account then{" "}
//           <p onClick={() => navigate("/")}>Login</p>
//         </p>
//       </div>
//     </>
//   );
// };

// export default SignUp;

// src/components/SignUp.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/user"; // ✅ API function import

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const data = await signupUser(name, email, password); // ✅ Call API

      if (data.success) {
        alert("User created successfully");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/"); // Redirect to login
      } else {
        alert("User already exists");
      }
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button onClick={handleSignUp}>Sign Up</button>

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/")}>Login</button>
      </p>
    </div>
  );
};

export default SignUp;
