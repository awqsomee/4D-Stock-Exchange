import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts'
import { useEffect, useState } from 'react'
import './chart.css'
import { parseISO, format, isToday } from 'date-fns'

const Chart = (props) => {
  const [color, setColor] = useState('')
  const Id = `gradient${props.id}`
  const [prices, setPrices] = useState([...props.stock.prices].reverse())
  useEffect(() => {
    if (props.stock.prices[0].close > props.stock.prices[99].close) {
      setColor('#BBFFA7')
    } else {
      setColor('#F84550')
    }
  }, [])

  return (
    <div className="stockChart">
      <div className="chart">
        <ResponsiveContainer width={800} height={400} style={{ overflow: 'visible' }}>
          <AreaChart data={prices}>
            <defs>
              <linearGradient id={Id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1}></stop>
                <stop offset="35%" stopColor={color} stopOpacity={0.7}></stop>
                <stop offset="75%" stopColor={color} stopOpacity={0.3}></stop>
                <stop offset="100%" stopColor={color} stopOpacity={0.1}></stop>
              </linearGradient>
            </defs>

            <Area type="monotone" dataKey="close" stroke={color} fill={`url(#${Id})`} />

            <XAxis
              dataKey="date"
              stroke="white" // здесь может быть #fffff
              tickLine={false}
              interval={9}
              // angle={-30}
              dy={-3}
              dx={30}
              tickFormatter={(label) => {
                label = new Date(label)
                return label.toLocaleDateString()
              }}
            />

            <YAxis
              dataKey="close"
              stroke="white" // здесь может быть #fffff
              tickLine={false}
              tickCount={6}
              tickFormatter={(number) => `${number.toFixed(2)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.05} vertical={false} stroke="#fff" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label }, currency) {
  if (active)
    return (
      <div className="tooltip" style={{ color: 'white' }}>
        <h4>{format(parseISO(label), 'eeee, d MMM')}</h4>
        <p>{payload[0]?.value.toFixed(2)}</p>
      </div>
    )

  return null
}

export default Chart
