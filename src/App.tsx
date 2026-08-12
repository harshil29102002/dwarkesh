
import './App.css'
import SideBar from './components/Layout/SideBar'
import TabNav from './components/Layout/TabNav'
import ChallanDelivery from './pages/DeliveryChallans'
import EnterpriseAnalytics from './pages/EnterpriceAnalytics/EnterPrice'
import StockRegister from './pages/StockRegister'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (
   <BrowserRouter>
   <SideBar/>
   <TabNav/>
   <Routes>
    <Route path='/' element={<StockRegister/>}/>
    <Route path='/delivery-challans' element={<ChallanDelivery/>}/>
    <Route path='/analytics' element={<EnterpriseAnalytics/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
