import React, { useEffect, useState } from "react";
import {
  getTodosApi,
  postTodoApi,
  editTodoApi,
  toggleTodoApi,
  deleteTodoApi,
} from "../api/todo";

import { messaging } from "../firebase/firebase";
import { getToken } from "firebase/messaging";

const Todo = () => {
  const [editClick, setEditClick] = useState(false);
  const [editId, setEditId] = useState("");

  const [state, setState] = useState({
    title: "",
    task: "",
    completed: false,
    scheduledTime: "",
    fcmToken: "",
    todos: [],
  });

  const updateTitle = (e) =>
    setState((prev) => ({ ...prev, title: e.target.value }));

  const updateTask = (e) =>
    setState((prev) => ({ ...prev, task: e.target.value }));

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    const data = await getTodosApi(token);
    setState((prev) => ({ ...prev, todos: data.todos }));
  };

  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BBTExTCv0DU5F1XlwxZu1MhTfCWPC70cz0sxr47mYkLS6tZpoiwzueiDUO-HelS-XbuJrrN7bpM50KMo03T-pro",
        });

        if (currentToken) {
          console.log("✅ FCM Token:", currentToken);
          setState((prev) => ({ ...prev, fcmToken: currentToken }));
        } else {
          console.warn("⚠️ No FCM token found. Permission might be blocked.");
        }
      } catch (err) {
        console.error("❌ Error getting FCM token", err);
      }
    };

    fetchFcmToken();
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const token = localStorage.getItem("token");
    const { title, task, scheduledTime, fcmToken } = state;

    if (!title || !task) {
      alert("Title and task are required");
      return;
    }

    const dateObject = new Date(state.scheduledTime);
    try {
      if (editClick) {
        await editTodoApi(token, editId, {
          title,
          task,
          completed: state.completed,
          scheduledTime: dateObject,
        });
        setEditClick(false);
        setEditId("");
      } else {
        await postTodoApi(token, {
          title,
          task,
          completed: false,
          scheduledTime: dateObject,
          fcmToken,
        });
        console.log(dateObject);
      }

      setState((prev) => ({
        ...prev,
        title: "",
        task: "",
        completed: false,
        scheduledTime: "",
      }));
      fetchTodos();
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  const toggleCompleted = async (id) => {
    const token = localStorage.getItem("token");
    await toggleTodoApi(token, id);
    fetchTodos();
  };

  const editHandler = (id) => {
    const todoToEdit = state.todos.find((todo) => todo._id === id);
    if (todoToEdit) {
      setState((prev) => ({
        ...prev,
        title: todoToEdit.title,
        task: todoToEdit.task,
        completed: todoToEdit.completed,
      }));
      setEditId(id);
      setEditClick(true);
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await deleteTodoApi(token, id);
      setEditClick(false);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h2>{editClick ? "Edit Todo" : "Add New Todo"}</h2>

      <input
        type="text"
        placeholder="Title"
        value={state.title}
        onChange={updateTitle}
      />
      <input
        type="text"
        placeholder="Task"
        value={state.task}
        onChange={updateTask}
      />
      <input
        type="datetime-local"
        value={state.scheduledTime}
        onChange={(e) =>
          setState((prev) => ({ ...prev, scheduledTime: e.target.value }))
        }
      />
      <button onClick={addTodo}>
        {editClick ? "Update Todo" : "Add Todo"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {state.todos.map((todo) => (
          <div key={todo._id} style={{ marginBottom: "15px" }}>
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
            <p>
              Scheduled at:{" "}
              {todo?.scheduledTime
                ? new Date(todo.scheduledTime).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })
                : "No time set"}
            </p>

            <div>
              <button onClick={() => editHandler(todo._id)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
