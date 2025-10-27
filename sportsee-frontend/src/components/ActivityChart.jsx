import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './ActivityChart.css'

/**
 * Custom tooltip for the activity chart
 * @param {Object} props - Tooltip props
 * @returns {JSX.Element|null} Custom tooltip component
 */
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="activity-tooltip">
                <p>{`${payload[0].value}kg`}</p>
                <p>{`${payload[1].value}Kcal`}</p>
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
 * ActivityChart component displaying daily activity with weight and calories
 * @param {Object} props - Component props
 * @param {Array} props.data - Activity data array
 * @returns {JSX.Element} ActivityChart component
 */
function ActivityChart({ data }) {
    return (
        <div className="activity-chart">
            <div className="activity-chart-header">
                <h2 className="activity-chart-title">Activité quotidienne</h2>
                <div className="activity-chart-legend">
                    <div className="legend-item">
                        <span className="legend-dot legend-dot-weight"></span>
                        <span className="legend-text">Poids (kg)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot legend-dot-calories"></span>
                        <span className="legend-text">Calories brûlées (kCal)</span>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart 
                    data={data} 
                    barGap={8}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                        dataKey="day" 
                        tickLine={false}
                        tick={{ fill: '#9B9EAC', fontSize: 14 }}
                        dy={10}
                    />
                    <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#9B9EAC', fontSize: 14 }}
                        domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <YAxis 
                        yAxisId="left"
                        orientation="left"
                        tickLine={false}
                        axisLine={false}
                        hide={true}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }} />
                    <Bar 
                        yAxisId="right"
                        dataKey="kilogram" 
                        fill="#282D30" 
                        radius={[10, 10, 0, 0]}
                        barSize={7}
                    />
                    <Bar 
                        yAxisId="left"
                        dataKey="calories" 
                        fill="#E60000" 
                        radius={[10, 10, 0, 0]}
                        barSize={7}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

ActivityChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.number.isRequired,
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired
    })).isRequired
}

export default ActivityChart