// import DailyStandUp from "./components/DailyStandUp"
import Content from "./components/HomePage/content"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"


function App() {

  return (
    <>
    
    <NavBar/>
    <div className='flex flex-row'> 
    <SideBar/>
    <Content/>
    </div>
    
    
    {/* <DailyStandUp/> */}
    </>
  )
}

export default App
