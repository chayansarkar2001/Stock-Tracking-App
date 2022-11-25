import React from "react";
import Search from "../components/Search"
import StockList from "../components/StockList"

const StockOverVeiwPage = ()=>{
  return (
    <div>
      <div className="text-center mt-5">
        <img style={{width:'200px'}} src="../trading.png" />
      </div>
      <Search />
      <StockList />
    </div>
  )
}
export default StockOverVeiwPage;