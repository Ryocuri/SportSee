import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts'
import './AverageSessionsChart.css'

/**
 * Custom tooltip for average sessions chart
 * @param {Object} props - Tooltip props
 * @returns {JSX.Element|null} Custom tooltip component
 */
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="sessions-tooltip">
                <p>{`${payload[0].value} min`}</p>
            </div>
        )
    }
    return null
}

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array
}

/**
 * Custom cursor for hover effect
 * @param {Object} props - Cursor props
 * @returns {JSX.Element|null} Custom cursor component
 */
const CustomCursor = ({ points, width, height }) => {
    if (!points || points.length === 0) return null
    
    const { x } = points[0]
    return (
        <Rectangle
            fill="rgba(0, 0, 0, 0.1)"
            x={x}
            y={0}
            width={width - x}
            height={height}
        />
    )
}

CustomCursor.propTypes = {
    points: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
}

/**
 * AverageSessionsChart component displaying average session duration per day
 * @param {Object} props - Component props
 * @param {Array} props.data - Average sessions data array
 * @returns {JSX.Element} AverageSessionsChart component
 */
function AverageSessionsChart({ data }) {
    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    
    const formattedData = data.map((session) => ({
        ...session,
        dayLabel: dayLabels[session.day - 1]
    }))

    return (
        <div className="sessions-chart">
            <h3 className="sessions-chart-title">Durée moyenne des sessions</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{ top: 0, right: 10, left: 10, bottom: 30 }}
                >
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="dayLabel" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={<CustomCursor />}
                    />
                    <Line 
                        type="natural"
                        dataKey="sessionLength" 
                        stroke="url(#lineGradient)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ 
                            r: 4, 
                            fill: 'white',
                            strokeWidth: 2,
                            stroke: 'rgba(255, 255, 255, 0.3)'
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

AverageSessionsChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.number.isRequired,
        sessionLength: PropTypes.number.isRequired
    })).isRequired
}

export default AverageSessionsChart