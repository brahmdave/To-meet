// import { useState } from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Room} from "../components/Room"
// import {Landing} from "../components/Landing"
// function App() {

//   return (

//     <BrowserRouter>
//       <Routes>
//         <Route path="/"   element={<Landing/>}/>
        
//         <Route path="/Room"   element={<Room/>}/>
        
    
       
//       </Routes>
//     </BrowserRouter>

//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from '../components/Landing';
import { Room } from '../components/Room';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App