import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Messages from "./components/Messages/Messages";
import Profile from "./components/Profile/Profile";
import AuctionHouse from "./components/AuctionHouse/AuctionHouse";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoryList from "./components/Categories/Categories";
import Login from "./components/LogIn/Login";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/log-in"
          element={
            <>
              <Login />
              <SignUp />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <SearchBar />
              <CategoryList />
              <AuctionHouse />
            </>
          }
        />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
