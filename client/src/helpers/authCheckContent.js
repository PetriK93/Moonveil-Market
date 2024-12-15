import axiosInstance from "./axiosInstance.js"; // Import the configured axios instance
import { useNavigate } from "react-router-dom"; // React Router for navigation

const authCheckAuctionHouse = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      // Send a GET request to validate cookies
      const response = await axiosInstance.get(
        "http://localhost:3000/api/auth/validate"
      );
      if (response.status === 200) {
        // Authentication successful, allow access to the auction house
        console.log("User authenticated:", response.data);
        return true;
      }
    } catch (error) {
      // If authentication fails, redirect to /log-in
      console.error(
        "Authentication failed:",
        error.response?.data || error.message
      );
      navigate("/log-in");
      return false;
    }
  };

  return { checkAuth };
};

export default authCheckAuctionHouse;
