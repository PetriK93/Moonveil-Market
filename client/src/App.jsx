import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import AuctionHouse from "./components/AuctionHouse/AuctionHouse";
import Login from "./components/LogIn/Login";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/log-in" replace />} />
        <Route
          path="/log-in"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route path="/auction-house" element={<AuctionHouse />} />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
