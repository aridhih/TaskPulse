import DailyStandUp from "./components/DailyStandUp"
import Content from "./components/HomePage/content"
import NavBar from "./components/HomePage/NavBar"
import SideBar from "./components/HomePage/SideBar"

function App() {

  return (
    <>
    
    <NavBar/>  
    <div className='flex flex-row'> 
    <SideBar/>
    <Content/>
    </div>
    
    
    <DailyStandUp/>
    </>
  )
}

export default App
