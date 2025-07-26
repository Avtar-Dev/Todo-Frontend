// import React, { useEffect, useState } from "react";

// const Todo = () => {
//   const [editClick, setEditClick] = useState(false);
//   const [editId, setEditId] = useState("");
//   const [state, setState] = useState({
//     title: "",
//     task: "",
//     completed: false, // ✅ CHANGED: Added completed to state
//     todos: [],
//   });

//   const updateTitle = (e) =>
//     setState((prev) => ({ ...prev, title: e.target.value }));

//   const updateTask = (e) =>
//     setState((prev) => ({ ...prev, task: e.target.value }));

//   const getTodos = (todos) => setState((prev) => ({ ...prev, todos: todos }));

//   const fetchTodos = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:3000/todo/get-todo", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     getTodos(data.todos);
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const addTodo = async () => {
//     if (editClick) {
//       const editTodo = async () => {
//         const token = localStorage.getItem("token");
//         try {
//           const res = await fetch(
//             `http://localhost:3000/todo/edit-todo/${editId}`,
//             {
//               method: "PUT",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({
//                 title: state.title,
//                 task: state.task,
//                 completed: state.completed, // ✅ CHANGED: Use existing completed status
//               }),
//             }
//           );
//           const data = await res.json();
//           setState((prev) => ({
//             ...prev,
//             title: "",
//             task: "",
//             completed: false, // ✅ CHANGED: Reset completed
//           }));
//           setEditClick(false);
//           setEditId("");
//           console.log("Todo edited:", data);
//           fetchTodos();
//         } catch (error) {
//           console.error("Error editing todo:", error);
//         }
//       };
//       editTodo();
//     } else {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await fetch("http://localhost:3000/todo/post-todo", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             title: state.title,
//             task: state.task,
//             completed: false,
//           }),
//         });
//         const data = await res.json();
//         setState((prev) => ({
//           ...prev,
//           title: "",
//           task: "",
//           completed: false, // ✅ CHANGED: Reset after new add
//         }));
//         console.log("Todo added:", data);
//         fetchTodos();
//       } catch (error) {
//         console.error("Error adding todo:", error);
//       }
//     }
//   };

//   const toggleCompleted = async (id) => {
//     const token = localStorage.getItem("token");
//     await fetch(`http://localhost:3000/todo/toggle/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     fetchTodos();
//   };

//   const editHandler = (id) => {
//     const todoToEdit = state.todos.find((todo) => todo._id === id);
//     if (todoToEdit) {
//       setState((prev) => ({
//         ...prev,
//         title: todoToEdit.title,
//         task: todoToEdit.task,
//         completed: todoToEdit.completed, // ✅ CHANGED: Preserve completed status
//       }));
//       setEditId(id);
//       setEditClick(true);
//     }
//   };

//   const deleteTodo = async (id) => {
//     const token = localStorage.getItem("token");

//     try {
//       const res = await fetch(`http://localhost:3000/todo/delete-todo/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       setEditClick(false);
//       console.log("Deleted:", data.message || "Todo deleted");
//       fetchTodos();
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Add Title"
//         value={state.title}
//         onChange={(e) => updateTitle(e)}
//       />
//       <input
//         type="text"
//         placeholder="Add Todo"
//         value={state.task}
//         onChange={(e) => updateTask(e)}
//       />
//       <button onClick={addTodo}>
//         {editClick ? "Update Todo" : "Add Todo"}
//       </button>

//       <div style={{ marginTop: "20px" }}>
//         {state.todos.map((todo) => (
//           <div key={todo._id}>
//             <h4>{todo.title}</h4>
//             <p>{todo.task}</p>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={todo.completed}
//                 onChange={() => toggleCompleted(todo._id)}
//               />
//               {todo.completed ? "Completed" : "Incomplete"}
//             </label>
//             <div>
//               <button onClick={() => editHandler(todo._id)}>Edit</button>
//               <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Todo;

import React, { useEffect, useState } from "react";
import {
  getTodosApi,
  postTodoApi,
  editTodoApi,
  toggleTodoApi,
  deleteTodoApi,
} from "../api/todo"; // ✅ NEW IMPORT

const Todo = () => {
  const [editClick, setEditClick] = useState(false);
  const [editId, setEditId] = useState("");
  const [state, setState] = useState({
    title: "",
    task: "",
    completed: false,
    todos: [],
  });

  const updateTitle = (e) =>
    setState((prev) => ({ ...prev, title: e.target.value }));

  const updateTask = (e) =>
    setState((prev) => ({ ...prev, task: e.target.value }));

  const getTodos = (todos) => setState((prev) => ({ ...prev, todos }));

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    const data = await getTodosApi(token); // ✅ CHANGED
    getTodos(data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const token = localStorage.getItem("token");

    if (editClick) {
      try {
        await editTodoApi(token, editId, {
          title: state.title,
          task: state.task,
          completed: state.completed,
        }); // ✅ CHANGED
        setState((prev) => ({
          ...prev,
          title: "",
          task: "",
          completed: false,
        }));
        setEditClick(false);
        setEditId("");
        fetchTodos();
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    } else {
      try {
        await postTodoApi(token, {
          title: state.title,
          task: state.task,
          completed: false,
        }); // ✅ CHANGED
        setState((prev) => ({
          ...prev,
          title: "",
          task: "",
          completed: false,
        }));
        fetchTodos();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const toggleCompleted = async (id) => {
    const token = localStorage.getItem("token");
    await toggleTodoApi(token, id); // ✅ CHANGED
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
      await deleteTodoApi(token, id); // ✅ CHANGED
      setEditClick(false);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add Title"
        value={state.title}
        onChange={updateTitle}
      />
      <input
        type="text"
        placeholder="Add Todo"
        value={state.task}
        onChange={updateTask}
      />
      <button onClick={addTodo}>
        {editClick ? "Update Todo" : "Add Todo"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {state.todos.map((todo) => (
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
