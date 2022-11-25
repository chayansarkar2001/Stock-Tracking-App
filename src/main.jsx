import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom"
import {WatchListContextProvider} from './context/watchListContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/Stock-Tracking-App'>
    <WatchListContextProvider child={<App />}>
    </WatchListContextProvider>
  </BrowserRouter>
) 