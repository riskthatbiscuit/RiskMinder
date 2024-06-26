import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const StockHistoryGraph = ({ stockHistory }) => {
  const reversedStockHistory = [...stockHistory].reverse()

  // Calculate Min and Max values
  const prices = stockHistory.map((item) => item.price)
  const minValue = Math.min(...prices)
  const maxValue = Math.max(...prices)

  // Calculate percentage change
  const lastPrice = stockHistory[0].price
  const firstPrice = stockHistory[stockHistory.length - 1].price
  const percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LineChart width={150} height={50} data={reversedStockHistory}>
        {/* <YAxis domain={[minValue, maxValue]} hide={true} /> */}
        <Line type="monotone" dataKey="price" />
      </LineChart>
      {/* Display the percentage change to the right of the graph */}
      <div style={{ marginLeft: '20px' }}>{percentageChange.toFixed(2)}%</div>
    </div>
  )
}

export default StockHistoryGraph
