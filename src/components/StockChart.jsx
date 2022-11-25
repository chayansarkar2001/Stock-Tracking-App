import Chart from 'react-apexcharts'
import {useState} from 'react'

const StockChart = ({chartData, symbol}) => {
  const {day,month,year} = chartData
  const [timeStamp,setTimeStamp] = useState("7d")
  const handleTimeStamp = ()=>{
    switch(timeStamp){
      case '24h':
        return day
      case '7d':
        return month 
      case '1y':
        return year 
      default:
        return day
    }
  }
  const color = (handleTimeStamp()[handleTimeStamp().length -1].y - handleTimeStamp()[0].y)>0? "#26c281":"#ed3419"
  
  const options ={
    colors: [color],
    title:{
      text: symbol,
      align: "center",
      style:{
        fontSize: "24px"
      }
    },
    chart:{
      id:"stock data",
      animations:{
        speed: 1300
      }
    },
    xaxis:{
      type:"datetime",
      labels:{
        datetimeUTC: false
      }
    },
    tooltip:{
      x:{
        format:"MMM dd hh:mm"
      }
    }
  }
  const series = [{
    name: symbol,
    data: handleTimeStamp()
  }]
  return (
    <div className='mt-5 p-4 shadow-sm bg-white h-50'>
      <Chart options={options} series={series} type="area" width="75%"/>
      <button className={`btn btn-outline-primary ${timeStamp == '24h'?'bg-primary text-white':""}`} onClick={()=>setTimeStamp("24h")}>24h</button>
      <button className={`m-2 btn btn-outline-primary ${timeStamp == '7d'?'bg-primary text-white':""}`} onClick={()=>setTimeStamp("7d")}>7d</button>
      <button className={`btn btn-outline-primary ${timeStamp == '1y'?'bg-primary text-white':""}`} onClick={()=>setTimeStamp("1y")}>1y</button>
    </div>
  )
}

export {StockChart}