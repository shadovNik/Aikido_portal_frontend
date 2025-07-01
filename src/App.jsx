import './App.css'
import Helloworld from "./helloworld.jsx";
import Sidebar from "./react/components/sidebar/Sidebar.jsx";
import Home from "./react/pages/Home.jsx";

function App() {
    return (
        <div className="app_div">
            <Sidebar/>
            <main style={{flex: 1, padding: '40px'}}>
                <Helloworld></Helloworld>
                <Home/>
            </main>
        </div>
    )
}

export default App
