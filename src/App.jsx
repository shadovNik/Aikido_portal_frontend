import './App.css'
import Sidebar from "./react/components/sidebar/Sidebar.jsx";
import Home from "./react/pages/home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./react/pages/login/Login.jsx";
import ListClubs from "./react/pages/list-clubs/ListClubs.jsx";

function App() {
    return (
        <div className="app_div">
            <Sidebar/>
            <main className="main_div">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list-clubs" element={<ListClubs />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
