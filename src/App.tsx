import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MemeTable from "./pages/MemeTable/MemeTable";
import MemeList from "./pages/MemeList/MemeList";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { MemeProvider } from "./context/MemeContext";

function App(): JSX.Element {
  return (
    <MemeProvider>
      <Router>
        <Navbar className="navbar">
          <NavbarBrand className="navbar-brand">Meme Directory</NavbarBrand>
          <NavbarContent className="navbar-links">
            <NavbarItem>
              <Link to="/" className="nav-link">
                Table View
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/list" className="nav-link">
                List View
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <Routes>
          <Route path="/" element={<MemeTable />} />
          <Route path="/list" element={<MemeList />} />
        </Routes>
      </Router>
    </MemeProvider>
  );
}

export default App;
