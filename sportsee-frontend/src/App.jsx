import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import './App.css'

/**
 * Main App component with routing
 * @returns {JSX.Element} App component
 */
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/:userId" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}

export default App
