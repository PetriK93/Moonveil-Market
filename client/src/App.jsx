import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ListItem from "./pages/ListItem/ListItem";
import Messages from "./pages/Messages/Messages";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/HomePage/HomePage";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoryList from "./components/Categories/Categories";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <SearchBar />
        <CategoryList />
        <Routes>
          <Route path="/list-item" element={<ListItem />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
