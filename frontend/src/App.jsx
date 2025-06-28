// React Router: used for handling client-side routing
import { Navigate, Route, Routes } from "react-router";

// Importing page components
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

// Toast notifications
import { Toaster, toast } from "react-hot-toast";

// React Query: handles API data fetching and caching
import { useQuery } from "@tanstack/react-query";

// Axios for API calls
import axios from "axios";
import { axiosInstance } from "./lib/axios.js";

const App = () => {
  // React Query to fetch current logged-in user's info
  const { data:authData, isLoading, error } = useQuery({
    queryKey: ["authUser"], // unique key for caching
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false, // auth check
  });

  const authUser = authData?.user;

  return (
    // Full screen container with night theme (likely using DaisyUI or custom CSS)
    <div className="h-screen" data-theme="night">

      {/* All frontend routes are declared here */}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>

      {/* Toast container to display success/error messages globally */}
      <Toaster />
    </div>
  );
};

export default App;
