import {useState,useEffect} from "react"
import finnhub from "../apis/finnhub"
import {context} from '../context/watchListContext';

const Search = ()=>{
  const [search,setSearch] = useState("")
  const [symbols, setSymbols] = useState([])
  const {addStock} = context()
  const renderDropdown = ()=>{
    return (<ul style={{
      height:"400px",
      overflowY:"scroll",
      overflowX:"hidden",
      cursor: "pointer"
    }} className={`dropdown-menu ${search.length>0?"show":""}`}>
      {symbols.map((e)=>{
        return (<li onClick={()=>{
          addStock(e.symbol)
          setSearch('')
        }}className="dropdown-item" key={e.symbol}>{e.description} ({e.symbol})</li>)
      })}
    </ul>)
  }
  useEffect(()=>{
    let isMounted = true
    const fetchSymbols = async ()=>{
      try {
        const response = await finnhub.get("/search?",{
          params:{
            q:search
          }
        })
        const res = response.data.result
        if(isMounted){
          setSymbols(res)
        }
      } catch (error) {
        console.error(error)
      }
    }
    if(search.length>0){
    fetchSymbols()
    }else{
      setSymbols([])
    }
    return ()=>(isMounted=false)
  },[search])
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input id="search" className="form-control" type="text" placeholder="Search" style={{backgroundColor:"rgba(145,158,171,0.04)"}} value={search} onChange={(e) => setSearch(e.target.value)} autoComplete="off"/>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  )
}

export default Search;