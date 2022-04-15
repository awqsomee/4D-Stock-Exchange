import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts'
import { useEffect, useState } from 'react'
import './chart.css'
import { parseISO, format } from 'date-fns'

const Chart = (props) => {
  const [color, setColor] = useState('')

  useEffect(() => {
    if (props.stock.data[0].value < props.stock.data[99].value) setColor('#A0E28D')
    else setColor('#FF9180')
  }, [])

  return (
    <div className="stockChart">
      <div className="chart">
        <ResponsiveContainer width={800} height={400}>
          <AreaChart data={props.stock.data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1}></stop>
                <stop offset="35%" stopColor={color} stopOpacity={0.8}></stop>
                <stop offset="75%" stopColor={color} stopOpacity={0.1}></stop>
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke={color} fill="url(#color)" />

            <XAxis
              dataKey="date"
              stroke="#2be9d9"
              tickLine={false}
              // tickFormatter={(label) => {
              //   const date = parseISO(label)
              //   for (let i = 0; i < 100; i++) if (i % 7 === 0) return ``
              // }}
              tickCount={6}
            />

            <YAxis
              dataKey="value"
              stroke="#2be9d9"
              tickLine={false}
              tickCount={6}
              tickFormatter={(number) => `${number.toFixed(2)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.3} vertical={false} stroke="#2be9d9" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label }, currency) {
  if (active)
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), 'eeee, d MMM')}</h4>
        <p>{payload[0].value.toFixed(2)}</p>
      </div>
    )

  return null
}

export default Chart
