import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/custom/Header'

function App() {

  return (
    <>
    <Header />
    {/* <Toaster /> */}
    {/* <Hero /> */}
    <Outlet />
    </>
  )
}

export default App
