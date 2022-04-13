import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts'
import axios from 'axios'
import { useEffect, useState } from 'react'

// import {format, parseISO, subDays } from "date-fns"

// const data = []
// for (let num = 30; num >= 0; num--)
//   data.push({
//     date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//     value: 1 + Math.random(),
//   })
const Chart = (props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    getInfo()
  }, [])

  let GET_POSTS_LINK
  if (!props.srch)
    GET_POSTS_LINK = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BABA.BSE&apikey=ACBVRHUCTP4LTHVX`
  else
    GET_POSTS_LINK = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props.keywords}&apikey=ACBVRHUCTP4LTHVX`

  async function getInfo(symbol) {
    try {
      const response = await axios.get(GET_POSTS_LINK)
      let date = Object.keys(response.data['Time Series (Daily)'])
      // let value = []
      const value = date.map((item) => Number(response.data['Time Series (Daily)'][item]['4. close']))
      // let datas
      // value.forEach((element) => datas.push({ date, element }))
      const datas = []
      for (let num = 99; num >= 0; num--)
        datas.push({
          date: date,
          value: value[num],
        })
      setData(datas)
    } catch (e) {
      console.log(e)
    }
  }

  console.log(data)

  return (
    <div>
      <ResponsiveContainer width={1000} height={400}>
        <AreaChart data={data}>
          <Area dataKey="value" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
