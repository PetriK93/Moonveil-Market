import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ListItem from "./pages/ListItem/ListItem";
import Messages from "./pages/Messages/Messages";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/HomePage/HomePage";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoryList from "./components/Categories/Categories";

function App() {
  const location = useLocation();

  return (
    <div>
      <NavBar />
      {location.pathname === "/" && <SearchBar />}
      {location.pathname === "/" && <CategoryList />}
      <Routes>
        <Route path="/list-item" element={<ListItem />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
