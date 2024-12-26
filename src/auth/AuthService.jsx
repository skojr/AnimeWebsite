import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://3.147.44.135:8080/api"; // Backend base URL

// Axios instance with base configuration
export const apiClient = axios.create({
  baseURL: baseUrl,
});

// Intercept responses to handle expired sessions globally
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// User Login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/users/auth/authenticate", {
      email,
      password,
    });

    console.log("Login response:", response.data);

    // Store JWT token in localStorage
    const jwtToken = response.data.token;
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    } else {
      throw new Error("Failed to retrieve JWT token from response");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// User Registration
export const register = async (email, password) => {
  try {
    // Make a POST request to register the user
    const registrationResponse = await apiClient.post("/users/auth/register", {
      email,
      password,
    });
    console.log("Registration successful:", registrationResponse.data);

    // Log the user in automatically after successful registration
    const loginResponse = await login(email, password);
    return loginResponse; // Return the login response
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to register user"
    );
  }
};

// User Logout
export const logout = () => {
  try {
    // Clear stored JWT token
    localStorage.removeItem("jwtToken");

    // Reset default headers for Axios
    delete apiClient.defaults.headers.common["Authorization"];

    // Inform the user and redirect to login
    toast.info("Logged out successfully.");
    setTimeout(() => {
      window.location.href = "/login"; // Redirect to login page
    }, 3000); // Delay slightly to allow the toast message to display
  } catch (error) {
    console.error("Logout error:", error.message);
    toast.error("An error occurred during logout.");
  }
};

// Get Current User
export const getUser = async () => {
  try {
    // Make GET request to fetch the current user
    const response = await apiClient.get(`/users/getUser`);

    console.log("User data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get user error:", error.response || error.message);

    // Handle 401 errors (unauthorized) gracefully
    if (error.response?.status === 401) {
      console.error("Unauthorized access. Redirecting to login.");
      window.location.href = "/login";
    }

    // Throw a user-friendly error message
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

// Update User Information
export const updateUser = async (updateData) => {
  try {
    // Make PUT request to update the user
    const response = await apiClient.put(`/users/updateUser`, updateData);

    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update user error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to update user"
    );
  }
};

// Delete User Account
export const deleteUser = async (password) => {
  try {
    // Make DELETE request with the password
    const response = await apiClient.delete(`/users/deleteUser`, {
      data: { password }, // Include the password in the body
    });

    console.log("Delete user response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete user error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to delete user"
    );
  }
};



export const fetchSurveyData = async (genreId) => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity`);
    const data = response.data.data;
    return data; // Return top 5
  };

// export const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return false;
//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decodedToken.exp > currentTime;
//   } catch (error) {
//     return false;
//   }
// };
