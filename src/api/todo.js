const API = "http://localhost:3000";

export const getTodosApi = async (token) => {
  const res = await fetch(`${API}/todo/get-todo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const postTodoApi = async (token, payload) => {
  const res = await fetch(`${API}/todo/post-todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const editTodoApi = async (token, id, payload) => {
  const res = await fetch(`${API}/todo/edit-todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const toggleTodoApi = async (token, id) => {
  await fetch(`${API}/todo/toggle/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTodoApi = async (token, id) => {
  const res = await fetch(`${API}/todo/delete-todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
