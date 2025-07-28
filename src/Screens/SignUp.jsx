import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/user";
import starss from "../assets/starss.jpeg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const inputClass = "border-2 border-fuchsia-500 p-2 rounded-2xl";

  const handleSignUp = async () => {
    try {
      const data = await signupUser(name, email, password);

      if (data.success) {
        alert("User created successfully");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        alert("User already exists");
      }
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div
      className="h-screen text-white"
      style={{ backgroundImage: `url(${starss})` }}>
      <div className="flex flex-col justify-center items-center gap-3 border-2 border-blue-800 w-100 h-100 rounded-2xl mx-auto mt-auto">
        <h2>Sign Up</h2>

        <input
          className={inputClass}
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={inputClass}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={inputClass}
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
    </div>
  );
};

export default SignUp;
