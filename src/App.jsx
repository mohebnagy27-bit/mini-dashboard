import Sidebar from "./components/sidebar-component"
import Main from "./components/main-component"
import Newtask from "./components/newtask-component"
import "./components/dashboard.css"
import Selectedcomponent from "./reducers/selectedcomponent"
import { Reducerprovider } from "./contexts/reducer-context"
import { Examprovider } from "./contexts/exam-context"
import { Taskprovider } from "./contexts/task-context"
import { useContext, useEffect, useState } from "react"
import { Taskcontext } from "./contexts/task-context"
import { Todaytasks } from "./helper-functions"


function App () {

  // const {tasks, settasks} = useContext(Taskcontext);
  // const [today, settoday] = useState([]);
  // function gettoday (){
  //   settoday(Todaytasks(tasks));
  //   console.log(today)
  // }

  return (
    <Taskprovider>
    <Examprovider>
      <Reducerprovider>
      <div className="container">
       <Sidebar/>
       <Main/>
       <Selectedcomponent/>
      </div>
    </Reducerprovider>
    </Examprovider>
    </Taskprovider>
  )
}

export default App
