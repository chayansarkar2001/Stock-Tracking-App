import './App.css'
import {Route, Routes } from 'react-router-dom'
import StockOverVeiwPage from "./pages/StockOverVeiwPage"
import StockDetailPage from "./pages/StockDetailPage"
export default function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<StockOverVeiwPage />} />
        <Route path="/detailpage/:symbol" element={<StockDetailPage />} />
      </Routes>
    </div>
  )
}
 