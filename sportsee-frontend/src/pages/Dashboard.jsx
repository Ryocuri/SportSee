import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ActivityChart from '../components/ActivityChart'
import AverageSessionsChart from '../components/AverageSessionsChart'
import PerformanceChart from '../components/PerformanceChart'
import ScoreChart from '../components/ScoreChart'
import KeyDataCard from '../components/KeyDataCard'
import { getAllUserData } from '../services/dataService'
import './Dashboard.css'

/**
 * Dashboard page component displaying user profile and activity data
 * @returns {JSX.Element} Dashboard component
 */
function Dashboard() {
    const { userId } = useParams()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getAllUserData(Number(userId))
                setUserData(data)
                setError(null)
            } catch (err) {
                setError('Impossible de charger les données utilisateur')
                console.error('Error loading user data:', err)
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            fetchData()
        }
    }, [userId])

    if (loading) {
        return (
            <div className="app">
                <Header />
                <div className="app-container">
                    <Sidebar />
                    <main className="main-content">
                        <div className="loading">Chargement...</div>
                    </main>
                </div>
            </div>
        )
    }

    if (error || !userData) {
        return (
            <div className="app">
                <Header />
                <div className="app-container">
                    <Sidebar />
                    <main className="main-content">
                        <div className="error">{error || 'Utilisateur non trouvé'}</div>
                    </main>
                </div>
            </div>
        )
    }

    const { userData: userInfo, activity, averageSessions, performance } = userData

    return (
        <div className="app">
            <Header />
            <div className="app-container">
                <Sidebar />
                <main className="main-content">
                    <div className="dashboard">
                        <div className="dashboard-header">
                            <h1 className="dashboard-title">
                                Bonjour <span className="user-name">{userInfo.userInfos.firstName}</span>
                            </h1>
                            <p className="dashboard-subtitle">
                                Félicitation ! Vous avez explosé vos objectifs hier 👏
                            </p>
                        </div>

                        <div className="dashboard-content">
                            <div className="dashboard-charts">
                                <ActivityChart data={activity.sessions} />
                                
                                <div className="dashboard-charts-row">
                                    <AverageSessionsChart data={averageSessions.sessions} />
                                    <PerformanceChart data={performance.data} />
                                    <ScoreChart score={userInfo.todayScore} />
                                </div>
                            </div>

                            <aside className="dashboard-sidebar">
                                <KeyDataCard 
                                    type="calories" 
                                    value={userInfo.keyData.calorieCount}
                                    unit="kCal"
                                />
                                <KeyDataCard 
                                    type="proteines" 
                                    value={userInfo.keyData.proteinCount}
                                    unit="g"
                                />
                                <KeyDataCard 
                                    type="glucides" 
                                    value={userInfo.keyData.carbohydrateCount}
                                    unit="g"
                                />
                                <KeyDataCard 
                                    type="lipides" 
                                    value={userInfo.keyData.lipidCount}
                                    unit="g"
                                />
                            </aside>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard