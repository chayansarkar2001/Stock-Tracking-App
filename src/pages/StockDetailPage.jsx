import React, { useEffect, useState } from "react";
import finnhub from "../apis/finnhub"
import { useParams } from "react-router-dom"
import {StockChart} from '../components/StockChart'
import {Company} from '../components/Company'
const formatedData = (data)=>{
  return data.t.map((val,i)=>{
    return {
      x:val*1000,
      y:parseFloat(data.c[i].toFixed(2))
    }
  })
}

const StockDetailPage = ()=>{
  const [chartData,setChartData] = useState()
  const {symbol} = useParams()
  useEffect(()=>{
    let isMouted=true
    const fetchData = async ()=>{
      let currTime = new Date()
      currTime = Math.floor(currTime.getTime() /1000)
      try {
        const responses = await Promise.all([finnhub.get('/stock/candle?',{
          params: {
            symbol: symbol,
            from: currTime - 24*60*60,
            to: currTime,
            resolution: 30
          }
        }),
        finnhub.get('/stock/candle?',{
          params: {
            symbol: symbol,
            from: currTime-7*24*60*60,
            to: currTime,
            resolution: 60
          }
        }),
        finnhub.get('/stock/candle?',{
          params: {
            symbol: symbol,
            from: currTime - 365*24*60*60,
            to: currTime,
            resolution: "W"
          }
        })])
        
        setChartData({
          day: formatedData(responses[0].data),
          month: formatedData(responses[1].data),
          year: formatedData(responses[2].data)
        })
      } catch(err){
        console.error(err)
      }
    }  
    if(isMouted){
      fetchData()
    }
    return ()=>(isMouted=false)
  },[symbol])
   
  return (
    <div>
      {
        chartData && (
          <div>
            <StockChart chartData={chartData} symbol={symbol} />
            <Company symbol={symbol} />
          </div>
        )
      }
    </div>
  )
}
export default StockDetailPage;