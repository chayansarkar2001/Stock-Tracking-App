import {createContext,useContext,useEffect,useState}  from 'react';

const WatchListContext = createContext();

const WatchListContextProvider =(props)=>{
  const [watchList,setWatchList] = useState(
    localStorage.getItem('watchList')?.split(',') || ['GOOGL','AMZN','MSFT'])
  const addStock=(stock)=>{
    if(watchList.indexOf(stock)===-1){
      setWatchList([...watchList,stock])
    }
  }
  const deleteStock=(stock)=>{
    setWatchList(watchList.filter(el => el!==stock))
  }
  useEffect(()=>{
    localStorage.setItem("watchList",watchList)
  },[watchList])
  
  return (<WatchListContext.Provider value={{watchList,addStock,deleteStock}}>
    {props.child}
  </WatchListContext.Provider>)
}
const context =()=>{
  return useContext(WatchListContext)
}
export {WatchListContextProvider, WatchListContext, context}