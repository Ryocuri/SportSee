import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import './Home.css'

/**
 * Home page component with user selection
 * @returns {JSX.Element} Home component
 */
function Home() {
    return (
        <div className="app">
            <Header />
            <div className="app-container">
                <Sidebar />
                <main className="main-content">
                    <div className="home">
                        <h1 className="home-title">Bienvenue sur SportSee</h1>
                        <p className="home-subtitle">Sélectionnez un utilisateur pour voir son profil</p>
                        <div className="home-users">
                            <Link to="/user/12" className="user-card">
                                <h2>Karl Dovineau</h2>
                                <p>User ID: 12</p>
                            </Link>
                            <Link to="/user/18" className="user-card">
                                <h2>Cecilia Ratorez</h2>
                                <p>User ID: 18</p>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home