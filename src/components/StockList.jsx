import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import finnhub from "../apis/finnhub"
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { context } from "../context/watchListContext";

const StockList = ()=>{
  const {watchList,deleteStock} = context()
  const [stock,setStock] = useState([])
  const navigate = useNavigate()
  const changeColor = (change)=>{
    return change>0?'text-success':"text-danger"
  }
  const changeIcon = (change)=>{
    return change>0?<BsFillCaretUpFill />:<BsFillCaretDownFill />
  }
  const handleStockSelect = (symbol)=>{
    navigate(`detailpage/${symbol}`)
  }
  
  useEffect(()=>{
    let isMounted = true
    const fetchData = async()=>{
      try{
        const responses = await Promise.all(watchList.map((e)=>{
          return finnhub.get("/quote?",{
          params:{
            symbol: e
          }
        })
        }))
        const data = responses.map((stock)=>{
          return {
            symbol: stock.config.params.symbol,
            data: stock.data
          }
        })
        if(isMounted){
          setStock(data)
        }
      } catch (err){
        console.log(err)
      }
    }
    fetchData()
    return ()=>(isMounted=false)
  },[watchList])
  return (
    <div>
      <table className="table hover table-success mt-5">
        <thead className='table-dark' >
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'> Chg</th>
            <th scope='col'>Chg%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData)=>{
            return (
              <tr onClick={()=>handleStockSelect(stockData.symbol)} style={{cursor:"pointer"}} className='table-row' key={stockData.symbol}>
                <th scope='row'>{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={changeColor(stockData.data.d)}>{stockData.data.d}{changeIcon(stockData.data.d)}</td>
                <td className={changeColor(stockData.data.dp)}>{stockData.data.dp}{changeIcon(stockData.data.dp)}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc} <button className="btn btn-danger btn-sm d-inline-block delete-btn" onClick={(e)=>{
                e.stopPropagation();
                deleteStock(stockData.symbol)
                }}>Remove</button></td>
              </tr>
            )
          })}
        </tbody> 
      </table>
    </div>
  )
}

export default StockList;