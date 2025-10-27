import PropTypes from 'prop-types'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import './PerformanceChart.css'

/**
 * PerformanceChart component displaying user performance metrics in a radar chart
 * @param {Object} props - Component props
 * @param {Array} props.data - Performance data array with kind and value
 * @returns {JSX.Element} PerformanceChart component
 */
function PerformanceChart({ data }) {
    return (
        <div className="performance-chart">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis 
                        dataKey="kind" 
                        tick={{ fill: '#FFFFFF', fontSize: 12 }}
                        tickLine={false}
                    />
                    <Radar 
                        dataKey="value" 
                        fill="#FF0101" 
                        fillOpacity={0.7}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

PerformanceChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        kind: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    })).isRequired
}

export default PerformanceChart