import "./App.css";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Todo from "./Screens/Todo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
