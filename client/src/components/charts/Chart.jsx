import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './chart.css'
import { parseISO, format } from 'date-fns'

// import {format, parseISO, subDays } from "date-fns"

// const data = []
// for (let num = 30; num >= 0; num--)
//   data.push({
//     date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//     value: 1 + Math.random(),
//   })
const Chart = (props) => {
  const [data, setData] = useState([])
  const [color, setColor] = useState('#A0E28D')
  useEffect(() => {
    getInfo()
  }, [])

  let GET_POSTS_LINK
  if (!props.srch)
    GET_POSTS_LINK = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
  else
    GET_POSTS_LINK = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props.keywords}&apikey=ACBVRHUCTP4LTHVX`
  async function getInfo(symbol) {
    try {
      const response = await axios.get(GET_POSTS_LINK)

      let date = Object.keys(response.data['Time Series (Daily)'])
      date.reverse()
      const value = date.map((item) => Number(response.data['Time Series (Daily)'][item]['4. close']))
      const datas = []
      for (let num = 99; num >= 0; num--)
        datas.unshift({
          date: date,
          value: value[num],
        })
      setData(datas)
      if (data[0].value < data[99].value) setColor('#A0E28D')
      else setColor('#FF9180')
    } catch (e) {
      console.log(e)
    }
  }
  console.log(data)

  console.log(data)

  return (
    <div className="stockChart">
      <div className="chart">
        <ResponsiveContainer width={1000} height={400}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.7}></stop>
                <stop offset="75%" stopColor={color} stopOpacity={0.1}></stop>
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke={color} fill="url(#color)" />

            <XAxis
              dataKey="date"
              stroke="#47959A"
              tickLine={false}
              // tickFormatter={(label) => {
              //   const date = parseISO(label)
              //   for (let i = 0; i < 100; i++) if (i % 7 === 0) return ``
              // }}
              tickCount={6}
            />

            <YAxis
              dataKey="value"
              stroke="#47959A"
              tickLine={false}
              tickCount={6}
              tickFormatter={(number) => `${number.toFixed(2)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.3} vertical={false} stroke="#47959A" />
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
        {' '}
        <h4>{format(parseISO(label), 'eeee, d MMM')}</h4>
        <p>{payload[0].value.toFixed(2)}</p>
      </div>
    )

  return null
}

export default Chart
