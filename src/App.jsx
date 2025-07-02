import './App.css'
import Sidebar from "./react/components/sidebar/Sidebar.jsx";
import Home from "./react/pages/home/Home.jsx";

function App() {
    return (
        <div className="app_div">
            <Sidebar/>
            <main className="main_div">
                <Home/>
            </main>
        </div>
    )
}

export default App
