import finnhub from "../apis/finnhub"
import {useState, useEffect } from 'react'

const Company = ({symbol})=>{
  const [companyData, setCompanyData] = useState()
  useEffect(()=>{
    let isMouted = true
    const fetchData = async ()=>{
      try {
        const response = await finnhub.get("/stock/profile2",{
          params:{
            symbol: symbol
          }
        }) 
        console.log(response)
        if(isMouted){
          setCompanyData(response.data)
        }
        console.log(companyData)
      } catch(err){
        console.error(err)
      }
    }
    fetchData()
    return ()=>(isMouted=false)
  },[symbol])
  return (
    <div>
      {
        companyData && (
          <div className="row border shadow-sm p-4 mt-5 mb-5 rounded bg-white">
            <div className="col">
              <div>
                <span className="fw-bold">Name: </span>
                {companyData.name}
              </div>
              <div>
                <span className="fw-bold">Country: </span>
                {companyData.country}
              </div>
              <div>
                <span className="fw-bold">Ticker: </span>
                {companyData.ticker}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">Exchange: </span>
                {companyData.exchange}
              </div>
              <div>
                <span className="fw-bold">Industry: </span>
                {companyData.industry}
              </div>
              <div>
                <span className="fw-bold">IPO: </span>
                {companyData.ipo}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">MarketCap: </span>
                {parseFloat(companyData.marketCapitalization.toFixed(2))}
              </div>
              <div>
                <span className="fw-bold">Shares Outstanding: </span>
                {parseFloat(companyData.shareOutstanding.toFixed(2))}
              </div>
              <div>
                <span className="fw-bold">URL: </span>
                <a href={companyData.weburl}>{companyData.weburl}</a>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
export {Company}