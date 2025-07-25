import React, { useEffect, useState } from "react";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/todo/get-todo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTodos(data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/todo/post-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          task,
          completed: false,
        }),
      });
      const data = await res.json();
      console.log("Todo added:", data);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleCompleted = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/todo/toggle/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodos();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add Todo"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <div style={{ marginTop: "20px" }}>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h4>{todo.title}</h4>
            <p>{todo.task}</p>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo._id)}
              />
              {todo.completed ? "Completed" : "Incomplete"}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
