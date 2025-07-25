import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const userLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("data", res);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/todo");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <div>
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={userLogin}>Login</button>
    </div>
  );
};

export default Login;

// const toggleCompleted = async (id) => {
//   const token = localStorage.getItem("token");

//   await fetch(`http://localhost:3000/todo/toggle-completed/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });
// };
