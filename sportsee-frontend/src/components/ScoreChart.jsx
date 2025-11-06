import PropTypes from 'prop-types'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import './ScoreChart.css'

/**
 * ScoreChart component displaying user's daily score in a radial chart
 * @param {Object} props - Component props
 * @param {number} props.score - User's score (0-1 range)
 * @returns {JSX.Element} ScoreChart component
 */
function ScoreChart({ score }) {
    const scorePercentage = Math.round(score * 100)
    
    // Calculate endAngle based on score percentage
    // Start at 90° (top) and add 360° * percentage for proper progression
    const startAngle = 90
    const endAngle = startAngle + (360 * scorePercentage / 100)
    
    const data = [
        {
            name: 'score',
            value: scorePercentage,
            fill: '#FF0000'
        }
    ]

    return (
        <div className="score-chart">
            <h3 className="score-chart-title">Score</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="80%"
                    barSize={10}
                    data={data}
                    startAngle={startAngle}
                    endAngle={endAngle}
                >
                    <RadialBar
                        dataKey="value"
                        cornerRadius={10}
                        fill="#FF0000"
                        background={{ fill: '#FBFBFB' }}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div className="score-chart-center">
                <p className="score-percentage">{scorePercentage}%</p>
                <p className="score-label">de votre<br/>objectif</p>
            </div>
        </div>
    )
}

ScoreChart.propTypes = {
    score: PropTypes.number.isRequired
}

export default ScoreChart