export const signupUser = async (name, email, password) => {
  try {
    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.msg || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Signup API Error:", error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.msg || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error; // So the component can handle it
  }
};
